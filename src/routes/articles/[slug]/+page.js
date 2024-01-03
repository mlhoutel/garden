import { base } from '$app/paths';

export async function load({ params, fetch }) {
	const article = await import(`../../../content/articles/${params.slug}.md`);
	const content = article.default;

	const request = await fetch(`${base}/api/articles`);
	const articles = [...(await request.json())];

	const index = articles.findIndex((e) => e.meta.title == article.metadata.title);

	const next = articles[(index + 1) % articles.length];
	const meta = articles[index].meta;

	return {
		content,
		next,
		...meta
	};
}
