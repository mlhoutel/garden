import preprocess from 'svelte-preprocess';
import importAssets from 'svelte-preprocess-import-assets';
import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';


/*
// DYNAMIC DEPLOYEMENT
import adapter from '@sveltejs/adapter-auto';
*/

// STATIC DEPLOYMENT
import adapter from '@sveltejs/adapter-static';

/*
// if you want to deploy to github pages, uncomment this block
// as well as the "paths" property in the code below.
const dev = process.env.NODE_ENV === 'development';
const base = dev ? '' : '/garden'
*/

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],
	preprocess: [mdsvex(mdsvexConfig), preprocess(), importAssets()],
	kit: {
		adapter: adapter({ strict: false }),
		// paths: { base: base }
	}
};

export default config;
