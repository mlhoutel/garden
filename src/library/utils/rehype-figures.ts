import { visit } from 'unist-util-visit';
import type { Root, Element, Text, ElementContent } from 'hast';
import seedrandom from 'seedrandom';

// ─── HAST helpers ───

function el(tag: string, props: Record<string, unknown>, children: ElementContent[] = []): Element {
	return { type: 'element', tagName: tag, properties: props, children };
}

function txt(value: string): Text {
	return { type: 'text', value };
}

function svgEl(tag: string, attrs: Record<string, string | number>): Element {
	return { type: 'element', tagName: tag, properties: attrs, children: [] };
}

const G = '#D4A017';
const S = 72; // corner ornament viewBox size

// ─── Corner element vocabulary ───
// Each generator returns SVG elements for the top-left corner (72×72 viewBox).
// Other corners are mirrored via CSS transform.

type Rng = () => number;
type ElemGen = (rng: Rng) => ElementContent[];

function celestialArcs(rng: Rng): ElementContent[] {
	const r1 = 22 + rng() * 16;
	const r2 = r1 - 8 - rng() * 4;
	return [
		svgEl('path', {
			d: `M 4 ${4 + r1} A ${r1} ${r1} 0 0 1 ${4 + r1} 4`,
			fill: 'none', stroke: G, 'stroke-width': '1.1', opacity: String(0.4 + rng() * 0.15)
		}),
		svgEl('path', {
			d: `M 4 ${4 + r2} A ${r2} ${r2} 0 0 1 ${4 + r2} 4`,
			fill: 'none', stroke: G, 'stroke-width': '0.7', opacity: String(0.25 + rng() * 0.12),
			'stroke-dasharray': `${1.5 + rng() * 2} ${2 + rng() * 2}`
		}),
		svgEl('circle', { cx: '8', cy: '8', r: String(2 + rng() * 1.5), fill: G, opacity: '0.5' }),
		svgEl('circle', { cx: String(4 + r1 * 0.7), cy: '4', r: '1.5', fill: G, opacity: '0.35' }),
		svgEl('circle', { cx: '4', cy: String(4 + r1 * 0.7), r: '1.5', fill: G, opacity: '0.35' }),
	];
}

function diamondNode(rng: Rng): ElementContent[] {
	const cx = 12 + rng() * 5;
	const cy = 12 + rng() * 5;
	const sz = 4 + rng() * 3;
	return [
		svgEl('polygon', {
			points: `${cx},${cy - sz} ${cx + sz},${cy} ${cx},${cy + sz} ${cx - sz},${cy}`,
			fill: G, opacity: String(0.4 + rng() * 0.15)
		}),
		svgEl('line', { x1: String(cx + sz), y1: String(cy), x2: String(S), y2: String(cy), stroke: G, 'stroke-width': '0.8', opacity: '0.3' }),
		svgEl('line', { x1: String(cx), y1: String(cy + sz), x2: String(cx), y2: String(S), stroke: G, 'stroke-width': '0.8', opacity: '0.3' }),
		svgEl('circle', { cx: String(cx + sz + 10), cy: String(cy), r: '1.5', fill: G, opacity: '0.35' }),
		svgEl('circle', { cx: String(cx), cy: String(cy + sz + 10), r: '1.5', fill: G, opacity: '0.35' }),
	];
}

function crosshair(rng: Rng): ElementContent[] {
	const c = 12 + rng() * 6;
	const len = 10 + rng() * 8;
	return [
		svgEl('line', { x1: String(c - len), y1: String(c), x2: String(c + len), y2: String(c), stroke: G, 'stroke-width': '1.1', opacity: '0.4' }),
		svgEl('line', { x1: String(c), y1: String(c - len), x2: String(c), y2: String(c + len), stroke: G, 'stroke-width': '1.1', opacity: '0.4' }),
		svgEl('circle', { cx: String(c), cy: String(c), r: '3', fill: G, opacity: '0.5' }),
		svgEl('circle', { cx: String(c - len * 0.5), cy: String(c), r: '1.2', fill: G, opacity: '0.35' }),
		svgEl('circle', { cx: String(c), cy: String(c - len * 0.5), r: '1.2', fill: G, opacity: '0.35' }),
	];
}

