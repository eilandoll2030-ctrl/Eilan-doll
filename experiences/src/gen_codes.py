#!/usr/bin/env python3
"""Generate cryptographic Salla instant-delivery activation codes for Eilan Experiences.

Plaintext codes are written ONLY to `experiences/private-codes/` (gitignored)
for direct upload into Salla -> Digital Product (Codes).
Only 24-char SHA-256 hashes (`SHA-256('eilan-arc-v1:' + normalized_code)[:24]`)
are saved to `experiences/src/code_hashes.json` for client-side verification.
"""

import hashlib
import json
import os
import secrets

ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ"  # No 0/O/1/I ambiguity on mobile/iPad
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PRIVATE_DIR = os.path.join(ROOT, "private-codes")
HASH_FILE = os.path.join(ROOT, "src", "code_hashes.json")

PRODUCTS = [
    ("cube", "CUB1", 150, "مفاجأة إيلان التفاعلية — Interactive Surprise (25 SAR)"),
    ("when", "OWHN", 150, "رسائل «افتحها لمّا…» — Open When Letters (29 SAR)"),
    ("bundle", "EXPB", 80, "باقة تجارب إيلان التفاعلية — Eilan Experiences Pass"),
]


def make_code(prefix: str) -> tuple[str, str]:
    g1 = "".join(secrets.choice(ALPHABET) for _ in range(4))
    g2 = "".join(secrets.choice(ALPHABET) for _ in range(4))
    g3 = "".join(secrets.choice(ALPHABET) for _ in range(4))
    formatted = f"{prefix}-{g1}-{g2}-{g3}"
    body = f"{prefix}{g1}{g2}{g3}"
    digest = hashlib.sha256(f"eilan-arc-v1:{body}".encode("utf-8")).hexdigest()[:24]
    return formatted, digest


def main() -> None:
    os.makedirs(PRIVATE_DIR, exist_ok=True)
    hashes: dict[str, list[str]] = {}
    if os.path.exists(HASH_FILE):
        with open(HASH_FILE, "r", encoding="utf-8") as fh:
            hashes = json.load(fh)

    for key, prefix, count, label in PRODUCTS:
        code_path = os.path.join(PRIVATE_DIR, f"salla-{key}-codes.txt")
        if key in hashes and len(hashes[key]) > 0:
            print(f"[keep] {key}: {len(hashes[key])} public hashes preserved")
            continue
        codes_plain = []
        codes_hash = []
        seen = set()
        while len(codes_plain) < count:
            fmt, hx = make_code(prefix)
            if fmt in seen or hx in seen:
                continue
            seen.add(fmt)
            seen.add(hx)
            codes_plain.append(fmt)
            codes_hash.append(hx)
        hashes[key] = codes_hash
        with open(code_path, "w", encoding="utf-8") as fh:
            fh.write(f"# {label}\n")
            fh.write("# ارفع الأكواد السفلية في سلة -> منتج رقمي (أكواد) — كل سطر كود لعميل واحد:\n\n")
            fh.write("\n".join(codes_plain) + "\n")
        print(f"[gen] {key}: {len(codes_hash)} codes -> {code_path}")

    with open(HASH_FILE, "w", encoding="utf-8") as fh:
        json.dump(hashes, fh, indent=2)
    print(f"[ok] wrote public hashes -> {HASH_FILE}")


if __name__ == "__main__":
    main()
