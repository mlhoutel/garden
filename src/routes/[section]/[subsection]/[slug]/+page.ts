import { error } from '@sveltejs/kit';
import { listPages } from '$utils/apis';
import { renderMarkdown } from '$utils/markdown';
import type { PageLoadReturn, Page } from '$types/types';

export async function load({
	params
}: {
	params: { section: string; subsection: string; slug: string };
}): Promise<PageLoadReturn> {
	const { section, subsection, slug } = params;

	// Get all pages in this section
	const pages: Page[] = await listPages(section);

	// Find the page by subsection + slug
	const page = pages.find((p) => p.path === `${section}/${subsection}/${slug}.md`);
	if (!page) throw error(404, 'Page not found');

	// Import .md file as text
	const modules = import.meta.glob('../../../../content/**/*.md', { query: '?raw', import: 'default' });
	const key = `../../../../content/${section}/${subsection}/${slug}.md`;

	const loader = modules[key];
	if (!loader) throw error(404, `Page not found: ${key}`);

	const markdown = await loader();
	const content = await renderMarkdown(markdown, { path: key });

	// Find index for navigation
	const index = pages.findIndex((p) => p.meta.subsection === subsection && p.meta.slug == slug);
	const next = pages[(index + 1) % pages.length] || null;

	if (page.meta.published === false) throw error(404, 'Page not published yet');

	// Find related pages (same subsection, then same topics, then rest)
	const currentTopics = new Set(page.meta.topic?.split(' ').filter(Boolean) || []);
	const seen = new Set<string>([slug]);

	const sameSubsection = pages.filter((p) => {
		if (seen.has(p.meta.slug)) return false;
		if (p.meta.subsection !== subsection) return false;
		seen.add(p.meta.slug);
		return true;
	});

	const byTopic = pages.filter((p) => {
		if (seen.has(p.meta.slug)) return false;
		const pTopics = p.meta.topic?.split(' ').filter(Boolean) || [];
		if (!pTopics.some((t: string) => currentTopics.has(t))) return false;
		seen.add(p.meta.slug);
		return true;
	});

	const rest = pages.filter((p) => !seen.has(p.meta.slug));

	const related = [...sameSubsection, ...byTopic, ...rest];

	// For snippets: pre-render related content for infinite scroll feed
	let relatedRendered: { meta: any; content: string; path: string }[] | undefined;
	if (section === 'snippets') {
		const FEED_SIZE = 20;
		const feedItems = related.slice(0, FEED_SIZE);
		relatedRendered = [];

		for (const item of feedItems) {
			const itemKey = `../../../../content/${item.path}`;
			const itemLoader = modules[itemKey];
			if (!itemLoader) continue;
			try {
				const itemMd = await itemLoader();
				const itemHtml = await renderMarkdown(itemMd, { path: itemKey });
				relatedRendered.push({ meta: item.meta, content: itemHtml, path: item.path });
			} catch {
				// Skip items that fail to render
			}
		}
	}

	return {
		content,
		next,
		related,
		relatedRendered,
		...page.meta,
		section,
		subsection
	};
}
