import { base } from '$app/paths';

export const load = async ({ fetch }) => {
	const response = await fetch(`${base}/api/sheets`);
	const sheets = await response.json();

	// reconstruct file tree
	let tree = {};

	for (const sheet of sheets) {
		const splited = sheet.path.split('/').slice(1);

		let cursor = tree;
		for (const [index, path] of splited.entries()) {
			if (!cursor[path]) cursor[path] = {};

			if (index == splited.length - 1) {
				cursor[path] = sheet;
			} else {
				cursor = cursor[path];
			}
		}
	}

	return {
		tree
	};
};
