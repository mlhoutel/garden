import { visit } from 'unist-util-visit';
import type { Element, Root } from 'hast';
import type { BuildVisitor } from 'unist-util-visit';

/** Rehype plugin: wrap ```mermaid``` blocks in <div class="mermaid"> */
export default function rehypeMermaid() {
	return (tree: Root) => {
		visit(tree, 'element', ((node: Element, index: number | null, parent: Element | null) => {
			if (
				node.tagName === 'pre' &&
				node.children[0]?.type === 'element' &&
				(node.children[0] as Element).tagName === 'code' &&
				String((node.children[0] as Element).properties?.className).includes('language-mermaid')
			) {
				const codeNode = ((node.children[0] as Element).children[0] as any)?.value || '';

				if (parent && typeof index === 'number') {
					parent.children[index] = {
						type: 'element',
						tagName: 'div',
						properties: { className: ['mermaid'] },
						children: [{ type: 'text', value: codeNode }]
					} as Element;
				}
			}
		}) as BuildVisitor<Root, 'element'>);
	};
}
