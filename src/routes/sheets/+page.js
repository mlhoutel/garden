import { base } from '$app/paths';
import { toUpper } from '$utils/format';

export const load = async ({ fetch }) => {
	const response = await fetch(`${base}/api/sheets`);
	const sheets = await response.json();

	const deepInsert = (tree, path) => {
		if (path.length < 2) throw Error('bottom of path reached before assignment');
		if (path.length == 2) {
			const [key, value] = path;
			if (!tree[key]?.length) tree[key] = [];
			tree[key].push(value);
		} else {
			const key = path[0];
			tree[key] = {};
			deepInsert(tree[key], path.slice(1));
		}
	};

	const convertNode = (tree) => {
		if (Array.isArray(tree)) {
			return tree;
		} else {
			return Object.entries(tree).map(([label, items]) => ({
				label: toUpper(label),
				items: convertNode(items)
			}));
		}
	};

	const tree = {};
	for (const sheet of sheets) {
		const splited = [...sheet.file.split('/').slice(1, -1), sheet];
		deepInsert(tree, splited);
	}

	return { tree: convertNode(tree) };
};
