import { visit } from 'unist-util-visit';
import { renderMermaidASCII } from 'beautiful-mermaid';
import type { Root, Code } from 'mdast';

/**
 * Remark plugin: render ```mermaid-ascii code blocks into preformatted
 * ASCII art at build time using beautiful-mermaid.
 *
 * On failure the code block is left untouched (renders as a normal
 * fenced block showing the Mermaid source).
 */
export default function remarkMermaidAscii() {
	return (tree: Root) => {
		visit(tree, 'code', (node: Code, index, parent) => {
			if (node.lang !== 'mermaid-ascii' || !parent || index === undefined) return;

			let ascii: string;
			try {
				ascii = renderMermaidASCII(node.value);
			} catch (err) {
				console.warn('[remark-mermaid-ascii] Failed to render block, leaving as-is:', err);
				return;
			}

			// Strip ANSI escape codes (emitted when FORCE_COLOR is set,
			// which Vite's dev server does) and HTML color spans (emitted
			// in some environments instead of ANSI).
			// eslint-disable-next-line no-control-regex
			ascii = ascii.replace(/\x1b\[[0-9;]*m/g, '');
			ascii = ascii.replace(/<\/?span[^>]*>/g, '');

			const escaped = ascii
				.replace(/&/g, '&amp;')
				.replace(/</g, '&lt;')
				.replace(/>/g, '&gt;');

			(parent.children as any[])[index] = {
				type: 'html',
				value: `<pre class="mermaid-ascii"><code>${escaped}</code></pre>`
			};
		});
	};
}
