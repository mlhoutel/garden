/**
 * garden-media: private media log API (D1-backed).
 *
 * Auth: Bearer token. READ_TOKEN grants read, ADMIN_TOKEN grants read+write.
 *
 * Routes:
 *   GET    /entries       (read)  -> { role, entries: MediaEntry[] } ordered by added_at desc
 *   POST   /entries       (admin) -> 201 + created entry
 *   PUT    /entries/:id   (admin) -> 200 + updated entry
 *   DELETE /entries/:id   (admin) -> 200 { deleted: id }
 *   GET    /meta?url=...  (admin) -> best-effort { title, author, site, url } extracted from the page
 */

type Role = 'admin' | 'reader';

interface MediaEntry {
	id: string;
	title: string;
	type: string;
	author: string;
	url: string;
	year: number | null;
	topics: string[];
	rating: number | null;
	note: string;
	added_at: string;
}

const META_MAX_BYTES = 256 * 1024;
const META_TIMEOUT_MS = 8000;

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const cors = corsHeaders(request, env);

		if (request.method === 'OPTIONS') {
			return new Response(null, { status: 204, headers: cors });
		}

		try {
			const response = await route(request, env);
			for (const [k, v] of Object.entries(cors)) response.headers.set(k, v);
			return response;
		} catch (err) {
			console.log(JSON.stringify({ level: 'error', message: String(err) }));
			return json({ error: 'internal error' }, 500, cors);
		}
	}
} satisfies ExportedHandler<Env>;

async function route(request: Request, env: Env): Promise<Response> {
	const url = new URL(request.url);
	const path = url.pathname.replace(/\/+$/, '') || '/';
	const role = await getRole(request, env);

	if (path === '/entries' && request.method === 'GET') {
		if (!role) return json({ error: 'unauthorized' }, 401);
		return listEntries(env, role);
	}

	if (path === '/entries' && request.method === 'POST') {
		if (!role) return json({ error: 'unauthorized' }, 401);
		if (role !== 'admin') return json({ error: 'write access requires the admin token' }, 403);
		return createEntry(request, env);
	}

	const idMatch = path.match(/^\/entries\/([\w-]+)$/);
	if (idMatch && (request.method === 'DELETE' || request.method === 'PUT')) {
		if (!role) return json({ error: 'unauthorized' }, 401);
		if (role !== 'admin') return json({ error: 'write access requires the admin token' }, 403);
		return request.method === 'DELETE'
			? deleteEntry(env, idMatch[1])
			: updateEntry(request, env, idMatch[1]);
	}

	if (path === '/meta' && request.method === 'GET') {
		if (!role) return json({ error: 'unauthorized' }, 401);
		if (role !== 'admin') return json({ error: 'metadata fetch requires the admin token' }, 403);
		return fetchMeta(url.searchParams.get('url') ?? '');
	}

	if (['/entries', '/meta'].includes(path) || idMatch) {
		return json({ error: 'method not allowed' }, 405);
	}
	return json({ error: 'not found' }, 404);
}

// ─── Auth ───

async function getRole(request: Request, env: Env): Promise<Role | null> {
	const header = request.headers.get('Authorization') ?? '';
	const token = header.startsWith('Bearer ') ? header.slice(7).trim() : '';
	if (!token) return null;
	if (await tokenMatches(token, env.ADMIN_TOKEN)) return 'admin';
	if (await tokenMatches(token, env.READ_TOKEN)) return 'reader';
	return null;
}

/** Constant-time comparison; SHA-256 both sides so lengths always match. */
async function tokenMatches(provided: string, expected: string | undefined): Promise<boolean> {
	if (!expected) return false;
	const enc = new TextEncoder();
	const [a, b] = await Promise.all([
		crypto.subtle.digest('SHA-256', enc.encode(provided)),
		crypto.subtle.digest('SHA-256', enc.encode(expected))
	]);
	return crypto.subtle.timingSafeEqual(a, b);
}

// ─── CORS ───

