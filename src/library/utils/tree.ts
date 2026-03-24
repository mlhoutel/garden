import { toUpper } from '$utils/format';
import type { TreeNode, ConvertedNode } from '$types/types';

/**
 * Deeply insert a value into a nested tree structure.
 * @param tree - The tree object to insert into
 * @param path - Array representing the path: [key1, key2, ..., value]
 */
function deepInsert(tree: Record<string, any> | any[], path: (string | number | any)[]): void {
	if (path.length < 2) {
		throw new Error('Bottom of path reached before assignment');
	}

	if (path.length === 2) {
		const [key, value] = path;
		if (Array.isArray(tree)) {
			if (typeof key !== 'number') {
				throw new Error('Array index must be a number');
			}
			if (!Array.isArray(tree[key])) tree[key] = [];
			tree[key].push(value);
		} else {
			if (!tree[key] || !Array.isArray(tree[key])) {
				tree[key] = [];
			}
			tree[key].push(value);
		}
	} else {
		const key = path[0];
		if (Array.isArray(tree)) {
			if (typeof key !== 'number') {
				throw new Error('Array index must be a number');
			}
			if (!tree[key] || typeof tree[key] !== 'object') tree[key] = {};
			deepInsert(tree[key], path.slice(1));
		} else {
			if (!tree[key] || typeof tree[key] !== 'object') tree[key] = {};
			deepInsert(tree[key], path.slice(1));
		}
	}
}

/**
 * Convert a nested tree object into an array of labeled nodes.
 * @param tree - The input tree
 * @returns Array of nodes with `label` and `items`
 */
function convertNode(tree: TreeNode): ConvertedNode[] | any[] {
	if (Array.isArray(tree)) {
		return tree;
	} else {
		// Reverse so that numeric keys (years) appear newest-first.
		// Object.entries returns integer-like keys in ascending order per the JS spec,
		// but we want descending (2024, 2023, 2022...).
		return Object.entries(tree)
			.reverse()
			.map(([label, items]) => ({
				label: toUpper(label),
				items: convertNode(items)
			}));
	}
}

export type { TreeNode, ConvertedNode };
export { deepInsert, convertNode };
