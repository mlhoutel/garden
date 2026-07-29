<script lang="ts">
	import { localDateKey } from '$utils/media';

	let {
		entries,
		selected = null,
		onselect
	}: {
		entries: { title: string; added_at: string }[];
		selected?: string | null;
		onselect: (day: string | null) => void;
	} = $props();

	const GAP = 2;
	const GUTTER = 24;
	const MONTHS = [
		'jan',
		'feb',
		'mar',
		'apr',
		'may',
		'jun',
		'jul',
		'aug',
		'sep',
		'oct',
		'nov',
		'dec'
	];

	let gridWidth = $state(0);
	let scrollLeft = $state(0);

	let byDay = $derived.by(() => {
		const map = new Map<string, string[]>();
		for (const e of entries) {
			const key = localDateKey(new Date(e.added_at));
			map.set(key, [...(map.get(key) ?? []), e.title]);
		}
		return map;
	});

	let cells = $derived.by(() => {
		const end = new Date();
		end.setHours(0, 0, 0, 0);
		const start = new Date(end);
		start.setDate(start.getDate() - 364);
		start.setDate(start.getDate() - ((start.getDay() + 6) % 7)); // align to Monday
		const out: { key: string; count: number; month: number; future: boolean }[] = [];
		const d = new Date(start);
		while (d <= end || out.length % 7 !== 0) {
			const key = localDateKey(d);
			out.push({
				key,
				count: byDay.get(key)?.length ?? 0,
				month: d.getMonth(),
				future: d > end
			});
			d.setDate(d.getDate() + 1); // wall-clock safe across DST
		}
		return out;
	});

	let weeks = $derived(cells.length / 7);
	// Stretch cells so the grid fills the available width.
	let cell = $derived(Math.max(8, Math.floor((gridWidth - GUTTER - (weeks - 1) * GAP) / weeks)));

	let monthLabels = $derived.by(() => {
		const labels: { x: number; name: string }[] = [];
		for (let week = 1; week * 7 < cells.length; week++) {
			const prev = cells[(week - 1) * 7].month;
			const cur = cells[week * 7].month;
			if (cur !== prev) labels.push({ x: GUTTER + week * (cell + GAP), name: MONTHS[cur] });
		}
		return labels;
	});

	// Sequential single-hue scale: accent mixed into the surface, monotonic in
	// both themes (light: darkens with count; dark: brightens with count).
	const LEVELS = [0, 25, 45, 70, 100];
	const level = (n: number) =>
		`color-mix(in srgb, var(--color-accent) ${LEVELS[Math.min(n, 4)]}%, var(--color-surface))`;

	// ─── Hover popover ───

	let hovered = $state<{
		key: string;
		count: number;
		titles: string[];
		x: number;
		y: number;
	} | null>(null);

	function enter(cellData: { key: string; count: number; future: boolean }, index: number) {
		if (cellData.future) return;
		const week = Math.floor(index / 7);
		const day = index % 7;
		hovered = {
			key: cellData.key,
			count: cellData.count,
			titles: (byDay.get(cellData.key) ?? []).slice(0, 6),
			x: GUTTER + week * (cell + GAP),
			y: 14 + day * (cell + GAP)
		};
	}

	function click(cellData: { key: string; count: number; future: boolean }) {
		if (cellData.future || cellData.count === 0) return;
		onselect(selected === cellData.key ? null : cellData.key);
	}
</script>

<div
	class="relative mb-4 rounded p-3"
	style="border: 1px solid var(--color-border); background: var(--color-surface);"
	onmouseleave={() => (hovered = null)}
>
	<!-- The grid stretches to fill the panel; on narrow screens it scrolls
	     horizontally inside this wrapper (the popover compensates for scroll). -->
	<div
		class="overflow-x-auto"
		bind:clientWidth={gridWidth}
		onscroll={(e) => (scrollLeft = (e.currentTarget as HTMLElement).scrollLeft)}
	>
		<div class="relative mb-1 h-[12px]">
			{#each monthLabels as m (m.x)}
				<span
					class="absolute top-0 font-mono text-[0.55rem]"
					style="left: {m.x}px; color: var(--color-text-muted); opacity: 0.6;"
				>
					{m.name}
				</span>
			{/each}
		</div>

		<div class="flex">
			<div
				class="grid shrink-0 font-mono text-[0.5rem]"
				style="grid-template-rows: repeat(7, {cell}px); row-gap: {GAP}px; width: {GUTTER}px; color: var(--color-text-muted); opacity: 0.6;"
			>
				<span style="grid-row: 1;">mon</span>
				<span style="grid-row: 4;">thu</span>
				<span style="grid-row: 7;">sun</span>
			</div>
			<div
				class="grid min-w-0 grid-flow-col"
				style="grid-template-rows: repeat(7, {cell}px); grid-auto-columns: {cell}px; gap: {GAP}px;"
			>
				{#each cells as c, i (c.key)}
					<!-- svelte-ignore a11y_mouse_events_have_key_events -->
					<button
						aria-label="{c.key}: {c.count} entries"
						class="rounded-[2px] p-0 {c.count > 0 && !c.future
							? 'cursor-pointer'
							: 'cursor-default'}"
						style="background: {c.future ? 'transparent' : level(c.count)};
						border: 1px solid {c.future
							? 'transparent'
							: selected === c.key
								? 'var(--color-text)'
								: c.count > 0
									? 'transparent'
									: 'var(--color-border)'};"
						onmouseover={() => enter(c, i)}
						onfocus={() => enter(c, i)}
						onclick={() => click(c)}
					></button>
				{/each}
			</div>
		</div>
	</div>

	<div
		class="mt-2 flex items-center gap-3 font-mono text-[0.6rem]"
		style="color: var(--color-text-muted); opacity: 0.7;"
	>
		<span>last 12 months · {entries.length} entries</span>
		{#if selected}
			<button
				onclick={() => onselect(null)}
				class="cursor-pointer rounded px-1.5"
				style="border: 1px solid var(--color-accent); color: var(--color-accent); background: none;"
			>
				{selected} ✕
			</button>
		{/if}
	</div>

	{#if hovered}
		<div
			class="pointer-events-none absolute z-10 max-w-[260px] rounded px-2.5 py-1.5"
			style="left: {Math.max(0, Math.min(hovered.x - scrollLeft, gridWidth - 260)) + 12}px;
				top: {hovered.y + 40}px;
				background: var(--color-hero-bg); border: 1px solid var(--color-border-strong);
				box-shadow: 0 2px 8px rgba(0,0,0,0.25);"
		>
			<p class="font-mono text-[0.6rem]" style="color: #9a928a;">
				{hovered.key} · {hovered.count} entr{hovered.count === 1 ? 'y' : 'ies'}
				{#if hovered.count > 0}<span style="opacity: 0.6;"> · click to filter</span>{/if}
			</p>
			{#each hovered.titles as title (title)}
				<p class="truncate font-serif text-[0.75rem]" style="color: #e8e0d4;">{title}</p>
			{/each}
			{#if hovered.count > hovered.titles.length}
				<p class="font-mono text-[0.6rem]" style="color: #9a928a;">
					+{hovered.count - hovered.titles.length} more
				</p>
			{/if}
		</div>
	{/if}
</div>
