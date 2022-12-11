<script>
	import { base } from '$app/paths';

	export let project = undefined;
</script>

<div class="relative  overflow-hidden h-[130px] sm:h-[200px] md:h-[300px] lg:h-[400px]">
	<img
		src="{base}/images/{project.short}/0.png"
		alt="cover"
		class="object-cover w-full h-full brightness-50"
	/>

	<h2
		class="absolute w-full text-center content-medium bottom-0 inset-x-0 text-white p-3 lg:p-10"
	>
		{project.title}
	</h2>
</div>
