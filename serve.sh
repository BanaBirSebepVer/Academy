#!/usr/bin/env bash
# ==============================================================================
# Academy Local Development Server
# Automatically detects and applies local dev overrides if present.
# ==============================================================================
set -e

BASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$BASE_DIR"

CONFIGS="_config.yml"

if [ -f "_config-local.yml" ]; then
  CONFIGS="${CONFIGS},_config-local.yml"
  echo "[INFO] Using local overrides: _config-local.yml"
fi

echo "[INFO] Bundling JavaScript modules..."
python3 scripts/bundle_js.py

echo "[INFO] Starting Jekyll with configs: ${CONFIGS}"
bundle exec jekyll serve --config "${CONFIGS}" --livereload "$@"
