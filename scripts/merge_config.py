#!/usr/bin/env python3
"""
Academy Config Merger
Deep-merges engine configuration (_config_engine.yml) with user configuration (_config.yml)
and optional local development overrides (_config-local.yml).
Used during GitHub Actions build and local preparation.
"""

import os
import sys
import yaml

def deep_merge(base, override):
    """
    Recursively merge dictionary 'override' into 'base'.
    Non-dictionary values in 'override' replace those in 'base'.
    """
    result = dict(base)
    for k, v in override.items():
        if k in result and isinstance(result[k], dict) and isinstance(v, dict):
            result[k] = deep_merge(result[k], v)
        else:
            result[k] = v
    return result

def main():
    root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    engine_file = os.path.join(root_dir, "_config_engine.yml")
    user_file = os.path.join(root_dir, "_config.yml")

    if not os.path.exists(engine_file):
        print(f"[ERROR] Engine config not found at: {engine_file}", file=sys.stderr)
        sys.exit(1)

    with open(engine_file, "r", encoding="utf-8") as f:
        merged = yaml.safe_load(f) or {}

    if os.path.exists(user_file):
        with open(user_file, "r", encoding="utf-8") as f:
            user_cfg = yaml.safe_load(f) or {}
        merged = deep_merge(merged, user_cfg)
        print(f"[INFO] Merged user config from: {user_file}")
    else:
        print(f"[WARN] User config {user_file} not found; using engine defaults only.")

    # Target output file defaults to _config.yml (in-place for build runners)
    target_file = sys.argv[1] if len(sys.argv) > 1 else user_file

    with open(target_file, "w", encoding="utf-8") as f:
        yaml.dump(merged, f, allow_unicode=True, sort_keys=False)

    print(f"[SUCCESS] Wrote merged configuration to: {target_file}")

if __name__ == "__main__":
    main()
