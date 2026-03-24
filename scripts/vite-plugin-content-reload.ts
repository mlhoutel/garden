import { execSync } from 'child_process';
import path from 'path';
import type { Plugin, ViteDevServer } from 'vite';

const DATABASE_DIR = path.resolve('database');
const DEBOUNCE_MS = 300;

export function contentReload(): Plugin {
	let server: ViteDevServer;
	let timer: ReturnType<typeof setTimeout> | null = null;
	let rebuilding = false;
	let pendingRestart = false;

	function rebuild(changedFile: string, needsRestart: boolean) {
		if (rebuilding) return;
		rebuilding = true;

		const relative = path.relative(DATABASE_DIR, changedFile);
		console.log(`\n\x1b[33m⚡ Content changed:\x1b[0m ${relative}`);
		console.log('\x1b[33m   Rebuilding content pipeline...\x1b[0m');

		const start = Date.now();

		try {
			execSync('npm run content:build', { stdio: 'pipe', cwd: path.resolve('.') });
			execSync('npm run content:manifest', { stdio: 'pipe', cwd: path.resolve('.') });
			execSync('npm run content:searchindex', { stdio: 'pipe', cwd: path.resolve('.') });

			const elapsed = Date.now() - start;
			console.log(`\x1b[32m   ✓ Rebuilt in ${elapsed}ms\x1b[0m`);

			if (needsRestart) {
				// New or deleted files require a server restart because
				// import.meta.glob() is evaluated at transform time and its
				// file map is frozen for the lifetime of the dev server.
				// A browser reload alone won't pick up new glob entries.
				console.log('\x1b[33m   ↻ Restarting server (new/deleted file detected)...\x1b[0m\n');
				server.restart();
			} else {
				// For content edits, invalidate modules and reload the browser
				const graph = server.moduleGraph;
				for (const [url, mod] of graph.urlToModuleMap) {
					if (
						url.includes('src/content/') ||
						url.includes('src/meta/') ||
						url.includes('manifest.json') ||
						url.includes('search-index.json')
					) {
						graph.invalidateModule(mod);
					}
				}

				server.ws.send({ type: 'full-reload' });
				console.log('\x1b[32m   ✓ Browser reloaded\x1b[0m\n');
			}
		} catch (err) {
			console.error('\x1b[31m   ✗ Rebuild failed:\x1b[0m', (err as Error).message);
		} finally {
			rebuilding = false;
		}
	}

	return {
		name: 'content-reload',
		apply: 'serve', // Only active in dev mode

		configureServer(srv) {
			server = srv;

			// Watch the database submodule directory for markdown changes
			server.watcher.add(DATABASE_DIR);

			server.watcher.on('all', (event, filePath) => {
				// Only react to markdown files in the database directory
				if (!filePath.startsWith(DATABASE_DIR)) return;
				if (!filePath.endsWith('.md')) return;
				if (event !== 'change' && event !== 'add' && event !== 'unlink') return;

				// Track whether a restart is needed (new or deleted files)
				if (event === 'add' || event === 'unlink') {
					pendingRestart = true;
				}

				// Debounce: batch rapid changes (e.g., git operations, bulk saves)
				if (timer) clearTimeout(timer);
				timer = setTimeout(() => {
					timer = null;
					const needsRestart = pendingRestart;
					pendingRestart = false;
					rebuild(filePath, needsRestart);
				}, DEBOUNCE_MS);
			});

			console.log('\x1b[36m📡 Content reload:\x1b[0m watching database/ for changes\n');
		}
	};
}
