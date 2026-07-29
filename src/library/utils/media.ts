// Base URL of the garden-media Cloudflare Worker (see worker/ at the repo root).
// The URL is not a secret: every endpoint requires a Bearer token.
// Override with VITE_MEDIA_API=http://localhost:8787 to develop against a local worker.
export const MEDIA_API =
	import.meta.env.VITE_MEDIA_API ?? 'https://garden-media.mlhoutel.workers.dev';

export const MEDIA_TOKEN_KEY = 'garden-media-token';
export const MEDIA_CACHE_KEY = 'garden-media-cache';

/** Canonical form of a URL for duplicate detection: host (no www) + path (no trailing /) + query. */
export function normalizeUrl(raw: string): string {
	try {
		const u = new URL(raw.trim());
		return (
			u.hostname.toLowerCase().replace(/^www\./, '') + u.pathname.replace(/\/+$/, '') + u.search
		);
	} catch {
		return raw
			.trim()
			.toLowerCase()
			.replace(/^https?:\/\//, '')
			.replace(/^www\./, '')
			.replace(/\/+$/, '');
	}
}

/**
 * Pack variable-width items into rows of a fixed capacity, first-fit with
 * look-ahead: keeps the incoming (importance) order roughly intact while
 * pulling later, smaller items forward to fill the gap at a row's end.
 */
export function packRows<T>(
	items: T[],
	capacity: number,
	widthOf: (item: T) => number,
	gap = 4
): T[][] {
	const remaining = [...items];
	const rows: T[][] = [];
	while (remaining.length > 0) {
		const row: T[] = [];
		let used = 0;
		let i = 0;
		while (i < remaining.length) {
			const width = widthOf(remaining[i]);
			if (row.length === 0 || used + gap + width <= capacity) {
				used += (row.length === 0 ? 0 : gap) + width;
				row.push(remaining[i]);
				remaining.splice(i, 1);
			} else {
				i++;
			}
		}
		rows.push(row);
	}
	return rows;
}

/** Non-secret token fingerprint (djb2) so the cache invalidates when the token changes. */
function tokenFingerprint(token: string): string {
	let h = 5381;
	for (let i = 0; i < token.length; i++) h = ((h << 5) + h + token.charCodeAt(i)) >>> 0;
	return h.toString(16);
}

interface MediaCache {
	v: number;
	entries: unknown[];
	role: 'admin' | 'reader';
	ts: number;
	tok: string;
}

export function readMediaCache(token: string): MediaCache | null {
	try {
		const cache = JSON.parse(localStorage.getItem(MEDIA_CACHE_KEY) ?? '') as MediaCache;
		if (cache?.v !== 1 || cache.tok !== tokenFingerprint(token) || !Array.isArray(cache.entries)) {
			return null;
		}
		return cache;
	} catch {
		return null;
	}
}

export function writeMediaCache(entries: unknown[], role: 'admin' | 'reader', token: string): void {
	try {
		localStorage.setItem(
			MEDIA_CACHE_KEY,
			JSON.stringify({ v: 1, entries, role, ts: Date.now(), tok: tokenFingerprint(token) })
		);
	} catch {
		// quota exceeded or storage unavailable: the cache is only an optimization
	}
}

export function clearMediaCache(): void {
	localStorage.removeItem(MEDIA_CACHE_KEY);
}

/** Local calendar date (YYYY-MM-DD) of a Date; never use toISOString().slice for this. */
export function localDateKey(d: Date): string {
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/** Compact dd/mm/yyyy display date. */
export function compactDate(iso: string): string {
	const d = new Date(iso);
	return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
}

export function formatDate(iso: string): string {
	return new Date(iso).toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric'
	});
}
