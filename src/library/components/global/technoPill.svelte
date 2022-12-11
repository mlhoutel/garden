<script>
	import { afterUpdate } from 'svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { X } from '@steeze-ui/heroicons';
	import { createEventDispatcher } from 'svelte';

	export let techno = undefined;
	export let removable = false;

	export const technos = new Map([
		['git', { label: 'Git', icon: '', link: 'https://git' }],
		['c++', { label: 'C++', icon: '', link: '' }],
		['js', { label: 'JavaScript', icon: '', link: '' }],
		['ts', { label: 'TypeScript', icon: '', link: '' }],
		['node', { label: 'Node', icon: '', link: '' }],
		['vue', { label: 'Vue', icon: '', link: '' }],
		['spring', { label: 'Spring', icon: '', link: '' }],
		['python', { label: 'Python', icon: '', link: '' }],
		['anaconda', { label: 'Anaconda', icon: '', link: '' }],
		['docker', { label: 'Docker', icon: '', link: '' }],
		['hdf5', { label: 'HDF5', icon: '', link: '' }],
		['fftw', { label: 'FFTW', icon: '', link: '' }],
		['qt', { label: 'Qt', icon: '', link: '' }],
		['sphinx', { label: 'Sphinx', icon: '', link: '' }],
		['jenkins', { label: 'Jenkins', icon: '', link: '' }],
		['postgres', { label: 'Postgres', icon: '', link: '' }],
		['activemq', { label: 'ActiveMQ', icon: '', link: '' }],
		['figma', { label: 'Figma', icon: '', link: '' }]
	]);

	export let pill = { label: 'default', icon: '', link: undefined };

	afterUpdate(() => {
		UpdateLabel();
	});

	export function UpdateLabel() {
		const lowtech = techno?.toLowerCase();
		if (technos.has(lowtech)) {
			pill = technos.get(lowtech);
		} else {
			pill.label = techno;
		}
	}

	export const dispatch = createEventDispatcher();
	export function handleClick() {
		dispatch('click', pill);
	}
</script>

<a href={!removable ? pill.link : undefined}>
	<button class="pill" on:click={handleClick}>
		{#if !!pill.icon}
			<Icon src={pill.icon} theme="solid" size="15px" class="mr-1" />
		{/if}

		{pill.label}

		{#if !!removable}
			<Icon src={X} theme="solid" size="15px" class="ml-1" />
		{/if}
	</button>
</a>
