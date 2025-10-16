import preprocess from 'svelte-preprocess';

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
	extensions: ['.svelte'],
	preprocess: [preprocess()],
	kit: {
		adapter: adapter({
			strict: false,
			fallback: 'error.html'
		})
		/*
		prerender: {
			entries: ['*'],
			handleHttpError: ({ path, referrer, message }) => {
				if (message.includes('404')) {
					console.warn(`⚠️  Skipping prerender of missing page: ${path} (linked from ${referrer})`);
					return; // ignore missing routes during crawl
				}
				throw new Error(message);
			}
		}
		*/
		// paths: { base: base }
	}
};

export default config;
