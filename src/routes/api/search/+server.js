import { json } from '@sveltejs/kit';
import { listArticles, listProjects, listSheets } from '$utils/apis';
import { searchDecodeUrl, searchEncodeUrl } from '$utils/format.js';

export const GET = async ({ url }) => {
	const filters = searchDecodeUrl(url, { topics: [], words: [] });

	const articles = await listArticles();
	const sheets = await listSheets();

	const projects = await listProjects();

	const content = [
		...articles.map((e) => ({ ...e, type: 'article' })),
		...sheets.map((e) => ({ ...e, type: 'sheet' })),
		...projects.map((e) => ({ ...e, type: 'project' }))
	];

	const results = content.filter((e) => {
		const hasTopics = filters.topics.reduce((acc, cur) => acc && e.meta.topic?.includes(cur), true);
		return hasTopics;
	});

	return json({ results });
};
