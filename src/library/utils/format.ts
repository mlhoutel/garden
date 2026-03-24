import type { ParamBase, ParamsMap } from '$types/types';

/**
 * Convert a string into an anchor-friendly slug.
 * @param label
 */
function toAnchor(label: string): string {
	return label.toLowerCase().replace(/\s+/g, '-');
}

/**
 * Extract and decode a parameter from a URLSearchParams object.
 * @param url
 * @param label
 * @param base - default value type: string, number, or string[]
 */
function extractParamFromUrl(url: URL, label: string, base: ParamBase): ParamBase {
	const param = url.searchParams.get(label);

	if (param == null) return base;

	if (Array.isArray(base)) {
		return param.split(',').filter((e) => e?.trim()?.length > 0);
	} else if (typeof base === 'number') {
		return Number(param);
	} else {
		return param;
	}
}

/**
 * Decode multiple parameters from URL search params with default base values.
 * @param url
 * @param params - object mapping label -> default base value
 */
function searchDecodeUrl(url: URL, params: ParamsMap): ParamsMap {
	return Object.fromEntries(
		Object.entries(params).map(([label, base]) => [label, extractParamFromUrl(url, label, base)])
	) as ParamsMap;
}

/**
 * Encode an object of parameters into a URL query string.
 * @param params
 */
function searchEncodeUrl(params: ParamsMap): string {
	return encodeURI(
		Object.entries(params)
			.map(([label, value]) => `${label}=${value}`)
			.join('&')
	);
}

/**
 * Capitalize the first letter of a string.
 * @param text
 */
function toUpper(text?: string): string {
	if (!text) return '';
	return text.charAt(0).toUpperCase() + text.slice(1);
}

export { toAnchor, searchDecodeUrl, searchEncodeUrl, toUpper };
