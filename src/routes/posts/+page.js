import { base } from '$app/paths';

export const load = async ({ fetch }) => {
	const response = await fetch(`${base}/api/posts`);
	const posts = (await response.json()) || [];

	const yearly = posts.reduce((acc, post) => {
		const date = new Date(post.meta.date);
		const key = date.getFullYear();
		acc[key] = acc[key] || [];
		acc[key].push(post);
		return acc;
	}, {});

	const sorted = Object.entries(yearly)
		.sort((a, b) => a[0] - b[0])
		.map((year) => ({ date: year[0], posts: year[1] }));

	return {
		years: sorted
	};
};
