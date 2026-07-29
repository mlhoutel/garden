/**
 * garden-media: private media log API (D1-backed).
 *
 * Auth: Bearer token. READ_TOKEN grants read, ADMIN_TOKEN grants read+write.
 *
 * Routes:
 *   GET    /entries                     (read)  -> { role, entries: MediaEntry[] } ordered by added_at desc
 *   POST   /entries                     (admin) -> 201 + created entry
 *   PUT    /entries/:id                 (admin) -> 200 + updated entry
 *   DELETE /entries/:id                 (admin) -> 200 { deleted: id }
 *   POST   /entries/:id/comments        (admin) -> 201 + created comment
 *   DELETE /entries/:id/comments/:cid   (admin) -> 200 { deleted: cid }
 *   GET    /meta?url=...                (admin) -> best-effort metadata extracted from the page
 */

type Role = 'admin' | 'reader';

interface MediaComment {
	id: string;
	body: string;
	created_at: string;
}

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
	status: 'todo' | 'done';
	added_at: string;
}

const COMMENT_MAX_CHARS = 2000;

const META_MAX_BYTES = 256 * 1024;
const META_TIMEOUT_MS = 8000;

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const cors = corsHeaders(request);

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

	const commentsMatch = path.match(/^\/entries\/([\w-]+)\/comments$/);
	if (commentsMatch && request.method === 'POST') {
		if (!role) return json({ error: 'unauthorized' }, 401);
		if (role !== 'admin') return json({ error: 'write access requires the admin token' }, 403);
		return addComment(request, env, commentsMatch[1]);
	}

	const commentMatch = path.match(/^\/entries\/([\w-]+)\/comments\/([\w-]+)$/);
	if (commentMatch && request.method === 'DELETE') {
		if (!role) return json({ error: 'unauthorized' }, 401);
		if (role !== 'admin') return json({ error: 'write access requires the admin token' }, 403);
		return deleteComment(env, commentMatch[1], commentMatch[2]);
	}

	if (path === '/meta' && request.method === 'GET') {
		if (!role) return json({ error: 'unauthorized' }, 401);
		if (role !== 'admin') return json({ error: 'metadata fetch requires the admin token' }, 403);
		return fetchMeta(url.searchParams.get('url') ?? '');
	}

	if (['/entries', '/meta'].includes(path) || idMatch || commentsMatch || commentMatch) {
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

// Browser calls are allowed from maellhoutellier.com (and subdomains) plus localhost for dev.
// Auth is a Bearer token (no cookies), so CORS is a courtesy filter, not the security boundary.
const ORIGIN_PATTERN = /^(https:\/\/([\w-]+\.)*maellhoutellier\.com|http:\/\/localhost(:\d+)?)$/;

function corsHeaders(request: Request): Record<string, string> {
	const origin = request.headers.get('Origin');
	const headers: Record<string, string> = { Vary: 'Origin' };
	if (origin && ORIGIN_PATTERN.test(origin)) {
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
	const entries = results.map(hydrateRow);
	return json({ role, entries });
}

/** Parse the JSON text columns of a media row into their real shapes. */
function hydrateRow(row: Record<string, unknown>): Record<string, unknown> {
	return { ...row, topics: parseTopics(row.topics), comments: parseComments(row.comments) };
}

function parseJsonArray(raw: unknown): unknown[] {
	try {
		const parsed = JSON.parse(String(raw));
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}

function parseTopics(raw: unknown): string[] {
	return parseJsonArray(raw).map(String);
}

function parseComments(raw: unknown): MediaComment[] {
	return parseJsonArray(raw).filter(
		(c): c is MediaComment =>
			typeof c === 'object' &&
			c !== null &&
			typeof (c as MediaComment).id === 'string' &&
			typeof (c as MediaComment).body === 'string' &&
			typeof (c as MediaComment).created_at === 'string'
	);
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

	const status = body.status == null ? 'done' : body.status;
	if (status !== 'todo' && status !== 'done') {
		return { error: "status must be 'todo' or 'done'" };
	}

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
		status,
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
		`INSERT INTO media (id, title, type, author, url, year, topics, rating, note, status, added_at)
		 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
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
			entry.status,
			entry.added_at
		)
		.run();

	return json({ ...entry, comments: [] }, 201);
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
		 status = ?, added_at = COALESCE(?, added_at) WHERE id = ?`
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
			fields.status,
			fields.added_at,
			id
		)
		.run();

	if (!result.meta.changes) return json({ error: 'entry not found' }, 404);

	const row = await env.DB.prepare('SELECT * FROM media WHERE id = ?').bind(id).first();
	return json(hydrateRow(row ?? {}));
}

async function deleteEntry(env: Env, id: string): Promise<Response> {
	const result = await env.DB.prepare('DELETE FROM media WHERE id = ?').bind(id).run();
	if (!result.meta.changes) return json({ error: 'entry not found' }, 404);
	return json({ deleted: id });
}

// ─── Comments ───

async function addComment(request: Request, env: Env, entryId: string): Promise<Response> {
	let payload: Record<string, unknown>;
	try {
		payload = await request.json();
	} catch {
		return json({ error: 'invalid JSON body' }, 400);
	}

	const body = typeof payload.body === 'string' ? payload.body.trim() : '';
	if (!body) return json({ error: 'comment body is required' }, 400);
	if (body.length > COMMENT_MAX_CHARS) {
		return json({ error: `comment too long (max ${COMMENT_MAX_CHARS} chars)` }, 400);
	}

	const row = await env.DB.prepare('SELECT comments FROM media WHERE id = ?').bind(entryId).first();
	if (!row) return json({ error: 'entry not found' }, 404);

	const comment: MediaComment = {
		id: crypto.randomUUID(),
		body,
		created_at: new Date().toISOString()
	};
	const comments = [...parseComments(row.comments), comment];

	await env.DB.prepare('UPDATE media SET comments = ? WHERE id = ?')
		.bind(JSON.stringify(comments), entryId)
		.run();

	return json(comment, 201);
}

async function deleteComment(env: Env, entryId: string, commentId: string): Promise<Response> {
	const row = await env.DB.prepare('SELECT comments FROM media WHERE id = ?').bind(entryId).first();
	if (!row) return json({ error: 'entry not found' }, 404);

	const comments = parseComments(row.comments);
	const remaining = comments.filter((c) => c.id !== commentId);
	if (remaining.length === comments.length) return json({ error: 'comment not found' }, 404);

	await env.DB.prepare('UPDATE media SET comments = ? WHERE id = ?')
		.bind(JSON.stringify(remaining), entryId)
		.run();

	return json({ deleted: commentId });
}

// ─── Metadata extraction ───

const NAMED_ENTITIES: Record<string, string> = {
	amp: '&',
	lt: '<',
	gt: '>',
	quot: '"',
	apos: "'",
	nbsp: ' ',
	ndash: '–',
	mdash: '—',
	hellip: '…',
	lsquo: '‘',
	rsquo: '’',
	ldquo: '“',
	rdquo: '”',
	eacute: 'é',
	egrave: 'è',
	agrave: 'à',
	ccedil: 'ç',
	ecirc: 'ê',
	ocirc: 'ô',
	auml: 'ä',
	ouml: 'ö',
	uuml: 'ü',
	copy: '©',
	reg: '®',
	trade: '™',
	laquo: '«',
	raquo: '»',
	middot: '·',
	bull: '•',
	times: '×',
	deg: '°'
};

function codePoint(cp: number): string {
	try {
		return cp > 0 && cp <= 0x10ffff ? String.fromCodePoint(cp) : '';
	} catch {
		return '';
	}
}

/** Numeric forms first so "&amp;#39;" decodes once (to "&#39;"), matching HTML semantics. */
function decodeEntities(s: string): string {
	return s
		.replace(/&#x([0-9a-f]{1,6});/gi, (_, h) => codePoint(parseInt(h, 16)))
		.replace(/&#(\d{1,7});/g, (_, d) => codePoint(parseInt(d, 10)))
		.replace(/&([a-zA-Z]+);/g, (m, n) => NAMED_ENTITIES[n.toLowerCase()] ?? m);
}

function stripTags(s: string): string {
	return s.replace(/<[^>]*>/g, ' ');
}

/** Strip markup, decode entities, then strip again (decoding can reintroduce tags
 *  from escaped markup like "&lt;h1&gt;"), and collapse whitespace. */
function clean(s: string): string {
	return stripTags(decodeEntities(stripTags(s)))
		.replace(/\s+/g, ' ')
		.trim();
}

/** Strip a leading "SiteName - " or trailing " - SiteName" only when it matches og:site_name. */
function stripSiteName(title: string, site: string): string {
	if (!site) return title;
	const esc = site.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	const suffix = title.match(new RegExp(`^(.{3,})\\s*[|\\-–—·]\\s*${esc}\\s*$`, 'i'));
	if (suffix) return suffix[1].trim();
	const prefix = title.match(new RegExp(`^${esc}\\s*[|\\-–—·:]\\s*(.{3,})$`, 'i'));
	return prefix ? prefix[1].trim() : title;
}

const hostIs = (host: string, domain: string) => host === domain || host.endsWith('.' + domain);

function detectType(host: string, contentType: string, ogType: string): string {
	if (contentType.includes('application/pdf')) return 'paper';
	if (hostIs(host, 'arxiv.org') || hostIs(host, 'openreview.net')) return 'paper';
	if (hostIs(host, 'youtube.com') || hostIs(host, 'youtu.be') || hostIs(host, 'vimeo.com'))
		return 'video';
	if (hostIs(host, 'github.com') || hostIs(host, 'gitlab.com')) return 'repo';
	if (host.endsWith('.wikipedia.org')) return 'wiki';
	if (ogType.startsWith('video')) return 'video';
	if (ogType === 'book') return 'book';
	return 'article';
}

async function fetchMeta(target: string): Promise<Response> {
	const empty = { title: '', author: '', site: '', description: '', published: '', url: target };

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
		return json({
			...empty,
			type: detectType(parsed.hostname, '', ''),
			warning: 'could not reach the page'
		});
	}

	const finalUrl = new URL(response.url);
	const contentType = response.headers.get('Content-Type') ?? '';

	// Direct PDF: best-effort title from the filename, no warning.
	if (contentType.includes('application/pdf')) {
		const filename = decodeURIComponent(finalUrl.pathname.split('/').pop() ?? '');
		return json({
			...empty,
			title: filename
				.replace(/\.pdf$/i, '')
				.replace(/[_-]+/g, ' ')
				.trim(),
			type: 'paper',
			url: response.url
		});
	}

	if (!response.ok || !contentType.includes('text/html')) {
		return json({
			...empty,
			type: detectType(finalUrl.hostname, contentType, ''),
			url: response.url,
			warning: `page returned ${response.status} or non-HTML content`
		});
	}

	const meta = {
		titleTag: '',
		ogTitle: '',
		author: '',
		site: '',
		description: '',
		ogDescription: '',
		ogType: '',
		published: ''
	};
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
		})
		.on('meta[property="og:description"]', {
			element(el) {
				meta.ogDescription ||= contentOf(el);
			}
		})
		.on('meta[name="description"]', {
			element(el) {
				meta.description ||= contentOf(el);
			}
		})
		.on('meta[property="og:type"]', {
			element(el) {
				meta.ogType ||= contentOf(el);
			}
		})
		.on('meta[property="article:published_time"]', {
			element(el) {
				meta.published ||= contentOf(el);
			}
		});

	// Handlers run as the transformed stream is pulled; the size cap bounds the work.
	const body = rewriter.transform(response).body;
	if (body) {
		const reader = body.getReader();
		let read = 0;
		while (read < META_MAX_BYTES) {
			const { done, value } = await reader.read();
			if (done) break;
			read += value.byteLength;
		}
		await reader.cancel().catch(() => {});
	}

	const site = clean(meta.site);
	// Wikipedia sends no og:site_name but always suffixes titles with " - Wikipedia".
	const siteForStrip = site || (finalUrl.hostname.endsWith('.wikipedia.org') ? 'Wikipedia' : '');
	const title = stripSiteName(clean(meta.ogTitle || meta.titleTag), siteForStrip);

	return json({
		title,
		author: clean(meta.author),
		site,
		description: clean(meta.ogDescription || meta.description).slice(0, 500),
		published: meta.published,
		type: detectType(finalUrl.hostname, contentType, meta.ogType.toLowerCase()),
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
