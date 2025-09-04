<script>
	import { getValue } from '$utils/curriculum.js';
	import { base } from '$app/paths';
	import { browser } from '$app/environment';

	function print() {
		if (browser) {
			window.print();
		}
	}

	const lang = 'en';
	const pub = true;

	if (browser) {
		const googleapis = document.createElement('link');
		googleapis.rel = 'preconnect';
		googleapis.href = 'https://fonts.googleapis.com';
		document.head.appendChild(googleapis);

		const gstatic = document.createElement('link');
		gstatic.rel = 'preconnect';
		gstatic.href = 'https://fonts.gstatic.com';
		gstatic.setAttribute('crossorigin', '');
		document.head.appendChild(gstatic);

		const fonts = document.createElement('link');
		fonts.href = 'https://fonts.googleapis.com/css2?family=Mukta:wght@200;700&display=swap';
		fonts.rel = 'stylesheet';
		document.head.appendChild(fonts);
	}
</script>

<div id="print" class="sticky top-0 z-30 md:flex md:justify-center mb-[-140px] overflow-hidden">
	<div class="w-full flex md:justify-end" style="width: 210mm">
		<button
			on:click={print}
			class="overflow-hidden background-primary h-[70px] w-[70px] rounded-full mx-3 mt-10"
			style="box-shadow: rgba(0,0,0,0.5) 0px 3px 5px 0px;"
		>
			<i class="material-icons !text-3xl">print</i>
		</button>
	</div>
</div>

