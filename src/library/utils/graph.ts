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

/**
 * Topic normalization groups — aliases are merged into the canonical key.
 * Merged node size = sum of all members' page counts.
 * All edges from aliases are redirected to the canonical.
 */
const TOPIC_GROUPS: Record<string, string[]> = {
	// AI / ML
	'artificial-intelligence': ['machine-learning', 'deep-learning', 'neural-networks', 'backpropagation'],
	'nlp':                     ['transformers', 'tokenization', 'embeddings'],
	'statistics':              ['probability', 'bayesian', 'loss-functions', 'gradient-descent'],

	// Algorithms & data
	'algorithms':              ['algorithm', 'dynamic-programming', 'memoization', 'shortest-path',
	                            'spanning-tree', 'cycle-detection', 'binary-search', 'brute-force',
	                            'satisfiability', 'traversal'],
	'graphs':                  ['graph-theory', 'connectivity'],
	'data-structures':         ['linked-lists', 'arrays', 'hashing', 'segmenttree', 'querying'],

	// Maths
	'maths':                   ['linear-algebra', 'geometry', 'discrete', 'number-theory',
	                            'arithmetic', 'primes', 'combinatorics', 'analysis'],
	'numerical-methods':       ['interpolation', 'approximation', 'convergence'],
	'performance':             ['profiling', 'optimization'],

	// Encoding / data formats
	'encoding':                ['base', 'binary', 'serialization', 'ascii', 'characters', 'base64'],

	// Systems & infra
	'unix':                    ['linux', 'posix'],
	'networking':              ['peer-to-peer'],
	'web-server':              ['nginx', 'reverse-proxy'],
	'devops':                  ['containers', 'deployment', 'cloud'],

	// Frontend
	'state-management':        ['state', 'management', 'communication', 'reactivity', 'signals'],
	'components':              ['dom', 'rendering', 'virtualization'],
	'design-patterns':         ['fluent-api', 'patterns', 'design', 'architecture'],

	// Making & simulation
	'simulation':              ['nbody', 'physics', 'barnes-hut', 'quadtree'],
	'making':                  ['fablab', 'laser-cutting', 'repair', 'fabrication'],
	'3d-modeling':             ['blender'],
	'music':                   ['guitar', 'tablatures', 'alphatab', 'midi'],

	// Tooling & docs
	'tooling':                 ['shortcuts', 'productivity', 'cmder', 'vim', 'vs-code'],
	'documentation':           ['docs', 'sphinx'],
	'build':                   ['bundling'],
};

/** Build alias→canonical map from TOPIC_GROUPS */
function buildAliasMap(): Map<string, string> {
	const m = new Map<string, string>();
	for (const [canonical, aliases] of Object.entries(TOPIC_GROUPS)) {
		for (const alias of aliases) m.set(alias, canonical);
	}
	return m;
}

/** Build a topic graph:
 *  - Each topic is a node (with alias groups merged into canonical)
 *  - Edges connect topics that co-occur in a page
 *  - Node size = number of pages that use this topic
 */
export function getTopicGraph(pages: Page[]): GraphData {
	const aliasMap = buildAliasMap();
	const normalize = (t: string) => aliasMap.get(t) ?? t;

	const topicCounts = new Map<string, number>();
	const cooccurrence = new Map<string, number>();

	for (const page of pages) {
		// Normalize and deduplicate topics per page
		const raw = getTopics(page);
		const topics = [...new Set(raw.map(normalize))];

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

	// Degree = number of distinct co-topics (after normalization/merging)
	const degree = new Map<string, number>();
	for (const key of cooccurrence.keys()) {
		const [a, b] = parseEdgeKey(key);
		degree.set(a, (degree.get(a) || 0) + 1);
		degree.set(b, (degree.get(b) || 0) + 1);
	}

	// Importance = √(pageCount × (degree + 1))
	// Geometric mean of frequency and connectivity — topics must score on both to rank as hubs.
	// Produces a natural Zipfian distribution: a few high scores, many low scores.
	const nodes: Node[] = Array.from(topicCounts.entries()).map(([id, count]) => ({
		id,
		label: id,
		size: Math.sqrt(count * ((degree.get(id) || 0) + 1)),
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
