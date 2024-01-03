import { json } from '@sveltejs/kit';
import { listArticles, listSheets } from '$utils/apis';

export const GET = async () => {
	const articles = await listArticles();
	const sheets = await listSheets();

	const topics = [
		...new Set([...articles, ...sheets].map((s) => s.meta.topic?.split(' ') || []).flat(2))
	];

	return json({ topics });
};