function alchemicalTriangle(rng: Rng): ElementContent[] {
	const sz = 20 + rng() * 12;
	const ir = sz * 0.3 + rng() * 3;
	return [
		svgEl('polygon', {
			points: `4,4 ${4 + sz},4 4,${4 + sz}`,
			fill: 'none', stroke: G, 'stroke-width': '1.0', opacity: String(0.35 + rng() * 0.12)
		}),
		svgEl('circle', {
			cx: String(4 + sz * 0.3), cy: String(4 + sz * 0.3), r: String(ir),
			fill: 'none', stroke: G, 'stroke-width': '0.7', opacity: '0.3',
			'stroke-dasharray': `${1 + rng() * 2} ${1.5 + rng() * 2}`
		}),
		svgEl('circle', { cx: String(4 + sz * 0.3), cy: String(4 + sz * 0.3), r: '2', fill: G, opacity: '0.5' }),
	];
}

function concentricRings(rng: Rng): ElementContent[] {
	const elems: ElementContent[] = [];
	const count = 3 + Math.floor(rng() * 3);
	for (let i = 0; i < count; i++) {
		const r = 10 + i * (8 + rng() * 5);
		const dashed = rng() > 0.5;
		const attrs: Record<string, string | number> = {
			d: `M 4 ${4 + r} A ${r} ${r} 0 0 1 ${4 + r} 4`,
			fill: 'none', stroke: G,
			'stroke-width': String(0.6 + rng() * 0.6),
			opacity: String(0.25 + rng() * 0.15)
		};
		if (dashed) attrs['stroke-dasharray'] = `${1 + rng() * 2} ${2 + rng() * 3}`;
		elems.push(svgEl('path', attrs));
	}
	elems.push(svgEl('circle', { cx: '7', cy: '7', r: String(1.5 + rng() * 1.5), fill: G, opacity: '0.45' }));
	return elems;
}

function orbitalDots(rng: Rng): ElementContent[] {
	const elems: ElementContent[] = [];
	const r = 22 + rng() * 18;
	elems.push(svgEl('path', {
		d: `M 4 ${4 + r} A ${r} ${r} 0 0 1 ${4 + r} 4`,
		fill: 'none', stroke: G, 'stroke-width': '0.5', opacity: '0.2'
	}));
	const count = 3 + Math.floor(rng() * 4);
	for (let i = 0; i < count; i++) {
		const angle = (Math.PI / 2) * (i / (count - 1));
		const cx = 4 + r * Math.cos(angle);
		const cy = 4 + r - r * Math.sin(angle);
		elems.push(svgEl('circle', {
			cx: String(cx), cy: String(cy),
			r: String(1.2 + rng() * 1.8), fill: G, opacity: String(0.3 + rng() * 0.2)
		}));
	}
	return elems;
}

function botanicalFern(rng: Rng): ElementContent[] {
	const stemLen = 25 + rng() * 20;
	const angle = Math.PI / 4;
	const ex = 4 + stemLen * Math.cos(angle);
	const ey = 4 + stemLen * Math.sin(angle);
	const elems: ElementContent[] = [
		svgEl('line', { x1: '4', y1: '4', x2: String(ex), y2: String(ey), stroke: G, 'stroke-width': '0.8', opacity: '0.35' }),
	];
	const leafCount = 2 + Math.floor(rng() * 3);
	for (let i = 0; i < leafCount; i++) {
		const t = 0.25 + (i / leafCount) * 0.6;
		const px = 4 + stemLen * t * Math.cos(angle);
		const py = 4 + stemLen * t * Math.sin(angle);
		const leafLen = 5 + rng() * 8;
		const side = rng() > 0.5 ? 1 : -1;
		const lx = px + side * leafLen * Math.sin(angle);
		const ly = py - side * leafLen * Math.cos(angle);
		const cpx = (px + lx) / 2 + side * 3;
		const cpy = (py + ly) / 2 - side * 3;
		elems.push(svgEl('path', {
			d: `M ${px} ${py} Q ${cpx} ${cpy} ${lx} ${ly}`,
			fill: 'none', stroke: G, 'stroke-width': '0.7', opacity: String(0.2 + rng() * 0.15)
		}));
	}
	elems.push(svgEl('circle', { cx: String(ex), cy: String(ey), r: '2', fill: G, opacity: '0.4' }));
	return elems;
}

