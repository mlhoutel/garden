import { visit } from 'unist-util-visit';
import type { Element, Root, Text } from 'hast';
import type { BuildVisitor } from 'unist-util-visit';

/**
 * Rehype plugin: transform <div data-embed="type" data-*="..."> into rendered embeds.
 *
 * All output uses proper HAST element nodes (no raw HTML strings) so it works
 * correctly when running after rehype-raw in the pipeline.
 */
export default function rehypeEmbeds() {
	return (tree: Root) => {
		visit(tree, 'element', ((node: Element, index: number | null, parent: Element | null) => {
			if (node.tagName !== 'div' || !node.properties?.dataEmbed) return;
			if (parent == null || index == null) return;

			const embedType = String(node.properties.dataEmbed);
			const props = extractDataProps(node.properties);
			const flags = extractFlags(node.properties);

			let replacement: Element | null = null;

			switch (embedType) {
				case 'iframe':
					replacement = buildIframeEmbed(props, flags);
					break;
				case 'github':
					replacement = buildGithubEmbed(props);
					break;
			}

			if (replacement) {
				parent.children[index] = replacement;
			}
		}) as BuildVisitor<Root, 'element'>);
	};
}

// ─── Helpers ────────────────────────────────────────────────────────────

function extractDataProps(properties: Record<string, any>): Record<string, string> {
	const result: Record<string, string> = {};
	for (const [key, value] of Object.entries(properties)) {
		if (key === 'dataEmbed') continue;
		if (key.startsWith('data') && value !== '' && value !== true) {
			const propName = key.slice(4).replace(/^[A-Z]/, (c) => c.toLowerCase()).replace(/[A-Z]/g, (c) => '-' + c.toLowerCase());
			result[propName] = String(value);
		}
	}
	return result;
}

function extractFlags(properties: Record<string, any>): Set<string> {
	const flags = new Set<string>();
	for (const [key, value] of Object.entries(properties)) {
		if (key === 'dataEmbed') continue;
		if (key.startsWith('data') && (value === '' || value === true)) {
			const flagName = key.slice(4).replace(/^[A-Z]/, (c) => c.toLowerCase()).replace(/[A-Z]/g, (c) => '-' + c.toLowerCase());
			flags.add(flagName);
		}
	}
	return flags;
}

function h(tag: string, props: Record<string, any>, children: (Element | Text)[] = []): Element {
	return { type: 'element', tagName: tag, properties: props, children };
}

function t(value: string): Text {
	return { type: 'text', value };
}

// ─── SVG helpers (proper HAST nodes) ────────────────────────────────────

function svgLine(x1: number, y1: number, x2: number, y2: number, stroke: string, strokeWidth: number, opacity: number): Element {
	return h('line', { x1: String(x1), y1: String(y1), x2: String(x2), y2: String(y2), stroke, 'stroke-width': String(strokeWidth), opacity: String(opacity) });
}

function svgCircle(cx: number, cy: number, r: number, props: Record<string, any>): Element {
	return h('circle', { cx: String(cx), cy: String(cy), r: String(r), ...props });
}

function svgPolygon(points: string, props: Record<string, any>): Element {
	return h('polygon', { points, ...props });
}

function svgPath(d: string, props: Record<string, any>): Element {
	return h('path', { d, ...props });
}

/** Gold ornament SVG line with diamonds */
function goldOrnamentSvg(): Element {
	return h('svg', { viewBox: '0 0 400 8', style: 'width:100%;height:8px;display:block;', preserveAspectRatio: 'xMidYMid meet', xmlns: 'http://www.w3.org/2000/svg' }, [
		svgLine(0, 4, 150, 4, '#D4A017', 0.4, 0.15),
		svgPolygon('155,4 159,1.5 163,4 159,6.5', { fill: '#D4A017', opacity: '0.25' }),
		svgLine(168, 4, 232, 4, '#D4A017', 0.5, 0.2),
		svgPolygon('237,4 241,1.5 245,4 241,6.5', { fill: '#D4A017', opacity: '0.25' }),
		svgLine(250, 4, 400, 4, '#D4A017', 0.4, 0.15)
	]);
}

function goldDiamond(): Element {
	return h('span', { style: 'color:#D4A017;opacity:0.3;font-size:0.45rem;' }, [t('◆')]);
}