<div class="block mt-10 max-w-[100vw] overflow-auto">
	<container id="cv" class="md:flex md:justify-center">
		<div class="A4 tracking-wider font-thin relative bg-white shadow-xl">
			<div class="z-10 flex h-full">
				<div class="w-6 bg-[#cfcecc]" />
				<div class="w-full pl-2 pr-5 bg-[#f3f0e7]">
					<div class="flex">
						<div class="flex-auto pt-8 pr-6">
							<div class="inline-flex items-center overflow-visible">
								<img
									src="{base}/logos/sumcolor.svg"
									width="44px"
									height="44px"
									alt="logo"
									class="h-11"
								/>

								<p class="text-black !text-6xl font-black ml-[10px]">
									{@html getValue('name', pub, lang)}
								</p>
							</div>

							<h2 class="font-bold font-2xl">{@html getValue('experience_title', pub, lang)}</h2>
							<ul>
								{#each getValue('experiences_items', pub, lang) as item}
									<li>
										<div class="inline-flex">
											<p class="rounded-full bg-black w-[15px] h-[15px] mt-1" />
											<p class="font-bold text-base pl-4">
												{@html item?.['title']}
											</p>
										</div>

										<div class="border-l-4 border-black pl-6 ml-[5px] text-sm">
											<p>
												{@html item?.['details']}
											</p>
											<p class="font-bold">
												{@html item?.['keywords']}
											</p>
											<p class="italic text-xs">
												{@html item?.['place']}
											</p>
										</div>
									</li>
								{/each}
							</ul>

							<h2>{@html getValue('education_title', pub, lang)}</h2>
							<ul>
								<li>
									<div class="inline-flex">
										<p class="rounded-full bg-black w-[15px] h-[15px] mt-1" />
										<p class="font-bold text-base pl-4">
											2020-2023: Engineering Degree (Software development)
										</p>
									</div>

									<div class="border-l-4 border-black pl-6 ml-[5px]">
										<p class="italic text-xs">IMT Atlantique engineering school, Nantes</p>
									</div>
								</li>

								<li>
									<div class="inline-flex">
										<p class="rounded-full bg-black w-[15px] h-[15px] mt-1" />
										<p class="font-bold text-base pl-4">
											2018-2020: Computing Diploma (Maths-AI speciality)
										</p>
									</div>

									<div class="pl-6 ml-[10px]">
										<p class="italic text-xs">Université Savoie Mont Blanc, Annecy-le-Vieux</p>
									</div>
								</li>
							</ul>
						</div>

						<div class="flex-none w-[230px] p-6 h-full bg-[#ffffff]">
							<div class="flex flex-col">
								<h2>{@html getValue('contact_title', pub, lang)}</h2>

								<div class="leading-normal flex flex-col text-sm">
									<a href="mailto:mlhoutel@gmail.com">mlhoutel@gmail.com</a>
									<a href="tel:+33......">{@html getValue('contact_phone', pub, lang)}</a>
									<a href="https://maellhoutellier.com" class="underline">maellhoutellier.com</a>
									<a href="https://github.com/mlhoutel" class="underline">github.com/mlhoutel</a>
									<a href="https://gitlab.com/mlhoutel" class="underline">gitlab.com/mlhoutel</a>
									<a href="https://hackerrank.com/mlhoutel" class="underline">
										hackerrank.com/mlhoutel
									</a>
									<a href="https://fr.linkedin.com/in/mlhoutel" class="underline">
										fr.linkedin.com/in/mlhoutel
									</a>
								</div>
							</div>

							<div>
								<h2>{@html getValue('languages_title', pub, lang)}</h2>

								<div class="leading-normal flex flex-col text-sm">
									<div>
										<span class="font-bold">French:</span>
										<span>Native</span>
									</div>
									<div>
										<span class="font-bold">English:</span>
										<span>C1 (IELTS 7.5)</span>
									</div>
									<div>
										<span class="font-bold">Italian:</span>
										<span>Academic level</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div>
						<div>
							<h2>OPEN SOURCE & PERSONNAL PROJECTS</h2>
							<ul>
								<li>
									<div>
										<span class="text-base font-bold">
											Naomesh: Demonstrator for monitoring the software footprint</span
										>
										<a href="https://github.com/naomesh" class="underline text-sm">
											github.com/naomesh</a
										>
									</div>

									<div class="text-sm">
										<span>Orchestration of green/non-green energy photogrammetry tasks</span>
										<span class="font-bold">[Prefect, Ansible, OpenMVG, Angular, NestJs]</span>
									</div>
								</li>

								<li>
									<div>
										<span class="text-base font-bold">Qualeus: Comprehensive Physics engine</span>
										<a href="https://github.com/qualeus" class="underline text-sm"
											>github.com/qualeus</a
										>
									</div>

									<div class="text-sm">
										<span>
											Adjustable precision / data structures / integration method for benchmarking
										</span>
										<span class="font-bold">[C++, Cmake, Imgui, Bgfx, Cereal]</span>
									</div>
								</li>

								<!--
								<li>
									<div>
										<span class="text-base font-bold">
											Tablatures: Lightweight guitar sheet player
										</span>
										<a href="https://github.com/tablatures" class="underline text-sm">
											github.com/tablatures
										</a>
									</div>

									<div class="text-sm">
										<span>Responsive tablatures player website</span>
										<span class="font-bold">[TypeScript, Sveltekit, Tailwind, AlphaTab]</span>
									</div>
								</li>
								-->

								<li>
									<div>
										<span class="text-base font-bold">
											Godot Ecosystem Contributions & GDScript Modules Suite (WIP)
										</span>
									</div>

									<div class="text-sm">
										<span>
											Developing typed GDScript libraries (orchestrator, input manager, physics
											controllers, dependency injections framework),<br /> prototyped in a custom game
											and 3D tool. Contributed bug reports and PRs to Godot Engine and related projects.
										</span>
										<br />
										<span class="font-bold">
											[Godot, Typed GDScript, Ecosystem development, 3D, Open Source]
										</span>
									</div>
								</li>
							</ul>
						</div>
					</div>

					<div>
						<h2>{@html getValue('referents_title', pub, lang)}</h2>

						{#each getValue('referents_items', pub, lang) as referent}
							<div class="py-1">
								{@html referent?.['name']}
								<span>{@html referent?.['role']}</span>
							</div>
						{/each}
					</div>

					<div>
						<h2>TECHNICAL SKILLS</h2>

						<div>
							<span class="text-base font-bold">Languages: </span>
							<span>
								JavaScript, Typescript, C++, Java, Python, GDScript, Rust, Scala, Haskell, PHP, C#
							</span>
						</div>

						<div>
							<span class="text-base font-bold">Databases: </span>
							<span>PostgreSQL, MySQL, Oracle, Redis, MongoDB, Redis, Memcached, S3</span>
						</div>

						<div>
							<span class="text-base font-bold">Frameworks: </span>
							<span>VueJs, React, Angular, Svelte, Laravel, Spring Boot, Quarkus, Flask</span>
						</div>

						<div>
							<span class="text-base font-bold">Cloud: </span>
							<span>GCP Solutions, AWS Solutions, K8s, Terraform, Docker, Ansible</span>
						</div>

						<div>
							<span class="text-base font-bold">Tools: </span>
							<span>Git, Jenkins, Jira, Github Actions, VSCode, Vim, IntelliJ, WSL</span>
						</div>
					</div>

					<div>
						<h2>INTERESTS</h2>
						<p>Rock climbing, Mountaineering, Guitar, Running, Biking, Reading, Cooking, FOSS</p>
					</div>

					<!--
					<div class="pt-5 inline-flex italic">
						<p class="w-[60px] h-[15px] bg-black" />
						<p class="pl-1">
							Concealed to prevent spam or other unwanted disruptions, provided upon request.
							Contact me!
						</p>
					</div>
					-->
				</div>
			</div>
		</div>
	</container>
</div>

<style>
	@media print {
		:global(*) {
			visibility: hidden;
		}

		:global(#navbar) {
			display: none;
		}

		#print {
			margin: 0;
			padding: 0;
		}

		#print {
			display: none;
		}

		#cv,
		#cv * {
			visibility: visible;
			overflow: hidden;
		}

		#cv {
			width: 230mm;
			height: 325mm;
			position: absolute;
			top: 0;
			left: 0;
		}
	}

	@page {
		size: A4;
		margin: 0;
		overflow: hidden;
	}

	.A4 {
		overflow: hidden;
		width: 230mm;
		height: 325mm;
		line-height: 1.2em !important;
		text-align: justify;
		font-family: 'Mukta', sans-serif;
		color: black;
	}

	h1 {
		font-weight: 800 !important;
		font-size: 3.2em !important;
	}

	h2 {
		font-weight: 600 !important;
		font-size: 1.8em !important;
		padding: 13px 0px 5px 0px;
	}
</style>
