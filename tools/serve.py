#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
EILAN DOLL — سيرفر معاينة محلي (dev only)

    python3 tools/serve.py                 # 0.0.0.0:8200
    PORT=8080 python3 tools/serve.py

مصمّم لبيئة المعاينة (E2B preview proxy):
- يبثّ على 0.0.0.0 (مطلوب).
- HTTP/1.1 مع Content-Length ⇒ keep-alive يريح البروكسي.
- `/` ترجّع صفحة الشعار مباشرة (200) — لا تحويل، عشان أي فحص أو iframe يلاقي محتوى.
- `/health` ترجّع 200 JSON — لفحص الجاهزية.
- لا ترسل X-Frame-Options ⇒ الصفحة تُعرض داخل iframe.
- CORS مفتوح + no-store للملفات النصية.
"""
import os
import sys
import json
import http.server
import socketserver

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PORT = int(os.environ.get("PORT", "8200"))
HOST = os.environ.get("HOST", "0.0.0.0")
LANDING = "brand/showcase.html"
PROTOCOL = "HTTP/1.1"


class Handler(http.server.SimpleHTTPRequestHandler):
    protocol_version = PROTOCOL

    def __init__(self, *a, **kw):
        super().__init__(*a, directory=ROOT, **kw)

    # ---------------------------------------------------------------- helpers
    def _send_bytes(self, body, ctype, code=200, extra=None):
        self.send_response(code)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(body)))
        for k, v in (extra or {}).items():
            self.send_header(k, v)
        self.end_headers()
        if self.command != "HEAD":
            self.wfile.write(body)

    def _landing(self):
        path = os.path.join(ROOT, LANDING)
        if not os.path.isfile(path):
            return self._send_bytes(
                b"<h1>EILAN DOLL</h1><p>landing page missing: " + LANDING.encode() + b"</p>",
                "text/html; charset=utf-8", 500)
        with open(path, "rb") as f:
            html = f.read().decode("utf-8")
        # الصفحة معدة للعرض من /brand/ — عند تقديمها من الجذر نحقن <base>
        # وإلا تُحسب الروابط النسبية من / وتنكسر كل الصور.
        base = f'<base href="/{os.path.dirname(LANDING)}/">'
        if "<base " not in html:
            if "<head>" in html:
                html = html.replace("<head>", "<head>" + base, 1)
            else:
                html = base + html
        self._send_bytes(html.encode("utf-8"), "text/html; charset=utf-8")

    # ---------------------------------------------------------------- routes
    def do_GET(self):
        route = self.path.split("?")[0]
        if route in ("/", "/index.html", "/brand", "/brand/"):
            return self._landing()
        if route == "/health":
            body = json.dumps({"ok": True, "root": ROOT, "landing": "/" + LANDING}).encode()
            return self._send_bytes(body, "application/json")
        super().do_GET()

    def do_HEAD(self):
        route = self.path.split("?")[0]
        if route in ("/", "/index.html", "/brand", "/brand/"):
            return self._landing()
        if route == "/health":
            return self._send_bytes(b"", "application/json")
        super().do_HEAD()

    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        if self.path.endswith((".html", ".svg", ".json", ".webmanifest", "/")):
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
        print(f"EILAN DOLL preview → http://{HOST}:{PORT}/  (landing: /{LANDING})", flush=True)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            pass
