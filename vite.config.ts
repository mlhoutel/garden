import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	resolve: {
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
		}
	},
	server: {
		port: 3000,
		strictPort: false
	},
	preview: {
		port: 3000,
		strictPort: false
	}
});
