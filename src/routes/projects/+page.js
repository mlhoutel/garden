import { base } from '$app/paths';

export const load = async ({ fetch }) => {
	const response = await fetch(`${base}/api/projects`);
	const projects = await response.json();

	return {
		projects
	};
};
