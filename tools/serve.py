#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
EILAN DOLL — سيرفر معاينة محلي (dev only)

يخدم جذر المستودع على 0.0.0.0 عشان يشتغل داخل بيئة المعاينة (E2B preview).
    python3 tools/serve.py            # المنفذ 8200
    PORT=8080 python3 tools/serve.py

- يبثّ على 0.0.0.0 (مطلوب لمعاينة المتصفح).
- يضيف CORS مفتوح و no-store للملفات النصية أثناء التطوير.
- صفحة الدخول: /brand/showcase.html  (حزمة الشعار + إعلان الافتتاح)
"""
import os
import sys
import http.server
import socketserver

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PORT = int(os.environ.get("PORT", "8200"))
HOST = os.environ.get("HOST", "0.0.0.0")

LANDING = "/brand/showcase.html"


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=ROOT, **kw)

    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        if self.path.endswith((".html", ".svg", ".json", ".webmanifest")):
            self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def log_message(self, fmt, *args):
        sys.stderr.write("%s - %s\n" % (self.address_string(), fmt % args))

    def do_GET(self):
        # دليل بسيط بدل قائمة الملفات: يقودك لصفحة الشعار
        if self.path in ("/", "/index-browse"):
            body = (f'<!doctype html><meta charset="utf-8">'
                    f'<meta http-equiv="refresh" content="0;url={LANDING}">'
                    f'<a href="{LANDING}">brand showcase</a>').encode()
            self.send_response(302)
            self.send_header("Location", LANDING)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        super().do_GET()


class Server(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    daemon_threads = True


if __name__ == "__main__":
    if not os.path.isdir(ROOT):
        raise SystemExit("repo root not found")
    with Server((HOST, PORT), Handler) as httpd:
        print(f"EILAN DOLL preview → http://{HOST}:{PORT}{LANDING}", flush=True)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            pass
