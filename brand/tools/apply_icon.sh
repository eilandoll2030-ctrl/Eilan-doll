#!/bin/sh
# تطبيق الأيقونة الدائرية على الموقع.
#
#   sh brand/tools/apply_icon.sh
#
# ينسخ نسخ الأسهم (السابقة) إلى brand/logo-archive/ ثم يستبدل:
#   favicon-48.png  favicon-96.png  favicon-192.png
#   favicon-512.png apple-touch-icon.png
#   assets/logo/eilan-icon.svg
#
# السبب: طلب المالك «نفس الألوان نفس الطريقة بس دائري بدل المربع».
# نسخة المربع محفوظة في brand/logo-archive/ ليمكن الرجوع عنها.
set -eu
cd "$(dirname "$0")/../.." || exit 1

SRC=brand/site-icon
ARCH=brand/logo-archive
mkdir -p "$ARCH"

# 1) أرشفة القديم مرة واحدة فقط (لا نطمس الأرشفة لو أُعيد التشغيل)
for f in favicon-48.png favicon-96.png favicon-192.png favicon-512.png apple-touch-icon.png; do
  if [ -f "$f" ] && [ ! -f "$ARCH/$f" ]; then cp "$f" "$ARCH/$f"; fi
done
if [ -f assets/logo/eilan-icon.svg ] && [ ! -f "$ARCH/eilan-icon.svg" ]; then
  cp assets/logo/eilan-icon.svg "$ARCH/eilan-icon.svg"
fi

# 2) النسخ الجديد
cp "$SRC/png/icon-circle-48.png"  favicon-48.png
cp "$SRC/png/icon-circle-96.png"  favicon-96.png
cp "$SRC/png/icon-circle-192.png" favicon-192.png
cp "$SRC/png/icon-circle-512.png" favicon-512.png
cp "$SRC/png/icon-circle-180.png" apple-touch-icon.png
cp "$SRC/icon-circle-dark.svg"    assets/logo/eilan-icon.svg

# 3) تحقّق
echo "applied:"
for f in favicon-48.png favicon-96.png favicon-192.png favicon-512.png \
         apple-touch-icon.png assets/logo/eilan-icon.svg; do
  printf '  %-28s %s bytes\n' "$f" "$(stat -c%s "$f")"
done
echo "archived originals → $ARCH"
