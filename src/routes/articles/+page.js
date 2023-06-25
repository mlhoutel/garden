import { base } from '$app/paths';

export const load = async ({ fetch }) => {
	const response = await fetch(`${base}/api/articles`);
	const articles = (await response.json()) || [];

	const yearly = articles.reduce((acc, article) => {
		const date = new Date(article.meta.date);
		const key = date.getFullYear();
		acc[key] = acc[key] || [];
		acc[key].push(article);
		return acc;
	}, {});

	const sorted = Object.entries(yearly)
		.sort((a, b) => a[0] - b[0])
		.map((year) => ({ date: year[0], articles: year[1] }));

	return {
		years: sorted
	};
};
