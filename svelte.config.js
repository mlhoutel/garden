import preprocess from 'svelte-preprocess';
import importAssets from 'svelte-preprocess-import-assets';
import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';

const dev = process.env.NODE_ENV === 'development';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],
	preprocess: [mdsvex(mdsvexConfig), preprocess(), importAssets()],
	kit: {
		adapter: adapter({ strict: false }),
		paths: {
			base: dev ? '' : '/garden'
		}
	}
};

export default config;
