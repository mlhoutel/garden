import seedrandom from 'seedrandom';

const G = '#D4A017';

interface MandalaConfig {
	seed: string;
	width: number;
	height: number;
	color?: string;
	opacity?: number;
}

/**
 * Generate an SVG string of a mandala watermark pattern.
 * Deterministic output based on seed. Used for bitmap compositing with sharp.
 */
export function generateMandala(config: MandalaConfig): string {
	const { seed, width, height, color = G, opacity = 0.9 } = config;
	const rng = seedrandom(seed);
	const cx = width / 2;
	const cy = height / 2;
	const maxR = Math.min(cx, cy) * 0.85;
	const elems: string[] = [];

	// Concentric circles
	const ringCount = 3 + Math.floor(rng() * 5);
	for (let i = 0; i < ringCount; i++) {
		const r = maxR * (0.15 + (i / ringCount) * 0.85);
		const dashed = rng() > 0.4;
		const sw = 0.5 + rng() * 1;
		const op = 0.5 + rng() * 0.4;
		const dashAttr = dashed
			? ` stroke-dasharray="${(2 + rng() * 4).toFixed(1)} ${(3 + rng() * 5).toFixed(1)}"`
			: '';
		elems.push(
			`<circle cx="${cx}" cy="${cy}" r="${r.toFixed(1)}" fill="none" stroke="${color}" stroke-width="${sw.toFixed(2)}" opacity="${op.toFixed(2)}"${dashAttr}/>`
		);
	}

	// Radial rays
	const rayCount = 12 + Math.floor(rng() * 24);
	for (let i = 0; i < rayCount; i++) {
		const angle = (2 * Math.PI * i) / rayCount + rng() * 0.05;
		const inner = maxR * (0.1 + rng() * 0.15);
		const outer = inner + maxR * (0.2 + rng() * 0.6);
		const isMajor = i % 4 === 0;
		const sw = isMajor ? 0.8 : 0.3;
		const op = isMajor ? 0.6 : 0.3;
		elems.push(
			`<line x1="${(cx + inner * Math.cos(angle)).toFixed(1)}" y1="${(cy + inner * Math.sin(angle)).toFixed(1)}" x2="${(cx + outer * Math.cos(angle)).toFixed(1)}" y2="${(cy + outer * Math.sin(angle)).toFixed(1)}" stroke="${color}" stroke-width="${sw}" opacity="${op}"/>`
		);
	}

	// Diamond markers
	const diamondCount = 4 + Math.floor(rng() * 5);
	for (let i = 0; i < diamondCount; i++) {
		const angle = (2 * Math.PI * i) / diamondCount;
		const dist = maxR * (0.3 + rng() * 0.5);
		const dx = cx + dist * Math.cos(angle);
		const dy = cy + dist * Math.sin(angle);
		const sz = 3 + rng() * 5;
		elems.push(
			`<polygon points="${dx},${dy - sz} ${dx + sz},${dy} ${dx},${dy + sz} ${dx - sz},${dy}" fill="${color}" opacity="${(0.4 + rng() * 0.4).toFixed(2)}"/>`
		);
	}

	// Scattered dots
	const dotCount = 12 + Math.floor(rng() * 20);
	for (let i = 0; i < dotCount; i++) {
		const angle = rng() * Math.PI * 2;
		const dist = maxR * (0.2 + rng() * 0.8);
		const r = 0.8 + rng() * 2.5;
		elems.push(
			`<circle cx="${(cx + dist * Math.cos(angle)).toFixed(1)}" cy="${(cy + dist * Math.sin(angle)).toFixed(1)}" r="${r.toFixed(1)}" fill="${color}" opacity="${(0.3 + rng() * 0.5).toFixed(2)}"/>`
		);
	}

	// Dashed arc segments
	const arcCount = Math.floor(rng() * 6);
	for (let i = 0; i < arcCount; i++) {
		const r = maxR * (0.25 + rng() * 0.6);
		const startAngle = rng() * Math.PI * 2;
		const sweep = 0.3 + rng() * 0.8;
		const sx = cx + r * Math.cos(startAngle);
		const sy = cy + r * Math.sin(startAngle);
		const ex = cx + r * Math.cos(startAngle + sweep);
		const ey = cy + r * Math.sin(startAngle + sweep);
		elems.push(
			`<path d="M ${sx.toFixed(1)} ${sy.toFixed(1)} A ${r.toFixed(1)} ${r.toFixed(1)} 0 0 1 ${ex.toFixed(1)} ${ey.toFixed(1)}" fill="none" stroke="${color}" stroke-width="${(0.4 + rng() * 0.5).toFixed(2)}" opacity="${(0.3 + rng() * 0.4).toFixed(2)}" stroke-dasharray="${(1.5 + rng() * 3).toFixed(1)} ${(2 + rng() * 4).toFixed(1)}"/>`
		);
	}

	// Tick marks on outermost ring
	const tickR = maxR * 0.9;
	const tickCount = 24 + Math.floor(rng() * 24);
	for (let i = 0; i < tickCount; i++) {
		const angle = (2 * Math.PI * i) / tickCount;
		const isMajor = i % 4 === 0;
		const inner = tickR - (isMajor ? 6 : 3);
		const outer = tickR;
		elems.push(
			`<line x1="${(cx + inner * Math.cos(angle)).toFixed(1)}" y1="${(cy + inner * Math.sin(angle)).toFixed(1)}" x2="${(cx + outer * Math.cos(angle)).toFixed(1)}" y2="${(cy + outer * Math.sin(angle)).toFixed(1)}" stroke="${color}" stroke-width="${isMajor ? 0.6 : 0.3}" opacity="${isMajor ? 0.5 : 0.25}"/>`
		);
	}

	// Center motif
	elems.push(`<circle cx="${cx}" cy="${cy}" r="4" fill="${color}" opacity="0.5"/>`);
	elems.push(
		`<circle cx="${cx}" cy="${cy}" r="10" fill="none" stroke="${color}" stroke-width="0.6" opacity="0.4"/>`
	);

	return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" opacity="${opacity}">${elems.join('')}</svg>`;
}

/**
 * Generate an SVG string for the attribution text watermark.
 * Positioned bottom-right within the image.
 */
export function generateAttribution(width: number, height: number, text: string): string {
	const fontSize = Math.max(11, Math.min(18, width * 0.011));
	const x = width - 20;
	const y = height - 20;

	return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
		<text x="${x + 2}" y="${y + 2}" text-anchor="end" font-size="${fontSize}" font-weight="700" font-family="monospace, 'Courier New'" fill="rgba(0,0,0,0.6)">${text}</text>
		<text x="${x}" y="${y}" text-anchor="end" font-size="${fontSize}" font-weight="700" font-family="monospace, 'Courier New'" fill="#D4A017">${text}</text>
	</svg>`;
}
