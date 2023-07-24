import { base } from '$app/paths';

export const load = async ({ fetch }) => {
	const response = await fetch(`${base}/api/graph`);
	const data = await response.json();

	return { nodes: data?.nodes ?? [], edges: data?.edges ?? [] };
};
