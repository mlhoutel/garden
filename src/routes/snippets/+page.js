export const load = async ({ fetch }) => {
	const response = await fetch(`api/snippets`);
	const snippets = await response.json();

	// reconstruct file tree
	let tree = {};

	for (const snippet of snippets) {
		const splited = snippet.path.split('/').slice(1);

		let cursor = tree;
		for (const [index, path] of splited.entries()) {
			if (!cursor[path]) cursor[path] = {};

			if (index == splited.length - 1) {
				cursor[path] = snippet;
			} else {
				cursor = cursor[path];
			}
		}
	}

	return {
		tree
	};
};
