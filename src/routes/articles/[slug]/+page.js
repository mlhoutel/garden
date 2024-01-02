import { listArticles } from '$utils/apis';

export async function load({ params }) {
	const article = await import(`../../../content/articles/${params.slug}.md`);
	const content = article.default;
	const articles = [...(await listArticles())];
	const nextIndex = articles.findIndex((e) => e.meta.title == article.metadata.title);
	const next = articles[(nextIndex + 1) % articles.length];

	return {
		content,
		next,
		...article.metadata
	};
}