function constellationCluster(rng: Rng): ElementContent[] {
	const elems: ElementContent[] = [];
	const count = 4 + Math.floor(rng() * 3);
	const points: [number, number][] = [];
	for (let i = 0; i < count; i++) {
		const x = 8 + rng() * 40;
		const y = 8 + rng() * 40;
		points.push([x, y]);
		elems.push(svgEl('circle', {
			cx: String(x), cy: String(y),
			r: String(1.2 + rng() * 2), fill: G, opacity: String(0.3 + rng() * 0.2)
		}));
	}
	for (let i = 0; i < points.length - 1; i++) {
		elems.push(svgEl('line', {
			x1: String(points[i][0]), y1: String(points[i][1]),
			x2: String(points[i + 1][0]), y2: String(points[i + 1][1]),
			stroke: G, 'stroke-width': '0.5', opacity: String(0.15 + rng() * 0.1)
		}));
	}
	return elems;
}

function radialBurst(rng: Rng): ElementContent[] {
	const elems: ElementContent[] = [];
	const count = 5 + Math.floor(rng() * 4);
	const cx = 8 + rng() * 5;
	const cy = 8 + rng() * 5;
	elems.push(svgEl('circle', { cx: String(cx), cy: String(cy), r: '2.5', fill: G, opacity: '0.45' }));
	for (let i = 0; i < count; i++) {
		const angle = (Math.PI / 2) * (i / (count - 1));
		const inner = 4 + rng() * 3;
		const outer = inner + 8 + rng() * 14;
		elems.push(svgEl('line', {
			x1: String(cx + inner * Math.cos(angle)),
			y1: String(cy + inner * Math.sin(angle)),
			x2: String(cx + outer * Math.cos(angle)),
			y2: String(cy + outer * Math.sin(angle)),
			stroke: G, 'stroke-width': String(0.5 + rng() * 0.6), opacity: String(0.2 + rng() * 0.15)
		}));
	}
	return elems;
}

function tickMarks(rng: Rng): ElementContent[] {
	const elems: ElementContent[] = [];
	const r = 20 + rng() * 16;
	elems.push(svgEl('path', {
		d: `M 4 ${4 + r} A ${r} ${r} 0 0 1 ${4 + r} 4`,
		fill: 'none', stroke: G, 'stroke-width': '0.7', opacity: '0.25'
	}));
	const count = 8 + Math.floor(rng() * 8);
	for (let i = 0; i <= count; i++) {
		const angle = (Math.PI / 2) * (i / count);
		const isMajor = i % 3 === 0;
		const inner = r - (isMajor ? 5 : 3);
		const outer = r;
		const cx = 4 + inner * Math.cos(Math.PI / 2 - angle);
		const cy = 4 + r - inner * Math.sin(Math.PI / 2 - angle);
		const ox = 4 + outer * Math.cos(Math.PI / 2 - angle);
		const oy = 4 + r - outer * Math.sin(Math.PI / 2 - angle);
		elems.push(svgEl('line', {
			x1: String(cx), y1: String(cy), x2: String(ox), y2: String(oy),
			stroke: G, 'stroke-width': isMajor ? '1.0' : '0.5',
			opacity: isMajor ? '0.35' : '0.18'
		}));
	}
	return elems;
}

