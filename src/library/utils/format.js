function toAnchor(label) {
	return label.toLowerCase().replace(' ', '-');
}

function escapeThemePath(path) {
	const index = path.lastIndexOf('/');
	return path.slice(0, index) + '-' + path.slice(index + 1);
}

function unescapeThemePath(path) {
	return path.replaceAll('-', '/');
}

function extractParamFromUrl(url, label, base) {
	const param = decodeURI(url.searchParams.get(label));

	if (param == null) return base;

	if (Array.isArray(base)) {
		return param.split(',').filter((e) => e?.trim()?.length > 0);
	} else if (typeof base == 'number') {
		return Number(param);
	} else {
		return param;
	}
}

function searchDecodeUrl(url, params) {
	return Object.fromEntries(
		Object.entries(params).map(([label, base]) => [label, extractParamFromUrl(url, label, base)])
	);
}

function searchEncodeUrl(params) {
	return encodeURI(
		Object.entries(params)
			.map(([label, value]) => `${label}=${value}`)
			.join('&')
	);
}

function toUpper(text) {
	return text.charAt(0).toUpperCase() + text.slice(1);
}

export { toAnchor, searchDecodeUrl, searchEncodeUrl, toUpper, escapeThemePath, unescapeThemePath };
