<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import * as d3 from 'd3';
	import type { Node, Edge, GraphData, SimulationNode, SimulationLink } from '$types/types';

	export let nodes: Node[] = [];
	export let edges: Edge[] = [];
	export let currentNodeId: string | null = null;

	let svgContainer: SVGSVGElement;
	let simulation: d3.Simulation<SimulationNode, SimulationLink>;

	const nodeMinRadius = 5;
	const nodeScale = 3;
	const linkWidthScale = 2;

	// Color scales
	const color = d3.scaleOrdinal<string>(d3.schemeCategory10);
	const nodeColor = '#your-color';
	const linkColor = '#your-color';
	const hoverColor = '#your-color';

	// Hover state
	let hoveredNodeId: string | null = null;
	let hoveredNeighbours: Set<string> = new Set();

	function setupGraph() {
		if (!nodes.length || !edges.length) return;

		// Deep copies for D3 mutation
		const dNodes: SimulationNode[] = nodes.map((n) => ({ ...n }));
		const dLinks: SimulationLink[] = edges.map((e) => ({
			...e,
			source: e.source_id,
			target: e.target_id
		}));

		svgContainer.innerHTML = '';
		const width = svgContainer.clientWidth;
		const height = svgContainer.clientHeight;

		const svg = d3
			.select(svgContainer)
			.attr('viewBox', [-width / 2, -height / 2, width, height])
			.style('max-width', '100%')
			.style('height', 'auto')
			.style('background', 'transparent');

		// --- Links ---
		const link = svg
			.append('g')
			.attr('stroke', '#aaa')
			.attr('stroke-opacity', 0.6)
			.selectAll<SVGLineElement, SimulationLink>('line')
			.data(dLinks)
			.join('line')
			.attr('stroke-width', (d) => (d.size || 1) * linkWidthScale)
			.attr('stroke', linkColor);

		// --- Nodes ---
		const node = svg
			.append('g')
			.attr('stroke', '#fff')
			.attr('stroke-width', 1.5)
			.selectAll<SVGCircleElement, SimulationNode>('circle')
			.data(dNodes)
			.join('circle')
			.attr('r', (d) => nodeMinRadius + Math.sqrt(d.size || 1) * nodeScale)
			.attr('fill', (d) => (d.id === currentNodeId ? '#FF7F50' : color(d.id)));

		// --- Labels ---
		const labels = svg
			.append('g')
			.selectAll<SVGTextElement, SimulationNode>('text')
			.data(dNodes)
			.join('text')
			.text((d) => d.label)
			.attr('font-size', 12)
			.attr('dy', '-1em')
			.attr('fill', '#fff')
			.attr('text-anchor', 'middle');

		// --- Drag behavior ---
		const dragBehaviour = d3
			.drag<SVGCircleElement, SimulationNode>()
			.on('start', (event, d) => {
				if (!event.active) simulation.alphaTarget(0.3).restart();
				d.fx = d.x;
				d.fy = d.y;
			})
			.on('drag', (event, d) => {
				d.fx = event.x;
				d.fy = event.y;
			})
			.on('end', (event, d) => {
				if (!event.active) simulation.alphaTarget(0);
				d.fx = null;
				d.fy = null;
			});

		node.call(dragBehaviour);

		// --- Force simulation ---
		const radius = Math.min(width, height) / 3;

		simulation = d3
			.forceSimulation<SimulationNode>(dNodes)
			.force(
				'link',
				d3
					.forceLink<SimulationNode, SimulationLink>(dLinks)
					.id((d) => d.id)
					.distance(120)
			)
			.force('charge', d3.forceManyBody().strength(-80))
			.force('center', d3.forceCenter(0, 0))
			.force(
				'collision',
				d3
					.forceCollide<SimulationNode>()
					.radius((d) => nodeMinRadius + Math.sqrt(d.size || 1) * nodeScale + 3)
			)
			.force('radial', d3.forceRadial(radius, 0, 0).strength(0.2))
			.alphaDecay(0.05);

		simulation.on('tick', () => {
			link
				.attr('x1', (d) => (typeof d.source === 'object' ? (d.source.x ?? 0) : 0))
				.attr('y1', (d) => (typeof d.source === 'object' ? (d.source.y ?? 0) : 0))
				.attr('x2', (d) => (typeof d.target === 'object' ? (d.target.x ?? 0) : 0))
				.attr('y2', (d) => (typeof d.target === 'object' ? (d.target.y ?? 0) : 0));

			node.attr('cx', (d) => d.x ?? 0).attr('cy', (d) => d.y ?? 0);

			labels
				.attr('x', (d) => d.x ?? 0)
				.attr('y', (d) => (d.y ?? 0) - (nodeMinRadius + Math.sqrt(d.size || 1) * nodeScale));
		});

		// --- Hover highlight ---
		node
			.on('mouseover', (event, d) => {
				hoveredNodeId = d.id;
				hoveredNeighbours = new Set(
					dLinks
						.filter(
							(l) =>
								(typeof l.source === 'object' ? l.source.id : l.source) === d.id ||
								(typeof l.target === 'object' ? l.target.id : l.target) === d.id
						)
						.flatMap((l) => [
							typeof l.source === 'object' ? l.source.id : l.source,
							typeof l.target === 'object' ? l.target.id : l.target
						])
				);

				node.attr('fill', (n) =>
					n.id === d.id || hoveredNeighbours.has(n.id) ? '#FF7F50' : '#888'
				);
				labels.attr('font-size', (n) => (n.id === d.id || hoveredNeighbours.has(n.id) ? 16 : 12));
				link.attr('stroke', (l) =>
					(typeof l.source === 'object' ? l.source.id : l.source) === d.id ||
					(typeof l.target === 'object' ? l.target.id : l.target) === d.id
						? '#FF7F50'
						: '#aaa'
				);
			})
			.on('mouseout', () => {
				hoveredNodeId = null;
				hoveredNeighbours.clear();
				node.attr('fill', (n) => (n.id === currentNodeId ? '#FF7F50' : color(n.id)));
				labels.attr('font-size', 12);
				link.attr('stroke', '#aaa');
			});
	}

	onMount(() => {
		setupGraph();
	});

	onDestroy(() => {
		simulation?.stop();
	});

	function toggleFullscreen() {
		if (!document.fullscreenElement) {
			svgContainer.requestFullscreen();
		} else {
			document.exitFullscreen();
		}
	}
</script>

<div class="relative h-[400px] w-full md:h-[700px]">
	<svg bind:this={svgContainer} class="h-full w-full"></svg>
	<button
		class="absolute top-2 right-2 z-10 rounded bg-gray-800 px-2 py-1 text-white"
		on:click={toggleFullscreen}
	>
		Fullscreen
	</button>
</div>
