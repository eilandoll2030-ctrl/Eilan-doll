"""Vertical 1080x1920 version: the 16:9 film in the middle, client logo/title on top, line + URL pill below.
usage: python3 vertical.py <film.mp4> <out.mp4> <title> <line> <url> [logo.png] [bg_hex] [accent_hex]"""
import sys, subprocess
from PIL import Image, ImageDraw, ImageFont, ImageFilter
film, out, title, line, url = sys.argv[1:6]
logo = sys.argv[6] if len(sys.argv) > 6 and sys.argv[6] != '-' else None
bgc = sys.argv[7] if len(sys.argv) > 7 else '#07080C'
acc = sys.argv[8] if len(sys.argv) > 8 else '#1E44C8'
h2 = lambda h: tuple(int(h.lstrip('#')[i:i+2], 16) for i in (0, 2, 4))
W, H = 1080, 1920
bg = Image.new('RGB', (W, H), h2(bgc))
glow = Image.new('RGB', (W, H), h2(bgc)); g = ImageDraw.Draw(glow)
g.ellipse((-300, -200, 700, 700), fill=h2(acc)); g.ellipse((500, 1300, 1400, 2200), fill=h2(acc))
bg = Image.blend(bg, glow.filter(ImageFilter.GaussianBlur(240)), 0.45)
d = ImageDraw.Draw(bg)
B = '/usr/share/fonts/opentype/inter/InterDisplay-Bold.otf'; M = '/usr/share/fonts/opentype/inter/Inter-Medium.otf'
def ct(y, t, f, fill):
    w = d.textlength(t, font=f); d.text(((W - w) / 2, y), t, font=f, fill=fill)
if logo:
    im = Image.open(logo).convert('RGBA'); im.thumbnail((700, 300)); bg.paste(im, ((W - im.width) // 2, 470 - im.height), im)
else:
    ct(330, title, ImageFont.truetype(B, 84), (240, 244, 250))
ct(1380, line, ImageFont.truetype(B, 60), (240, 244, 250))
fm = ImageFont.truetype(M, 38); w = d.textlength(url, font=fm); x0 = (W - w) / 2 - 44
d.rounded_rectangle((x0, 1500, x0 + w + 88, 1590), radius=50, fill=h2(acc)); d.text(((W - w) / 2, 1522), url, font=fm, fill=(255, 255, 255))
bg.save('/tmp/vbg.png')
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-loop', '1', '-i', '/tmp/vbg.png', '-i', film, '-filter_complex',
  '[1:v]scale=1040:-2:flags=lanczos[f];[0:v][f]overlay=20:(H-h)/2-30:shortest=1,format=yuv420p', '-map', '1:a',
  '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '18', '-r', '30', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', out], check=True)
