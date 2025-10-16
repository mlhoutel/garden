import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import pagesManifest from '$meta/manifest.json';

export const GET: RequestHandler = async () => {
	// Extract unique sections
	const sections: string[] = [
		...new Set(pagesManifest.map((p: any) => String(p.section)))
	] as string[];

	// Sort sections: numbers descending first, then text
	sections.sort((a, b) => {
		const aNum = parseInt(a, 10);
		const bNum = parseInt(b, 10);

		if (!isNaN(aNum) && !isNaN(bNum)) return bNum - aNum; // numeric descending
		if (!isNaN(aNum)) return -1; // numbers before text
		if (!isNaN(bNum)) return 1; // numbers before text

		return String(b).localeCompare(String(a));
	});

	return json(sections);
};
