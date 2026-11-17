#!/usr/bin/env python3
"""Encrypted package delivery for the paid card games.

Each game has two packages (30 SAR each):
  p = print package : Print PDF + Show PDF  (+ the online game)
  s = show package  : Show PDF + Animated PPTX (+ the online game)

How it works (nothing secret is written into the repo):
  * every product file is encrypted with its own random AES-GCM key -> games/dl/<id>.bin
  * each package has a random package key; its manifest (file ids, names, file keys)
    is encrypted with that key and stored in index.html (PKG_M)
  * each customer code wraps the package key with PBKDF2(code) -> stored in index.html (PKG_W),
    looked up by sha256('eilan-pkg-v1:'+code)
Keys and codes live only in PRIVATE (outside the repo). Re-running reuses them.

Usage: python3 games/print-src/build_pkg.py [game ...]
"""
import base64, csv, hashlib, json, os, re, secrets, sys
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives import hashes

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
PRIVATE = '/home/claude/private'
PROD = os.path.join(PRIVATE, 'products')
KEYS = os.path.join(PRIVATE, 'pkg-keys.json')
DL = os.path.join(ROOT, 'games', 'dl')
ITER = 150000
NCODES = 100
ALPHA = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

GAMES = {  # game key -> (code prefix, file stem, Arabic name)
    'jawib': ('JWB', 'JawibGhalat', 'جاوب غلط'),
    'lawkunt': ('LWK', 'LawKunt', 'لو كنت'),
    'qulha': ('QLH', 'QulhaBilahjatak', 'قولها بلهجتك'),
    'couples': ('CPL', 'BeniWbenak', 'بيني وبينك'),
}
FILES = {  # file role -> (suffix, download name label)
    'print': ('Print-AR.pdf', 'ورقة الطباعة والقص'),
    'show': ('Show-AR.pdf', 'العرض PDF'),
    'anim': ('Animated-AR.pptx', 'العرض المتحرك'),
}
PKGS = {'p': ['print', 'show'], 's': ['show', 'anim']}
PKG_NAME = {'p': 'باقة الطباعة', 's': 'باقة العرض'}

b64 = lambda b: base64.b64encode(b).decode()


def enc(key, data):
    iv = secrets.token_bytes(12)
    return iv + AESGCM(key).encrypt(iv, data, None)


def code_id(body):
    return hashlib.sha256(('eilan-pkg-v1:' + body).encode()).hexdigest()[:24]


def kek(body, game):
    return PBKDF2HMAC(hashes.SHA256(), 32, ('eilan-pkg-salt:' + game).encode(), ITER).derive(body.encode())


def new_code(pre, t):
    s = ''.join(secrets.choice(ALPHA) for _ in range(12))
    return f'{pre}{t.upper()}-{s[:4]}-{s[4:8]}-{s[8:]}'


def main(games):
    ks = json.load(open(KEYS)) if os.path.exists(KEYS) else {}
    os.makedirs(DL, exist_ok=True)
    W, M = {}, {}
    for g in GAMES:
        pre, stem, ar = GAMES[g]
        st = ks.setdefault(g, {})
        rebuild = g in games
        # file keys + encrypted blobs
        fk = st.setdefault('files', {})
        for role, (suf, _) in FILES.items():
            src = os.path.join(PROD, g, f'Eilan-{stem}-{suf}')
            ent = fk.get(role)
            if ent is None:
                ent = fk[role] = {'id': secrets.token_hex(8), 'key': b64(secrets.token_bytes(32))}
            out = os.path.join(DL, ent['id'] + '.bin')
            if rebuild or not os.path.exists(out):
                data = open(src, 'rb').read()
                open(out, 'wb').write(enc(base64.b64decode(ent['key']), data))
                print(f'  {g}/{role}: {len(data)/1e6:.1f} MB -> games/dl/{ent["id"]}.bin')
        W[g], M[g] = {}, {}
        for t, roles in PKGS.items():
            pk = st.setdefault('pkg_' + t, b64(secrets.token_bytes(32)))
            pkb = base64.b64decode(pk)
            man = [[fk[r]['id'], f'Eilan-{stem}-{FILES[r][0]}', fk[r]['key'], r] for r in roles]
            M[g][t] = b64(enc(pkb, json.dumps(man).encode()))
            codes = st.setdefault('codes_' + t, [])
            while len(codes) < NCODES:
                codes.append(new_code(pre, t))
            wraps = st.setdefault('wrap_' + t, {})
            for c in codes:
                body = re.sub('[^A-Z0-9]', '', c)
                cid = code_id(body)
                if cid not in wraps:
                    wraps[cid] = b64(enc(kek(body, g), pkb))
                W[g][cid] = t + ':' + wraps[cid]
            with open(os.path.join(PRIVATE, f'{g}-{t}-codes.csv'), 'w', newline='', encoding='utf-8-sig') as f:
                w = csv.writer(f)
                w.writerow(['رقم', f'كود {PKG_NAME[t]} — {ar}'])
                for i, c in enumerate(codes, 1):
                    w.writerow([i, c])
    json.dump(ks, open(KEYS, 'w'), indent=0)
    # inject into index.html
    idx = os.path.join(ROOT, 'index.html')
    html = open(idx, encoding='utf-8').read()
    line = 'const PKG_W=' + json.dumps(W, separators=(',', ':')) + ',PKG_M=' + json.dumps(M, separators=(',', ':')) + ';'
    html, n = re.subn(r'const PKG_W=.*?;\n', lambda m: line + '\n', html, count=1)
    if not n:
        raise SystemExit('PKG_W marker not found in index.html')
    open(idx, 'w', encoding='utf-8').write(html)
    print('index.html updated:', len(line) // 1024, 'KB of package data')


if __name__ == '__main__':
    main(sys.argv[1:] or list(GAMES))
