import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

import adapter from '@sveltejs/adapter-static';

const dev = process.argv.includes('dev');
const base = dev ? '' : process.env.BASE_PATH || '';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte'],
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			strict: false,
			fallback: 'error.html'
		}),

		alias: {
			$images: path.resolve('static/images'),
			$logos: path.resolve('static/logos'),
			$meta: path.resolve('src/meta'),
			$routes: path.resolve('src/routes'),
			$content: path.resolve('src/content'),
			$components: path.resolve('src/library/components'),
			$styles: path.resolve('src/library/styles'),
			$utils: path.resolve('src/library/utils'),
			$library: path.resolve('src/library'),
			$types: path.resolve('src/library/types')
		},
		prerender: {
			entries: ['*'],
			handleHttpError: ({ path, referrer, message }) => {
				if (message.includes('404')) {
					console.warn(`⚠️  Skipping prerender of missing page: ${path} (linked from ${referrer})`);
					return;
				}
				throw new Error(message);
			}
		},
		paths: { base }
	}
};

export default config;
