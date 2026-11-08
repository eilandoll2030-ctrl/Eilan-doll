#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
EILAN DOLL — سيرفر معاينة محلي (dev only)

    python3 tools/serve.py                 # 0.0.0.0:8200
    PORT=8080 python3 tools/serve.py

مصمّم لبيئة المعاينة (E2B preview proxy) وليطابق الإنتاج على Vercel:

- يبثّ على 0.0.0.0 (مطلوب للمعاينة).
- HTTP/1.1 مع Content-Length ⇒ keep-alive يريح البروكسي.
- `/` = التطبيق (index.html) كما في الإنتاج — لا تحويل.
  سابقًا كان `/` يعرض brand/showcase.html، فكانت المعاينة تُظهر ورقة شعار
  بدل الموقع؛ الآن ورقة الشعار على /brand/ فقط.
- `/api/<name>` ينفّذ api/<name>.js الحقيقي عبر node tools/api_bridge.mjs
  ⇒ نفس سلوك Vercel محليًا. غير المتاح (بلا مفتاح) يرجع off:true كما الإنتاج.
- `/health` JSON — فحص الجاهزية.
- لا X-Frame-Options ⇒ الصفحة تُعرض داخل iframe.
- CORS مفتوح + no-store للنصوص (نفس vercel.json).
"""
import os
import sys
import gzip
import hashlib
import json
import subprocess
import http.server
import socketserver
from urllib.parse import urlparse, parse_qs

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PORT = int(os.environ.get("PORT", "8200"))
HOST = os.environ.get("HOST", "0.0.0.0")
APP = "index.html"
BRAND_PAGE = "brand/showcase.html"
API_DIR = os.path.join(ROOT, "api")
BRIDGE = os.path.join(ROOT, "tools", "api_bridge.mjs")
PROTOCOL = "HTTP/1.1"
API_TIMEOUT = 20

# الملفات النصية تُضغط. index.html = 2.44MB خام ⇒ ~350KB مضغوط.
# بدون ضغط كانت صفحة واحدة بهذا الحجم تُبطئ/تُبتر عبر بروكسي المعاينة.
COMPRESSIBLE = (".html", ".css", ".js", ".mjs", ".json", ".svg", ".webmanifest",
                ".txt", ".xml", ".map")
COMPRESS_MIN = 1024

# كاش الضغط: (path, mtime, size) ⇒ bytes مضغوطة. يمنع إعادة ضغط 2.4MB كل طلب.
_GZ_CACHE = {}
_GZ_CACHE_MAX = 32


def _gzip_cached(path):
    try:
        st = os.stat(path)
    except OSError:
        return None
    key = (path, st.st_mtime_ns, st.st_size)
    hit = _GZ_CACHE.get(key)
    if hit is not None:
        return hit
    try:
        with open(path, "rb") as f:
            raw = f.read()
    except OSError:
        return None
    if len(raw) < COMPRESS_MIN:
        return None
    body = gzip.compress(raw, 6)
    if len(_GZ_CACHE) >= _GZ_CACHE_MAX:
        _GZ_CACHE.clear()
    _GZ_CACHE[key] = body
    return body


def _wants_gzip(accept_encoding):
    if not accept_encoding:
        return False
    for part in accept_encoding.split(","):
        token = part.split(";")[0].strip().lower()
        if token in ("gzip", "*"):
            return "q=0" not in part.replace(" ", "")
    return False


class Handler(http.server.SimpleHTTPRequestHandler):
    protocol_version = PROTOCOL

    def __init__(self, *a, **kw):
        super().__init__(*a, directory=ROOT, **kw)

    # ---------------------------------------------------------------- helpers
    def _send_bytes(self, body, ctype, code=200, extra=None):
        extra = dict(extra or {})
        compressible = any(t in (ctype or "") for t in ("text/", "json", "javascript",
                                                       "svg", "xml"))
        if (compressible and len(body) >= COMPRESS_MIN and code == 200
                and _wants_gzip(self.headers.get("Accept-Encoding"))
                and self.command != "HEAD"):
            key = (len(body), hashlib.md5(body).hexdigest())
            cached = _GZ_CACHE.get(key)
            if cached is None:
                cached = gzip.compress(body, 6)
                if len(_GZ_CACHE) >= _GZ_CACHE_MAX:
                    _GZ_CACHE.clear()
                _GZ_CACHE[key] = cached
            body = cached
            extra["Content-Encoding"] = "gzip"
            extra["Vary"] = "Accept-Encoding"
        self.send_response(code)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(body)))
        for k, v in extra.items():
            self.send_header(k, v)
        self.end_headers()
        if self.command != "HEAD":
            self.wfile.write(body)

    def send_head(self):
        """ضغط الملفات الثابتة النصية (html/css/js/svg/json) قبل إرسال الترويسات."""
        path = self.translate_path(self.path)
        if os.path.isdir(path):
            return super().send_head()
        if (not path.lower().endswith(COMPRESSIBLE)
                or not _wants_gzip(self.headers.get("Accept-Encoding"))
                or self.command == "HEAD"):
            return super().send_head()
        try:
            with open(path, "rb") as f:
                raw = f.read()
        except OSError:
            return super().send_head()
        if len(raw) < COMPRESS_MIN:
            return super().send_head()

        body = _gzip_cached(path)
        if body is None:
            return super().send_head()
        ctype = self.guess_type(path)
        self.send_response(200)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Content-Encoding", "gzip")
        self.send_header("Vary", "Accept-Encoding")
        self.send_header("Last-Modified", self.date_time_string(os.stat(path).st_mtime))
        self.end_headers()
        import io
        return io.BytesIO(body)

    def _serve_html_file(self, relpath, base_href=None, code=200):
        """تقديم صفحة HTML من المستودع، مع حقن <base> عند تغيير المجلد."""
        path = os.path.join(ROOT, relpath)
        if not os.path.isfile(path):
            return self._send_bytes(
                ("<h1>EILAN DOLL</h1><p>missing page: %s</p>" % relpath).encode(),
                "text/html; charset=utf-8", 500)
        with open(path, "rb") as f:
            html = f.read().decode("utf-8", "replace")
        if base_href and "<base " not in html:
            tag = '<base href="%s">' % base_href
            html = html.replace("<head>", "<head>" + tag, 1) if "<head>" in html else tag + html
        self._send_bytes(html.encode("utf-8"), "text/html; charset=utf-8", code)

    def _app(self):
        self._serve_html_file(APP)

    def _brand(self):
        # الصفحة معدة للعرض من /brand/ وروابطها نسبية ⇒ نحقن <base>
        self._serve_html_file(BRAND_PAGE, base_href="/brand/")

    # ---------------------------------------------------------------- api
    def _api(self, route):
        name = route[len("/api/"):].strip("/")
        if not name or "/" in name or name.startswith("."):
            return self._send_bytes(b'{"error":"bad api path"}', "application/json", 404)
        script = os.path.join(API_DIR, name + ".js")
        if not os.path.isfile(script):
            return self._send_bytes(b'{"error":"no such function"}', "application/json", 404)

        length = int(self.headers.get("Content-Length") or 0)
        body = self.rfile.read(length) if length else b""

        payload = json.dumps({
            "method": self.command,
            "url": self.path,
            "headers": {k: v for k, v in self.headers.items()},
            "body": body.decode("utf-8", "replace"),
        }).encode()

        try:
            proc = subprocess.run(
                ["node", BRIDGE, name],
                input=payload, cwd=ROOT,
                capture_output=True, timeout=API_TIMEOUT,
            )
        except FileNotFoundError:
            return self._send_bytes(b'{"error":"node not available in preview"}',
                                    "application/json", 503)
        except subprocess.TimeoutExpired:
            return self._send_bytes(b'{"error":"api timeout in preview"}',
                                    "application/json", 504)

        try:
            out = json.loads(proc.stdout.decode("utf-8", "replace") or "{}")
        except ValueError:
            detail = (proc.stderr.decode("utf-8", "replace") or "")[-400:]
            return self._send_bytes(
                json.dumps({"error": "api bridge failed", "detail": detail}).encode(),
                "application/json", 500)

        status = int(out.get("status") or 200)
        text = (out.get("body") or "").encode("utf-8")
        extra = {k: v for k, v in (out.get("headers") or {}).items()
                 if k.lower() not in ("content-length", "transfer-encoding", "connection")}
        ctype = extra.pop("content-type", "application/json; charset=utf-8")
        return self._send_bytes(text, ctype, status, extra)

    # ---------------------------------------------------------------- routes
    def do_GET(self):
        route = urlparse(self.path).path
        if route in ("/", "/index.html"):
            return self._app()
        if route in ("/brand", "/brand/", "/brand/showcase.html"):
            return self._brand()
        if route == "/health":
            body = json.dumps({
                "ok": True,
                "app": "/" + APP,
                "brand": "/brand/",
                "api": sorted(f[:-3] for f in os.listdir(API_DIR) if f.endswith(".js"))
                if os.path.isdir(API_DIR) else [],
                "gzip": True,
                "root": ROOT,
            }).encode()
            return self._send_bytes(body, "application/json")
        if route.startswith("/api/"):
            return self._api(route)
        super().do_GET()

    def do_HEAD(self):
        route = urlparse(self.path).path
        if route in ("/", "/index.html", "/brand", "/brand/", "/brand/showcase.html"):
            return self.do_GET()
        if route == "/health":
            return self._send_bytes(b"", "application/json")
        super().do_HEAD()

    def do_POST(self):
        route = urlparse(self.path).path
        if route.startswith("/api/"):
            return self._api(route)
        # التطبيق يجرّب POST / كخطة بديلة للإرسال؛ في المعاينة نرفض بوضوح.
        return self._send_bytes(b'{"error":"POST not handled outside /api"}',
                                "application/json", 405)

    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        if self.path.split("?")[0].endswith((".html", ".svg", ".json", ".webmanifest", "/")) \
                or self.path.startswith("/api/"):
            self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def log_message(self, fmt, *args):
        sys.stderr.write("%s - %s\n" % (self.address_string(), fmt % args))


class Server(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    daemon_threads = True


if __name__ == "__main__":
    if not os.path.isdir(ROOT):
        raise SystemExit("repo root not found")
    with Server((HOST, PORT), Handler) as httpd:
        print(f"EILAN DOLL preview → http://{HOST}:{PORT}/  (app: /{APP}, brand: /brand/)", flush=True)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            pass
