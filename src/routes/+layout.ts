import type { PageLoad } from './$types';
import { getLinksItems } from '$utils/apis';
import { toUpper } from '$utils/format';
import type { LinkItem } from '$types/types';

export const prerender = true;

export const load: PageLoad = async ({ fetch }: { fetch: typeof window.fetch }) => {
	const allLinks: LinkItem[] = await getLinksItems(fetch);

	const headerLinks: LinkItem[] = allLinks
		.filter((link) => link?.label?.toLowerCase() !== 'home')
		.map((link) => ({
			...link,
			label: toUpper(link.label)
		}));

	const footerLinks: LinkItem[] = allLinks;

	return {
		headerLinks,
		footerLinks
	};
};
