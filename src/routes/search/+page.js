import { base } from '$app/paths';

export const load = async ({ fetch }) => {
	const res = await fetch(`${base}/api/sections`);
	const sections = await res.json();

	const results = await Promise.all(
		sections.map(async (section) => {
			const res = await fetch(`${base}/api/${section}`);
			return res.ok ? await res.json() : [];
		})
	);

	// Flatten all pages from all sections
	const content = results.flat();

	return { content };
};
