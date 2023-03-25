class Vec2 {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	add(other) {
		return new Vec2(this.x + other.x, this.y + other.y);
	}

	times(other) {
		return new Vec2(this.x * other, this.y * other);
	}

	get length() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	get normalized() {
		return this.times(1 / this.length);
	}

	get negated() {
		return new Vec2(-this.x, -this.y);
	}
}

class Node {
	constructor(label, count) {
		this.label = label;
		this.count = count;
		this.pos = new Vec2(0, 0);
	}
}

class Edge {
	constructor(nodeA, nodeB, count) {
		this.nodeA = nodeA;
		this.nodeB = nodeB;
		this.count = count;
	}
}

/**
 * @param {[string]} items
 */
function makePairs(items) {
	const pairs = [];

	for (let i = 0; i < items.length - 1; i++) {
		for (let j = i + 1; j < items.length; j++) {
			pairs.push([items[i], items[j]]);
		}
	}

	return pairs;
}

/**
 * Generate the Nodes and Edges
 * @param {[[string]]} list topics
 */
function generateNodes(list) {
	// we sort the items for unilateral relations
	const sorted = list.map((t) => t.sort());

	// determine each nodes (label: count)
	const l_nodes = {};

	// fill the nodes with the topics
	for (const topics of sorted) {
		for (const topic of topics) {
			l_nodes[topic] = l_nodes[topic] ? l_nodes[topic] + 1 : 1;
		}
	}

	const l_edges = {};

	for (const topic of sorted) {
		const pairs = makePairs(topic);

		for (const pair of pairs) {
			l_edges[pair] = l_edges[pair] ? l_edges[pair] + 1 : 1;
		}
	}

	const nodes = Object.entries(l_nodes).map(([label, count]) => new Node(label, count));

	const map_nodes = {};

	for (const node of nodes) {
		map_nodes[node.label] = node;
	}

	const edges = Object.entries(l_edges).map(([labels, count]) => {
		const [labelA, labelB] = labels.split(',');
		const nodeA = map_nodes[labelA];
		const nodeB = map_nodes[labelB];
		return new Edge(nodeA, nodeB, count);
	});

	return { nodes, edges };
}

/**
 * Apply a convergeance step on the graph:
 *  - repulsive force between nodes
 *  - attractive force with edges
 * @param {*} nodes
 * @param {*} edges
 */
function stepGraph(nodes, edges) {
	const SPACING = 12;

	// repulsive force between distinct pairs
	for (let i = 0; i < nodes.length - 1; i++) {
		for (let j = i + 1; j < nodes.length; j++) {
			const nodeA = nodes[i];
			const nodeB = nodes[j];

			const diff_pos = nodeB.pos.add(nodeA.pos.negated);
			const diff_dist = Math.sqrt(diff_pos.length);

			if (diff_dist < SPACING) {
				const correction = (SPACING - diff_dist) / 2;
				const normal = diff_pos.normalized;
				const halfspace = normal.times(correction);

				nodeA.pos = nodeA.pos.add(halfspace.negated);
				nodeB.pos = nodeB.pos.add(halfspace);
			}
		}
	}

	// limit distance with edges
	for (const edge of edges) {
		const nodeA = edge.nodeA;
		const nodeB = edge.nodeB;

		const diff_pos = nodeB.pos.add(nodeA.pos.negated);
		const diff_dist = Math.sqrt(diff_pos.length);

		if (diff_dist > SPACING) {
			const correction = (diff_dist - SPACING) / 2;
			const normal = diff_pos.normalized;
			const halfspace = normal.times(correction);

			nodeA.pos = nodeA.pos.add(halfspace);
			nodeB.pos = nodeB.pos.add(halfspace.negated);
		}
	}
}

import seedrandom from 'seedrandom'

function makeGraph(list) {
	const { nodes, edges } = generateNodes(list);

	const random = new seedrandom('WhYVgpjCm0ToYmfJz8Lt');

	// randomize initial positions
	for (const node of nodes) {
		node.pos = new Vec2(random() * 300, random() * 300);
	}

	for (let i = 0; i < 10000; i++) {
		stepGraph(nodes, edges);
	}

	return { nodes, edges };
}

export { makeGraph };
