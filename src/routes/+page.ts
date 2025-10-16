import type { PageLoad } from './$types';
import { base } from '$app/paths';
import type { Node, Edge } from '$types/types';

export const load: PageLoad = async ({ fetch }: { fetch: typeof window.fetch }) => {
	const response = await fetch(`${base}/api/graph`);
	const data: { nodes?: Node[]; edges?: Edge[] } = await response.json();

	return {
		nodes: data.nodes ?? [],
		edges: data.edges ?? []
	};
};
