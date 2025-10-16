import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { makeGraph } from '$utils/graph';
import { listPages } from '$utils/apis';
import pagesManifest from '$meta/manifest.json';
import type { Page } from '$types/types';

export const GET: RequestHandler = async () => {
	// Get all unique sections
	const sections: string[] = [
		...new Set(pagesManifest.map((p: any) => String(p.section)))
	] as string[];

	// Fetch all pages for each section
	const pages: Page[] = (
		await Promise.all(sections.map(async (section) => await listPages(section)))
	).flat();

	// Extract topics from pages
	const topics: string[][] = pages.map((s) => s.meta.topic?.split(' ') || []);

	// Generate graph nodes and edges
	const { nodes, edges } = makeGraph(topics);

	return json({ nodes, edges });
};
