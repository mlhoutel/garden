import { base } from '$app/paths';

export const load = async ({ fetch }) => {
	const response = await fetch(`${base}/api/graph`);
	const { nodes, edges } = (await response.json()) || { nodes: [], edges: [] };

	return { nodes, edges };
};
