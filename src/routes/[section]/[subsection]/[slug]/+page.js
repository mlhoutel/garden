import { error } from '@sveltejs/kit';
import { listPages } from '$utils/apis';

export async function load({ params }) {
	const { section, subsection, slug } = params;

	// Get all pages in this section
	const pages = await listPages(section);

	// Find the page by subsection + slug
	const page = pages.find((p) => p.path === `${section}/${subsection}/${slug}`);

	if (!page) throw error(404, 'Page not found');

	const modules = import.meta.glob('../../../../content/**/*.md');
	const key = `../../../../content/${section}/${subsection}/${slug}.md`;

	const loader = modules[key];
	if (!loader) throw error(404, `Page not found: ${key}`);

	const contentModule = await loader();
	const content = contentModule.default;

	// Find index for navigation
	const index = pages.findIndex(
		(p) => p.subsection === subsection && p.file?.endsWith(`${slug}.md`)
	);

	const next = pages[(index + 1) % pages.length] || null;

	const meta = { ...page.meta };

	if (meta.published === false) throw error(404, 'Page not published yet');

	return {
		content,
		next,
		...meta,
		section,
		subsection
	};
}
