<script lang="ts">
	import { base } from '$app/paths';
	import type { Project } from '$types/types';

	export let project: Project;
</script>

<div class="relative h-[130px] overflow-hidden sm:h-[200px] md:h-[300px] lg:h-[400px]">
	<img
		src={`${base}/images/${project.short}/0.png`}
		alt="cover"
		class="h-full w-full object-cover brightness-50"
	/>

	<h2 class="content-medium absolute inset-x-0 bottom-0 w-full p-3 text-center text-white lg:p-10">
		{project.title}
	</h2>
</div>
