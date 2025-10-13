import { json } from '@sveltejs/kit';
import { makeGraph } from '$utils/graph.js';
import { listPages } from '$utils/apis';
import pagesManifest from '$meta/manifest.json';

export const GET = async () => {
	const sections = [...new Set(pagesManifest.map((p) => p.section))];

	const pages = (
		await Promise.all(sections.map(async (section) => await listPages(section)))
	).flat();

	const topics = [...pages].map((s) => s.meta.topic?.split(' ') || []);

	const { nodes, edges } = makeGraph(topics);

	return json({ nodes, edges });
};
