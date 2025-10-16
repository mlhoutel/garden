import seedrandom from 'seedrandom';
import type { Vec2 as Vec2Type, Node as NodeType, Edge as EdgeType } from '$types/types';

class Vec2 implements Vec2Type {
	constructor(
		public x: number,
		public y: number
	) {}

	add(other: Vec2) {
		return new Vec2(this.x + other.x, this.y + other.y);
	}

	times(scalar: number) {
		return new Vec2(this.x * scalar, this.y * scalar);
	}

	get length(): number {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	get normalized(): Vec2 {
		const len = this.length || 1;
		return this.times(1 / len);
	}

	get negated(): Vec2 {
		return new Vec2(-this.x, -this.y);
	}
}

class Node implements NodeType {
	label: string;
	count: number;
	pos: Vec2;

	constructor(label: string, count: number) {
		this.label = label;
		this.count = count;
		this.pos = new Vec2(0, 0);
	}
}

class Edge implements EdgeType {
	nodeA: Node;
	nodeB: Node;
	count: number;

	constructor(nodeA: Node, nodeB: Node, count: number) {
		this.nodeA = nodeA;
		this.nodeB = nodeB;
		this.count = count;
	}
}

function makePairs(items: string[]): [string, string][] {
	const pairs: [string, string][] = [];
	for (let i = 0; i < items.length - 1; i++) {
		for (let j = i + 1; j < items.length; j++) {
			pairs.push([items[i], items[j]]);
		}
	}
	return pairs;
}

function generateNodes(list: string[][]) {
	const sorted = list.map((t) => [...t].sort());

	const l_nodes: Record<string, number> = {};
	for (const topics of sorted) {
		for (const topic of topics) {
			l_nodes[topic] = (l_nodes[topic] || 0) + 1;
		}
	}

	const l_edges: Record<string, number> = {};
	for (const topics of sorted) {
		const pairs = makePairs(topics);
		for (const pair of pairs) {
			const key = pair.join(',');
			l_edges[key] = (l_edges[key] || 0) + 1;
		}
	}

	const nodes = Object.entries(l_nodes).map(([label, count]) => new Node(label, count));
	const map_nodes: Record<string, Node> = {};
	for (const node of nodes) map_nodes[node.label] = node;

	const edges = Object.entries(l_edges).map(([labels, count]) => {
		const [labelA, labelB] = labels.split(',');
		return new Edge(map_nodes[labelA], map_nodes[labelB], count);
	});

	return { nodes, edges };
}

function stepGraph(nodes: Node[], edges: Edge[]) {
	const SPACING = 12;

	for (let i = 0; i < nodes.length - 1; i++) {
		for (let j = i + 1; j < nodes.length; j++) {
			const nodeA = nodes[i];
			const nodeB = nodes[j];

			const diff_pos = nodeB.pos.add(nodeA.pos.negated);
			const diff_dist = diff_pos.length;

			if (diff_dist < SPACING) {
				const correction = (SPACING - diff_dist) / 2;
				const halfspace = diff_pos.normalized.times(correction);

				nodeA.pos = nodeA.pos.add(halfspace.negated);
				nodeB.pos = nodeB.pos.add(halfspace);
			}
		}
	}

	for (const edge of edges) {
		const nodeA = edge.nodeA;
		const nodeB = edge.nodeB;

		const diff_pos = nodeB.pos.add(nodeA.pos.negated);
		const diff_dist = diff_pos.length;

		if (diff_dist > SPACING) {
			const correction = (diff_dist - SPACING) / 2;
			const halfspace = diff_pos.normalized.times(correction);

			nodeA.pos = nodeA.pos.add(halfspace);
			nodeB.pos = nodeB.pos.add(halfspace.negated);
		}
	}
}

export function makeGraph(list: string[][]) {
	const { nodes, edges } = generateNodes(list);
	const random = seedrandom('WhYVgpjCm0ToYmfJz8Lt');

	for (const node of nodes) {
		node.pos = new Vec2(random() * 400, random() * 400);
	}

	for (let i = 0; i < 10000; i++) stepGraph(nodes, edges);

	return { nodes, edges };
}
