export async function load({ params }) {
	const path = params.slug.split('-');

	const sheet = await import(`../../../content/sheets/${path[0]}/${path[1]}.md`);
	const { title, short } = sheet.metadata;
	const content = sheet.default;

	return {
		content,
		title,
		short
	};
}
