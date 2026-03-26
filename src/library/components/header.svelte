<script lang="ts">
	import type { LinkItem } from '$types/types';
	import { themeStore } from '../utils/theme';
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import Search from '$components/global/Search.svelte';

	let { linksItems = [] }: { linksItems: LinkItem[] } = $props();

	let theme = $state(false);
	let menuOpen = $state(false);

	$effect(() => {
		$page.url;
		menuOpen = false;
	});

	onMount(() => {
		if (!browser) return;

		// The themeStore already reads from localStorage (via the storage helper)
		// and falls back to system preference. Just subscribe to keep DOM in sync.
		const unsubscribe = themeStore.subscribe((value) => {
			theme = value;
			if (theme) {
				document.documentElement.classList.add('dark');
				document.documentElement.setAttribute('saved-theme', 'dark');
			} else {
				document.documentElement.classList.remove('dark');
				document.documentElement.setAttribute('saved-theme', 'light');
			}
		});

		return () => unsubscribe();
	});

	function updateTheme() {
		themeStore.set(!theme);
	}

	function toggleMenu() {
		menuOpen = !menuOpen;
	}
</script>

<nav
	class="sticky top-0 z-50 backdrop-blur-sm"
	style="background-color: rgba(26, 26, 26, 0.95); border-bottom: 1px solid rgba(212, 160, 23, 0.12);"
	aria-label="Main navigation"
