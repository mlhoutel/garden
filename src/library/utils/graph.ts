import type { GraphData, Node, Edge } from '$types/types';
import type { Page } from '$types/types';

/** Generate a stable unique edge ID from two node IDs */
function edgeKey(a: string, b: string): string {
	const [x, y] = [a, b].sort();
	return `${x}|||${y}`;
}

function parseEdgeKey(key: string): [string, string] {
	const [a, b] = key.split('|||');
	return [a, b];
}

function getTopics(page: Page): string[] {
	return page.meta.topic ? page.meta.topic.split(' ').filter(Boolean) : [];
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
		const topics = getTopics(page);
		for (const t of topics) {
			topicCounts.set(t, (topicCounts.get(t) || 0) + 1);
		}

		for (let i = 0; i < topics.length; i++) {
			for (let j = i + 1; j < topics.length; j++) {
				const key = edgeKey(topics[i], topics[j]);
				cooccurrence.set(key, (cooccurrence.get(key) || 0) + 1);
			}
		}
	}

	const nodes: Node[] = Array.from(topicCounts.entries()).map(([id, count]) => ({
		id,
		label: id,
		size: count,
		meta: { pages: count }
	}));

	const edges: Edge[] = Array.from(cooccurrence.entries()).map(([key, count]) => {
		const [source_id, target_id] = parseEdgeKey(key);
		return { id: key, size: count, source_id, target_id };
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
		const topics1 = new Set(getTopics(p1));

		for (let j = i + 1; j < pages.length; j++) {
			const p2 = pages[j];
			const topics2 = new Set(getTopics(p2));

			const intersection = [...topics1].filter((t) => topics2.has(t));
			if (intersection.length > 0) {
				const key = edgeKey(p1.meta.slug, p2.meta.slug);
				edgesMap.set(key, intersection.length);
			}
		}
	}

	const edges: Edge[] = Array.from(edgesMap.entries()).map(([key, count]) => {
		const [source_id, target_id] = parseEdgeKey(key);
		return { id: key, size: count, source_id, target_id };
	});

	return { nodes, edges };
}
