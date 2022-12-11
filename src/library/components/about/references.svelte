<script>
	import { scrollRef } from 'svelte-scrolling';

	export const references = [
		{
			name: 'POIBLEAU Alice',
			role: 'Manager of the Supply Chain department, U IRIS',
			mail: 'alice.poibleau@systeme-u.fr'
		},
		{
			name: 'ROUVIERE Jean-Luc',
			role: 'Physic researcher, CEA of Grenoble',
			mail: 'jean-luc.rouviere@cea.fr'
		},
		{
			name: 'REDOINE Fatsa',
			role: 'Manager of the Auto Quality department, LEM',
			mail: 'fatsa.redoine@lem.com'
		}
	];
</script>

<section
	class="content-section background-quaternary pb-10"
	id="resume"
	use:scrollRef={'references'}
>
	<h1 class="content-h1">REFERENCES</h1>

	<div class="m-5">
		<ul>
			{#each references as reference}
				<li>
					<div class="list-title content-big content-h3 ">
						<div class="inline-flex">
							<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="list-dot">
								<circle cx="50" cy="50" r="50" />
							</svg>
							<div>{reference.name}</div>
						</div>
					</div>
					<div class="list-item">
						<p class="font-bold text-base">\ {reference.role}</p>
						<p class="button-rounded text-sm py-0 mx-0 my-2 w-fit bg-orange">
							{reference.mail}
						</p>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</section>
