import { error } from '@sveltejs/kit';
import { deepInsert, convertNode } from '$utils/tree';
import { listPages } from '$utils/apis';
import { toUpper } from '$utils/format';

/** @type {import('./$types').PageLoad} */
export const load = async ({ params }) => {
	const { section } = params;

	if (!section) {
		throw error(404, 'Section not found');
	}

	// Fetch all pages in this section
	const pages = await listPages(section);

	// Build tree for navigation
	const tree = {};
	for (const page of pages) {
		const splited = [page.subsection, page];
		deepInsert(tree, splited);
	}

	const convertedTree = convertNode(tree);

	return {
		tree: convertedTree,
		title: toUpper(section)
	};
};
