import type { ResolvedFile, FileResolver } from '$types/types';

/**
 * Fetch and resolve a set of files with metadata and HTML.
 *
 * @param files - An object where keys are file paths and values are async resolvers.
 * @returns Array of resolved file details.
 */
export const fetchFiles = async (files: Record<string, FileResolver>): Promise<ResolvedFile[]> => {
	const iterable = Object.entries(files);

	const details = await Promise.all(
		iterable.map(async ([path, resolver]) => {
			const resolved = await resolver();
			return {
				meta: resolved.metadata,
				html: resolved.default.render().html,
				path: path.slice(11, -3) // remove "src/pages/" prefix and ".md" suffix
			};
		})
	);

	return details;
};
