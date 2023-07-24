import { json } from '@sveltejs/kit';
import { makeGraph } from '$utils/graph.js';
import { listArticles, listProjects, listSheets } from '$utils/apis';

export const GET = async () => {
	const articles = await listArticles();
	const sheets = await listSheets();
	const projects = await listProjects();

	const topics = [...articles, ...sheets, ...projects].map((s) => s.meta.topic?.split(' ') || []);

	const { nodes, edges } = makeGraph(topics);

	return json({ nodes, edges });
};
