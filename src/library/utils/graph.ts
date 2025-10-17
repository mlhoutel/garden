import type { GraphData, Node, Edge } from '$types/types';
import type { Page } from '$types/types';
import crypto from 'crypto';

/** Generate unique edge IDs */
function edgeId(a: string, b: string): string {
	const [x, y] = [a, b].sort();
	return crypto.createHash('md5').update(`${x}-${y}`).digest('hex');
}

/** Build a topic graph:
 *  - Each topic is a node
 *  - Edges connect topics that co-occur in a page
 *  - Node size = number of pages that use this topic
 */
export function getTopicGraph(pages: Page[]): GraphData {
	const topicCounts = new Map<string, number>();
	const cooccurrence = new Map<string, number>();

	for (const page of pages) {
		const topics = page.meta.topics || [];
		for (const t of topics) {
			topicCounts.set(t, (topicCounts.get(t) || 0) + 1);
		}

		// For all topic pairs in this page, count co-occurrence
		for (let i = 0; i < topics.length; i++) {
			for (let j = i + 1; j < topics.length; j++) {
				const id = edgeId(topics[i], topics[j]);
				cooccurrence.set(id, (cooccurrence.get(id) || 0) + 1);
			}
		}
	}

	const nodes: Node[] = Array.from(topicCounts.entries()).map(([id, count]) => ({
		id,
		label: id,
		size: count,
		meta: { pages: count }
	}));

	const edges: Edge[] = Array.from(cooccurrence.entries()).map(([id, count]) => {
		// Extract original topics from hash
		// (Not stored, so we rebuild by sorting topic names again)
		const [source_id, target_id] = id.split('-');
		return { id, size: count, source_id, target_id };
	});

	return { nodes, edges };
}

/** Build a page network:
 *  - Each page is a node
 *  - Edges connect pages that share at least one topic
 *  - Edge size = number of shared topics
 */
export function getPageGraph(pages: Page[]): GraphData {
	const nodes: Node[] = pages.map((page) => ({
		id: page.meta.slug,
		label: page.meta.title || page.meta.slug,
		size: page.meta.words,
		meta: { ...page }
	}));

	const edgesMap = new Map<string, number>();

	for (let i = 0; i < pages.length; i++) {
		const p1 = pages[i];
		const topics1 = new Set(p1.meta.topics || []);

		for (let j = i + 1; j < pages.length; j++) {
			const p2 = pages[j];
			const topics2 = new Set(p2.meta.topics || []);

			const intersection = [...topics1].filter((t) => topics2.has(t));
			if (intersection.length > 0) {
				const id = edgeId(p1.meta.slug, p2.meta.slug);
				edgesMap.set(id, intersection.length);
			}
		}
	}

	const edges: Edge[] = Array.from(edgesMap.entries()).map(([id, count]) => {
		const [source_id, target_id] = id.split('-');
		return { id, size: count, source_id, target_id };
	});

	return { nodes, edges };
}
