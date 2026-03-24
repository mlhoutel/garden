import { visit } from 'unist-util-visit';
import type { Element, Root } from 'hast';
import type { BuildVisitor } from 'unist-util-visit';

/**
 * Rehype plugin: transform <div data-embed="type" data-*="..."> into rendered embeds.
 *
 * Usage in markdown:
 *   <div data-embed="iframe" data-src="https://example.com" data-height="500" data-title="Demo"></div>
 *
 * Supported embed types:
 *   - iframe: renders a responsive iframe with loading=lazy
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

			let replacement: Element | null = null;

			switch (embedType) {
				case 'iframe':
					replacement = buildIframeEmbed(props);
					break;
				// Future types: case 'video': case 'codepen': case 'jsxgraph': etc.
			}

			if (replacement) {
				parent.children[index] = replacement;
			}
		}) as BuildVisitor<Root, 'element'>);
	};
}

/** Extract data-* attributes into a plain object (data-src → src, data-height → height) */
function extractDataProps(properties: Record<string, any>): Record<string, string> {
	const result: Record<string, string> = {};
	for (const [key, value] of Object.entries(properties)) {
		if (key === 'dataEmbed') continue;
		if (key.startsWith('data')) {
			// dataFooBar → foo-bar, dataSrc → src, dataHeight → height
			const propName = key
				.slice(4) // remove 'data'
				.replace(/^[A-Z]/, (c) => c.toLowerCase()) // first char lowercase
				.replace(/[A-Z]/g, (c) => '-' + c.toLowerCase()); // camelCase → kebab
			result[propName] = String(value);
		}
	}
	return result;
}

/** Build an iframe embed element */
function buildIframeEmbed(props: Record<string, string>): Element {
	const src = props['src'] || '';
	const height = props['height'] || '500';
	const title = props['title'] || 'Embedded content';
	const aspectRatio = props['aspect-ratio'] || '';

	const containerStyle = aspectRatio
		? `position:relative; width:100%; aspect-ratio:${aspectRatio}; margin:2rem 0;`
		: `position:relative; width:100%; height:${height.includes('px') || height.includes('%') || height.includes('vh') ? height : height + 'px'}; margin:2rem 0;`;

	return {
		type: 'element',
		tagName: 'div',
		properties: {
			className: ['embed-container', 'embed-iframe'],
			style: containerStyle
		},
		children: [
			{
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
			}
		]
	};
}
