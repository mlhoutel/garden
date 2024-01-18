<script>
	import { base } from '$app/paths';
	import { browser } from '$app/environment';

	function print() {
		if (browser) {
			window.print();
		}
	}

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
			<img
				src="{base}/logos/sumblack.svg"
				width="400px"
				height="400px"
				alt="logo"
				class="absolute pointer-events-none right-[50px] bottom-[80px] opacity-10 h-[400px]"
			/>
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
								<h1 class="p-2">LHOUTELLIER Maël</h1>
							</div>

							<h2 class="font-bold text-2xl">WORK EXPERIENCE</h2>
							<ul>
								<li>
									<div class="inline-flex">
										<p class="rounded-full bg-black w-[15px] h-[15px] mt-1" />
										<p class="font-bold text-base pl-4">
											2021-2023: Cloud R&D - Apprenticeship (3 years)
										</p>
									</div>

									<div class="border-l-4 border-black pl-6 ml-[5px] text-sm">
										<p>
											Specialist on serverless python/java microservices, optimization of
											containerization methods, lead dev on supply chain projects, internal
											technical talks and trainings.
										</p>
										<p class="font-bold">
											[GCP, Spring Boot, GraalVM, k8s, Grafana k6, Docker, Jenkins, VueJs]
										</p>
										<p class="italic text-xs">
											U IRIS (Supply-Chain / Software Architecture Department), Nantes, France
										</p>
									</div>
								</li>

								<li>
									<div class="inline-flex">
										<p class="rounded-full bg-black w-[15px] h-[15px] mt-1" />
										<p class="font-bold text-base pl-4">
											2022: Software development - Internship (4 month)
										</p>
									</div>

									<div class="border-l-4 border-black pl-6 ml-[5px] text-sm">
										<p>
											Development of software for network optimisation of camera video streams in
											particle accelerator tunnels, data visualizations for team activities.
										</p>
										<p class="font-bold">[C++, Javascript, Express, OpenStack, VueJs]</p>
										<p class="italic text-xs">CERN (BE/CEM Service), Geneva, Switzerland</p>
									</div>
								</li>

								<li>
									<div class="inline-flex">
										<p class="rounded-full bg-black w-[15px] h-[15px] mt-1" />
										<p class="font-bold text-base pl-4">
											2020: Atomic Simulation - Internship (3 month)
										</p>
									</div>

									<div class="border-l-4 border-black pl-6 ml-[5px] text-sm">
										<p>
											Analysis, development and documentation of Prismatic, an atomic simulation
											software for scanning transmission electron microscopy.
										</p>
										<p class="font-bold">[C++, CMake, Python, Docker, HDF5, Qt]</p>
										<p class="italic text-xs">CEA (LEMMA Service), Grenoble, France</p>
									</div>
								</li>

								<li>
									<div class="inline-flex">
										<p class="rounded-full bg-black w-[15px] h-[15px] mt-1" />
										<p class="font-bold text-base pl-4">2019: Data mining - Summer Job (4 weeks)</p>
									</div>

									<div class="pl-6 ml-[10px]">
										<span>
											Development of IT tools for statistic analysis and data organization of the
											wordwide production tests results.
										</span>
										<p class="italic text-xs">
											LEM (Quality service), Plan-les-Ouates, Switzerland
										</p>
									</div>
								</li>
							</ul>

							<h2>EDUCATION AND QUALIFICATIONS</h2>
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
								<img
									class="rounded-full mb-5 mx-1 mt-1 w-[170px] h-[170px] object-cover object-top"
									src="{base}/images/avatar_placeholder.svg"
									width="170px"
									height="170px"
									alt="curriculum vitae avatar"
								/>

								<h2>CONTACTS</h2>

								<div class="leading-normal flex flex-col text-sm">
									<a href="mailto:mlhoutel@gmail.com">mlhoutel@gmail.com</a>
									<a href="tel:+33781......">
										+33 (0)7 81
										<p class="align-middle mb-1 inline-flex w-[60px] h-[15px] bg-black" />
									</a>
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
								<h2>LANGUAGES</h2>

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
							<h2>OPEN SOURCE PROJECTS</h2>
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
							</ul>
						</div>
					</div>

					<div>
						<h2>REFERENTS</h2>

						<div>
							<p class="align-middle mb-1 inline-flex w-[200px] h-[15px] bg-black" />
							<span>(Manager, U IRIS)</span>
						</div>

						<div>
							<p class="align-middle mb-1 inline-flex w-[200px] h-[15px] bg-black" />
							<span>(Computing Engineer, CERN)</span>
						</div>

						<div>
							<p class="align-middle mb-1 inline-flex w-[200px] h-[15px] bg-black" />
							<span>(Physic researcher, CEA of Grenoble)</span>
						</div>

						<div>
							<p class="align-middle mb-1 inline-flex w-[200px] h-[15px] bg-black" />
							<span>(Manager, LEM)</span>
						</div>
					</div>

					<div>
						<h2>TECHNICAL SKILLS</h2>

						<div>
							<span class="text-base font-bold">Languages: </span>
							<span>JavaScript, C++, Java, Python, Rust, Scala, Haskell, PHP, C#</span>
						</div>

						<div>
							<span class="text-base font-bold">Databases: </span>
							<span>Postgres, MySQL, Oracle, Redis, MongoDB</span>
						</div>

						<div>
							<span class="text-base font-bold">Frameworks: </span>
							<span>VueJs, Angular, React, Laravel, Spring Boot</span>
						</div>

						<div>
							<span class="text-base font-bold">Cloud: </span>
							<span>GCP Solutions, Kubernetes, Terraform</span>
						</div>

						<div>
							<span class="text-base font-bold">Tools: </span>
							<span>Git, Docker, Jenkins, Jira, Github Actions, VSCode, Vim, IntelliJ</span>
						</div>
					</div>

					<div>
						<h2>INTERESTS</h2>
						<p>Rock climbing, Guitar, Running, Biking, Reading, Cooking, FOSS</p>
					</div>

					<div class="pt-5 inline-flex italic">
						<p class="w-[60px] h-[15px] bg-black" />
						<p class="pl-1">
							Concealed to prevent spam or other unwanted disruptions, provided upon request.
							Contact me!
						</p>
					</div>
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