function dashedArcElement(rng: Rng): ElementContent[] {
	const r = 18 + rng() * 20;
	const startAngle = rng() * 0.3;
	const endAngle = (Math.PI / 2) - rng() * 0.3;
	const sx = 4 + r * Math.cos(Math.PI / 2 - startAngle);
	const sy = 4 + r - r * Math.sin(Math.PI / 2 - startAngle);
	const ex = 4 + r * Math.cos(Math.PI / 2 - endAngle);
	const ey = 4 + r - r * Math.sin(Math.PI / 2 - endAngle);
	return [
		svgEl('path', {
			d: `M ${sx} ${sy} A ${r} ${r} 0 0 0 ${ex} ${ey}`,
			fill: 'none', stroke: G,
			'stroke-width': String(0.8 + rng() * 0.4),
			opacity: String(0.25 + rng() * 0.12),
			'stroke-dasharray': `${2 + rng() * 3} ${3 + rng() * 4}`
		}),
		svgEl('circle', { cx: String(sx), cy: String(sy), r: '1.5', fill: G, opacity: '0.35' }),
		svgEl('circle', { cx: String(ex), cy: String(ey), r: '1.5', fill: G, opacity: '0.35' }),
	];
}

function spiralCoil(rng: Rng): ElementContent[] {
	const turns = 1 + rng() * 0.5;
	const maxR = 16 + rng() * 14;
	const steps = 30;
	let d = 'M 4 4';
	for (let i = 1; i <= steps; i++) {
		const t = i / steps;
		const angle = turns * Math.PI / 2 * t;
		const r = maxR * t;
		d += ` L ${4 + r * Math.sin(angle)} ${4 + r * (1 - Math.cos(angle))}`;
	}
	return [
		svgEl('path', {
			d, fill: 'none', stroke: G,
			'stroke-width': String(0.7 + rng() * 0.5),
			opacity: String(0.25 + rng() * 0.15)
		}),
		svgEl('circle', { cx: '4', cy: '4', r: '1.5', fill: G, opacity: '0.45' }),
	];
}

// ─── Edge element vocabulary ───

type EdgeGen = (rng: Rng, len: number) => ElementContent[];

function edgeCenterDiamond(_rng: Rng, len: number): ElementContent[] {
	const mid = len / 2;
	return [
		svgEl('polygon', {
			points: `${mid},1 ${mid + 4},6 ${mid},11 ${mid - 4},6`,
			fill: G, opacity: '0.4'
		}),
		svgEl('line', { x1: String(mid - 20), y1: '6', x2: String(mid - 4), y2: '6', stroke: G, 'stroke-width': '0.6', opacity: '0.2' }),
		svgEl('line', { x1: String(mid + 4), y1: '6', x2: String(mid + 20), y2: '6', stroke: G, 'stroke-width': '0.6', opacity: '0.2' }),
	];
}

function edgeDotChain(rng: Rng, len: number): ElementContent[] {
	const elems: ElementContent[] = [];
	const count = 7 + Math.floor(rng() * 5);
	const spacing = len * 0.6 / count;
	const start = len * 0.2;
	for (let i = 0; i < count; i++) {
		elems.push(svgEl('circle', {
			cx: String(start + i * spacing), cy: '6',
			r: String(0.8 + rng() * 1.5), fill: G, opacity: String(0.2 + rng() * 0.2)
		}));
	}
	return elems;
}

function edgeDashLine(rng: Rng, len: number): ElementContent[] {
	const start = len * (0.1 + rng() * 0.1);
	const end = len * (0.9 - rng() * 0.1);
	return [
		svgEl('line', {
			x1: String(start), y1: '6', x2: String(end), y2: '6',
			stroke: G, 'stroke-width': '0.7', opacity: '0.2',
			'stroke-dasharray': `${2 + rng() * 2} ${3 + rng() * 3}`
		}),
	];
}

