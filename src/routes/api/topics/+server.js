import { json } from '@sveltejs/kit';
import { listArticles, listProjects, listSheets } from '$utils/apis';

export const GET = async () => {
	const articles = await listArticles();
	const sheets = await listSheets();
	const projects = await listProjects();

	const topics = [
		...new Set(
			[...articles, ...sheets, ...projects].map((s) => s.meta.topic?.split(' ') || []).flat(2)
		)
	];

	return json({ topics });
};
