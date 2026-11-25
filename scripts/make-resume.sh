#!/bin/sh
# Regenerates public/Neha-Sharma-Resume.pdf from scripts/resume.html.
# Requires Google Chrome for Desktop on macOS.
set -eu

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

if [ ! -x "$CHROME" ]; then
  echo "Google Chrome not found at $CHROME" >&2
  exit 1
fi

"$CHROME" \
  --headless \
  --disable-gpu \
  --no-pdf-header-footer \
  --no-sandbox \
  --print-to-pdf="$ROOT/public/Neha-Sharma-Resume.pdf" \
  "file://$ROOT/scripts/resume.html" 2>/dev/null

echo "Wrote public/Neha-Sharma-Resume.pdf"
