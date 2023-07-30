import { base } from '$app/paths';

export const load = async ({ fetch }) => {
	const articles = await fetch(`${base}/api/articles`);
	const sheets = await fetch(`${base}/api/sheets`);
	const projects = await fetch(`${base}/api/projects`);

	const responses = [
		...(await articles.json()),
		...(await sheets.json()),
		...(await projects.json())
	];

	return { content: responses };
};
