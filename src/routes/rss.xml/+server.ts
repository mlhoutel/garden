import pagesManifest from '$meta/manifest.json';
import type { Page } from '$types/types';

// Emitted as a static file at build time, like the rest of the site.
export const prerender = true;

const SITE_URL = 'https://maellhoutellier.com';
const SITE_TITLE = 'Garden - Maël Lhoutellier';
const SITE_DESCRIPTION =
	'A digital garden of thoughts, notes, and reference guides on software engineering, math, and more.';
const MAX_ITEMS = 50;

function escapeXml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

function itemUrl(page: Page): string {
	return `${SITE_URL}/${page.path.replace(/\.md$/, '')}`;
}

/** Some sheets carry no date; readers reject a malformed pubDate, so omit it. */
function pubDate(raw: string | undefined): string | null {
	if (!raw) return null;
	const date = new Date(raw);
	return Number.isNaN(date.getTime()) ? null : date.toUTCString();
}

export function GET() {
	// Only dated content belongs in a feed: sheets and snippets are living
	// reference pages with no publication date. Dating one adds it here.
	const pages = (pagesManifest as Page[])
		.filter((p) => p.meta.published !== false && pubDate(p.meta.date) !== null)
		.sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime())
		.slice(0, MAX_ITEMS);

	const items = pages
		.map((page) => {
			const url = itemUrl(page);
			const topics = page.meta.topic ? page.meta.topic.split(/\s+/).filter(Boolean) : [];
			const date = pubDate(page.meta.date);
			const lines = [
				`			<title>${escapeXml(page.meta.title ?? page.meta.slug ?? 'Untitled')}</title>`,
				`			<link>${escapeXml(url)}</link>`,
				`			<guid isPermaLink="true">${escapeXml(url)}</guid>`,
				...(date ? [`			<pubDate>${date}</pubDate>`] : []),
				...(page.meta.section ? [`			<category>${escapeXml(page.meta.section)}</category>`] : []),
				...topics.map((topic) => `			<category>${escapeXml(topic)}</category>`),
				`			<description>${escapeXml(page.meta.short ?? '')}</description>`
			];
			return `		<item>\n${lines.join('\n')}\n		</item>`;
		})
		.join('\n');

	const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>${escapeXml(SITE_TITLE)}</title>
		<link>${SITE_URL}</link>
		<description>${escapeXml(SITE_DESCRIPTION)}</description>
		<language>en</language>
		<lastBuildDate>${pubDate(pages[0]?.meta.date) ?? new Date().toUTCString()}</lastBuildDate>
		<atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
	</channel>
</rss>
`;

	return new Response(feed, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
}
