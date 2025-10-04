#!/bin/bash
set -e

# Use environment variable if set, otherwise use .env file
if [ -z "$CONTENT_SUBMODULE_URL" ] && [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

# Default to HTTPS URL if not set
CONTENT_URL=${CONTENT_SUBMODULE_URL:-"https://github.com/yourusername/garden-content.git"}

echo "Setting submodule URL to: ${CONTENT_URL}"
git submodule set-url src/content "$CONTENT_URL"

echo "Initializing submodule..."
git submodule update --init --recursive

echo "Submodule initialized successfully!"