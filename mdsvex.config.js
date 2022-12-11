import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex-svelte';

export default {
	extensions: ['.svelte.md', '.md', '.svx'],
	smartypants: { dashes: 'oldschool' },
	remarkPlugins: [remarkMath],
	rehypePlugins: [rehypeKatex, rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]]
};
