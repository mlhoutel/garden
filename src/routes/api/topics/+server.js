import { json } from '@sveltejs/kit';
import { listPages } from '$utils/apis';

export const GET = async () => {
	const pages = await listPages();

	const topics = [...new Set([...pages].map((s) => s.meta.topic?.split(' ') || []).flat(2))];

	return json({ topics });
};