function edgeTickRow(rng: Rng, len: number): ElementContent[] {
	const elems: ElementContent[] = [];
	const count = 8 + Math.floor(rng() * 8);
	const spacing = len * 0.6 / count;
	const start = len * 0.2;
	for (let i = 0; i < count; i++) {
		const x = start + i * spacing;
		const isMajor = i % 3 === 0;
		elems.push(svgEl('line', {
			x1: String(x), y1: isMajor ? '1' : '3', x2: String(x), y2: isMajor ? '11' : '9',
			stroke: G, 'stroke-width': isMajor ? '0.8' : '0.4',
			opacity: isMajor ? '0.3' : '0.15'
		}));
	}
	return elems;
}

function edgeTwinDiamonds(rng: Rng, len: number): ElementContent[] {
	const mid = len / 2;
	const gap = 10 + rng() * 12;
	const sz = 2.5 + rng() * 1.5;
	return [
		svgEl('polygon', { points: `${mid - gap},1 ${mid - gap + sz},6 ${mid - gap},11 ${mid - gap - sz},6`, fill: G, opacity: '0.35' }),
		svgEl('polygon', { points: `${mid + gap},1 ${mid + gap + sz},6 ${mid + gap},11 ${mid + gap - sz},6`, fill: G, opacity: '0.35' }),
		svgEl('line', { x1: String(mid - gap + sz), y1: '6', x2: String(mid + gap - sz), y2: '6', stroke: G, 'stroke-width': '0.5', opacity: '0.15' }),
	];
}

function edgeArcBridge(rng: Rng, len: number): ElementContent[] {
	const start = len * 0.2;
	const end = len * 0.8;
	const cpY = -2 - rng() * 5;
	return [
		svgEl('path', {
			d: `M ${start} 6 Q ${len / 2} ${cpY} ${end} 6`,
			fill: 'none', stroke: G, 'stroke-width': '0.7', opacity: String(0.2 + rng() * 0.1)
		}),
		svgEl('circle', { cx: String(start), cy: '6', r: '1.2', fill: G, opacity: '0.3' }),
		svgEl('circle', { cx: String(end), cy: '6', r: '1.2', fill: G, opacity: '0.3' }),
	];
}

function edgeVineSegment(rng: Rng, len: number): ElementContent[] {
	const start = len * 0.15;
	const end = len * 0.85;
	const mid = (start + end) / 2;
	const cpY = 6 + (rng() > 0.5 ? -4 : 4) * (1 + rng());
	return [
		svgEl('path', {
			d: `M ${start} 6 Q ${mid} ${cpY} ${end} 6`,
			fill: 'none', stroke: G, 'stroke-width': '0.5', opacity: '0.2'
		}),
		svgEl('circle', { cx: String(mid), cy: String(cpY > 6 ? cpY - 1 : cpY + 1), r: '1', fill: G, opacity: '0.3' }),
	];
}

function edgeConstellationEdge(rng: Rng, len: number): ElementContent[] {
	const elems: ElementContent[] = [];
	const count = 4 + Math.floor(rng() * 4);
	const points: number[] = [];
	for (let i = 0; i < count; i++) {
		const x = len * 0.1 + rng() * len * 0.8;
		points.push(x);
		elems.push(svgEl('circle', {
			cx: String(x), cy: String(3 + rng() * 6),
			r: String(1 + rng() * 1.2), fill: G, opacity: String(0.25 + rng() * 0.15)
		}));
	}
	points.sort((a, b) => a - b);
	for (let i = 0; i < points.length - 1; i++) {
		elems.push(svgEl('line', {
			x1: String(points[i]), y1: '6', x2: String(points[i + 1]), y2: '6',
			stroke: G, 'stroke-width': '0.4', opacity: '0.12'
		}));
	}
	return elems;
}

// ─── Vocabulary arrays ───

