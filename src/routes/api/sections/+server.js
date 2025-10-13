import { json } from '@sveltejs/kit';
import pagesManifest from '$meta/manifest.json';

export const GET = async () => {
	const sections = [...new Set(pagesManifest.map((p) => p.section))];

	sections.sort((a, b) => {
		const aNum = parseInt(a);
		const bNum = parseInt(b);

		if (!isNaN(aNum) && !isNaN(bNum)) return bNum - aNum; // numeric descending
		if (!isNaN(aNum)) return -1; // numbers before text
		if (!isNaN(bNum)) return 1; // numbers before text

		return String(a).localeCompare(String(b));
	});

	return json(sections);
};
