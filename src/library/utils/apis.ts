import pagesManifest from '$meta/manifest.json';
import { base } from '$app/paths';
import type { PageManifestEntry, Page, LinkItem, ListPagesOptions } from '$types/types';

/**
 * List pages in a given section
 */
export async function listPages(section?: string, options: ListPagesOptions = {}): Promise<Page[]> {
	const { includeDrafts = false } = options;

	const pages = (pagesManifest as PageManifestEntry[]).filter((p) => p.section === section);

	return pages
		.map((e) => {
			const meta = { ...e.meta };
			const parts = e.path.split('/');
			const subsection = parts[1]; // section/subsection/file.md
			const slug = parts[2]?.replace(/\.md$/, '');

			return {
				...e,
				meta,
				section,
				subsection,
				slug,
				path: e.path.replace(/\.md$/, '')
			} as Page;
		})
		.filter((p) => includeDrafts || p.meta.published !== false)
		.sort((a, b) => new Date(a.meta.date).getTime() - new Date(b.meta.date).getTime());
}

/**
 * Get navigation link items dynamically
 */
export async function getLinksItems(fetch: typeof window.fetch): Promise<LinkItem[]> {
	const links: LinkItem[] = [
		{ label: 'home', link: `${base}/` },
		{ label: 'about', link: `${base}/about` }
	];

	try {
		const res = await fetch(`${base}/api/sections`);
		if (res.ok) {
			const sections: string[] = await res.json();
			sections.forEach((section) => {
				links.splice(1, 0, {
					label: section,
					link: `${base}/${section}`
				});
			});
		}
	} catch (err) {
		console.error('Failed to fetch sections for navigation', err);
	}

	links.sort((a, b) => {
		const aNum = parseInt(a.label);
		const bNum = parseInt(b.label);

		if (!isNaN(aNum) && !isNaN(bNum)) return bNum - aNum; // numeric descending
		if (!isNaN(aNum)) return -1; // numbers before text
		if (!isNaN(bNum)) return 1; // numbers before text

		return b.label.localeCompare(a.label);
	});

	return links;
}
