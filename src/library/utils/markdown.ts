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
import { transformerCopyButton } from '@rehype-pretty/transformers';

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
		.use(remarkBreaks)
		.use(remarkSmartypants)
		.use(remarkRehype, { allowDangerousHtml: true }) // convert to rehype AST
		.use(rehypeKatex) // render math nodes
		.use(rehypeRaw) // allow inline HTML
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
		.use(rehypeStringify)
		.process(markdown);

	return String(file);
}
