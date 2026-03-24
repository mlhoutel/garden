import { visit } from 'unist-util-visit';
import type { Element, Root } from 'hast';
import type { BuildVisitor } from 'unist-util-visit';

/**
 * Rehype plugin: transform <div data-embed="type" data-*="..."> into rendered embeds.
 *
 * Usage in markdown:
 *   <div data-embed="iframe" data-src="https://example.com" data-height="500" data-title="Demo"></div>
 *
 * Options:
 *   data-fullwidth     — break out of article width to fill viewport
 *   data-fullheight    — use 100vh height
 *   data-chrome        — add ornate window title bar
 *   data-chrome-title  — title text for the chrome bar
 *   data-aspect-ratio  — responsive aspect ratio (e.g. "16/9")
 *
 * Extensible: add new cases to the switch for future component types.
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
				// Future types: case 'video': case 'codepen': case 'jsxgraph': etc.
			}

			if (replacement) {
				parent.children[index] = replacement;
			}
		}) as BuildVisitor<Root, 'element'>);
	};
}

/** Extract data-* attributes with values into a plain object */
function extractDataProps(properties: Record<string, any>): Record<string, string> {
	const result: Record<string, string> = {};
	for (const [key, value] of Object.entries(properties)) {
		if (key === 'dataEmbed') continue;
		if (key.startsWith('data') && value !== '' && value !== true) {
			const propName = key
				.slice(4)
				.replace(/^[A-Z]/, (c) => c.toLowerCase())
				.replace(/[A-Z]/g, (c) => '-' + c.toLowerCase());
			result[propName] = String(value);
		}
	}
	return result;
}

/** Extract boolean data-* flags (attributes present without a value, or value="true"/empty) */
function extractFlags(properties: Record<string, any>): Set<string> {
	const flags = new Set<string>();
	for (const [key, value] of Object.entries(properties)) {
		if (key === 'dataEmbed') continue;
		if (key.startsWith('data') && (value === '' || value === true)) {
			const flagName = key
				.slice(4)
				.replace(/^[A-Z]/, (c) => c.toLowerCase())
				.replace(/[A-Z]/g, (c) => '-' + c.toLowerCase());
			flags.add(flagName);
		}
	}
	return flags;
}

/** Build an iframe embed element */
function buildIframeEmbed(props: Record<string, string>, flags: Set<string>): Element {
	const src = props['src'] || '';
	const title = props['title'] || 'Embedded content';
	const aspectRatio = props['aspect-ratio'] || '';
	const chromeTitle = props['chrome-title'] || title;

	const fullwidth = flags.has('fullwidth');
	const fullheight = flags.has('fullheight');
	const hasChrome = flags.has('chrome');

	// Compute height
	let height = props['height'] || '500';
	if (fullheight) height = '100vh';
	const heightVal = height.includes('px') || height.includes('%') || height.includes('vh') ? height : height + 'px';

	// Container classes
	const classes = ['embed-container', 'embed-iframe'];
	if (fullwidth) classes.push('embed-fullwidth');

	// Inner iframe wrapper style
	const innerStyle = aspectRatio
		? `position:relative; width:100%; aspect-ratio:${aspectRatio};`
		: `position:relative; width:100%; height:${heightVal};`;

	// Build the iframe element
	const iframeEl: Element = {
		type: 'element',
		tagName: 'iframe',
		properties: {
			src,
			title,
			loading: 'lazy',
			allowFullscreen: true,
			style: 'position:absolute; top:0; left:0; width:100%; height:100%; border:none;'
		},
		children: []
	};

	// Inner wrapper
	const innerWrapper: Element = {
		type: 'element',
		tagName: 'div',
		properties: { className: ['embed-iframe-inner'], style: innerStyle },
		children: [iframeEl]
	};

	// Build children array
	const children: Element[] = [];

	if (hasChrome) {
		children.push(buildChromeBar(chromeTitle));
	}

	children.push(innerWrapper);

	return {
		type: 'element',
		tagName: 'div',
		properties: {
			className: classes,
			style: `margin: ${fullwidth ? '2.5rem 0' : '2rem 0'};`
		},
		children
	};
}

/** Build the ornate window chrome title bar */
function buildChromeBar(title: string): Element {
	return {
		type: 'element',
		tagName: 'div',
		properties: { className: ['embed-chrome'] },
		children: [
			// Left ornament SVG
			{
				type: 'raw',
				value: `<svg viewBox="0 0 60 20" class="embed-chrome-ornament" style="width:48px;height:16px;flex-shrink:0;"><line x1="4" y1="10" x2="48" y2="10" stroke="#D4A017" stroke-width="0.5" opacity="0.3"/><circle cx="8" cy="10" r="1" fill="#D4A017" opacity="0.25"/><polygon points="50,10 54,7.5 54,12.5" fill="#D4A017" opacity="0.2"/></svg>`
			} as any,
			// Diamond separator
			{
				type: 'raw',
				value: `<span style="color:#D4A017;opacity:0.3;font-size:0.45rem;">◆</span>`
			} as any,
			// Title
			{
				type: 'element',
				tagName: 'span',
				properties: { className: ['embed-chrome-title'] },
				children: [{ type: 'text', value: title }]
			},
			// Diamond separator
			{
				type: 'raw',
				value: `<span style="color:#D4A017;opacity:0.3;font-size:0.45rem;">◆</span>`
			} as any,
			// Right ornament (fills remaining space)
			{
				type: 'raw',
				value: `<svg viewBox="0 0 200 20" class="embed-chrome-ornament" style="flex:1;height:16px;min-width:20px;"><line x1="2" y1="10" x2="196" y2="10" stroke="#D4A017" stroke-width="0.5" opacity="0.2"/><polygon points="2,10 6,7.5 6,12.5" fill="#D4A017" opacity="0.2"/></svg>`
			} as any,
			// Fullscreen button
			{
				type: 'raw',
				value: `<button class="embed-fullscreen-btn" onclick="(function(b){var c=b.closest('.embed-container');if(!c)return;if(document.fullscreenElement){document.exitFullscreen()}else{c.requestFullscreen()}})(this)" title="Toggle fullscreen" aria-label="Toggle fullscreen">⛶</button>`
			} as any
		]
	};
}
