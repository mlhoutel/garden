export async function load({ params }) {
	const path = params.slug.split('-');
	const snippet = await import(`../../../content/snippets/${path[0]}/${path[1]}.md`);
	const { title, short } = snippet.metadata;
	const content = snippet.default;

	return {
		content,
		title,
		short
	};
}
