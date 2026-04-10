import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkBreaks from 'remark-breaks';
import remarkSmartypants from 'remark-smartypants';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeCitation from 'rehype-citation';
import rehypeStringify from 'rehype-stringify';
import rehypeMermaid from './mermaid';
import rehypeEmbeds from './embeds';
import remarkMermaidAscii from './remark-mermaid-ascii';
import rehypeFigures from './rehype-figures';
import { transformerCopyButton } from '@rehype-pretty/transformers';
import { visit } from 'unist-util-visit';
import type { Root, Element } from 'hast';

/**
 * Remark plugin: promote single-line $$...$$ to display math.
 *
 * remark-math parses `$$x^2$$` on one line as inlineMath, not display math.
 * This plugin finds inlineMath nodes that are the sole child of a paragraph
 * and converts them to block-level `math` nodes so rehype-katex wraps them
 * in `.katex-display`.
 */
function remarkDisplayMath() {
	return (tree: any) => {
		visit(tree, 'paragraph', (node: any, index: number | undefined, parent: any) => {
			if (!parent || index === undefined) return;
			if (node.children.length !== 1) return;
			const child = node.children[0];
			if (child.type !== 'inlineMath') return;
			// Replace the paragraph with a display math node, including the
			// data properties that remark-math normally sets so that
			// remark-rehype and rehype-katex process it correctly.
			parent.children[index] = {
				type: 'math',
				meta: null,
				value: child.value,
				data: {
					hName: 'pre',
					hChildren: [{
						type: 'element',
						tagName: 'code',
						properties: { className: ['language-math', 'math-display'] },
						children: [{ type: 'text', value: child.value }]
					}]
				},
				position: node.position
			};
		});
	};
}

/**
 * Rehype plugin: add breathing room to KaTeX fractions.
 * KaTeX bakes spacing into inline style="top:..." on .vlist spans.
 * We shift the numerator up and denominator down by a fixed offset.
 */
function rehypeKatexFractionSpacing() {
	const EXTRA_GAP = 0.35; // em to add above and below the fraction bar
	return (tree: Root) => {
		visit(tree, 'element', (node: Element) => {
			// Target the .mfrac container
			const cls = node.properties?.className;
			if (!Array.isArray(cls) || !cls.includes('mfrac')) return;

			// Walk into .vlist-t2 > .vlist-r > .vlist > span children
			const vlistT2 = node.children.find(
				(c): c is Element => c.type === 'element' && Array.isArray(c.properties?.className) && (c.properties.className as string[]).includes('vlist-t2')
			);
			if (!vlistT2) return;

			const vlistR = vlistT2.children.find(
				(c): c is Element => c.type === 'element' && Array.isArray(c.properties?.className) && (c.properties.className as string[]).includes('vlist-r')
			);
			if (!vlistR) return;

			const vlist = vlistR.children.find(
				(c): c is Element => c.type === 'element' && Array.isArray(c.properties?.className) && (c.properties.className as string[]).includes('vlist')
			);
			if (!vlist) return;

			// The vlist children are spans with style="top:Xem;"
			// Typically 3 spans: denominator (most positive top), frac-line, numerator (most negative top)
			for (const child of vlist.children) {
				if (child.type !== 'element') continue;
				const style = String(child.properties?.style || '');
				const topMatch = style.match(/top:\s*([-\d.]+)em/);
				if (!topMatch) continue;

				const topVal = parseFloat(topMatch[1]);

				// Check if this span contains the frac-line
				const hasFracLine = child.children.some(
					(c): c is Element => c.type === 'element' && Array.isArray(c.properties?.className) && (c.properties.className as string[]).includes('frac-line')
				);

				if (hasFracLine) continue; // don't move the bar itself

				// Numerator has a more negative top, denominator has a less negative top
				// Push them further apart from the bar
				const adjusted = topVal < -3.0
					? topVal - EXTRA_GAP  // numerator: push further up
					: topVal + EXTRA_GAP; // denominator: push further down

				child.properties = child.properties || {};
				child.properties.style = style.replace(/top:\s*[-\d.]+em/, `top:${adjusted.toFixed(4)}em`);
			}

			// Also adjust the outer strut height to account for the extra space
			const outerStyle = String(node.properties?.style || '');
			if (!outerStyle) {
				// Adjust the parent .vlist-t2 strut if needed
				const strutSpan = vlistT2.children.find(
					(c): c is Element => c.type === 'element' && c.tagName === 'span' && String(c.properties?.style || '').includes('height:')
				);
			}
		});
	};
}

