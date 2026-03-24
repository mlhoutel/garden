<script lang="ts">
	import type { LinkItem } from '$types/types';
	import { base } from '$app/paths';

	let { linksItems = [] }: { linksItems?: LinkItem[] } = $props();

	let scrollY = $state(0);
	const year = new Date().getFullYear();

	export function navigateTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<svelte:window bind:scrollY />

<!-- Scroll to top -esoteric button with concentric circles -->
<button
	class="scroll-top-btn fixed right-8 bottom-8 z-30 flex cursor-pointer items-center justify-center transition-all duration-500
		{scrollY > 50 ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}"
	aria-label="Scroll to top"
	onclick={navigateTop}
	tabindex={scrollY > 50 ? 0 : -1}
>
	<svg
		viewBox="0 0 48 48"
		style="width: 48px; height: 48px; filter: drop-shadow(0 2px 6px rgba(0,0,0,0.3));"
	>
		<!-- Solid dark background circle -->
		<circle cx="24" cy="24" r="22" fill="#1A1A1A" stroke="#D4A017" stroke-width="0.8" opacity="1" />
		<!-- Inner decorative ring -->
		<circle
			cx="24"
			cy="24"
			r="18"
			fill="none"
			stroke="#D4A017"
			stroke-width="0.4"
			opacity="0.25"
			stroke-dasharray="2 3"
		/>
		<!-- Tick marks at cardinal points -->
		<line x1="24" y1="2" x2="24" y2="5" stroke="#D4A017" stroke-width="0.4" opacity="0.35" />
		<line x1="24" y1="43" x2="24" y2="46" stroke="#D4A017" stroke-width="0.4" opacity="0.35" />
		<line x1="2" y1="24" x2="5" y2="24" stroke="#D4A017" stroke-width="0.4" opacity="0.35" />
		<line x1="43" y1="24" x2="46" y2="24" stroke="#D4A017" stroke-width="0.4" opacity="0.35" />
		<!-- Arrow pointing up -->
		<path
			d="M 24 14 L 18 22 M 24 14 L 30 22"
			fill="none"
			stroke="#D4A017"
			stroke-width="1.5"
			stroke-linecap="round"
			opacity="0.85"
		/>
		<line
			x1="24"
			y1="14"
			x2="24"
			y2="32"
			stroke="#D4A017"
			stroke-width="1.5"
			stroke-linecap="round"
			opacity="0.6"
		/>
	</svg>
</button>

