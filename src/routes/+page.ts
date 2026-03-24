import type { PageLoad } from './$types';
import { base } from '$app/paths';
import type { Node, Edge, Page } from '$types/types';
import { listPages } from '$utils/apis';

export const load: PageLoad = async ({ fetch }: { fetch: typeof window.fetch }) => {
	const response = await fetch(`${base}/api/topics`);
	const data: { nodes?: Node[]; edges?: Edge[] } = await response.json();

	const [articles, sheets, snippets] = await Promise.all([
		listPages('articles'),
		listPages('sheets'),
		listPages('snippets')
	]);

	// Latest 5 articles, sorted newest first
	const latestArticles = [...articles]
		.sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime())
		.slice(0, 5);

	return {
		nodes: data.nodes ?? [],
		edges: data.edges ?? [],
		sections: {
			articles: articles.length,
			sheets: sheets.length,
			snippets: snippets.length
		},
		latestArticles
	};
};
