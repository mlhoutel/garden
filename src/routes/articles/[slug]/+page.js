export async function load({ params }) {
	const article = await import(`../../../content/articles/${params.slug}.md`);
	const content = article.default;

	return {
		content,
		...article.metadata
	};
}
