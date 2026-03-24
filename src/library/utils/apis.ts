import pagesManifest from '$meta/manifest.json';
import { base } from '$app/paths';
import type { PageMeta, Page, LinkItem, ListPagesOptions } from '$types/types';

/**
 * List pages in a given section
 */
export async function listPages(section?: string, options: ListPagesOptions = {}): Promise<Page[]> {
	const { includeDrafts = false } = options;

	const pages = (pagesManifest as Page[]).filter((p) => p.meta.section === section);

	return pages
		.filter((p) => includeDrafts || p.meta.published !== false)
		.sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());
}

/**
 * Get navigation link items dynamically
 */
export async function getLinksItems(fetch: typeof window.fetch): Promise<LinkItem[]> {
	const links: LinkItem[] = [];

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

		return a.label.localeCompare(b.label);
	});

	return [{ label: 'home', link: `${base}/` }, ...links, { label: 'about', link: `${base}/about` }];
}
