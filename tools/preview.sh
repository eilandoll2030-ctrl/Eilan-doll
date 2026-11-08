#!/bin/sh
# تشغيل معاينة إيلان دول بشكل لا يسقط.
#
#   sh tools/preview.sh          # 0.0.0.0:8200
#   PORT=8080 sh tools/preview.sh
#
# إذا خرج السيرفر لأي سبب (خطأ، انقطاع، OOM) يُعاد تشغيله تلقائيًا.
# الهدف: المعاينة تبقى حيّة دون أن يطلب المالك «resume» كل مرة.
set -u
cd "$(dirname "$0")/.." || exit 1

PORT="${PORT:-8200}"
export PORT

while true; do
  echo "[preview] starting on 0.0.0.0:${PORT} at $(date -u '+%H:%M:%S UTC')"
  python3 tools/serve.py
  code=$?
  echo "[preview] server exited with code ${code}; restarting in 2s"
  sleep 2
done
