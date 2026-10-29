"""pdf_links.py - make every page of the PDF open the interactive book.

A download of the PDF still leads back to the colouring experience: each page
carries an invisible link in its bottom margin that opens the web book.
Nothing new is drawn on the page, so the artwork stays exactly as approved.
"""
import os
import sys

import pymupdf

BOOK_URL = 'https://eilan-doll.netlify.app/coloring-book.html'
PDF = 'book/Eilan-Doll-Coloring-Book.pdf'
STRIP = 46          # how tall the clickable footer strip is, in points


def main():
    here = os.path.dirname(os.path.abspath(__file__))
    os.chdir(os.path.join(here, '..'))
    if not os.path.exists(PDF):
        sys.exit(f'missing {PDF}')

    doc = pymupdf.open(PDF)
    added = 0
    for page in doc:
        r = page.rect
        hot = pymupdf.Rect(0, r.y1 - STRIP, r.x1, r.y1)
        page.insert_link({'kind': pymupdf.LINK_URI, 'from': hot, 'uri': BOOK_URL})
        added += 1

    doc.set_metadata({
        **doc.metadata,
        'title': 'EILAN DOLL — Coloring Book',
        'author': 'EILAN DOLL',
        'subject': 'دفتر تلوين تفاعلي — يفتح للتلوين أونلاين',
        'keywords': 'coloring book, EILAN DOLL, Jujutsu Kaisen, colouring, تلوين',
    })
    doc.saveIncr()
    doc.close()
    print(f'linked {added} pages -> {BOOK_URL}')


if __name__ == '__main__':
    main()
