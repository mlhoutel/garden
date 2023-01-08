<script>
	import { Icon } from '@steeze-ui/svelte-icon';
	import {
		AcademicCap,
		Terminal,
		Beaker,
		Library,
		DesktopComputer,
		Briefcase,
		LightningBolt,
		Variable
	} from '@steeze-ui/heroicons';
	import TopicPill from '../global/TopicPill.svelte';
	import { scrollRef } from 'svelte-scrolling';

	const jobs = [
		{
			icon: DesktopComputer,
			period: '2020-2023',
			title: "Software Development",
			event: "Apprenticeship",
			duration: "3 years",
			details: "Design, development and deployment of softwares for the stock management and warehouse activities",
			technos: [ "Node", "VueJs", "Spring", "ActiveMQ", "Docker", "Jenkins", "Postgres", "Figma" ],
			place: "U IRIS / (Supply-Chain service), Nantes, France"
		},
		{
			icon: Variable,
			period: '2020',
			title: "Atomic Simulation",
			event: "Internship",
			duration: "3 months",
			details: "Analysis, documentation and development of a Prismatic fork, an atomic simulation software for STEM (Scanning and Transmission Electron Microscopy)",
			technos: ["C++", "CMake", "Python", "Docker", "HDF5", "FFTW", "Qt", "Sphinx", "Git"],
			place: "CEA / (LEMMA service), Grenoble; France"
		},
		{
			icon: LightningBolt,
			period: '2019',
			title: "Statistic analysis",
			event: "Summer Job",
			duration: "4 weeks",
			details: "Development of IT tools for statistic analysis and data organization of the production tests results of the China site",
			technos: ["VBA", "UserForms", "Plots", "Interpolation", "Git", "Analysis"],
			place: "LEM Switzerland (Quality service), Plan-les-Ouates, Switzerland"
		}
	]

	const studies = [
		{
			icon: Library,
			period: '2020-2023',
			title: "Engineering Degree",
			speciality: "Software speciality",
			details: "",
			place: "IMT Atlantique engineering school, Nantes"
		},
		{
			icon: Terminal,
			period: '2018-2020',
			title: "Computing Diploma",
			speciality: "Maths-AI speciality",
			details: "",
			place: "University Savoie Mont Blanc, Annecy-le-Vieux"
		},
		{
			icon: Beaker,
			period: '2018',
			title: "Scientific High School Diploma",
			speciality: "Biology/IT ",
			details: "",
			place: "Polyvalent High School of Glières, Annemasse"
		}
	]

</script>

<section class="content-section background-quaternary pb-10" id="resume" use:scrollRef={'resume'}>
	<h1 class="content-h1">RESUME</h1>

	<div class="flex flex-col lg:flex-row">
		<div class="p-3 lg:flex-1">
			<h2 class="inline-flex items-center content-h2">
				<Icon src={Briefcase} theme="solid" class="h-9 mr-2" />
				Jobs
			</h2>

			<ul class="px-3">
				{#each jobs as job}
					<li>
						<div>
							<h3 class="list-title content-big content-h3 ">
								<div class="inline-flex">
									<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="list-dot">
										<circle cx="50" cy="50" r="50" />
									</svg>

									<Icon src={job.icon} size="1.3em" theme="solid" />

									<div class="flex flex-row">
										<span class="px-1">{job.period}</span>
										-
										<span class="px-1">{job.title}</span>
									</div>
								</div>

								<div class="flex flex-row font-semibold text-marine dark:text-orange">
									[{job.event} / {job.duration}]
								</div>
							</h3>

							<div class="list-item">
								<p class="text-justify">{job.details}</p>

								<p class="italic font-bold">{job.place}</p>

								<div class="pills py-3">
									{#each job.technos as topic}
										<TopicPill {topic} />
									{/each}
								</div>
							</div>
						</div>
					</li>
				{/each}
			</ul>
		</div>

		<div class="px-3 lg:flex-1">
			<h2 class="inline-flex items-center content-h2">
				<Icon src={AcademicCap} theme="solid" class="h-9 mr-2" />
				Studies
			</h2>

			<ul class="px-3">
				{#each studies as study}
					<li>
						<div>
							<h3 class="list-title content-h3">
								<div class="inline-flex">
									<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="list-dot">
										<circle cx="50" cy="50" r="50" />
									</svg>

									<Icon src={study.icon} size="1.3em" theme="solid" />

									<span class="px-1">{study.period}</span>
									-
									<span class="px-1">{study.title}</span>
								</div>

								<div class="font-semibold text-marine dark:text-orange">
									[{study.speciality}]
								</div>
							</h3>

							<div class="list-item">
								<p class="text-justify">{study.details}</p>

								<p class="italic font-bold">{study.place}</p>
							</div>
						</div>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>
