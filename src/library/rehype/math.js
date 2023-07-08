const hastToString = require('hast-util-to-string');
const Katex = require('katex');

function replaceMathNodes() {
	return (tree) => {
		visit(tree, 'element', (node, _index, parent) => {
			const classes = node.properties && node.properties.className;

			if (classes && (classes.includes('math-inline') || classes.includes('math-display'))) {
				const renderedMath = Katex.renderToString(hastToString(node));
				parent.children = [
					{
						type: 'text',
						value: '{@html ' + JSON.stringify(renderedMath) + '}'
					}
				];
			}
		});
	};
}

module.exports = replaceMathNodes;
