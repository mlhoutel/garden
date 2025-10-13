export const prerender = true;

import { getLinksItems } from '$utils/apis';
import { toUpper } from '$utils/format';

export async function load({ fetch }) {
	const allLinks = await getLinksItems(fetch);

	return {
		headerLinks: allLinks
			.filter((link) => link?.label?.toLowerCase() !== 'home')
			.map((link) => ({
				...link,
				label: toUpper(link?.label)
			})),
		footerLinks: allLinks
	};
}