>
	<!-- Decorative lines: rays from logo + edge lines with losanges -->
	<div class="pointer-events-none absolute inset-0" style="overflow: hidden;">
		<svg class="absolute inset-0 h-full w-full" preserveAspectRatio="none">
			<!-- Sun rays emanating from logo position (left side, ~40px from left) -->
			<line x1="40" y1="50%" x2="25%" y2="10%" stroke="#D4A017" stroke-width="0.3" opacity="0.08" />
			<line x1="40" y1="50%" x2="20%" y2="90%" stroke="#D4A017" stroke-width="0.3" opacity="0.06" />
			<line x1="40" y1="50%" x2="35%" y2="5%" stroke="#D4A017" stroke-width="0.3" opacity="0.07" />
			<line x1="40" y1="50%" x2="30%" y2="95%" stroke="#D4A017" stroke-width="0.3" opacity="0.05" />
			<line x1="40" y1="50%" x2="45%" y2="8%" stroke="#D4A017" stroke-width="0.3" opacity="0.06" />
			<line x1="40" y1="50%" x2="50%" y2="92%" stroke="#D4A017" stroke-width="0.3" opacity="0.05" />
			<line x1="40" y1="50%" x2="15%" y2="50%" stroke="#D4A017" stroke-width="0.3" opacity="0.04" />

			<!-- Left edge: line with filled losange coming from off-screen -->
			<line x1="0" y1="50%" x2="28" y2="50%" stroke="#D4A017" stroke-width="0.4" opacity="0.15" />
			<polygon points="0,50% -4,46% -8,50% -4,54%" fill="#D4A017" opacity="0.2" transform="translate(30, 0)" />

			<!-- Right edge: line with filled losange going to off-screen -->
			<line x1="100%" y1="50%" x2="calc(100% - 28px)" y2="50%" stroke="#D4A017" stroke-width="0.4" opacity="0.15" />
		</svg>

		<!-- Right edge losange (needs absolute positioning since SVG % doesn't work for polygons) -->
		<div class="absolute top-1/2 right-0 -translate-y-1/2" style="width: 40px; height: 12px;">
			<svg viewBox="0 0 40 12" class="h-full w-full">
				<line x1="40" y1="6" x2="12" y2="6" stroke="#D4A017" stroke-width="0.5" opacity="0.15" />
				<polygon points="8,6 4,3 0,6 4,9" fill="#D4A017" opacity="0.2" />
			</svg>
		</div>

		<!-- Left edge losange -->
		<div class="absolute top-1/2 left-0 -translate-y-1/2" style="width: 40px; height: 12px;">
			<svg viewBox="0 0 40 12" class="h-full w-full">
				<line x1="0" y1="6" x2="28" y2="6" stroke="#D4A017" stroke-width="0.5" opacity="0.15" />
				<polygon points="32,6 36,3 40,6 36,9" fill="#D4A017" opacity="0.2" />
			</svg>
		</div>
	</div>

	<div class="relative mx-auto flex max-w-[900px] items-center justify-between px-4 py-2.5 md:px-6">
		<!-- Logo with esoteric ornament -->
		<a
			href="{base}/"
			class="flex items-center gap-3 tracking-[0.15em] transition-opacity duration-200 hover:opacity-80"
			style="font-family: var(--font-display); color: #D4A017;"
			aria-label="Home"
		>
			<!-- Esoteric logo ornament: large concentric circles, symbols, overflows the bar -->
			<div class="relative flex items-center justify-center" style="width: 44px; height: 44px;">
				<svg viewBox="0 0 80 80" class="absolute" style="width: 80px; height: 80px; left: -18px; top: -18px; pointer-events: none;">
					<!-- Outermost circle -->
					<circle cx="40" cy="40" r="38" fill="none" stroke="#D4A017" stroke-width="0.3" opacity="0.15" />
					<!-- Outer circle with dashes -->
					<circle cx="40" cy="40" r="32" fill="none" stroke="#D4A017" stroke-width="0.4" opacity="0.25" stroke-dasharray="3 5" />
					<!-- Middle circle -->
					<circle cx="40" cy="40" r="26" fill="none" stroke="#D4A017" stroke-width="0.4" opacity="0.3" />
					<!-- Inner circle -->
					<circle cx="40" cy="40" r="19" fill="none" stroke="#D4A017" stroke-width="0.3" opacity="0.2" />
					<!-- Innermost circle -->
					<circle cx="40" cy="40" r="14" fill="none" stroke="#D4A017" stroke-width="0.3" opacity="0.15" />

					<!-- Cardinal lines extending beyond outer circle -->
					<line x1="40" y1="0" x2="40" y2="8" stroke="#D4A017" stroke-width="0.3" opacity="0.2" />
					<line x1="40" y1="72" x2="40" y2="80" stroke="#D4A017" stroke-width="0.3" opacity="0.2" />
					<line x1="0" y1="40" x2="8" y2="40" stroke="#D4A017" stroke-width="0.3" opacity="0.2" />
					<line x1="72" y1="40" x2="80" y2="40" stroke="#D4A017" stroke-width="0.3" opacity="0.2" />

					<!-- Diagonal lines -->
					<line x1="8" y1="8" x2="13" y2="13" stroke="#D4A017" stroke-width="0.25" opacity="0.15" />
					<line x1="67" y1="8" x2="72" y2="13" stroke="#D4A017" stroke-width="0.25" opacity="0.15" />
					<line x1="8" y1="72" x2="13" y2="67" stroke="#D4A017" stroke-width="0.25" opacity="0.15" />
					<line x1="67" y1="72" x2="72" y2="67" stroke="#D4A017" stroke-width="0.25" opacity="0.15" />

					<!-- Cardinal dots on outermost ring -->
					<circle cx="40" cy="2" r="0.8" fill="#D4A017" opacity="0.3" />
					<circle cx="40" cy="78" r="0.8" fill="#D4A017" opacity="0.3" />
					<circle cx="2" cy="40" r="0.8" fill="#D4A017" opacity="0.3" />
					<circle cx="78" cy="40" r="0.8" fill="#D4A017" opacity="0.3" />

					<!-- Small diamonds at intercardinal positions -->
					<polygon points="40,5 41.2,7 40,9 38.8,7" fill="none" stroke="#D4A017" stroke-width="0.3" opacity="0.2" />
					<polygon points="40,71 41.2,73 40,75 38.8,73" fill="none" stroke="#D4A017" stroke-width="0.3" opacity="0.2" />

					<!-- Tiny triangles on the middle ring -->
					<polygon points="14,40 16,38.5 16,41.5" fill="#D4A017" opacity="0.15" />
					<polygon points="66,40 64,38.5 64,41.5" fill="#D4A017" opacity="0.15" />

					<!-- Arc segments on the outer ring (astrolabe feel) -->
					<path d="M 40 6 A 34 34 0 0 1 62 14" fill="none" stroke="#D4A017" stroke-width="0.3" opacity="0.12" />
					<path d="M 74 40 A 34 34 0 0 1 62 66" fill="none" stroke="#D4A017" stroke-width="0.3" opacity="0.12" />
					<path d="M 18 66 A 34 34 0 0 1 6 40" fill="none" stroke="#D4A017" stroke-width="0.3" opacity="0.12" />

					<!-- Tiny dots scattered between rings -->
					<circle cx="25" cy="18" r="0.5" fill="#D4A017" opacity="0.2" />
					<circle cx="58" cy="25" r="0.5" fill="#D4A017" opacity="0.2" />
					<circle cx="22" cy="58" r="0.5" fill="#D4A017" opacity="0.2" />
					<circle cx="55" cy="60" r="0.5" fill="#D4A017" opacity="0.15" />
				</svg>
				<!-- Sum symbol in center, gold colored, bigger -->
				<img
					src="{base}/logos/sumblack.svg"
					alt=""
					style="width: 20px; height: 20px; filter: brightness(0) saturate(100%) invert(67%) sepia(64%) saturate(500%) hue-rotate(10deg) brightness(95%);"
					class="relative"
				/>
			</div>
			<span class="hidden text-base sm:inline" style="color: #FFFEF6; font-weight: 300;">Garden</span>
		</a>

		<!-- Desktop nav links -->
		<div class="hidden items-center gap-5 md:flex">
			{#each linksItems as item (`nav_${item.link}`)}
				{@const isActive = $page.url.pathname === item.link || ($page.url.pathname.startsWith(item.link) && item.link !== '/' && item.link !== `${base}/`)}
				<a
					data-sveltekit-preload-code="hover"
					href={item.link}
					class="nav-link font-serif text-[0.8rem] uppercase tracking-[0.12em]"
					class:active={isActive}
				>
					{item.label}
				</a>
			{/each}
		</div>

		<!-- Right section: search + theme + mobile menu -->
		<div class="flex items-center gap-2">
			<Search mode="compact" />

			<button
				class="flex h-8 w-8 cursor-pointer items-center justify-center rounded transition-colors duration-200 hover:text-[#D4A017]"
				style="color: #9A928A;"
				aria-label={theme ? 'Switch to light mode' : 'Switch to dark mode'}
				onclick={updateTheme}
			>
				{#if !theme}
					<i class="material-icons !text-xl">dark_mode</i>
				{:else}
					<i class="material-icons !text-xl">light_mode</i>
				{/if}
			</button>

			<!-- Mobile hamburger -->
			<button
				class="flex h-8 w-8 cursor-pointer items-center justify-center rounded transition-colors duration-200 hover:text-[#D4A017] md:hidden"
				style="color: #9A928A;"
				onclick={toggleMenu}
				aria-label={menuOpen ? 'Close menu' : 'Open menu'}
				aria-expanded={menuOpen}
			>
				<i class="material-icons !text-xl">{menuOpen ? 'close' : 'menu'}</i>
			</button>
		</div>
	</div>

	<!-- Mobile menu dropdown -->
	{#if menuOpen}
		<div
			class="px-4 py-4 md:hidden"
			style="border-top: 1px solid rgba(212, 160, 23, 0.12); background-color: rgba(26, 26, 26, 0.98);"
		>
			<div class="flex flex-col gap-3">
				{#each linksItems as item (`nav_mobile_${item.link}`)}
					{@const isActive = $page.url.pathname === item.link || ($page.url.pathname.startsWith(item.link) && item.link !== '/' && item.link !== `${base}/`)}
					<a
						data-sveltekit-preload-code="hover"
						href={item.link}
						class="font-serif text-sm uppercase tracking-[0.12em] transition-colors duration-200"
						style="color: {isActive ? '#D4A017' : '#9A928A'};"
					>
						{item.label}
					</a>
				{/each}
			</div>
		</div>
	{/if}
</nav>

<style>
	.nav-link {
		position: relative;
		color: #B0A89E;
		font-weight: 500;
		transition: color 0.2s;
		padding-bottom: 4px;
	}

	.nav-link::after {
		content: '';
		position: absolute;
		left: 0;
		bottom: 0;
		width: 0;
		height: 1px;
		background-color: #D4A017;
		transition: width 0.3s ease;
	}

	.nav-link:hover {
		color: #D4A017;
	}

	.nav-link:hover::after {
		width: 100%;
	}

	.nav-link.active {
		color: #D4A017;
	}

	.nav-link.active::after {
		width: 100%;
	}
</style>
