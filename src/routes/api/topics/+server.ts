import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { listPages } from '$utils/apis';
import type { Page } from '$types/types';

export const GET: RequestHandler = async () => {
	// Get all pages
	const pages: Page[] = await listPages();

	// Extract unique topics
	const topics: string[] = [
		...new Set(pages.map((p: any) => p.meta.topic?.split(' ') || []).flat(2))
	] as string[];

	return json({ topics });
};
