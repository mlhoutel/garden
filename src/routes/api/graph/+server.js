import { json } from '@sveltejs/kit';
import { makeGraph } from '$utils/graph.js';
import { listPosts, listProjects, listSheets, listSnippets } from '$utils/apis';

export const GET = async () => {
	const posts = await listPosts();
	const sheets = await listSheets();
	const snippets = await listSnippets();
	const projects = await listProjects();

	const topics = [...posts, ...sheets, ...snippets, ...projects].map(
		(s) => s.meta.topic?.split(' ') || []
	);

	const { nodes, edges } = makeGraph(topics);

	return json({ nodes, edges });
};
