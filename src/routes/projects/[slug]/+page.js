export async function load({ params }) {
	const path = params.slug.split('-');

	const project = await import(`../../../content/projects/${path[0]}/${path[1]}.md`);
	const { title, short } = project.metadata;
	const content = project.default;

	return {
		content,
		title,
		short
	};
}
