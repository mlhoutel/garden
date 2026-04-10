<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { select } from 'd3-selection';
	import { forceSimulation, forceLink, forceManyBody, forceCenter, forceCollide } from 'd3-force';
	import { drag } from 'd3-drag';
	import 'd3-transition';
	import type { Simulation } from 'd3-force';
	import type { Selection } from 'd3-selection';
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
	let simulation: Simulation<SimulationNode, SimulationLink>;
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
		svg: Selection<SVGSVGElement, unknown, null, undefined>,
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
		starsGroup: Selection<SVGGElement, unknown, null, undefined>,
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

		// Size lookup for edge pruning (before dNodes exists)
		const nodeSize = new Map(nodes.map((n) => [n.id, n.size || 1]));
		const allNodeSizes = [...nodeSize.values()].sort((a, b) => a - b);
		const medianSizeForPrune = allNodeSizes[Math.floor(allNodeSizes.length * 0.6)] || 1;

		// Edge pruning: keep spanning tree + topology-aware extras
		// Small-small edges kept aggressively (constellation wires); hub edges pruned hard
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

		const keptExtras = extraEdges.filter((l) => {
			const ss = nodeSize.get(l.source as string) || 1;
			const ts = nodeSize.get(l.target as string) || 1;
			const avg = (ss + ts) / 2;
			// Small-small: keep most (forms constellation wires); hubs: prune hard
			return pruneRng() < (avg < medianSizeForPrune ? 0.65 : 0.15);
		});
		const dLinks = [...treeEdges, ...keptExtras];

		// Community detection via Union-Find on kept links
		const compParent = new Map<string, string>();
		function compFind(x: string): string {
			if (!compParent.has(x)) compParent.set(x, x);
			const p = compParent.get(x)!;
			if (p !== x) compParent.set(x, compFind(p));
			return compParent.get(x)!;
		}
		for (const l of dLinks) {
			const s = l.source as string, t = l.target as string;
			const rs = compFind(s), rt = compFind(t);
			if (rs !== rt) compParent.set(rs, rt);
		}

		const componentMap = new Map<string, string[]>();
		for (const n of nodes) {
			const root = compFind(n.id);
			if (!componentMap.has(root)) componentMap.set(root, []);
			componentMap.get(root)!.push(n.id);
		}

		// Sort components largest-first (largest = main hub cluster → goes to center)
		const components = [...componentMap.values()].sort(
			(a, b) =>
				b.reduce((s, id) => s + (nodeSize.get(id) || 1), 0) -
				a.reduce((s, id) => s + (nodeSize.get(id) || 1), 0)
		);

		const nodeToComp = new Map<string, number>();
		components.forEach((comp, ci) => comp.forEach((id) => nodeToComp.set(id, ci)));

		// Sector-based initial placement in a 45°-tilted ellipse orbit
		// Aspect ratio mirrors the container so wide screens get wide layouts
		const placeRng = seedrandom('graph-placement');
		const orbitA = Math.min(width * 0.52, 500);   // major semi-axis of cluster orbit
		const orbitB = Math.min(height * 0.46, 330);  // minor semi-axis (compressed)
		const orbitTilt = -Math.PI / 4;                // -45° tilt for the whole orbit
		const cos45 = Math.SQRT1_2, sin45 = Math.SQRT1_2;

		const dNodes: SimulationNode[] = nodes.map((n) => ({ ...n, x: 0, y: 0 }));
		const nodeById = new Map(dNodes.map((n) => [n.id, n]));

		components.forEach((compIds, ci) => {
			const isMain = ci === 0;
			const nOther = Math.max(components.length - 1, 1);
			// Spread non-main components evenly around the tilted orbit ellipse
			const θ = isMain ? 0 : ((ci - 1) / nOther) * Math.PI * 2;
			const distFactor = isMain ? 0 : 0.3 + 0.4 * Math.sqrt((ci - 1) / Math.max(nOther - 1, 1));
			// Ellipse point at θ, then rotate orbit by 45°
			const ex = Math.cos(θ) * orbitA * distFactor;
			const ey = Math.sin(θ) * orbitB * distFactor;
			const sectorCx = isMain ? 0 : ex * Math.cos(orbitTilt) - ey * Math.sin(orbitTilt);
			const sectorCy = isMain ? 0 : ex * Math.sin(orbitTilt) + ey * Math.cos(orbitTilt);

			const compMax = Math.max(...compIds.map((id) => nodeSize.get(id) || 1));
			const compSpread = Math.min(70, 14 + compIds.length * 4);

			for (const id of compIds) {
				const n = nodeById.get(id)!;
				const norm = (n.size || 1) / compMax;
				// Each cluster scattered in its own 45°-tilted oval (1.8:0.85 major:minor)
				const spread = (1 - norm * 0.85) * compSpread;
				const a = placeRng() * Math.PI * 2;
				const jitter = 0.35 + placeRng() * 0.65;
				const localX = Math.cos(a) * spread * 1.8 * jitter;
				const localY = Math.sin(a) * spread * 0.85 * jitter;
				// Rotate local oval by -45°
				n.x = sectorCx + localX * cos45 + localY * sin45;
				n.y = sectorCy - localX * sin45 + localY * cos45;
			}
		});

		const sizes = dNodes.map((n) => n.size).sort((a, b) => a - b);
		const maxSize = Math.max(...sizes);
		const medianSize = sizes[Math.floor(sizes.length * 0.6)] || 1;
		const labelThreshold = sizes[Math.floor(sizes.length * 0.75)] || 1;
		const labelFaintThreshold = sizes[Math.floor(sizes.length * 0.50)] || 1;

		// Rank-based label opacity: top labels bright, fast falloff for the rest.
		// After simulation settles, overlapping labels get dimmed further.
		function labelBaseOpacity(d: SimulationNode): number {
			if (d.size >= labelThreshold) return 0.8;
			if (d.size >= labelFaintThreshold) return 0.2;
			return 0;
		}

		function resolveOverlaps(lbls: typeof labels) {
			// Collect visible label bounding boxes, sorted by importance (size desc)
			const entries: { node: SVGTextElement; d: SimulationNode; bbox: DOMRect }[] = [];
			lbls.each(function(this: SVGTextElement, d: SimulationNode) {
				if (labelBaseOpacity(d) > 0) {
					entries.push({ node: this, d, bbox: this.getBBox() });
				}
			});
			entries.sort((a, b) => (b.d.size || 0) - (a.d.size || 0));

			const placed: DOMRect[] = [];
			const targets = new Map<SVGTextElement, number>();
			for (const e of entries) {
				const b = e.bbox;
				const overlaps = placed.some(p =>
					b.x < p.x + p.width && b.x + b.width > p.x &&
					b.y < p.y + p.height && b.y + b.height > p.y
				);
				if (overlaps) {
					targets.set(e.node, Math.min(labelBaseOpacity(e.d) * 0.15, 0.08));
				} else {
					targets.set(e.node, labelBaseOpacity(e.d));
					placed.push(b);
				}
			}

			// Also set hidden labels to 0
			lbls.each(function(this: SVGTextElement) {
				if (!targets.has(this)) targets.set(this, 0);
			});

			// Apply with CSS transition (the transition style is already on the elements)
			for (const [node, opacity] of targets) {
				node.setAttribute('opacity', String(opacity));
			}
		}

		// sqrt-rank decay: fast initial drop (hubs clearly larger) + gradual tail (small nodes
		// still visibly different from each other, no pile-up at a uniform floor)
		// pow(0.72, sqrt(rank)): rank 0→10.5px, rank 5→6px, rank 15→4.3px, rank 29→3.4px
		const nodeRadius = (size: number): number => {
			let lo = 0, hi = sizes.length - 1;
			while (lo < hi) { const mid = (lo + hi) >> 1; if (sizes[mid] < (size || 1)) lo = mid + 1; else hi = mid; }
			const rank = (sizes.length - 1) - lo; // 0 = highest importance
			return 2.0 + Math.pow(0.72, Math.sqrt(rank)) * 8.5;
		};

		const svg = select(svgContainer)
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
		let lastStarTime = Date.now();
		function scheduleNextStar() {
			if (!shootingStarsActive) return;
			const delay = 80 + Math.random() * 900 + (Math.random() < 0.1 ? 1500 : 0);
			shootingStarTimer = setTimeout(() => {
				if (!shootingStarsActive) return;
				// Skip burst if tab was hidden (timers queued up while backgrounded)
				const now = Date.now();
				const elapsed = now - lastStarTime;
				lastStarTime = now;
				if (elapsed < 3000) {
					spawnShootingStar(starsGroup, width, height);
					if (Math.random() < 0.4) {
						setTimeout(() => spawnShootingStar(starsGroup, width, height), 30 + Math.random() * 150);
					}
					if (Math.random() < 0.15) {
						setTimeout(() => spawnShootingStar(starsGroup, width, height), 80 + Math.random() * 250);
					}
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
				const isConstellation = Math.max(s.size || 1, t.size || 1) < medianSize;
				if (highlightedNodeId) {
					const isConnected = s.id === highlightedNodeId || t.id === highlightedNodeId;
					ctx.strokeStyle = isConnected ? 'rgba(212,160,23,0.5)' : 'rgba(58,58,58,0.04)';
					ctx.lineWidth = isConnected ? 1 : 0.25;
				} else {
					ctx.strokeStyle = isConstellation ? 'rgba(110,104,88,0.2)' : 'rgba(80,75,65,0.06)';
					ctx.lineWidth = isConstellation ? 0.55 : 0.35;
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
			.attr('r', (d) => nodeRadius(d.size))
			.attr('fill', (d, i) => (d.size >= medianSize ? planetColor(d, i) : OFF_WHITE))
			.attr('opacity', (d) => (d.size >= medianSize ? 0.95 : 0.8))
			.style('cursor', 'pointer')
			.style('filter', (d, i) => d.size >= medianSize
				? `drop-shadow(0 0 ${1 + (d.size / maxSize) * 5}px ${planetColor(d, i)})`
				: 'none');

		// Labels
		const labels = svg
			.append('g')
			.selectAll<SVGTextElement, SimulationNode>('text')
			.data(dNodes)
			.join('text')
			.text((d) => d.label)
			.attr('font-family', 'Cormorant Garamond, Georgia, serif')
			.attr('font-size', (d) => {
				let lo = 0, hi = sizes.length - 1;
				while (lo < hi) { const mid = (lo + hi) >> 1; if (sizes[mid] < (d.size || 1)) lo = mid + 1; else hi = mid; }
				const p = sizes.length > 1 ? lo / (sizes.length - 1) : 1;
				return Math.round(9 + Math.pow(p, 2) * 5);
			})
			.attr('dy', '-1.2em')
			.attr('fill', OFF_WHITE)
			.attr('text-anchor', 'middle')
			.attr('opacity', 0)
			.style('pointer-events', 'none')
			.style('transition', 'opacity 0.6s ease');

		// Drag
		node.call(
			drag<SVGCircleElement, SimulationNode>()
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
		const chargeStr = Math.max(-200, Math.min(-40, -area / (n * 6)));

		// Jagged sinusoidal boundary -organic, non-linear edges
		const baseBoundX = hw * 0.80;
		const baseBoundY = hh * 0.80;
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

		// All nodes get a weak universal center pull to prevent outliers from drifting off;
		// big hub nodes get an additional stronger pull to stay near the core
		function radialSizeForce(alpha: number) {
			for (const d of dNodes) {
				const normalized = (d.size || 1) / maxSize;
				// Universal baseline pull — keeps isolated/small nodes from escaping
				const basePull = 0.012 * alpha;
				d.vx = (d.vx ?? 0) - (d.x ?? 0) * basePull;
				d.vy = (d.vy ?? 0) - (d.y ?? 0) * basePull;
				// Additional pull for large hub nodes toward center
				if (normalized > 0.3) {
					const pullStrength = normalized * normalized * normalized * 0.20 * alpha;
					d.vx = (d.vx ?? 0) - (d.x ?? 0) * pullStrength;
					d.vy = (d.vy ?? 0) - (d.y ?? 0) * pullStrength;
				}
			}
		}

		// Anisotropic cluster force: shapes each cluster into a 45°-tilted ovaloid
		// Weak spring along 45° major axis (allows elongation), strong along 135° minor (compresses)
		// Small nodes feel 3× more force → tighter sub-clusters within constellations
		function clusterForce(alpha: number) {
			const centroids = new Map<number, { x: number; y: number; n: number }>();
			for (const d of dNodes) {
				const ci = nodeToComp.get(d.id) ?? 0;
				if (!centroids.has(ci)) centroids.set(ci, { x: 0, y: 0, n: 0 });
				const c = centroids.get(ci)!;
				c.x += d.x ?? 0; c.y += d.y ?? 0; c.n++;
			}
			for (const c of centroids.values()) { c.x /= c.n; c.y /= c.n; }

			for (const d of dNodes) {
				const c = centroids.get(nodeToComp.get(d.id) ?? 0);
				if (!c) continue;
				const dx = (d.x ?? 0) - c.x;
				const dy = (d.y ?? 0) - c.y;
				// Project displacement onto -45° (major) and +45° (minor) axes
				const axial = dx * cos45 - dy * sin45;   // along -45°: let it spread
				const perp  = dx * sin45 + dy * cos45;   // along +45°: compress tight
				const norm = (d.size || 1) / maxSize;
				const base = (1 - norm * 0.65) * alpha;
				// Gentle spring along major axis, strong spring along minor
				const fAxial = axial * 0.038 * base;
				const fPerp  = perp  * 0.11  * base;
				// Back to x/y and apply
				d.vx = (d.vx ?? 0) - (cos45 * fAxial - sin45 * fPerp);
				d.vy = (d.vy ?? 0) - (sin45 * fAxial + cos45 * fPerp);
			}
		}

		// Inter-cluster repulsion: push cluster centroids apart with a minimum separation
		// Guarantees clear visual space between constellations
		function interClusterRepulsion(alpha: number) {
			const centroids = new Map<number, { x: number; y: number; n: number }>();
			for (const d of dNodes) {
				const ci = nodeToComp.get(d.id) ?? 0;
				if (!centroids.has(ci)) centroids.set(ci, { x: 0, y: 0, n: 0 });
				const c = centroids.get(ci)!;
				c.x += d.x ?? 0; c.y += d.y ?? 0; c.n++;
			}
			for (const c of centroids.values()) { c.x /= c.n; c.y /= c.n; }

			const entries = [...centroids.entries()];
			const minSep = Math.min(width, height) * 0.2; // minimum distance between cluster centers

			for (let i = 0; i < entries.length; i++) {
				for (let j = i + 1; j < entries.length; j++) {
					const [ci, ca] = entries[i];
					const [cj, cb] = entries[j];
					const dx = ca.x - cb.x, dy = ca.y - cb.y;
					const dist = Math.sqrt(dx * dx + dy * dy) || 1;
					if (dist >= minSep * 2.8) continue; // already far enough
					const force = Math.pow(minSep / dist, 2) * 0.55 * alpha;
					const fx = (dx / dist) * force, fy = (dy / dist) * force;
					for (const d of dNodes) {
						const dc = nodeToComp.get(d.id) ?? 0;
						if (dc === ci) { d.vx = (d.vx ?? 0) + fx; d.vy = (d.vy ?? 0) + fy; }
						else if (dc === cj) { d.vx = (d.vx ?? 0) - fx; d.vy = (d.vy ?? 0) - fy; }
					}
				}
			}
		}

		simulation = forceSimulation<SimulationNode>(dNodes)
			.force(
				'link',
				forceLink<SimulationNode, SimulationLink>(dLinks)
					.id((d) => d.id)
					.distance((l) => {
						const s = l.source as SimulationNode;
						const t = l.target as SimulationNode;
						// Shorter distances → nodes sit closer together
						return (Math.sqrt(s.size || 1) + Math.sqrt(t.size || 1)) * 9.0;
					})
					.strength((l) => {
						const s = l.source as SimulationNode;
						const t = l.target as SimulationNode;
						const avg = ((s.size || 1) + (t.size || 1)) / 2;
						// Stronger small-small springs → tight sub-clusters
						return avg < medianSize ? 0.28 : 0.06;
					})
			)
			// Short-range repulsion only: nodes only repel neighbours, not the whole canvas
			// Inter-cluster separation is handled by interClusterRepulsion instead
			.force('charge', forceManyBody<SimulationNode>()
				.strength((d) => chargeStr * (0.4 + ((d.size || 1) / maxSize) * 0.7))
				.distanceMax(130)
			)
			.force('center', forceCenter(0, 0).strength(0.01))
			.force(
				'collision',
				forceCollide<SimulationNode>()
					.radius((d) => nodeRadius(d.size) + 5)
					.strength(0.5)
					.iterations(1)
			)
			.force('radialSize', radialSizeForce)
			.force('cluster', clusterForce)
			.force('interCluster', interClusterRepulsion)
			.alphaDecay(0.06)
			.velocityDecay(0.42);

		simulation.on('tick', () => {
			// Jagged boundary: push back using non-linear wavy edges
			for (const d of dNodes) {
				const x = d.x ?? 0,
					y = d.y ?? 0;
				const bx = jaggedBoundX(y);
				const by = jaggedBoundY(x);
				if (Math.abs(x) > bx) d.vx = (d.vx ?? 0) - (x - Math.sign(x) * bx) * 0.28;
				if (Math.abs(y) > by) d.vy = (d.vy ?? 0) - (y - Math.sign(y) * by) * 0.28;
				// Hard teleport: yank escaped outliers back immediately (tighter threshold)
				if (Math.abs(x) > hw * 0.98) { d.x = Math.sign(x) * hw * 0.65; d.vx = 0; }
				if (Math.abs(y) > hh * 0.98) { d.y = Math.sign(y) * hh * 0.65; d.vy = 0; }
			}

			// Canvas links (much faster than SVG attr updates)
			drawLinks();

			// SVG nodes + labels only
			node.attr('cx', (d) => d.x ?? 0).attr('cy', (d) => d.y ?? 0);
			labels
				.attr('x', (d) => d.x ?? 0)
				.attr('y', (d) => (d.y ?? 0) - nodeRadius(d.size));
		});

		// Hide loader once simulation has settled AND minimum time has passed
		const loadStart = Date.now();
		const MIN_LOAD_MS = 300;
		simulation.on('tick.loading', () => {
			if (simulation.alpha() < 0.05 && loading && Date.now() - loadStart >= MIN_LOAD_MS) {
				loading = false;
			}
			// Stop simulation completely once fully settled (zero ongoing CPU)
			if (simulation.alpha() < 0.005) {
				simulation.stop();
				drawLinks(); // final frame
				resolveOverlaps(labels); // dim overlapping labels
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
						if (n.id === d.id) return `drop-shadow(0 0 2px ${GOLD_BRIGHT})`;
						if (nb.has(n.id)) return `drop-shadow(0 0 1.5px ${planetColor(n, i)})`;
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
					.style('filter', (n, i) => n.size >= medianSize
					? `drop-shadow(0 0 ${1 + (n.size / maxSize) * 5}px ${planetColor(n, i)})`
					: 'none');
				resolveOverlaps(labels);
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
