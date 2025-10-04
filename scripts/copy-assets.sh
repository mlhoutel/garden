#!/bin/bash
set -e

# Ensure the static/assets folder exists
mkdir -p static/assets

# Remove everything except .gitkeep
find static/assets -mindepth 1 ! -name '.gitkeep' -delete

# Copy all submodule assets
cp -R src/content/assets/* static/assets/