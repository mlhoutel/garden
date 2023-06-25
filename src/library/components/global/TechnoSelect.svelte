<script>
	import TopicPill from './TopicPill.svelte';
	import { createEventDispatcher } from 'svelte';

	export let placeholder = 'Search...';
	export let input = '';
	export let options = [];
	export let displayed = options;
	export let selected = new Set();
	export let dropdown = false;

	export function inputFocus(e) {
		dropdown = true;
		updateDisplayOptions();
	}

	export function inputBlur(e) {
		// avoid loss of focus when option clicked
		setTimeout(function () {
			const active = document.activeElement; // This is the element that has focus
			if (!active.classList.contains('selectOption')) {
				dropdown = false;
			}
		}, 100);
	}

	export function inputChange(e) {
		updateDisplayOptions();
	}

	export function updateDisplayOptions() {
		if (!input.length) {
			displayed = options;
		} else {
			const lowerInput = input.toLowerCase().trim();
			displayed = options.filter((o) => o.toLowerCase().includes(lowerInput));
		}
	}

	export function inputPress(e) {
		if (e.key !== 'Enter') return;

		const lowerInput = input.toLowerCase().trim();

		if (lowerInput == '') return;

		const found = options.find((o) => o.toLowerCase() === lowerInput);

		selected.add(!!found ? found : input.trim()); // update display
		selected = selected; // update display
		input = '';
		updateDisplayOptions();
		dispatch('change', selected);
	}

	export function optionClick(e) {
		dropdown = false;

		selected.add(e.target?.innerText);
		selected = selected; // update display
		input = '';
		updateDisplayOptions();
		dispatch('change', selected);
	}

	export const dispatch = createEventDispatcher();

	export function selectClick(e) {
		selected.delete(e.detail);
		selected = selected; // update display
		dispatch('change', selected);
	}
</script>

<div class="w-[300px]">
	<div class="pills">
		{#each selected as topic}
			<TopicPill disabled={true} {topic} on:click={selectClick} removable={true} />
		{/each}
	</div>
	<div class="select-search">
		<i class="material-icons !text-2xl px-2">filter_alt</i>
		<input
			type="search"
			autocomplete="off"
			{placeholder}
			bind:value={input}
			on:focus={inputFocus}
			on:blur={inputBlur}
			on:input={inputChange}
			on:keypress={inputPress}
			class="select-input"
		/>
	</div>

	{#if dropdown}
		<div
			class="flex-col bg-white dark:bg-black select-options w-[300px] z-20 max-h-[400px] overflow-y-auto pb-3"
		>
			{#each displayed as option}
				<div class="px-1">
					<button class="selectOption w-full text-left" on:click={optionClick}>{option}</button>
				</div>
			{/each}
		</div>
	{/if}
</div>
