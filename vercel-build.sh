#!/bin/bash
set -e


echo "Setting up SSH for submodule access..."
mkdir -p ~/.ssh
echo "$GIT_SSH_PRIVATE_KEY" > ~/.ssh/id_ed25519
chmod 600 ~/.ssh/id_ed25519
ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts

echo "Initializing submodules..."
git submodule update --init --recursive --depth 1

echo "Running build..."
npm run build