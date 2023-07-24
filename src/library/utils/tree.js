import { toUpper } from '$utils/format';

function deepInsert(tree, path) {
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
}

function convertNode(tree) {
	if (Array.isArray(tree)) {
		return tree;
	} else {
		return Object.entries(tree).map(([label, items]) => ({
			label: toUpper(label),
			items: convertNode(items)
		}));
	}
}

export { deepInsert, convertNode };
