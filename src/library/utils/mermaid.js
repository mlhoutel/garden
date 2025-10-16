import { visit } from 'unist-util-visit';

/** Rehype plugin: wrap ```mermaid``` blocks in <div class="mermaid"> */
export default function rehypeMermaid() {
	return (tree) => {
		visit(tree, 'element', (node, index, parent) => {
			if (
				node.tagName === 'pre' &&
				node.children[0]?.tagName === 'code' &&
				node.children[0]?.properties?.className?.includes('language-mermaid')
			) {
				const code = node.children[0].children[0]?.value || '';
				parent.children[index] = {
					type: 'element',
					tagName: 'div',
					properties: { className: ['mermaid'] },
					children: [{ type: 'text', value: code }]
				};
			}
		});
	};
}
