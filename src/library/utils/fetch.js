/**
 *
 * @param {string} path
 * @returns
 */
export const fetchFiles = async (files) => {
	const iterable = Object.entries(files);

	const details = await Promise.all(
		iterable.map(async ([path, resolver]) => {
			const { metadata } = await resolver();

			return {
				meta: metadata,
				path: path.slice(11, -3)
			};
		})
	);

	return details;
};