// CORS is not the security boundary here (auth is a Bearer token, no cookies),
// so *.vercel.app is accepted wholesale to cover production and preview deploys.
function isAllowedOrigin(origin: string, env: Env): boolean {
	const allowed = (env.ALLOWED_ORIGINS ?? '').split(',').map((o) => o.trim());
	return allowed.includes(origin) || /^https:\/\/[\w.-]+\.vercel\.app$/.test(origin);
}

function corsHeaders(request: Request, env: Env): Record<string, string> {
	const origin = request.headers.get('Origin');
	const headers: Record<string, string> = { Vary: 'Origin' };
	if (origin && isAllowedOrigin(origin, env)) {
		headers['Access-Control-Allow-Origin'] = origin;
		headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
		headers['Access-Control-Allow-Headers'] = 'Authorization, Content-Type';
		headers['Access-Control-Max-Age'] = '86400';
	}
	return headers;
}

// ─── Entries ───

async function listEntries(env: Env, role: Role): Promise<Response> {
	const { results } = await env.DB.prepare('SELECT * FROM media ORDER BY added_at DESC').all();
	const entries = results.map((row) => ({ ...row, topics: parseTopics(row.topics) }));
	return json({ role, entries });
}

function parseTopics(raw: unknown): string[] {
	try {
		const parsed = JSON.parse(String(raw));
		return Array.isArray(parsed) ? parsed.map(String) : [];
	} catch {
		return [];
	}
}

type EntryFields = Omit<MediaEntry, 'id' | 'added_at'> & { added_at: string | null };

/** Validate and normalize an entry payload; added_at stays null when not provided. */
function parseEntryBody(body: Record<string, unknown>): EntryFields | { error: string } {
	const title = typeof body.title === 'string' ? body.title.trim() : '';
	if (!title) return { error: 'title is required' };

	const type = typeof body.type === 'string' && body.type.trim() ? body.type.trim() : 'article';
	if (type.length > 32) return { error: 'type too long (max 32 chars)' };

	const rating = body.rating == null ? null : Number(body.rating);
	if (rating !== null && (!Number.isInteger(rating) || rating < 1 || rating > 5)) {
		return { error: 'rating must be an integer between 1 and 5' };
	}

	const year = body.year == null ? null : Number(body.year);
	if (year !== null && !Number.isInteger(year)) {
		return { error: 'year must be an integer' };
	}

	const topics = Array.isArray(body.topics)
		? [...new Set(body.topics.map((t) => String(t).trim().toLowerCase()).filter(Boolean))]
		: [];

	const added_at =
		typeof body.added_at === 'string' && !Number.isNaN(Date.parse(body.added_at))
			? new Date(body.added_at).toISOString()
			: null;

	return {
		title,
		type,
		author: typeof body.author === 'string' ? body.author.trim() : '',
		url: typeof body.url === 'string' ? body.url.trim() : '',
		year,
		topics,
		rating,
		note: typeof body.note === 'string' ? body.note.trim() : '',
		added_at
	};
}

