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

	// Find related pages (same subsection, then same topics)
	const currentTopics = new Set(page.meta.topic?.split(' ').filter(Boolean) || []);
	const sameSubsection = pages
		.filter((p) => p.meta.subsection === subsection && p.meta.slug !== slug)
		.slice(0, 5);

	const byTopic = pages
		.filter((p) => {
			if (p.meta.slug === slug) return false;
			if (sameSubsection.some((s) => s.meta.slug === p.meta.slug)) return false;
			const pTopics = p.meta.topic?.split(' ').filter(Boolean) || [];
			return pTopics.some((t: string) => currentTopics.has(t));
		})
		.slice(0, 5);

	const related = [...sameSubsection, ...byTopic].slice(0, 8);

	return {
		content,
		next,
		related,
		...page.meta,
		section,
		subsection
	};
}
