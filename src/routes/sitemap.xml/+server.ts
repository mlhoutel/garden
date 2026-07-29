import pagesManifest from '$meta/manifest.json';
import { SITE_URL } from '$utils/site';
import type { Page } from '$types/types';

// Emitted as a static file at build time, like the rest of the site.
export const prerender = true;

// The media log is private and stays out of the sitemap.
const STATIC_PATHS = ['/', '/about', '/articles', '/sheets', '/snippets'];

function lastmod(raw: string | undefined): string | null {
	if (!raw) return null;
	const date = new Date(raw);
	return Number.isNaN(date.getTime()) ? null : date.toISOString().slice(0, 10);
}

function urlEntry(path: string, date: string | null): string {
	return [
		'	<url>',
		`		<loc>${SITE_URL}${path}</loc>`,
		...(date ? [`		<lastmod>${date}</lastmod>`] : []),
		'	</url>'
	].join('\n');
}

export function GET() {
	const pages = (pagesManifest as Page[]).filter((p) => p.meta.published !== false);

	const urls = [
		...STATIC_PATHS.map((path) => urlEntry(path, null)),
		...pages.map((page) => urlEntry(`/${page.path.replace(/\.md$/, '')}`, lastmod(page.meta.date)))
	].join('\n');

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
}