// ─── Iframe Embed ────────────────────────────────────────────────────────

function buildIframeEmbed(props: Record<string, string>, flags: Set<string>): Element {
	const src = props['src'] || '';
	const title = props['title'] || 'Embedded content';
	const aspectRatio = props['aspect-ratio'] || '';
	const chromeTitle = props['chrome-title'] || title;

	const fullwidth = flags.has('fullwidth');
	const fullheight = flags.has('fullheight');
	const hasChrome = flags.has('chrome');

	let height = props['height'] || '500';
	if (fullheight) height = '100vh';
	const heightVal = height.includes('px') || height.includes('%') || height.includes('vh') ? height : height + 'px';

	const classes = ['embed-container', 'embed-iframe'];
	if (fullwidth) classes.push('embed-fullwidth');

	const innerStyle = aspectRatio
		? `position:relative; width:100%; aspect-ratio:${aspectRatio};`
		: `position:relative; width:100%; height:${heightVal};`;

	const iframeEl = h('iframe', {
		src, title, loading: 'lazy', allowFullscreen: true,
		style: 'position:absolute; top:0; left:0; width:100%; height:100%; border:none;'
	});

	const innerWrapper = h('div', { className: ['embed-iframe-inner'], style: innerStyle }, [iframeEl]);

	const children: (Element | Text)[] = [];
	if (hasChrome) children.push(buildChromeBar(chromeTitle));
	children.push(innerWrapper);

	const container = h('div', {
		className: classes,
		style: `margin: 0;`
	}, children);

	// Fullwidth iframes get a sticky scroll wrapper:
	// - outer wrapper is taller than the iframe by 200px (sticky travel distance)
	// - iframe sticks to top during that 200px, then scrolls away
	// - starts at 94% width, expands to 100% when in view (via CSS .embed-in-view)
	if (fullwidth) {
		return h('div', {
			className: ['embed-sticky-wrapper'],
			style: `padding: 3rem 0;`
		}, [container]);
	}

	return h('div', { style: 'margin: 2rem 0;' }, [container]);
}

function buildChromeBar(title: string): Element {
	// Left ornament
	const leftSvg = h('svg', { viewBox: '0 0 60 20', class: 'embed-chrome-ornament', style: 'width:48px;height:16px;flex-shrink:0;', xmlns: 'http://www.w3.org/2000/svg' }, [
		svgLine(4, 10, 48, 10, '#D4A017', 0.5, 0.3),
		svgCircle(8, 10, 1, { fill: '#D4A017', opacity: '0.25' }),
		svgPolygon('50,10 54,7.5 54,12.5', { fill: '#D4A017', opacity: '0.2' })
	]);

	// Right ornament (flex:1 fills space)
	const rightSvg = h('svg', { viewBox: '0 0 200 20', class: 'embed-chrome-ornament', style: 'flex:1;height:16px;min-width:20px;', xmlns: 'http://www.w3.org/2000/svg' }, [
		svgLine(2, 10, 196, 10, '#D4A017', 0.5, 0.2),
		svgPolygon('2,10 6,7.5 6,12.5', { fill: '#D4A017', opacity: '0.2' })
	]);

	// Fullscreen button
	const fullscreenBtn = h('button', {
		className: ['embed-fullscreen-btn'],
		onclick: "(function(b){var c=b.closest('.embed-container');if(!c)return;if(document.fullscreenElement){document.exitFullscreen()}else{c.requestFullscreen()}})(this)",
		title: 'Toggle fullscreen',
		'aria-label': 'Toggle fullscreen'
	}, [t('\u26F6')]);

	return h('div', { className: ['embed-chrome'] }, [
		leftSvg,
		goldDiamond(),
		h('span', { className: ['embed-chrome-title'] }, [t(title)]),
		goldDiamond(),
		rightSvg,
		fullscreenBtn
	]);
}

// ─── GitHub Repo Card ────────────────────────────────────────────────────

