<script>
	import { afterUpdate } from 'svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { XMark } from '@steeze-ui/heroicons';
	import { createEventDispatcher } from 'svelte';

	export let topic = undefined;
	export let removable = false;

	export const topics = new Map([
		['git', { label: 'Git', icon: '', link: 'https://git-scm.com/' }],
		['c++', { label: 'C++', icon: '', link: 'https://isocpp.org/' }],
		['js', { label: 'JavaScript', icon: '', link: 'https://www.javascript.com/' }],
		['ts', { label: 'TypeScript', icon: '', link: 'https://www.typescriptlang.org/' }],
		['node', { label: 'Node', icon: '', link: 'https://nodejs.org/en/' }],
		['vue', { label: 'Vue', icon: '', link: 'https://vuejs.org/' }],
		['spring', { label: 'Spring', icon: '', link: 'https://spring.io/' }],
		['python', { label: 'Python', icon: '', link: 'https://www.python.org/' }],
		['anaconda', { label: 'Anaconda', icon: '', link: 'https://www.anaconda.com/' }],
		['docker', { label: 'Docker', icon: '', link: 'https://www.docker.com/' }],
		['hdf5', { label: 'HDF5', icon: '', link: 'https://www.hdfgroup.org/solutions/hdf5/' }],
		['fftw', { label: 'FFTW', icon: '', link: 'http://www.fftw.org/' }],
		['qt', { label: 'Qt', icon: '', link: 'https://www.qt.io/' }],
		['sphinx', { label: 'Sphinx', icon: '', link: 'https://www.sphinx-doc.org/en/stable/' }],
		['jenkins', { label: 'Jenkins', icon: '', link: 'https://jenkins.io/' }],
		['postgres', { label: 'Postgres', icon: '', link: 'https://www.postgresql.org/' }],
		['activemq', { label: 'ActiveMQ', icon: '', link: 'https://activemq.apache.org/' }],
		['figma', { label: 'Figma', icon: '', link: 'https://www.figma.com/' }],
		[
			'vba',
			{ label: 'VBA', icon: '', link: 'https://learn.microsoft.com/en-us/office/vba/api/overview/' }
		]
	]);

	export let pill = { label: 'default', icon: '', link: undefined };

	afterUpdate(() => {
		UpdateLabel();
	});

	export function UpdateLabel() {
		const lower = topic?.toLowerCase();
		if (topics.has(lower)) {
			pill = topics.get(lower);
		} else {
			pill.label = topic;
		}
	}

	export const dispatch = createEventDispatcher();
	export function handleClick() {
		dispatch('click', pill);
	}
</script>

<a href={!removable ? pill.link : './'} target="_blank" rel="noreferrer">
	<button class="pill" on:click={handleClick}>
		{#if !!pill.icon}
			<Icon src={pill.icon} theme="solid" size="15px" class="mr-1" />
		{/if}

		{pill.label}

		{#if !!removable}
			<Icon src={XMark} theme="solid" size="15px" class="ml-1" />
		{/if}
	</button>
</a>