const CORNER_VOCAB: ElemGen[] = [
	celestialArcs, diamondNode, crosshair, alchemicalTriangle,
	concentricRings, orbitalDots, botanicalFern, constellationCluster,
	radialBurst, tickMarks, dashedArcElement, spiralCoil
];

const EDGE_VOCAB: EdgeGen[] = [
	edgeCenterDiamond, edgeDotChain, edgeDashLine, edgeTickRow,
	edgeTwinDiamonds, edgeArcBridge, edgeVineSegment, edgeConstellationEdge
];

// ─── Composition engine ───

function pickN<T>(arr: T[], n: number, rng: Rng): T[] {
	const shuffled = [...arr];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(rng() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled.slice(0, n);
}

function composeCorner(seed: string): ElementContent[] {
	const rng = seedrandom(seed + '-corner');
	const count = 2 + Math.floor(rng() * 2); // 2-3 elements
	const generators = pickN(CORNER_VOCAB, count, rng);
	return generators.flatMap((gen) => gen(rng));
}

function composeEdge(seed: string, position: string, len: number): ElementContent[] {
	const rng = seedrandom(seed + '-edge-' + position);
	const count = 1 + Math.floor(rng() * 2); // 1-2 elements
	const generators = pickN(EDGE_VOCAB, count, rng);
	return generators.flatMap((gen) => gen(rng, len));
}

function createCornerSvg(seed: string, corner: string): Element {
	const pos: string[] = [
		'position:absolute', 'pointer-events:none', `width:${S}px`, `height:${S}px`, 'z-index:2'
	];
	switch (corner) {
		case 'tl': pos.push('top:-3px', 'left:-3px'); break;
		case 'tr': pos.push('top:-3px', 'right:-3px', 'transform:scaleX(-1)'); break;
		case 'bl': pos.push('bottom:-3px', 'left:-3px', 'transform:scaleY(-1)'); break;
		case 'br': pos.push('bottom:-3px', 'right:-3px', 'transform:scale(-1,-1)'); break;
	}
	return el('svg', {
		viewBox: `0 0 ${S} ${S}`,
		style: pos.join(';'),
		xmlns: 'http://www.w3.org/2000/svg',
		'aria-hidden': 'true'
	}, composeCorner(seed));
}

function createEdgeSvg(seed: string, position: 'top' | 'bottom' | 'left' | 'right'): Element {
	const isHorizontal = position === 'top' || position === 'bottom';
	const len = isHorizontal ? 200 : 100;
	const h = isHorizontal ? 12 : 12;
	const viewBox = isHorizontal ? `0 0 ${len} ${h}` : `0 0 ${h} ${len}`;

	const posStyles: string[] = ['position:absolute', 'pointer-events:none', 'z-index:2'];
	if (isHorizontal) {
		posStyles.push(`width:${len}px`, `height:${h}px`, 'left:50%', 'transform:translateX(-50%)');
		posStyles.push(position === 'top' ? `top:-${h / 2}px` : `bottom:-${h / 2}px`);
	} else {
		posStyles.push(`width:${h}px`, `height:${len}px`, 'top:50%', 'transform:translateY(-50%)');
		posStyles.push(position === 'left' ? `left:-${h / 2}px` : `right:-${h / 2}px`);
	}

	return el('svg', {
		viewBox,
		style: posStyles.join(';'),
		xmlns: 'http://www.w3.org/2000/svg',
		'aria-hidden': 'true'
	}, composeEdge(seed, position, len));
}

// ─── Mandala watermark overlay ───

function createMandalaOverlay(seed: string): Element {
	const rng = seedrandom(seed + '-mandala');
	const elems: ElementContent[] = [];
	const cx = 200, cy = 200;

	// Concentric circles
	const ringCount = 3 + Math.floor(rng() * 4);
	for (let i = 0; i < ringCount; i++) {
		const r = 30 + i * (25 + rng() * 15);
		const dashed = rng() > 0.4;
		const attrs: Record<string, string | number> = {
			cx: String(cx), cy: String(cy), r: String(r),
			fill: 'none', stroke: G,
			'stroke-width': String(0.4 + rng() * 0.6),
			opacity: String(0.5 + rng() * 0.4)
		};
		if (dashed) attrs['stroke-dasharray'] = `${2 + rng() * 4} ${3 + rng() * 5}`;
		elems.push(svgEl('circle', attrs));
	}

	// Radial rays
	const rayCount = 12 + Math.floor(rng() * 24);
	for (let i = 0; i < rayCount; i++) {
		const angle = (2 * Math.PI * i) / rayCount + rng() * 0.05;
		const inner = 20 + rng() * 30;
		const outer = inner + 40 + rng() * 120;
		elems.push(svgEl('line', {
			x1: String(cx + inner * Math.cos(angle)),
			y1: String(cy + inner * Math.sin(angle)),
			x2: String(cx + outer * Math.cos(angle)),
			y2: String(cy + outer * Math.sin(angle)),
			stroke: G,
			'stroke-width': String(i % 4 === 0 ? 0.6 : 0.3),
			opacity: String(i % 4 === 0 ? 0.6 : 0.3)
		}));
	}

	// Diamond markers at cardinal-ish positions
	const diamondCount = 4 + Math.floor(rng() * 5);
	for (let i = 0; i < diamondCount; i++) {
		const angle = (2 * Math.PI * i) / diamondCount;
		const dist = 60 + rng() * 100;
		const dx = cx + dist * Math.cos(angle);
		const dy = cy + dist * Math.sin(angle);
		const sz = 3 + rng() * 4;
		elems.push(svgEl('polygon', {
			points: `${dx},${dy - sz} ${dx + sz},${dy} ${dx},${dy + sz} ${dx - sz},${dy}`,
			fill: G, opacity: String(0.4 + rng() * 0.4)
		}));
	}

	// Scattered dots
	const dotCount = 12 + Math.floor(rng() * 16);
	for (let i = 0; i < dotCount; i++) {
		const angle = rng() * Math.PI * 2;
		const dist = 40 + rng() * 160;
		elems.push(svgEl('circle', {
			cx: String(cx + dist * Math.cos(angle)),
			cy: String(cy + dist * Math.sin(angle)),
			r: String(0.8 + rng() * 2),
			fill: G, opacity: String(0.3 + rng() * 0.5)
		}));
	}

	// Dashed arc segments
	const arcCount = Math.floor(rng() * 6);
	for (let i = 0; i < arcCount; i++) {
		const r = 50 + rng() * 120;
		const startAngle = rng() * Math.PI * 2;
		const sweep = 0.3 + rng() * 0.8;
		const sx = cx + r * Math.cos(startAngle);
		const sy = cy + r * Math.sin(startAngle);
		const ex = cx + r * Math.cos(startAngle + sweep);
		const ey = cy + r * Math.sin(startAngle + sweep);
		elems.push(svgEl('path', {
			d: `M ${sx} ${sy} A ${r} ${r} 0 0 1 ${ex} ${ey}`,
			fill: 'none', stroke: G,
			'stroke-width': String(0.4 + rng() * 0.4),
			opacity: String(0.3 + rng() * 0.4),
			'stroke-dasharray': `${1.5 + rng() * 3} ${2 + rng() * 4}`
		}));
	}

	// Center motif
	elems.push(svgEl('circle', { cx: String(cx), cy: String(cy), r: '3', fill: G, opacity: '0.5' }));
	elems.push(svgEl('circle', { cx: String(cx), cy: String(cy), r: '8', fill: 'none', stroke: G, 'stroke-width': '0.5', opacity: '0.4' }));

	return el('svg', {
		viewBox: '0 0 400 400',
		preserveAspectRatio: 'xMidYMid slice',
		className: ['article-figure__watermark'],
		xmlns: 'http://www.w3.org/2000/svg',
		'aria-hidden': 'true'
	}, elems);
}

// ─── Text content helper ───

function getTextContent(node: Element): string {
	let text = '';
	for (const child of node.children) {
		if (child.type === 'text') text += child.value;
		else if (child.type === 'element') text += getTextContent(child);
	}
	return text;
}

// ─── Main plugin ───

/**
 * Rehype plugin: wrap article images in decorated <figure> elements
 * with esoteric gold SVG ornaments composed from a vocabulary of elements.
 *
 * Supports layout hints in alt text: {wide}, {compact}, {float-right}, {float-left}, {small}, {half}
 * Captions: italic text immediately after an image in the same paragraph
 */
/** Build a single figure element from an img and optional caption */
function buildFigure(img: Element, captionText: string): Element {
	const src = String(img.properties?.src || '');
	let alt = String(img.properties?.alt || '');

	// Parse layout hints (supports multiple: {float-left} {nowatermark})
	const layouts: string[] = [];
	let noWatermark = false;
	let hintMatch: RegExpMatchArray | null;
	while ((hintMatch = alt.match(/^\{([\w-]+)\}\s*/))) {
		const hint = hintMatch[1];
		if (hint === 'nowatermark') {
			noWatermark = true;
		} else {
			layouts.push(hint);
		}
		alt = alt.slice(hintMatch[0].length);
	}

	img.properties = img.properties || {};
	img.properties.alt = alt;
	img.properties.loading = 'lazy';
	img.properties.src = src.replace('/assets/', '/images/');

	const seed = src;
	const corners = ['tl', 'tr', 'bl', 'br'].map((c) => createCornerSvg(seed, c));
	const edges = (['top', 'bottom'] as const).map((e) => createEdgeSvg(seed, e));

	const frameChildren: ElementContent[] = [img, ...corners, ...edges];
	if (!noWatermark) {
		frameChildren.push(createMandalaOverlay(seed));
	}

	const frame = el('div', { className: ['article-figure__frame'] }, frameChildren);

	const classes = ['article-figure'];
	for (const l of layouts) classes.push(`article-figure--${l}`);

	const figChildren: ElementContent[] = [frame];
	if (captionText) {
		figChildren.push(el('figcaption', {}, [txt(captionText)]));
	}

	return el('figure', {
		className: classes,
		role: 'figure',
		'aria-label': alt || captionText || undefined
	}, figChildren);
}

export default function rehypeFigures() {
	return (tree: Root) => {
		visit(tree, 'element', (node: Element, index, parent) => {
			if (node.tagName !== 'p' || !parent || index === undefined) return;

			// Collect all article images in this paragraph
			const imgIndices: number[] = [];
			for (let i = 0; i < node.children.length; i++) {
				const child = node.children[i];
				if (child.type === 'element' && (child as Element).tagName === 'img') {
					const src = String((child as Element).properties?.src || '');
					if (src.startsWith('/assets/')) imgIndices.push(i);
				}
			}
			if (imgIndices.length === 0) return;

			// Build a figure for each image, finding its caption (next <em> sibling)
			const figures: Element[] = [];
			for (const imgIdx of imgIndices) {
				const img = node.children[imgIdx] as Element;

				// Look for caption: <em> after this img, before next img or end
				let caption = '';
				const nextImgIdx = imgIndices.find((i) => i > imgIdx);
				const searchEnd = nextImgIdx ?? node.children.length;
				for (let i = imgIdx + 1; i < searchEnd; i++) {
					const child = node.children[i];
					if (child.type === 'element' && (child as Element).tagName === 'em') {
						caption = getTextContent(child as Element);
						break;
					}
					if (child.type === 'element' && (child as Element).tagName === 'br') continue;
					if (child.type === 'text' && child.value.trim() === '') continue;
					break;
				}

				figures.push(buildFigure(img, caption));
			}

			// Replace the <p> with all figures
			(parent as Element).children.splice(index, 1, ...figures);
		});
	};
}
