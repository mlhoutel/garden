import { base } from '$app/paths';

export const load = async ({ fetch }) => {
	const articles = await fetch(`${base}/api/articles`);
	const sheets = await fetch(`${base}/api/sheets`);

	const responses = [...(await articles.json()), ...(await sheets.json())];

	return { content: responses };
};
