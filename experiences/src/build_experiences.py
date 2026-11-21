#!/usr/bin/env python3
"""Build EILAN EXPERIENCES module with SHA-256 activation hashes and sync into index.html."""

import json
import os
import re
import subprocess
import tempfile

SRC_DIR = os.path.dirname(os.path.abspath(__file__))
REPO_ROOT = os.path.dirname(os.path.dirname(SRC_DIR))
TPL_PATH = os.path.join(SRC_DIR, "experiences_tpl.html")
HASH_PATH = os.path.join(SRC_DIR, "code_hashes.json")
OUT_MOD_PATH = os.path.join(SRC_DIR, "experiences.html")
INDEX_PATH = os.path.join(REPO_ROOT, "index.html")


def check_js_blocks(html_text: str, label: str) -> None:
    scripts = re.findall(r"<script([^>]*)>([\s\S]*?)</script>", html_text)
    js_count = 0
    for idx, (attrs, code) in enumerate(scripts, 1):
        if "application/ld+json" in attrs:
            json.loads(code)
            continue
        if "src=" in attrs and not code.strip():
            continue
        js_count += 1
        with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False, encoding="utf-8") as tf:
            tf.write(code)
            tmp_name = tf.name
        try:
            res = subprocess.run(["node", "--check", tmp_name], capture_output=True, text=True, check=False)
            if res.returncode != 0:
                raise RuntimeError(f"JS syntax error in {label} script #{idx}:\n{res.stderr}")
        finally:
            os.remove(tmp_name)
    print(f"[ok] {label}: {js_count} JS <script> block(s) passed node --check")


def main() -> None:
    with open(HASH_PATH, "r", encoding="utf-8") as fh:
        hashes = json.load(fh)
    with open(TPL_PATH, "r", encoding="utf-8") as fh:
        tpl = fh.read()

    codes_json = json.dumps(hashes, separators=(",", ":"))
    built = re.sub(
        r"/\*XPR_CODES_JSON\*/[\s\S]*?/\*END_XPR_CODES_JSON\*/",
        lambda _: codes_json,
        tpl,
        count=1,
    )
    check_js_blocks(built, "experiences.html")

    with open(OUT_MOD_PATH, "w", encoding="utf-8") as fh:
        fh.write(built)

    with open(INDEX_PATH, "r", encoding="utf-8") as fh:
        index_html = fh.read()

    block_re = re.compile(r"<!-- EILAN EXPERIENCES[\s\S]*?<!-- /EILAN EXPERIENCES -->\n?")
    if block_re.search(index_html):
        new_index = block_re.sub(lambda _: built.strip() + "\n", index_html, count=1)
    else:
        anchor = "<!-- /EILAN DRAWN -->\n"
        if anchor not in index_html:
            raise RuntimeError("Could not find <!-- /EILAN DRAWN --> anchor in index.html")
        new_index = index_html.replace(anchor, anchor + built.strip() + "\n", 1)

    check_js_blocks(new_index, "index.html")
    with open(INDEX_PATH, "w", encoding="utf-8") as fh:
        fh.write(new_index)
    print("[ok] synced EILAN EXPERIENCES into index.html")


if __name__ == "__main__":
    main()
