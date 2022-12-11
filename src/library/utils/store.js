import { writable } from 'svelte-local-storage-store';

export let preferences = writable('theme', {
	theme: 'light',
	locale: 'fr',
	locales: []
});
