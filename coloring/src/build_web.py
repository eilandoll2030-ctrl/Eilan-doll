"""build_web.py - package the coloring pages into a self-contained web book.

Every page is inlined as a data URI, so the resulting HTML keeps working when
it is saved, copied or embedded on another site - the canvas never becomes
tainted and the colouring tools keep working offline.
"""
import base64
import io
import json
import os

from PIL import Image

W, H = 1240, 1754          # working resolution (A4 at 150 dpi)
QUALITY = 80

PAGES = [
    ('00_cover',  'book/00_cover.png',  'COVER', 'الغلاف', False),
    ('01_YUJI',   'pages/EilanDoll_01_YUJI_coloring-page.png',   'YUJI',   'يوجي إيتادوري', True),
    ('02_SUKUNA', 'pages/EilanDoll_02_SUKUNA_coloring-page.png', 'SUKUNA', 'ريومين سوكونا', True),
    ('03_GOJO',   'pages/EilanDoll_03_GOJO_coloring-page.png',   'GOJO',   'ساتورو غوجو', True),
    ('04_MEGUMI', 'pages/EilanDoll_04_MEGUMI_coloring-page.png', 'MEGUMI', 'ميغومي فوشيغورو', True),
    ('05_NOBARA', 'pages/EilanDoll_05_NOBARA_coloring-page.png', 'NOBARA', 'نوبارا كوغيساكي', True),
    ('06_GETO',   'pages/EilanDoll_06_GETO_coloring-page.png',   'GETO',   'سوغورو غيتو', True),
    ('07_back',   'book/07_back.png',   'BACK', 'الغلاف الخلفي', False),
]


def data_uri(path):
    im = Image.open(path).convert('L').resize((W, H), Image.LANCZOS)
    buf = io.BytesIO()
    im.save(buf, 'WEBP', quality=QUALITY, method=6)
    b64 = base64.b64encode(buf.getvalue()).decode()
    return 'data:image/webp;base64,' + b64, len(buf.getvalue())


def main():
    here = os.path.dirname(os.path.abspath(__file__))
    os.chdir(os.path.join(here, '..'))

    pages, total = [], 0
    for slug, path, label, name_ar, colorable in PAGES:
        uri, n = data_uri(path)
        total += n
        pages.append({'src': uri, 'slug': slug, 'label': label,
                      'name': name_ar, 'colorable': colorable})
        print(f'  {slug:10s} {n // 1024:4d} KB')

    template = open('web/app_template.html', encoding='utf-8').read()
    html = (template
            .replace('__PAGES_JSON__', json.dumps(pages, ensure_ascii=False))
            .replace('__W__', str(W))
            .replace('__H__', str(H)))

    out = os.path.join('..', '..', 'coloring-book.html')
    out = os.path.normpath(os.path.join(here, '..', '..', 'coloring-book.html'))
    open(out, 'w', encoding='utf-8').write(html)
    print(f'\nimages {total // 1024} KB -> {out} ({os.path.getsize(out) // 1024} KB)')


if __name__ == '__main__':
    main()
