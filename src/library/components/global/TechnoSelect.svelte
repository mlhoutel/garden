<script>
	import TopicPill from './TopicPill.svelte';
	import { createEventDispatcher } from 'svelte';

	export let input = '';
	export let options = ['A', 'b'];
	export let displayOption = options;

	export let selected = new Set();
	export let displaySelected = [];

	export let dropdown = false;
	export const maxDropdown = 10;

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
			displayOption = options;
		} else {
			const lowerInput = input.toLowerCase().trim();
			displayOption = options.filter((o) => o.toLowerCase().includes(lowerInput));
		}
	}

	export function inputPress(e) {
		if (e.key !== 'Enter') return;

		const lowerInput = input.toLowerCase().trim();

		if (lowerInput == '') return;

		const found = options.find((o) => o.toLowerCase() === lowerInput);

		selected.add(!!found ? found : input.trim()); // update display
		selected = selected; // update display

		displaySelected = Array.from(selected);
		input = '';
		updateDisplayOptions();
		dispatch('change', selected);
	}

	export function optionClick(e) {
		dropdown = false;

		selected.add(e.target?.innerText);
		selected = selected; // update display

		displaySelected = Array.from(selected);
		input = '';
		updateDisplayOptions();
		dispatch('change', selected);
	}

	export const dispatch = createEventDispatcher();

	export function selectClick(e) {
		selected.delete(e.detail.label);
		selected = selected; // update display

		displaySelected = [...Array.from(selected)];
		dispatch('change', selected);
	}
</script>

<div class="w-[300px]">
	<div class="pills">
		{#each displaySelected as topic}
			<TopicPill {topic} on:click={selectClick} removable={true} />
		{/each}
	</div>
	<div class="select-search">
		<i class="material-icons !text-2xl px-2">filter_alt</i>
		<input
			type="search"
			autocomplete="off"
			placeholder="Search..."
			bind:value={input}
			on:focus={inputFocus}
			on:blur={inputBlur}
			on:input={inputChange}
			on:keypress={inputPress}
			class="select-input"
		/>
	</div>

	{#if dropdown}
		<div class="select-options w-[310px] z-20 max-h-[400px] overflow-y-auto">
			<ul>
				{#each displayOption as option}
					<button class="selectOption" on:click={optionClick}>{option}</button>
				{/each}
			</ul>
		</div>
	{/if}
</div>
