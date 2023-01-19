<script>
	import { scrollTo } from 'svelte-scrolling';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Bars3 } from '@steeze-ui/heroicons';

	export function navigateProjects() {
		scrollTo('projects');
	}

	export let open = false;
</script>

<div class="sticky top-0 h-10 z-30">
	<ul class="navbar-items">
		<button class="navbar-button" on:click={() => { open = !open }} >
			<Icon src={Bars3} theme="solid" size="30px" />
		</button>

		<div class="background-secondary w-full sm:w-20" />
		<div class="navbar-links {open ? '' : 'hidden'} sm:flex">
			<li use:scrollTo={'resume'}> RESUME </li>
			<li use:scrollTo={'projects'}> PROJECTS </li>
			<li use:scrollTo={'references'}> REFERENCES </li>
			<li use:scrollTo={'contacts'}> CONTACTS </li>
		</div>
	</ul>
</div>
