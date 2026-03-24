import { browser } from '$app/environment';
import { writable, get } from 'svelte/store';
import type { Writable } from 'svelte/store';

function storage<T>(key: string, initValue: T): Writable<T> {
	const store = writable<T>(initValue);

	if (!browser) return store;

	// Initialize from localStorage
	const storedValueStr = localStorage.getItem(key);
	if (storedValueStr != null) {
		try {
			store.set(JSON.parse(storedValueStr) as T);
		} catch {
			console.warn(`Failed to parse localStorage key "${key}"`);
		}
	}

	// Persist changes to localStorage
	store.subscribe((val) => {
		if (val == null) {
			localStorage.removeItem(key);
		} else {
			localStorage.setItem(key, JSON.stringify(val));
		}
	});

	// Sync across tabs
	window.addEventListener('storage', () => {
		const storedValueStr = localStorage.getItem(key);
		if (storedValueStr == null) return;

		try {
			const localValue = JSON.parse(storedValueStr) as T;
			if (localValue !== get(store)) store.set(localValue);
		} catch {
			console.warn(`Failed to parse localStorage key "${key}" on storage event`);
		}
	});

	return store;
}

// Theme store: false = light, true = dark
export const themeStore = storage<boolean>('theme', false);
