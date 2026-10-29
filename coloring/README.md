# EILAN DOLL — Coloring Book

Plain black-and-white coloring pages built from the six chibi characters,
collected into a print-ready A4 PDF you can flip through on an iPad or send
straight to a printer.

## The book

`book/Eilan-Doll-Coloring-Book.pdf` — **8 pages, A4 (8.27 × 11.69 in), 300 dpi**

| Page | Content |
|------|---------|
| 1 | Cover — Eilan Doll mark, title, all six characters |
| 2 | Yuji Itadori |
| 3 | Ryomen Sukuna |
| 4 | Satoru Gojo |
| 5 | Megumi Fushiguro |
| 6 | Nobara Kugisaki |
| 7 | Suguru Geto |
| 8 | Back cover |

Every page is pure black on white — no grey fills, no watermark, no logo — so
it prints cleanly on any home printer and colors well.

Each sheet carries only the large brush name arching over the character's head
(YUJI, SUKUNA, GOJO, MEGUMI, NOBARA, GETO) and nothing else behind the figure.
A plain name sits underneath, with clear space between it and the drawing.

All six sheets share one line style: the same dry-brush outlined lettering, the
same thin contour weight on the figure, and the same speck-cleanup pass
(`despeckle`, min area 45 px) so no page looks lighter or rougher than another.

The cover and back cover are text only — no planet mark.

## Also included

- `pages/` — each sheet as a standalone 2480 × 3508 PNG (print or share one at a time)
- `book/00_cover.png`, `book/07_back.png` — cover art as images
- `assets/` — the cleaned line art per character

## Printing

Send the PDF to any printer at **100 % / Actual size** on A4. Do not pick
"Fit to page", or the margins will shrink.

On iPad: open the PDF in Books / Files / GoodNotes and color it with the
pencil tool.

## Rebuilding

```bash
cd coloring
python3 -m venv .venv && .venv/bin/pip install -r requirements.txt
.venv/bin/python src/plain.py     # regenerates pages/ PNGs
.venv/bin/python src/book.py      # regenerates cover, back cover and the PDF
```

## Adding a character

1. Put the cleaned line-art PNG in `assets/`.
2. Add an entry to `CHARACTERS` in both `src/plain.py` and `src/book.py`.
3. Re-run the two commands above.
