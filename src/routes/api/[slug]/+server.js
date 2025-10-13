import { json } from '@sveltejs/kit';
import { listPages } from '$utils/apis';

export async function GET({ params }) {
	const section = params.section;
	const pages = await listPages(section);

	return json(pages);
}