async function createEntry(request: Request, env: Env): Promise<Response> {
	let body: Record<string, unknown>;
	try {
		body = await request.json();
	} catch {
		return json({ error: 'invalid JSON body' }, 400);
	}

	const fields = parseEntryBody(body);
	if ('error' in fields) return json({ error: fields.error }, 400);

	const entry: MediaEntry = {
		...fields,
		id: crypto.randomUUID(),
		added_at: fields.added_at ?? new Date().toISOString()
	};

	await env.DB.prepare(
		`INSERT INTO media (id, title, type, author, url, year, topics, rating, note, added_at)
		 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
	)
		.bind(
			entry.id,
			entry.title,
			entry.type,
			entry.author,
			entry.url,
			entry.year,
			JSON.stringify(entry.topics),
			entry.rating,
			entry.note,
			entry.added_at
		)
		.run();

	return json(entry, 201);
}

async function updateEntry(request: Request, env: Env, id: string): Promise<Response> {
	let body: Record<string, unknown>;
	try {
		body = await request.json();
	} catch {
		return json({ error: 'invalid JSON body' }, 400);
	}

	const fields = parseEntryBody(body);
	if ('error' in fields) return json({ error: fields.error }, 400);

	// added_at is preserved unless the payload provides one (COALESCE with null keeps the old value)
	const result = await env.DB.prepare(
		`UPDATE media SET title = ?, type = ?, author = ?, url = ?, year = ?, topics = ?, rating = ?, note = ?,
		 added_at = COALESCE(?, added_at) WHERE id = ?`
	)
		.bind(
			fields.title,
			fields.type,
			fields.author,
			fields.url,
			fields.year,
			JSON.stringify(fields.topics),
			fields.rating,
			fields.note,
			fields.added_at,
			id
		)
		.run();

	if (!result.meta.changes) return json({ error: 'entry not found' }, 404);

	const row = await env.DB.prepare('SELECT * FROM media WHERE id = ?').bind(id).first();
	return json({ ...row, topics: parseTopics(row?.topics) });
}

async function deleteEntry(env: Env, id: string): Promise<Response> {
	const result = await env.DB.prepare('DELETE FROM media WHERE id = ?').bind(id).run();
	if (!result.meta.changes) return json({ error: 'entry not found' }, 404);
	return json({ deleted: id });
}

// ─── Metadata extraction ───

async function fetchMeta(target: string): Promise<Response> {
	const empty = { title: '', author: '', site: '', url: target };

	let parsed: URL;
	try {
		parsed = new URL(target);
	} catch {
		return json({ error: 'invalid url' }, 400);
	}
	if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
		return json({ error: 'only http(s) urls are supported' }, 400);
	}

	let response: Response;
	try {
		response = await fetch(parsed.toString(), {
			signal: AbortSignal.timeout(META_TIMEOUT_MS),
			redirect: 'follow',
			headers: {
				'User-Agent': 'Mozilla/5.0 (compatible; garden-media-log/1.0)',
				Accept: 'text/html'
			}
		});
	} catch {
		return json({ ...empty, warning: 'could not reach the page' });
	}

	if (!response.ok || !(response.headers.get('Content-Type') ?? '').includes('text/html')) {
		return json({
			...empty,
			url: response.url,
			warning: `page returned ${response.status} or non-HTML content`
		});
	}

	const meta = { titleTag: '', ogTitle: '', author: '', site: '' };
	const contentOf = (el: Element) => el.getAttribute('content')?.trim() ?? '';

	const rewriter = new HTMLRewriter()
		.on('title', {
			text(chunk) {
				meta.titleTag += chunk.text;
			}
		})
		.on('meta[property="og:title"]', {
			element(el) {
				meta.ogTitle ||= contentOf(el);
			}
		})
		.on('meta[name="author"]', {
			element(el) {
				meta.author ||= contentOf(el);
			}
		})
		.on('meta[property="article:author"]', {
			element(el) {
				meta.author ||= contentOf(el);
			}
		})
		.on('meta[property="og:site_name"]', {
			element(el) {
				meta.site ||= contentOf(el);
			}
		});

	// Handlers run as the transformed stream is pulled; stop early once we have
	// enough or hit the size cap instead of buffering arbitrary pages.
	const body = rewriter.transform(response).body;
	if (body) {
		const reader = body.getReader();
		let read = 0;
		while (read < META_MAX_BYTES) {
			const { done, value } = await reader.read();
			if (done) break;
			read += value.byteLength;
			if (meta.ogTitle && meta.author && meta.site) break;
		}
		await reader.cancel().catch(() => {});
	}

	return json({
		title: (meta.ogTitle || meta.titleTag).trim(),
		author: meta.author,
		site: meta.site,
		url: response.url
	});
}

// ─── Helpers ───

function json(data: unknown, status = 200, headers: Record<string, string> = {}): Response {
	return new Response(JSON.stringify(data), {
		status,
		headers: { 'Content-Type': 'application/json', ...headers }
	});
}
