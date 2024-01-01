import { base } from '$app/paths';

export const load = async ({ fetch }) => {
	const response = await fetch(`${base}/api/articles`);
	const articles = (await response.json()) || [];

	const yearly = articles
		.sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date))
		.reduce((acc, article) => {
			const date = new Date(article.meta.date);
			const key = date.getFullYear();
			acc[key] = acc[key] || [];
			acc[key].push(article);
			return acc;
		}, {});

	const sorted = Object.entries(yearly)
		.sort((a, b) => b[0] - a[0])
		.map((year) => ({ date: year[0], articles: year[1] }));

	const years = sorted.map((i) => ({
		label: i.date,
		items: i.articles
	}));

	return { years };
};
