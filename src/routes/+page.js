import { base } from '$app/paths';
import { makeGraph } from '$utils/graph.js';

export const load = async ({ fetch }) => {
	const posts_response = await fetch(`${base}/api/posts`);
	const posts = await posts_response.json();

	const sheets_response = await fetch(`${base}/api/sheets`);
	const sheets = await sheets_response.json();

	const snippets_response = await fetch(`${base}/api/snippets`);
	const snippets = await snippets_response.json();
	
	const projects_response = await fetch(`${base}/api/projects`);
	const projects = await projects_response.json();

	const topics = [...posts, ...sheets, ...snippets, ...projects].map((s) => s.meta.topic?.split(' ') || []);

	const { nodes, edges } = makeGraph(topics);

	return { nodes, edges };
};
