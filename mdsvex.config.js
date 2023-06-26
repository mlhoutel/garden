import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex-svelte';

export default {
	extensions: ['.svelte.md', '.md', '.svx'],
	smartypants: { dashes: 'oldschool' },
	remarkPlugins: [remarkMath],
	rehypePlugins: [
		rehypeKatex,
		rehypeSlug,
		[
			rehypeAutolinkHeadings,
			{
				behavior: 'prepend',
				content: {
					type: 'element',
					tagName: 'i',
					properties: { class: 'anchor-link material-icons text-2xl' },
					children: [{ type: 'text', value: 'link' }]
				}
			}
		]
	]
};
