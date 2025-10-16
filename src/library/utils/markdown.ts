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
		.use(rehypePrettyCode, { theme: 'github-dark' })
		.use(rehypeCitation, { path })
		.use(rehypeMermaid)
		.use(rehypeStringify)
		.process(markdown);

	return String(file);
}
