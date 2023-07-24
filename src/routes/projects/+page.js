import { base } from '$app/paths';
import { deepInsert, convertNode } from '$utils/tree';

export const load = async ({ fetch }) => {
	const response = await fetch(`${base}/api/projects`);
	const projects = await response.json();

	const tree = {};
	for (const project of projects) {
		const splited = [...project.file.split('/').slice(1, -1), project];
		deepInsert(tree, splited);
	}

	return { tree: convertNode(tree) };
};
