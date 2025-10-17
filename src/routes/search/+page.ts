import type { PageLoad } from './$types';
import { base } from '$app/paths';
import type { PageMeta } from '$types/types';
import {} from '$utils/graph';

export const load: PageLoad = async ({ fetch }: { fetch: typeof window.fetch }) => {
	// Fetch sections
	const res = await fetch(`${base}/api/sections`);
	const sections: string[] = await res.json();

	// Fetch pages for each section
	const results: PageMeta[][] = await Promise.all(
		sections.map(async (section) => {
			const res = await fetch(`${base}/api/${section}`);
			return res.ok ? ((await res.json()) as PageMeta[]) : [];
		})
	);

	// Flatten all pages
	const content: PageMeta[] = results.flat();

	return { content };
};
