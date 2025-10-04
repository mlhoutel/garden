#!/bin/bash
set -e

# Load .env locally if it exists
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

# Ensure CONTENT_SUBMODULE_URL is set
if [ -z "$CONTENT_SUBMODULE_URL" ]; then
  echo "ERROR: CONTENT_SUBMODULE_URL is not set"
  exit 1
fi

# Set submodule URL
git submodule set-url content "$CONTENT_SUBMODULE_URL"

# Run git submodule command with arguments
git submodule "$@"