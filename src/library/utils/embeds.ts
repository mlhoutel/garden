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
				case 'github':
					replacement = buildGithubEmbed(props);
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

/**
 * Build a GitHub repository card embed.
 *
 * Usage in markdown:
 *   <div data-embed="github" data-repo="mlhoutel/SMatrices" data-description="Python symbolic matrix computation library" data-lang="Python" data-stars="12"></div>
 */
function buildGithubEmbed(props: Record<string, string>): Element {
	const repo = props['repo'] || '';
	const description = props['description'] || '';
	const lang = props['lang'] || '';
	const stars = props['stars'] || '';
	const license = props['license'] || '';
	const url = `https://github.com/${repo}`;
	const [owner, name] = repo.split('/');

	// Language color dots (approximate GitHub colors)
	const langColors: Record<string, string> = {
		python: '#3572A5', javascript: '#f1e05a', typescript: '#3178c6',
		rust: '#dea584', go: '#00ADD8', java: '#b07219', 'c++': '#f34b7d',
		c: '#555555', haskell: '#5e5086', svelte: '#ff3e00', html: '#e34c26',
		css: '#563d7c', shell: '#89e051', lua: '#000080'
	};
	const langColor = langColors[lang.toLowerCase()] || '#D4A017';

	// Esoteric ornament SVG for the top border
	const ornamentSvg = `<svg viewBox="0 0 400 8" style="width:100%;height:8px;display:block;" preserveAspectRatio="xMidYMid meet"><line x1="0" y1="4" x2="150" y2="4" stroke="#D4A017" stroke-width="0.4" opacity="0.15"/><polygon points="155,4 159,1.5 163,4 159,6.5" fill="#D4A017" opacity="0.25"/><line x1="168" y1="4" x2="232" y2="4" stroke="#D4A017" stroke-width="0.5" opacity="0.2"/><polygon points="237,4 241,1.5 245,4 241,6.5" fill="#D4A017" opacity="0.25"/><line x1="250" y1="4" x2="400" y2="4" stroke="#D4A017" stroke-width="0.4" opacity="0.15"/></svg>`;

	// Build the star/meta info line
	const metaParts: string[] = [];
	if (lang) {
		metaParts.push(`<span style="display:inline-flex;align-items:center;gap:4px;"><span style="width:8px;height:8px;border-radius:50%;background:${langColor};display:inline-block;"></span>${lang}</span>`);
	}
	if (stars) {
		metaParts.push(`<span style="display:inline-flex;align-items:center;gap:3px;"><svg viewBox="0 0 16 16" style="width:12px;height:12px;"><path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" fill="#D4A017"/></svg>${stars}</span>`);
	}
	if (license) {
		metaParts.push(`<span>${license}</span>`);
	}
	const metaHtml = metaParts.join(`<span style="opacity:0.3;">·</span>`);

	return {
		type: 'element',
		tagName: 'a',
		properties: {
			className: ['embed-container', 'embed-github'],
			href: url,
			target: '_blank',
			rel: 'noreferrer',
			style: 'display:block; text-decoration:none; margin:2rem 0; color:inherit;'
		},
		children: [
			// Top ornament
			{ type: 'raw', value: ornamentSvg } as any,
			// Card body
			{
				type: 'raw',
				value: `<div class="embed-github-body">
					<div class="embed-github-header">
						<svg viewBox="0 0 16 16" style="width:18px;height:18px;flex-shrink:0;"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" fill="#D4A017" opacity="0.7"/></svg>
						<div>
							<span class="embed-github-owner">${owner || ''}/</span><span class="embed-github-name">${name || repo}</span>
						</div>
					</div>
					${description ? `<p class="embed-github-desc">${description}</p>` : ''}
					${metaHtml ? `<div class="embed-github-meta">${metaHtml}</div>` : ''}
				</div>`
			} as any,
			// Bottom ornament
			{ type: 'raw', value: ornamentSvg } as any
		]
	};
}