/**
 * Rehype plugin: add target="_blank" and rel="noopener noreferrer" to external links
 */
function rehypeExternalLinks() {
	return (tree: Root) => {
		visit(tree, 'element', (node: Element) => {
			if (node.tagName !== 'a') return;
			const href = node.properties?.href;
			if (typeof href === 'string' && (href.startsWith('http://') || href.startsWith('https://'))) {
				node.properties = node.properties || {};
				node.properties.target = '_blank';
				node.properties.rel = 'noopener noreferrer';
			}
		});
	};
}

/**
 * Rehype plugin: wrap <table> elements in a scrollable .table-wrapper div
 * so wide tables don't cause horizontal overflow on mobile.
 */
function rehypeTableWrapper() {
	return (tree: Root) => {
		visit(tree, 'element', (node: Element, index, parent) => {
			if (node.tagName !== 'table' || !parent || index === undefined) return;
			const wrapper: Element = {
				type: 'element',
				tagName: 'div',
				properties: { className: ['table-wrapper'] },
				children: [node]
			};
			(parent as Element).children[index] = wrapper;
		});
	};
}

function mergeClasses(
	existing: string | number | boolean | (string | number)[],
	...classes: string[]
) {
	const normalized: string[] = [];

	if (Array.isArray(existing)) {
		for (const cls of existing || []) {
			if (typeof cls === 'string') normalized.push(cls);
			else if (Array.isArray(cls)) normalized.push(...cls.filter((c) => typeof c === 'string'));
		}
	} else {
		normalized.push(String(existing));
	}

	return [...normalized, ...classes];
}

/**
 * Options for rendering Markdown
 */
export interface RenderMarkdownOptions {
	/** Optional path for citation plugin context */
	path?: string;
}

/**
 * Render Markdown into HTML using unified (remark + rehype)
 * @param markdown - The markdown source text
 * @param options - Optional rendering options
 * @returns HTML string
 */
export async function renderMarkdown(
	markdown: string,
	options: RenderMarkdownOptions = {}
): Promise<string> {
	const { path } = options;

	const file = await unified()
		.use(remarkParse)
		.use(remarkFrontmatter, ['yaml', 'toml'])
		.use(remarkGfm)
		.use(remarkMath) // parse $...$ and $$...$$
		.use(remarkDisplayMath) // promote lone $$...$$ to display math
		.use(remarkBreaks)
		.use(remarkSmartypants)
		.use(remarkMermaidAscii)
		.use(remarkRehype, { allowDangerousHtml: true }) // convert to rehype AST
		.use(rehypeKatex, { minRuleThickness: 0.07 }) // render math nodes
		.use(rehypeKatexFractionSpacing) // add breathing room to fractions
		.use(rehypeRaw) // allow inline HTML
		.use(rehypeEmbeds) // transform data-embed divs into rendered components
		.use(rehypeSlug)
		.use(rehypeAutolinkHeadings, { behavior: 'wrap' })
		.use(rehypePrettyCode, {
			theme: {
				light: 'github-light',
				dark: 'github-dark'
			},
			keepBackground: false,
			onVisitLine(lineEl) {
				lineEl.properties = lineEl.properties || {};
				lineEl.properties.className = mergeClasses(
					lineEl.properties.className || [],
					'relative pl-8 py-[2px] line'
				);
			},
			onVisitHighlightedLine(lineEl) {
				lineEl.properties = lineEl.properties || {};
				lineEl.properties.className = mergeClasses(
					lineEl.properties.className || [],
					'bg-orange/20 dark:bg-orange/30'
				);
			},
			onVisitHighlightedChars(charEl) {
				charEl.properties = charEl.properties || {};
				charEl.properties.className = mergeClasses(
					charEl.properties.className || [],
					'bg-orange/30 dark:bg-orange/50 rounded-sm'
				);
			},
			onVisitTitle(titleEl) {
				titleEl.properties = titleEl.properties || {};
				titleEl.properties.className = mergeClasses(
					titleEl.properties.className || [],
					'rounded-t-sm px-2 py-1 bg-gray-200 dark:bg-gray-800 text-sm font-semibold'
				);
			},
			transformers: [
				transformerCopyButton({
					visibility: 'always',
					feedbackDuration: 1_000
				})
			]
		})
		.use(rehypeCitation, { path })
		.use(rehypeMermaid)
		.use(rehypeFigures)
		.use(rehypeExternalLinks)
		.use(rehypeTableWrapper)
		.use(rehypeStringify)
		.process(markdown);

	return String(file);
}