<!-- Footer -->
<footer style="background: #1A1A1A; border-top: 1px solid rgba(212,160,23,0.12); color: #E8E0D4;">
	<!-- Decorative top line with esoteric elements -->
	<div class="pointer-events-none overflow-hidden" style="height: 40px;">
		<svg
			class="mx-auto"
			style="width: 100%; max-width: 900px; height: 40px;"
			viewBox="0 0 900 40"
			preserveAspectRatio="xMidYMid meet"
		>
			<!-- Center emblem: concentric circles around dot -->
			<circle
				cx="450"
				cy="20"
				r="12"
				fill="none"
				stroke="#D4A017"
				stroke-width="0.4"
				opacity="0.25"
			/>
			<circle
				cx="450"
				cy="20"
				r="8"
				fill="none"
				stroke="#D4A017"
				stroke-width="0.3"
				opacity="0.2"
				stroke-dasharray="2 3"
			/>
			<circle
				cx="450"
				cy="20"
				r="4"
				fill="none"
				stroke="#D4A017"
				stroke-width="0.3"
				opacity="0.3"
			/>
			<circle cx="450" cy="20" r="1.5" fill="#D4A017" opacity="0.3" />
			<!-- Lines extending left and right with diamonds -->
			<line x1="435" y1="20" x2="200" y2="20" stroke="#D4A017" stroke-width="0.3" opacity="0.12" />
			<line x1="465" y1="20" x2="700" y2="20" stroke="#D4A017" stroke-width="0.3" opacity="0.12" />
			<polygon points="200,20 204,17 208,20 204,23" fill="#D4A017" opacity="0.2" />
			<polygon points="700,20 696,17 692,20 696,23" fill="#D4A017" opacity="0.2" />
			<!-- Outer lines fading out -->
			<line x1="195" y1="20" x2="50" y2="20" stroke="#D4A017" stroke-width="0.2" opacity="0.06" />
			<line x1="705" y1="20" x2="850" y2="20" stroke="#D4A017" stroke-width="0.2" opacity="0.06" />
			<!-- Small ticks -->
			<line x1="300" y1="16" x2="300" y2="24" stroke="#D4A017" stroke-width="0.2" opacity="0.1" />
			<line x1="600" y1="16" x2="600" y2="24" stroke="#D4A017" stroke-width="0.2" opacity="0.1" />
			<!-- Tiny triangles -->
			<polygon points="350,20 354,17 354,23" fill="#D4A017" opacity="0.1" />
			<polygon points="550,20 546,17 546,23" fill="#D4A017" opacity="0.1" />
		</svg>
	</div>

	<div class="mx-auto max-w-[900px] px-6 pt-4 pb-10">
		<!-- Main footer grid -->
		<div class="grid gap-10 md:grid-cols-3">
			<!-- Column 1: Logo + About -->
			<div>
				<div class="mb-4 flex items-center gap-3">
					<!-- Reuse the esoteric logo -->
					<div class="relative flex items-center justify-center" style="width: 32px; height: 32px;">
						<svg viewBox="0 0 36 36" style="width: 32px; height: 32px;">
							<circle
								cx="18"
								cy="18"
								r="16"
								fill="none"
								stroke="#D4A017"
								stroke-width="0.4"
								opacity="0.25"
							/>
							<circle
								cx="18"
								cy="18"
								r="11"
								fill="none"
								stroke="#D4A017"
								stroke-width="0.3"
								opacity="0.2"
							/>
							<circle
								cx="18"
								cy="18"
								r="7"
								fill="none"
								stroke="#D4A017"
								stroke-width="0.3"
								opacity="0.15"
							/>
						</svg>
						<img
							src="{base}/logos/sumblack.svg"
							alt=""
							style="width: 14px; height: 14px; filter: brightness(0) saturate(100%) invert(67%) sepia(64%) saturate(500%) hue-rotate(10deg) brightness(95%); position: absolute;"
						/>
					</div>
					<span
						style="font-family: var(--font-display); color: #FFFEF6; font-weight: 300; letter-spacing: 0.15em; font-size: 1.1rem;"
						>Garden</span
					>
				</div>
				<p style="color: #9A928A; font-size: 0.85rem; line-height: 1.7;">
					A digital garden by <strong style="color: #E8E0D4;">Maël Lhoutellier</strong> - software engineer,
					open source contributor, and builder of things both digital and physical. Currently crafting
					software in France.
				</p>
				<p style="color: #6B6460; font-size: 0.8rem; line-height: 1.6; margin-top: 0.75rem;">
					Interests: climbing, alpinism, guitar, physics engines, game development, particle
					accelerators, and the craft of making elegant code.
				</p>
			</div>

			<!-- Column 2: Navigation + Sections -->
			<div>
				<h4
					style="font-family: var(--font-serif); font-variant: small-caps; letter-spacing: 0.08em; color: #D4A017; font-size: 0.9rem; margin-bottom: 0.75rem;"
				>
					Navigate
				</h4>
				<ul class="list-none" style="display: flex; flex-direction: column; gap: 0.35rem;">
					{#each linksItems as item (`footer_${item.link}`)}
						<li>
							<a
								class="text-sm transition-colors duration-200 hover:text-[#D4A017]"
								style="color: #9A928A;"
								href={item.link}
								data-sveltekit-preload-code="hover"
							>
								{item.label}
							</a>
						</li>
					{/each}
				</ul>

				<h4
					style="font-family: var(--font-serif); font-variant: small-caps; letter-spacing: 0.08em; color: #D4A017; font-size: 0.9rem; margin-top: 1.25rem; margin-bottom: 0.75rem;"
				>
					Projects
				</h4>
				<ul class="list-none" style="display: flex; flex-direction: column; gap: 0.35rem;">
					<li>
						<a
							class="text-sm transition-colors duration-200 hover:text-[#D4A017]"
							style="color: #9A928A;"
							href="https://github.com/mlhoutel/garden"
							target="_blank"
							rel="noreferrer">This Garden</a
						>
					</li>
					<li>
						<a
							class="text-sm transition-colors duration-200 hover:text-[#D4A017]"
							style="color: #9A928A;"
							href="https://github.com/mlhoutel"
							target="_blank"
							rel="noreferrer">Open Source Work</a
						>
					</li>
				</ul>
			</div>

			<!-- Column 3: Connect -->
			<div>
				<h4
					style="font-family: var(--font-serif); font-variant: small-caps; letter-spacing: 0.08em; color: #D4A017; font-size: 0.9rem; margin-bottom: 0.75rem;"
				>
					Connect
				</h4>
				<ul class="list-none" style="display: flex; flex-direction: column; gap: 0.35rem;">
					<li>
						<a
							class="text-sm transition-colors duration-200 hover:text-[#D4A017]"
							style="color: #9A928A;"
							href="https://github.com/mlhoutel"
							target="_blank"
							rel="noreferrer">GitHub</a
						>
					</li>
					<li>
						<a
							class="text-sm transition-colors duration-200 hover:text-[#D4A017]"
							style="color: #9A928A;"
							href="https://fr.linkedin.com/in/mlhoutel"
							target="_blank"
							rel="noreferrer">LinkedIn</a
						>
					</li>
					<li>
						<a
							class="text-sm transition-colors duration-200 hover:text-[#D4A017]"
							style="color: #9A928A;"
							href="mailto:mlhoutel@gmail.com">mlhoutel@gmail.com</a
						>
					</li>
				</ul>

				<h4
					style="font-family: var(--font-serif); font-variant: small-caps; letter-spacing: 0.08em; color: #D4A017; font-size: 0.9rem; margin-top: 1.25rem; margin-bottom: 0.75rem;"
				>
					Built With
				</h4>
				<p style="color: #6B6460; font-size: 0.8rem; line-height: 1.6;">
					SvelteKit · Tailwind · Unified<br />
					D3 · KaTeX · Shiki · FlexSearch
				</p>
			</div>
		</div>

		<!-- Bottom separator + copyright -->
		<div class="mt-10 flex items-center gap-3" style="color: #3A3A3A;">
			<div class="h-px flex-1" style="background: rgba(212,160,23,0.1);"></div>
			<svg viewBox="0 0 12 12" style="width: 8px; height: 8px;">
				<polygon points="6,0 12,6 6,12 0,6" fill="#D4A017" opacity="0.2" />
			</svg>
			<div class="h-px flex-1" style="background: rgba(212,160,23,0.1);"></div>
		</div>

		<div
			class="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-center"
			style="font-size: 0.7rem; letter-spacing: 0.12em; color: #6B6460; font-variant: small-caps;"
		>
			<a
				class="transition-colors duration-200 hover:text-[#D4A017]"
				style="color: #D4A017;"
				href="https://creativecommons.org/licenses/by-sa/3.0/"
				target="_blank"
				rel="noreferrer">copyleft</a
			>
			<span>{year} maël lhoutellier</span>
			<a
				class="transition-colors duration-200 hover:text-[#D4A017]"
				style="color: #D4A017;"
				href="https://github.com/mlhoutel/garden"
				target="_blank"
				rel="noreferrer">source</a
			>
		</div>

		<!-- DAVeau font attribution (CC BY) -->
		<p class="mt-3 text-center" style="font-size: 0.6rem; color: #3A3A3A;">
			Title typeface: DAVeau by Patrick Dempsey (CC BY)
		</p>
	</div>
</footer>

<style>
	.scroll-top-btn:hover svg circle:first-child {
		stroke-opacity: 0.6;
		transition: all 0.3s;
	}
	.scroll-top-btn:hover svg path,
	.scroll-top-btn:hover svg line:last-child {
		opacity: 1;
		transition: all 0.3s;
	}
</style>
