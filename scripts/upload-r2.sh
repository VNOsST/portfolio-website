#!/usr/bin/env bash
set -euo pipefail

# Upload images to Cloudflare R2 using the Wrangler CLI
# Usage:
#   chmod +x scripts/upload-r2.sh
#   ./scripts/upload-r2.sh <bucket-name> <local-file> <r2-path>
#
# Example:
#   ./scripts/upload-r2.sh my-portfolio-images ./assets/cinecloud-hero.png projects/cinecloud/hero.png

BUCKET="${1:-}"
LOCAL_FILE="${2:-}"
R2_PATH="${3:-}"

if [[ -z "$BUCKET" || -z "$LOCAL_FILE" || -z "$R2_PATH" ]]; then
  echo "Usage: $0 <bucket-name> <local-file> <r2-path>"
  echo ""
  echo "Examples:"
  echo "  $0 my-bucket ./assets/hero.png projects/cinecloud/hero.png"
  echo "  $0 my-bucket ./assets/screenshot.png experiences/tuturuuu/screenshot-1.png"
  exit 1
fi

if [[ ! -f "$LOCAL_FILE" ]]; then
  echo "Error: local file not found: $LOCAL_FILE"
  exit 1
fi

echo "Uploading '$LOCAL_FILE' → r2://$BUCKET/$R2_PATH ..."
wrangler r2 object put "$BUCKET/$R2_PATH" --file "$LOCAL_FILE"
echo "Done."