function buildGithubEmbed(props: Record<string, string>): Element {
	const repo = props['repo'] || '';
	const description = props['description'] || '';
	const lang = props['lang'] || '';
	const stars = props['stars'] || '';
	const license = props['license'] || '';
	const url = `https://github.com/${repo}`;
	const [owner, name] = repo.split('/');

	const langColors: Record<string, string> = {
		python: '#3572A5', javascript: '#f1e05a', typescript: '#3178c6',
		rust: '#dea584', go: '#00ADD8', java: '#b07219', 'c++': '#f34b7d',
		c: '#555555', haskell: '#5e5086', svelte: '#ff3e00', html: '#e34c26',
		css: '#563d7c', shell: '#89e051', lua: '#000080'
	};
	const langColor = langColors[lang.toLowerCase()] || '#D4A017';

	const GH_ICON = 'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z';
	const STAR_ICON = 'M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z';

	// Background SVG with OVERFLOW — elements extend beyond card boundaries
	// viewBox extends 30px outside each edge to allow overflow
	const cx = 460, cy = 70; // orbital center (right side, overflows right edge)
	const bgSvg = h('svg', {
		viewBox: '-30 -30 560 180', className: ['embed-github-bg'],
		preserveAspectRatio: 'xMidYMid slice', xmlns: 'http://www.w3.org/2000/svg',
		style: 'overflow:visible;'
	}, [
		// === RIGHT SIDE: orbital system that overflows the card ===
		// Concentric rings — outer ones extend past card boundary
		svgCircle(cx, cy, 65, { fill: 'none', stroke: '#D4A017', 'stroke-width': '0.2', opacity: '0.05', 'stroke-dasharray': '3 8' }),
		svgCircle(cx, cy, 50, { fill: 'none', stroke: '#D4A017', 'stroke-width': '0.3', opacity: '0.07' }),
		svgCircle(cx, cy, 38, { fill: 'none', stroke: '#D4A017', 'stroke-width': '0.4', opacity: '0.09', 'stroke-dasharray': '2 5' }),
		svgCircle(cx, cy, 25, { fill: 'none', stroke: '#D4A017', 'stroke-width': '0.3', opacity: '0.1' }),
		svgCircle(cx, cy, 14, { fill: 'none', stroke: '#D4A017', 'stroke-width': '0.3', opacity: '0.08' }),
		svgCircle(cx, cy, 4, { fill: '#D4A017', opacity: '0.15' }),
		// Radial lines extending outward
		...[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
			const a = (deg * Math.PI) / 180;
			return svgLine(cx + Math.cos(a) * 16, cy + Math.sin(a) * 16, cx + Math.cos(a) * 23, cy + Math.sin(a) * 23, '#D4A017', 0.25, 0.07);
		}),
		// Animated orbiting dots — slow ring (r=38)
		h('g', { className: ['embed-github-orbit-slow'], style: `transform-origin: ${cx}px ${cy}px;` }, [
			svgCircle(cx + 38, cy, 1.8, { fill: '#D4A017', opacity: '0.3' }),
			svgCircle(cx - 38, cy, 1.0, { fill: '#D4A017', opacity: '0.2' }),
			svgCircle(cx, cy - 38, 1.3, { fill: '#D4A017', opacity: '0.25' }),
		]),
		// Animated orbiting dots — fast ring (r=50)
		h('g', { className: ['embed-github-orbit-fast'], style: `transform-origin: ${cx}px ${cy}px;` }, [
			svgCircle(cx + 50, cy, 1.2, { fill: '#D4A017', opacity: '0.2' }),
			svgCircle(cx - 25, cy + 43, 0.8, { fill: '#D4A017', opacity: '0.15' }),
		]),

		// === LEFT SIDE: small secondary orbital at top-left corner, overflows ===
		svgCircle(-8, -5, 18, { fill: 'none', stroke: '#D4A017', 'stroke-width': '0.2', opacity: '0.06' }),
		svgCircle(-8, -5, 10, { fill: 'none', stroke: '#D4A017', 'stroke-width': '0.25', opacity: '0.08', 'stroke-dasharray': '1.5 3' }),
		svgCircle(-8, -5, 2, { fill: '#D4A017', opacity: '0.1' }),

		// === CORNER DIAMONDS with extending lines ===
		// Top-left: diamond + line extending up-left
		svgPolygon('12,6 16,2 20,6 16,10', { fill: 'none', stroke: '#D4A017', 'stroke-width': '0.4', opacity: '0.12' }),
		svgLine(12, 2, -15, -18, '#D4A017', 0.25, 0.06),
		// Top-right: diamond + line extending up-right
		svgPolygon('488,6 492,2 496,6 492,10', { fill: 'none', stroke: '#D4A017', 'stroke-width': '0.4', opacity: '0.12' }),
		svgLine(496, 2, 520, -15, '#D4A017', 0.25, 0.06),
		// Bottom-left
		svgPolygon('12,114 16,110 20,114 16,118', { fill: 'none', stroke: '#D4A017', 'stroke-width': '0.4', opacity: '0.12' }),
		svgLine(12, 118, -10, 140, '#D4A017', 0.25, 0.05),
		// Bottom-right
		svgPolygon('488,114 492,110 496,114 492,118', { fill: 'none', stroke: '#D4A017', 'stroke-width': '0.4', opacity: '0.12' }),
		svgLine(496, 118, 515, 138, '#D4A017', 0.25, 0.05),

		// === BORDER LINES with dots ===
		svgLine(24, 0, 220, 0, '#D4A017', 0.3, 0.06),
		svgLine(280, 0, 480, 0, '#D4A017', 0.3, 0.06),
		svgLine(24, 120, 220, 120, '#D4A017', 0.3, 0.06),
		svgLine(280, 120, 480, 120, '#D4A017', 0.3, 0.06),
		svgLine(0, 14, 0, 106, '#D4A017', 0.3, 0.04),
		svgLine(500, 14, 500, 106, '#D4A017', 0.3, 0.04),
		// Small dots along top line
		svgCircle(120, 0, 0.8, { fill: '#D4A017', opacity: '0.1' }),
		svgCircle(250, 0, 1.0, { fill: '#D4A017', opacity: '0.08' }),
		svgCircle(380, 0, 0.8, { fill: '#D4A017', opacity: '0.1' }),
	]);

	// GitHub icon
	const ghIcon = h('svg', { viewBox: '0 0 16 16', style: 'width:22px;height:22px;flex-shrink:0;', xmlns: 'http://www.w3.org/2000/svg' }, [
		svgPath(GH_ICON, { fill: '#D4A017', opacity: '0.8' })
	]);

	// Star icon
	const starIcon = h('svg', { viewBox: '0 0 16 16', style: 'width:13px;height:13px;', xmlns: 'http://www.w3.org/2000/svg' }, [
		svgPath(STAR_ICON, { fill: '#D4A017' })
	]);

	// Header
	const header = h('div', { className: ['embed-github-header'] }, [
		ghIcon,
		h('div', {}, [
			h('span', { className: ['embed-github-owner'] }, [t(`${owner}/`)]),
			h('span', { className: ['embed-github-name'] }, [t(name || repo)])
		])
	]);

	const bodyChildren: (Element | Text)[] = [header];

	if (description) {
		bodyChildren.push(h('p', { className: ['embed-github-desc'] }, [t(description)]));
	}

	// Meta line
	const metaChildren: (Element | Text)[] = [];
	if (lang) {
		metaChildren.push(h('span', { style: 'display:inline-flex;align-items:center;gap:5px;' }, [
			h('span', { style: `width:8px;height:8px;border-radius:50%;background:${langColor};display:inline-block;` }),
			t(lang)
		]));
	}
	if (stars) {
		if (metaChildren.length) metaChildren.push(h('span', { style: 'opacity:0.3;' }, [t('·')]));
		metaChildren.push(h('span', { style: 'display:inline-flex;align-items:center;gap:3px;' }, [starIcon, t(stars)]));
	}
	if (license) {
		if (metaChildren.length) metaChildren.push(h('span', { style: 'opacity:0.3;' }, [t('·')]));
		metaChildren.push(h('span', {}, [t(license)]));
	}
	if (metaChildren.length) {
		bodyChildren.push(h('div', { className: ['embed-github-meta'] }, metaChildren));
	}

	// Arrow hint
	bodyChildren.push(h('span', { className: ['embed-github-arrow'] }, [t('\u2192')]));

	const body = h('div', { className: ['embed-github-body'] }, bodyChildren);

	return h('a', {
		className: ['embed-container', 'embed-github'],
		href: url,
		target: '_blank',
		rel: 'noreferrer',
		style: 'display:block; text-decoration:none; margin:2rem 0; color:inherit;'
	}, [bgSvg, body]);
}
