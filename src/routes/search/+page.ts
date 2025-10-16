import type { PageLoad } from './$types';
import { base } from '$app/paths';
import type { Page } from '$types/types';

export const load: PageLoad = async ({ fetch }: { fetch: typeof window.fetch }) => {
	// Fetch sections
	const res = await fetch(`${base}/api/sections`);
	const sections: string[] = await res.json();

	// Fetch pages for each section
	const results: Page[][] = await Promise.all(
		sections.map(async (section) => {
			const res = await fetch(`${base}/api/${section}`);
			return res.ok ? ((await res.json()) as Page[]) : [];
		})
	);

	// Flatten all pages
	const content: Page[] = results.flat();

	return { content };
};
