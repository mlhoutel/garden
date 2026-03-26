<script lang="ts">
	import { QUOTES } from '$utils/quotes';
	import { onMount, onDestroy } from 'svelte';

	let { interval = 12000 }: { interval?: number } = $props();

	let currentIndex = $state(Math.floor(Math.random() * QUOTES.length));
	let visible = $state(true);
	let timer: ReturnType<typeof setInterval>;

	function cycle() {
		visible = false;
		setTimeout(() => {
			let next = Math.floor(Math.random() * QUOTES.length);
			// Avoid showing the same quote twice in a row
			if (QUOTES.length > 1) {
				while (next === currentIndex) next = Math.floor(Math.random() * QUOTES.length);
			}
			currentIndex = next;
			visible = true;
		}, 500); // fade-out duration
	}

	onMount(() => {
		timer = setInterval(cycle, interval);
	});

	onDestroy(() => {
		if (timer) clearInterval(timer);
	});

	let quote = $derived(QUOTES[currentIndex]);
</script>

<p
	class="font-serif text-sm italic transition-opacity duration-500"
	style="color: var(--color-text-muted); opacity: {visible ? 1 : 0};"
>
	"{quote.text}" ·
	<span class="text-xs not-italic">{quote.author}</span>
</p>
