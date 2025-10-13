#!/usr/bin/env node
import { execSync } from 'child_process';

const url = process.env.CONTENT_SUBMODULE_URL || 'https://github.com/mlhoutel/obsidian';
console.log(`Setting submodule URL to: ${url}`);

// Sync submodule URLs
execSync(`git submodule sync`, { stdio: 'inherit' });
execSync(`git config submodule.database.url "${url}"`, { stdio: 'inherit' });

// Initialize or update submodule
execSync(`git submodule update --init --recursive`, { stdio: 'inherit' });

console.log('Submodule is ready!');
