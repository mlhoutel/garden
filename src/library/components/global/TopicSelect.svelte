<script lang="ts">
	import TopicPill from './TopicPill.svelte';
	import { createEventDispatcher } from 'svelte';
	import type { TagSelectProps } from '$types/types';

	export let placeholder: TagSelectProps['placeholder'] = 'Search...';
	export let input: TagSelectProps['input'] = '';
	export let options: TagSelectProps['options'] = [];
	export let displayed: string[] = options;
	export let selected: Set<string> = new Set();
	export let dropdown: boolean = false;

	const dispatch = createEventDispatcher<{ change: Set<string> }>();

	export function inputFocus(): void {
		dropdown = true;
		updateDisplayOptions();
	}

	export function inputBlur(): void {
		setTimeout(() => {
			const active = document.activeElement as HTMLElement | null;
			if (!active?.classList.contains('selectOption')) {
				dropdown = false;
			}
		}, 100);
	}

	export function inputChange(): void {
		updateDisplayOptions();
	}

	export function updateDisplayOptions(): void {
		if (!input?.length) {
			displayed = options;
		} else {
			const lowerInput = input.toLowerCase().trim();
			displayed = options.filter((o) => o.toLowerCase().includes(lowerInput));
		}
	}

	export function inputPress(e: KeyboardEvent): void {
		if (e.key !== 'Enter') return;

		const lowerInput = input?.toLowerCase().trim();
		if (!lowerInput) return;

		const found = options.find((o) => o.toLowerCase() === lowerInput);
		selected.add(found ?? input?.trim() ?? '');
		selected = new Set(selected); // trigger reactivity
		input = '';
		updateDisplayOptions();
		dispatch('change', selected);
	}

	export function optionClick(e: MouseEvent): void {
		dropdown = false;
		const target = e.target as HTMLElement;
		if (!target) return;

		selected.add(target.innerText);
		selected = new Set(selected);
		input = '';
		updateDisplayOptions();
		dispatch('change', selected);
	}

	export function selectClick(e: CustomEvent<string>): void {
		selected.delete(e.detail);
		selected = new Set(selected);
		dispatch('change', selected);
	}
</script>

<div class="w-[300px]">
	<div class="select-search">
		<i class="material-icons !text-xl">filter_alt</i>
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

	<div class="pills">
		{#each Array.from(selected) as topic, i (i)}
			<TopicPill disabled={true} {topic} on:click={selectClick} removable={true} />
		{/each}
	</div>

	{#if dropdown}
		<div
			class="select-options z-20 max-h-[400px] w-[300px] flex-col overflow-y-auto bg-white pb-3 dark:bg-black"
		>
			{#each displayed as option, i (i)}
				<div class="px-1">
					<button class="selectOption w-full text-left text-sm" on:click={optionClick}>
						{option}
					</button>
				</div>
			{/each}
		</div>
	{/if}
</div>
