import pagesManifest from '$meta/manifest.json';
import { base } from '$app/paths';

export async function listPages(section, { includeDrafts = false } = {}) {
	const pages = pagesManifest.filter((p) => p.section === section);

	return pages
		.map((e) => {
			const meta = { ...e.meta };
			const parts = e.path.split('/');
			const subsection = parts[1]; // section/subsection/file.md
			const slug = parts[2]?.replace(/\.md$/, '');

			const wordCount = e.html
				?.replace(/<[^>]*>/g, '')
				?.split(/\s+/)
				?.filter((w) => w.length > 0).length;

			return {
				...e,
				meta: { ...meta, words: wordCount },
				section,
				subsection,
				slug,
				path: e.path?.replace(/\.md$/, '')
			};
		})
		.filter((p) => includeDrafts || p.meta.published !== false)
		.sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date));
}

export async function getLinksItems(fetch) {
	const links = [
		{ label: 'home', link: `${base}/` },
		{ label: 'about', link: `${base}/about` }
	];

	try {
		const res = await fetch(`${base}/api/sections`);
		if (res.ok) {
			const sections = await res.json();
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
		const aNum = parseInt(a);
		const bNum = parseInt(b);

		if (!isNaN(aNum) && !isNaN(bNum)) return bNum - aNum; // numeric descending
		if (!isNaN(aNum)) return -1; // numbers before text
		if (!isNaN(bNum)) return 1; // numbers before text

		return String(a).localeCompare(String(b));
	});

	return links;
}
