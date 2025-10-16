// src/utils/markdown.js
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
 * Render Markdown into HTML using unified (remark + rehype)
 * @param {string} markdown - The markdown source text
 * @param {object} [options]
 * @param {string} [options.path] - Path for citation plugin context
 * @returns {Promise<string>} - HTML string
 */
export async function renderMarkdown(markdown, { path } = {}) {
	const file = await unified()
		.use(remarkParse)
		.use(remarkFrontmatter, ['yaml', 'toml'])
		.use(remarkGfm)
		.use(remarkMath) // parse $...$ and $$...$$
		.use(remarkBreaks)
		.use(remarkSmartypants)
		.use(remarkRehype, { allowDangerousHtml: true }) // convert to rehype AST
		.use(rehypeKatex) // render math nodes
		.use(rehypeRaw) // now allow inline HTML
		.use(rehypeSlug)
		.use(rehypeAutolinkHeadings, { behavior: 'wrap' })
		.use(rehypePrettyCode, { theme: 'github-dark' })
		.use(rehypeCitation, { path })
		.use(rehypeMermaid)
		.use(rehypeStringify)
		.process(markdown);

	return String(file);
}
