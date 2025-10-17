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
	const modules = import.meta.glob('../../../../content/**/*.md', { as: 'raw' });
	const key = `../../../../content/${section}/${subsection}/${slug}.md`;

	const loader = modules[key];
	if (!loader) throw error(404, `Page not found: ${key}`);

	const markdown = await loader();
	const content = await renderMarkdown(markdown, { path: key });

	// Find index for navigation
	const index = pages.findIndex((p) => p.meta.subsection === subsection && p.meta.slug == slug);

	const next = pages[(index + 1) % pages.length] || null;

	if (page.meta.published === false) throw error(404, 'Page not published yet');

	return {
		content,
		next,
		...page.meta,
		section,
		subsection
	};
}
