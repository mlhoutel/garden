import { error } from '@sveltejs/kit';
import { deepInsert, convertNode } from '$utils/tree';
import { listPages } from '$utils/apis';
import { toUpper } from '$utils/format';
import type { Page, SectionLoadReturn } from '$types/types';

export const load = async ({
	params
}: {
	params: { section?: string };
}): Promise<SectionLoadReturn> => {
	const { section } = params;

	if (!section) throw error(404, 'Section not found');

	// Fetch all pages in this section
	const pages: Page[] = await listPages(section);

	// No pages = invalid section
	if (pages.length === 0) throw error(404, 'Section not found');

	// Build tree for navigation
	const tree: Record<string, any> = {};
	for (const page of pages) {
		const path = [page.meta.subsection, page];
		deepInsert(tree, path);
	}

	const convertedTree = convertNode(tree);

	return {
		tree: convertedTree,
		title: toUpper(section)
	};
};
