#!/usr/bin/env node
import { execSync } from 'child_process';

/**
 * Initializes and syncs a Git submodule, setting its remote URL dynamically.
 *
 * Usage:
 *   CONTENT_SUBMODULE_URL=https://github.com/user/repo.git ts-node scripts/setup-submodule.ts
 */

// Define the environment variable type for clarity
const url: string = process.env.CONTENT_SUBMODULE_URL ?? 'https://github.com/mlhoutel/obsidian';

console.log(`🔗 Setting submodule URL to: ${url}`);

try {
	// Sync submodule URLs
	execSync('git submodule sync', { stdio: 'inherit' });

	// Update the submodule config URL
	execSync(`git config submodule.database.url "${url}"`, { stdio: 'inherit' });

	// Initialize or update submodule
	execSync('git submodule update --init --recursive', { stdio: 'inherit' });

	console.log('✅ Submodule is ready!');
} catch (error) {
	console.error('❌ Failed to initialize submodule.');
	if (error instanceof Error) {
		console.error(error.message);
	}
	process.exit(1);
}
