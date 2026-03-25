<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import * as d3 from 'd3';
	import seedrandom from 'seedrandom';
	import type { Node, Edge, SimulationNode, SimulationLink } from '$types/types';
	import OrbitalLoader from './OrbitalLoader.svelte';

	let {
		nodes = [],
		edges = [],
		loading = $bindable(true)
	}: { nodes: Node[]; edges: Edge[]; loading?: boolean } = $props();

	let wrapperEl: HTMLDivElement;
	let svgContainer: SVGSVGElement;
	let linkCanvas: HTMLCanvasElement;
	let simulation: d3.Simulation<SimulationNode, SimulationLink>;
	// loading is a $bindable prop
	let shootingStarTimer: ReturnType<typeof setTimeout>;
	let shootingStarsActive = false;

	const nodeMinRadius = 0.6;
	const nodeScale = 2.5;

	const GOLD = '#D4A017';
	const GOLD_BRIGHT = '#F5E6B8';
	const OFF_WHITE = '#FFFEF6';
	const LINK_COLOR = '#3A3A3A';
	const BG = '#1A1A1A';

	const PLANET_COLORS = [
		'#D4A017',
		'#D4A017',
		'#D4A017',
		'#C9A84C',
		'#E8C45A',
		'#B8860B',
		'#D4943A',
		'#C7985B',
		'#A8B8C8',
		'#8AAFC4',
		'#C4A882',
		'#D4A880'
	];

	function planetColor(d: SimulationNode, i: number): string {
		return PLANET_COLORS[(i * 7 + Math.floor(d.size)) % PLANET_COLORS.length];
	}

	function drawGeometricBackground(
		svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
		width: number,
		height: number
	) {
		const rng = seedrandom('dune-geom');
		const g = svg.append('g').attr('class', 'bg-geometry').attr('opacity', 0.06);

		for (let i = 1; i <= 5; i++) {
			const r = 40 + i * 55 + (rng() - 0.5) * 20;
			g.append('circle')
				.attr('cx', 0)
				.attr('cy', 0)
				.attr('r', r)
				.attr('fill', 'none')
				.attr('stroke', GOLD)
				.attr('stroke-width', 0.5)
				.attr('stroke-dasharray', `${2 + rng() * 6},${4 + rng() * 12}`);
		}

		for (let i = 0; i < 12; i++) {
			const angle = rng() * Math.PI * 2;
			const dist = 80 + rng() * Math.min(width, height) * 0.35;
			const x = Math.cos(angle) * dist,
				y = Math.sin(angle) * dist;
			const size = 4 + rng() * 14;
			g.append('polygon')
				.attr('points', `0,${-size} ${size * 0.5},0 0,${size} ${-size * 0.5},0`)
				.attr('transform', `translate(${x},${y}) rotate(${rng() * 360})`)
				.attr('fill', 'none')
				.attr('stroke', GOLD)
				.attr('stroke-width', 0.4);
		}

		for (let i = 0; i < 8; i++) {
			const angle = rng() * Math.PI * 2;
			const dist = 100 + rng() * Math.min(width, height) * 0.3;
			const x = Math.cos(angle) * dist,
				y = Math.sin(angle) * dist;
			const size = 3 + rng() * 8;
			g.append('rect')
				.attr('x', -size / 2)
				.attr('y', -size / 2)
				.attr('width', size)
				.attr('height', size)
				.attr('transform', `translate(${x},${y}) rotate(${rng() * 90})`)
				.attr('fill', 'none')
				.attr('stroke', GOLD)
				.attr('stroke-width', 0.3);
		}

		for (let i = 0; i < 24; i++) {
			const angle = (i / 24) * Math.PI * 2 + (rng() - 0.5) * 0.1;
			const r1 = 30 + rng() * 40,
				r2 = r1 + 15 + rng() * 60;
			g.append('line')
				.attr('x1', Math.cos(angle) * r1)
				.attr('y1', Math.sin(angle) * r1)
				.attr('x2', Math.cos(angle) * r2)
				.attr('y2', Math.sin(angle) * r2)
				.attr('stroke', GOLD)
				.attr('stroke-width', 0.3);
		}

		for (let i = 0; i < 6; i++) {
			const angle = rng() * Math.PI * 2;
			const dist = 120 + rng() * Math.min(width, height) * 0.25;
			const x = Math.cos(angle) * dist,
				y = Math.sin(angle) * dist;
			const size = 4 + rng() * 10;
			g.append('polygon')
				.attr('points', `0,${-size} ${size * 0.866},${size * 0.5} ${-size * 0.866},${size * 0.5}`)
				.attr('transform', `translate(${x},${y}) rotate(${rng() * 360})`)
				.attr('fill', 'none')
				.attr('stroke', GOLD)
				.attr('stroke-width', 0.3);
		}

		const ch = g.append('g');
		ch.append('line')
			.attr('x1', -12)
			.attr('y1', 0)
			.attr('x2', -4)
			.attr('y2', 0)
			.attr('stroke', GOLD)
			.attr('stroke-width', 0.5);
		ch.append('line')
			.attr('x1', 4)
			.attr('y1', 0)
			.attr('x2', 12)
			.attr('y2', 0)
			.attr('stroke', GOLD)
			.attr('stroke-width', 0.5);
		ch.append('line')
			.attr('x1', 0)
			.attr('y1', -12)
			.attr('x2', 0)
			.attr('y2', -4)
			.attr('stroke', GOLD)
			.attr('stroke-width', 0.5);
		ch.append('line')
			.attr('x1', 0)
			.attr('y1', 4)
			.attr('x2', 0)
			.attr('y2', 12)
			.attr('stroke', GOLD)
			.attr('stroke-width', 0.5);
	}

	// Shooting star colors -mostly gold/white with rare blue/amber variants
	const STAR_COLORS = [
		GOLD_BRIGHT,
		GOLD_BRIGHT,
		OFF_WHITE,
		OFF_WHITE,
		'#E8D5A3',
		'#FFFFFF',
		'#C8D8E8',
		'#F0C870',
		'#D4C4A0'
	];

	/** Spawn a single shooting star with varied speed, length, direction and brightness */
	function spawnShootingStar(
		starsGroup: d3.Selection<SVGGElement, unknown, null, undefined>,
		width: number,
		height: number
	) {
		// Base direction: upper-left to lower-right, with wide random variation
		const baseAngle = Math.PI * 0.3;
		const angle = baseAngle + (Math.random() - 0.5) * Math.PI * 0.8;

		const startX = -width / 2 + Math.random() * width;
		const startY = -height / 2 + Math.random() * height * 0.7;
		const len = 10 + Math.random() * 90; // shorter, subtler
		const endX = startX + Math.cos(angle) * len;
		const endY = startY + Math.sin(angle) * len;

		const brightness = 0.04 + Math.random() * 0.18; // subtle
		const color = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
		const speed = 120 + Math.random() * 250; // faster travel

		const star = starsGroup
			.append('line')
			.attr('x1', startX)
			.attr('y1', startY)
			.attr('x2', startX)
			.attr('y2', startY)
			.attr('stroke', color)
			.attr('stroke-width', 0.3 + Math.random() * 0.7)
			.attr('stroke-linecap', 'round')
			.attr('opacity', 0);

		star
			.transition()
			.duration(80 + Math.random() * 80)
			.attr('opacity', brightness)
			.transition()
			.duration(speed)
			.attr('x2', endX)
			.attr('y2', endY)
			.transition()
			.duration(150 + Math.random() * 150)
			.attr('opacity', 0)
			.attr('x1', endX)
			.attr('y1', endY)
			.remove();
	}

	function setupGraph() {
		if (!nodes.length || !edges.length) return;
		loading = true;

		svgContainer.innerHTML = '';
		// Use wrapper container dimensions -more reliable than SVG element
		const width = wrapperEl.clientWidth;
		const height = wrapperEl.clientHeight;
		const hw = width / 2,
			hh = height / 2;

		// Edge pruning: keep a spanning tree (no islands) + random subset of extras
		// This reduces rendering cost while preserving connectivity
		const pruneRng = seedrandom('edge-prune');
		const allLinks: SimulationLink[] = edges.map((e) => ({
			...e,
			source: e.source_id,
			target: e.target_id
		}));

		// Build spanning tree with Union-Find
		const parent = new Map<string, string>();
		function find(x: string): string {
			if (!parent.has(x)) parent.set(x, x);
			if (parent.get(x) !== x) parent.set(x, find(parent.get(x)!));
			return parent.get(x)!;
		}
		function union(a: string, b: string): boolean {
			const ra = find(a), rb = find(b);
			if (ra === rb) return false;
			parent.set(ra, rb);
			return true;
		}

		// Sort edges by size (prefer keeping important connections)
		const sorted = [...allLinks].sort((a, b) => (b.size || 1) - (a.size || 1));
		const treeEdges: SimulationLink[] = [];
		const extraEdges: SimulationLink[] = [];

		for (const link of sorted) {
			const src = typeof link.source === 'string' ? link.source : link.source.id;
			const tgt = typeof link.target === 'string' ? link.target : link.target.id;
			if (union(src, tgt)) {
				treeEdges.push(link);
			} else {
				extraEdges.push(link);
			}
		}

		// Keep all tree edges + 25% of extras (aggressive pruning for performance)
		const keptExtras = extraEdges.filter(() => pruneRng() < 0.25);
		const dLinks = [...treeEdges, ...keptExtras];

		// Initial positions: big nodes AT center, small ones spread outward
		const initRng = seedrandom('graph-init');
		const spreadX = Math.min(width * 0.4, 400);
		const spreadY = Math.min(height * 0.35, 300);
		const maxNodeSize = Math.max(...nodes.map((n) => n.size || 1));
		const dNodes: SimulationNode[] = nodes.map((n) => {
			const angle = initRng() * Math.PI * 2;
			const sizeRatio = (n.size || 1) / maxNodeSize; // 0..1
			// Big nodes start at/near (0,0). Small nodes start far out.
			const radiusFactor = Math.sqrt(initRng()) * (1 - sizeRatio * 0.95);
			return {
				...n,
				x: Math.cos(angle) * radiusFactor * spreadX,
				y: Math.sin(angle) * radiusFactor * spreadY
			};
		});

		const sizes = dNodes.map((n) => n.size).sort((a, b) => a - b);
		const medianSize = sizes[Math.floor(sizes.length * 0.6)] || 1;
		const labelThreshold = sizes[Math.floor(sizes.length * 0.75)] || 1;

		const svg = d3
			.select(svgContainer)
			.attr('viewBox', [-hw, -hh, width, height])
			.style('max-width', '100%')
			.style('height', 'auto')
			.style('background', 'transparent');

		// Canvas for links (much faster than SVG line elements)
		linkCanvas.width = width;
		linkCanvas.height = height;
		const ctx = linkCanvas.getContext('2d')!;

		drawGeometricBackground(svg, width, height);

		// Shooting stars layer -organic random timing
		const starsGroup = svg.append('g').attr('class', 'shooting-stars');
		shootingStarsActive = true;
		function scheduleNextStar() {
			if (!shootingStarsActive) return;
			// Organic timing with frequent shooting stars
			const delay = 80 + Math.random() * 900 + (Math.random() < 0.1 ? 1500 : 0);
			shootingStarTimer = setTimeout(() => {
				if (!shootingStarsActive) return;
				spawnShootingStar(starsGroup, width, height);
				// Frequent bursts for visual richness
				if (Math.random() < 0.4) {
					setTimeout(() => spawnShootingStar(starsGroup, width, height), 30 + Math.random() * 150);
				}
				if (Math.random() < 0.15) {
					setTimeout(() => spawnShootingStar(starsGroup, width, height), 80 + Math.random() * 250);
				}
				scheduleNextStar();
			}, delay);
		}
		scheduleNextStar();

		// Links drawn on canvas in tick handler (no SVG elements needed)

		// Track highlight state for canvas link drawing
		let highlightedNodeId: string | null = null;
		let highlightedNeighbors: Set<string> = new Set();

		function drawLinks() {
			if (!ctx) return;
			ctx.clearRect(0, 0, width, height);
			ctx.lineWidth = 0.5;
			ctx.lineCap = 'round';

			for (const l of dLinks) {
				const s = typeof l.source === 'object' ? l.source : null;
				const t = typeof l.target === 'object' ? l.target : null;
				if (!s || !t) continue;

				const sx = (s.x ?? 0) + hw, sy = (s.y ?? 0) + hh;
				const tx = (t.x ?? 0) + hw, ty = (t.y ?? 0) + hh;

				// Highlight connected links on hover
				if (highlightedNodeId) {
					const isConnected = s.id === highlightedNodeId || t.id === highlightedNodeId;
					ctx.strokeStyle = isConnected ? 'rgba(212,160,23,0.5)' : 'rgba(58,58,58,0.05)';
					ctx.lineWidth = isConnected ? 1 : 0.3;
				} else {
					ctx.strokeStyle = 'rgba(80,75,65,0.08)';
					ctx.lineWidth = 0.4;
				}

				ctx.beginPath();
				ctx.moveTo(sx, sy);
				ctx.lineTo(tx, ty);
				ctx.stroke();
			}
		}

		// Nodes — large nodes get CSS glow (much cheaper than SVG filter)
		const node = svg
			.append('g')
			.selectAll<SVGCircleElement, SimulationNode>('circle')
			.data(dNodes)
			.join('circle')
			.attr('r', (d) => nodeMinRadius + Math.sqrt(d.size || 1) * nodeScale)
			.attr('fill', (d, i) => (d.size >= medianSize ? planetColor(d, i) : OFF_WHITE))
			.attr('opacity', (d) => (d.size >= medianSize ? 0.95 : 0.8))
			.style('cursor', 'pointer')
			.style('filter', (d, i) => d.size >= medianSize ? `drop-shadow(0 0 ${2 + Math.sqrt(d.size) * 0.5}px ${planetColor(d, i)})` : 'none');

		// Labels
		const labels = svg
			.append('g')
			.selectAll<SVGTextElement, SimulationNode>('text')
			.data(dNodes)
			.join('text')
			.text((d) => d.label)
			.attr('font-family', 'Cormorant Garamond, Georgia, serif')
			.attr('font-size', 11)
			.attr('dy', '-1.2em')
			.attr('fill', OFF_WHITE)
			.attr('text-anchor', 'middle')
			.attr('opacity', (d) => (d.size >= labelThreshold ? 0.7 : 0))
			.style('pointer-events', 'none');

		// Drag
		node.call(
			d3
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
				})
		);

		// Adapt forces to container size -keep all nodes visible but organic
		const area = width * height;
		const n = dNodes.length;
		const density = n / (area / 10000); // nodes per 10k px²
		const chargeStr = Math.max(-150, Math.min(-30, -area / (n * 8)));

		// Jagged sinusoidal boundary -organic, non-linear edges
		const baseBoundX = hw * 0.88;
		const baseBoundY = hh * 0.88;
		// Each edge wobbles with layered sin waves so nodes never line up
		function jaggedBoundX(y: number): number {
			return (
				baseBoundX +
				Math.sin(y * 0.025) * hw * 0.06 +
				Math.sin(y * 0.06 + 1.7) * hw * 0.03 +
				Math.sin(y * 0.11 + 3.2) * hw * 0.015
			);
		}
		function jaggedBoundY(x: number): number {
			return (
				baseBoundY +
				Math.sin(x * 0.02) * hh * 0.07 +
				Math.sin(x * 0.055 + 2.1) * hh * 0.035 +
				Math.sin(x * 0.1 + 0.8) * hh * 0.018
			);
		}

		// Size-dependent forces: big = strong pull to center, small = weak pull + pushed outward
		const maxSize = Math.max(...dNodes.map((d) => d.size || 1));

		// Custom force: big nodes strongly pulled to center, small ones pushed outward
		function radialSizeForce(alpha: number) {
			for (const d of dNodes) {
				const normalized = (d.size || 1) / maxSize; // 0..1
				const x = d.x ?? 0,
					y = d.y ?? 0;
				const dist = Math.sqrt(x * x + y * y) || 1;

				if (normalized > 0.3) {
					// Strong center pull — cubic scaling for top nodes
					const pullStrength = normalized * normalized * normalized * 0.25 * alpha;
					d.vx = (d.vx ?? 0) - x * pullStrength;
					d.vy = (d.vy ?? 0) - y * pullStrength;
				} else {
					// Push small nodes outward more aggressively
					const pushStrength = (1 - normalized * 3) * 0.3 * alpha;
					d.vx = (d.vx ?? 0) + (x / dist) * pushStrength;
					d.vy = (d.vy ?? 0) + (y / dist) * pushStrength;
				}
			}
		}

		simulation = d3
			.forceSimulation<SimulationNode>(dNodes)
			.force(
				'link',
				d3
					.forceLink<SimulationNode, SimulationLink>(dLinks)
					.id((d) => d.id)
					.distance(50 + Math.min(width, height) * 0.05)
					.strength(0.1)
			)
			.force('charge', d3.forceManyBody().strength(chargeStr).distanceMax(100))
			.force('center', d3.forceCenter(0, 0).strength(0.01))
			.force(
				'collision',
				d3
					.forceCollide<SimulationNode>()
					.radius((d) => nodeMinRadius + Math.sqrt(d.size || 1) * nodeScale + 1.5)
					.strength(0.5)
					.iterations(1)
			)
			.force('radialSize', radialSizeForce)
			.alphaDecay(0.06)
			.velocityDecay(0.5);

		simulation.on('tick', () => {
			// Jagged boundary: push back using non-linear wavy edges
			for (const d of dNodes) {
				const x = d.x ?? 0,
					y = d.y ?? 0;
				const bx = jaggedBoundX(y);
				const by = jaggedBoundY(x);
				if (Math.abs(x) > bx) d.vx = (d.vx ?? 0) - (x - Math.sign(x) * bx) * 0.07;
				if (Math.abs(y) > by) d.vy = (d.vy ?? 0) - (y - Math.sign(y) * by) * 0.07;
			}

			// Canvas links (much faster than SVG attr updates)
			drawLinks();

			// SVG nodes + labels only
			node.attr('cx', (d) => d.x ?? 0).attr('cy', (d) => d.y ?? 0);
			labels
				.attr('x', (d) => d.x ?? 0)
				.attr('y', (d) => (d.y ?? 0) - (nodeMinRadius + Math.sqrt(d.size || 1) * nodeScale));
		});

		// Hide loader once simulation has settled AND minimum time has passed
		const loadStart = Date.now();
		const MIN_LOAD_MS = 1000;
		simulation.on('tick.loading', () => {
			if (simulation.alpha() < 0.05 && loading && Date.now() - loadStart >= MIN_LOAD_MS) {
				loading = false;
			}
			// Stop simulation completely once fully settled (zero ongoing CPU)
			if (simulation.alpha() < 0.005) {
				simulation.stop();
				drawLinks(); // final frame
			}
		});

		// Pre-compute neighbor map
		const neighborMap = new Map<string, Set<string>>();
		for (const l of dLinks) {
			const sid = typeof l.source === 'object' ? l.source.id : l.source;
			const tid = typeof l.target === 'object' ? l.target.id : l.target;
			if (!neighborMap.has(sid)) neighborMap.set(sid, new Set());
			if (!neighborMap.has(tid)) neighborMap.set(tid, new Set());
			neighborMap.get(sid)!.add(tid);
			neighborMap.get(tid)!.add(sid);
		}

		// Hover — update canvas links + SVG nodes/labels
		node
			.on('mouseover', (event, d) => {
				const nb = neighborMap.get(d.id) || new Set();
				highlightedNodeId = d.id;
				highlightedNeighbors = nb;
				node
					.attr('opacity', (n) => (n.id === d.id || nb.has(n.id) ? 1 : 0.1))
					.attr('fill', (n) => (n.id === d.id ? GOLD_BRIGHT : nb.has(n.id) ? GOLD : OFF_WHITE))
					.style('filter', (n, i) => {
						if (n.id === d.id) return `drop-shadow(0 0 8px ${GOLD_BRIGHT}) drop-shadow(0 0 16px ${GOLD})`;
						if (nb.has(n.id)) return `drop-shadow(0 0 5px ${planetColor(n, i)})`;
						return 'none';
					});
				labels.attr('opacity', (n) => (n.id === d.id ? 1 : nb.has(n.id) ? 0.8 : 0));
				drawLinks();
			})
			.on('mouseout', () => {
				highlightedNodeId = null;
				highlightedNeighbors = new Set();
				node
					.attr('opacity', (n) => (n.size >= medianSize ? 0.95 : 0.8))
					.attr('fill', (n, i) => (n.size >= medianSize ? planetColor(n, i) : OFF_WHITE))
					.style('filter', (n, i) => n.size >= medianSize ? `drop-shadow(0 0 ${2 + Math.sqrt(n.size) * 0.5}px ${planetColor(n, i)})` : 'none');
				labels.attr('opacity', (d) => (d.size >= labelThreshold ? 0.7 : 0));
				drawLinks();
			});
	}

	let resizeTimer: ReturnType<typeof setTimeout>;

	function handleResize() {
		// Show loader immediately on resize start
		loading = true;
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(() => {
			simulation?.stop();
			shootingStarsActive = false;
			if (shootingStarTimer) clearTimeout(shootingStarTimer);
			setupGraph();
		}, 300);
	}

	onMount(() => {
		setupGraph();
		window.addEventListener('resize', handleResize);
	});

	onDestroy(() => {
		simulation?.stop();
		shootingStarsActive = false;
		if (shootingStarTimer) clearTimeout(shootingStarTimer);
		clearTimeout(resizeTimer);
		if (typeof window !== 'undefined') window.removeEventListener('resize', handleResize);
	});
</script>

<div
	bind:this={wrapperEl}
	class="relative w-full overflow-hidden"
	style="height: 60vh; min-height: 350px; background: {BG};"
>
	<canvas bind:this={linkCanvas} class="absolute inset-0 h-full w-full" style="z-index: 1;"></canvas>
	<svg bind:this={svgContainer} class="absolute inset-0 h-full w-full" style="z-index: 2;"></svg>
	<OrbitalLoader visible={loading} />
</div>
