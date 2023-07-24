import { base } from '$app/paths';
import { deepInsert, convertNode } from '$utils/tree';

export const load = async ({ fetch }) => {
	const response = await fetch(`${base}/api/sheets`);
	const sheets = await response.json();

	const tree = {};
	for (const sheet of sheets) {
		const splited = [...sheet.file.split('/').slice(1, -1), sheet];
		deepInsert(tree, splited);
	}

	return { tree: convertNode(tree) };
};
