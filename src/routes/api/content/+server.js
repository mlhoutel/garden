import { json } from '@sveltejs/kit';
import { listArticles, listProjects, listSheets } from '$utils/apis';

export const GET = async ({ url }) => {
	const articles = await listArticles();
	const sheets = await listSheets();

	const projects = await listProjects();

	const content = [
		...articles.map((e) => ({ ...e, type: 'article' })),
		...sheets.map((e) => ({ ...e, type: 'sheet' })),
		...projects.map((e) => ({ ...e, type: 'project' }))
	];

	return json({ content });
};
