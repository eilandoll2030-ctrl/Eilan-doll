#!/usr/bin/env python3
"""SPA static preview server for Eilan Doll (mirrors vercel.json routing & headers)."""

import http.server
import os
import socketserver
import urllib.parse

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
PORT = int(os.environ.get("PORT", "8080"))


class EilanPreviewHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        super().end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlsplit(self.path)
        clean_path = urllib.parse.unquote(parsed.path).lstrip("/")
        # Never expose gitignored private-codes or internal team/src folders over HTTP
        if clean_path.startswith(("experiences/private-codes", ".git")):
            self.send_error(403, "Forbidden")
            return
        disk_path = os.path.join(ROOT, clean_path)
        if not clean_path or not os.path.isfile(disk_path):
            self.path = "/index.html" + (f"?{parsed.query}" if parsed.query else "")
        return super().do_GET()


class ReusableTCPServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    allow_reuse_address = True


if __name__ == "__main__":
    with ReusableTCPServer(("0.0.0.0", PORT), EilanPreviewHandler) as httpd:
        print(f"Eilan Doll live preview listening on http://0.0.0.0:{PORT}", flush=True)
        httpd.serve_forever()
