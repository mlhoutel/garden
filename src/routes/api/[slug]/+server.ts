import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { listPages } from '$utils/apis';
import type { Page } from '$types/types';

export const GET: RequestHandler = async ({ params }) => {
	const section: string = params.section ?? '';
	const pages: Page[] = await listPages(section);

	return json(pages);
};
