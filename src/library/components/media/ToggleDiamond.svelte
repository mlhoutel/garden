<script lang="ts">
	// Collapse affordance in the site's geometric vocabulary: a hollow diamond
	// fills in when the section is open. No box, no rotation, no chevron.
	// Accent tone is reserved for "this facet is filtering", not for mere open state.
	let { open = false, tone = 'muted' }: { open?: boolean; tone?: 'muted' | 'accent' } = $props();
</script>

<span
	aria-hidden="true"
	class="inline-flex shrink-0 items-center justify-center text-[0.6rem] leading-none transition-colors duration-200"
	style="color: {open
		? tone === 'accent'
			? 'var(--color-accent)'
			: 'var(--color-text-muted)'
		: 'var(--color-border-strong)'};"
>
	{open ? '◆' : '◇'}
</span>
