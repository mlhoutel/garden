import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkMath from 'remark-math';
import replaceMath from '$rehype/math';

export default {
	extensions: ['.svelte.md', '.md', '.svx'],
	smartypants: { dashes: 'oldschool' },
	remarkPlugins: [remarkMath],
	rehypePlugins: [
		replaceMath,
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
