<script>
	import ProjectCard from '../global/ProjectCard.svelte';
	import TechnoSelect from '../global/TechnoSelect.svelte';
	import { scrollRef } from 'svelte-scrolling';

	const projects = [
		{
			"title": "Simulatio",
			"short": "simulatio",
			"technos": ["C++", "CMake", "ImGui", "Bgfx", "OpenGl", "Cereal", "Wasm"],
			"text": [
				"### About",
				"This project started from a personal challenge: recreate physical principles in a simulation running in real time.",
				"I also wanted this project to easily convey some understanding of how it works, as well as analysis and debugging tools.",
				"[Browse github repo](https://github.com/mlhoutel/Simulatio)",
				"[Browse official website](https://mlhoutel.github.io/Simulatio/)"
			],
			"images": 6
		},
		{
			"title": "Tablatures",
			"short": "tablatures",
			"technos": ["VueJs", "Vuetify", "AlphaTab", "Github Actions"],
			"text": [
				"Read and play tabs quickly",
				" * Import a music score (.gp3, .gp4, .gp5, .gpx, .gp, .xml, .cap or .tex)",
				" * Browse a music score database (IN DEV)",
				" * Browse documentation (IN DEV)",
				"[Browse github repo](https://github.com/mlhoutel/Tablatures)",
				"[Browse the website](https://mlhoutel.github.io/Tablatures/#/)"
			],
			"images": 3
		},
		{
			"title": "Dash Raider",
			"short": "dashraider",
			"technos": ["Unity", "C#", "Voxels", "Shaders", "PixelArt"],
			"text": [
				"DashRaider is a puzzle/action game.",
				"In DashRaider you play the raider, your goal is to go through the dungeon, by completing every room by dashing.",
				"Be aware however, that your number of dashes are limited, and so is your health.",
				"The dungeon has three floors with five rooms each for you to explore and complete.",
				"[Browse github repo](https://github.com/mlhoutel/DashRaider)",
				"[Browse on Itch.io](https://dashraiderthegame.itch.io/dashraider)"
			],
			"images": 2
		},
		{
			"title": "Sigma Help Sheets",
			"short": "sigmahelpsheets",
			"technos": ["Python", "Anaconda", "Sphinx", "JSXGraph", "js"],
			"text": [
				"That’s my help sheets, where I put all the usefull commands, tips and tricks that I find on the subjects that I study, covering:",
				" * Computer Science",
				" * Mathematics",
				" * Physics",
				" * etc",
				"This website is primarly built for me to check the things I may have forgot, but also to make my learning on these subject easier:",
				"I realy like to write down and retranscrible with my words processes that can seem complex, but that can be explained with simplicity. It’s not an easy task, but I tried my best to make these explanations understandable.",
				"[Browse github repo](https://github.com/mlhoutel/SigmaHelpSheets)",
				"[Browse the website](https://mlhoutel.github.io/SigmaHelpSheets/)"
			],
			"images": 5
		},
		{
			"title": "Sky Patterns",
			"short": "skypatterns",
			"technos": ["Vue", "ChartJs", "Axios", "Express", "Vuetify", "Electron"],
			"text": [
				"[Browse github repo](https://github.com/mlhoutel/SkyPatterns)",
				"[Browse on SourceForge](https://sourceforge.net/projects/skypatterns/)"
			],
			"images": 3
		},
		{
			"title": "Fields",
			"short": "fields",
			"technos": ["Python", "Anaconda", "Numpy", "matplotlib"],
			"text": [
				"Visualisation of the electromagnetic field",
				"[Browse github repo](https://github.com/mlhoutel/Fields)"
			],
			"images": 2
		},
		{
			"title": "iuF Nuitrack",
			"short": "iufnuitrack",
			"technos": ["C#", "WPF", "3D Depth camera", "Intel RealSensa api", "Nuitrack"],
			"text": [
				"Reading of datas from a 3D Depth Camera (Intel® RealSense™ D435) through the Intel Realsense Api.",
				"Streaming depth frames/skeletons via UDP for Unity display.",
				"[Browse first part github repo](https://github.com/mlhoutel/iuF_Intel_Realsense)",
				"[Browse second part github repo](https://github.com/mlhoutel/iuF_Nuitrack)"
			],
			"images": 2
		},
		{
			"title": "N. A. D. A.",
			"short": "nada",
			"technos": [
				"Go",
				"GraphQl",
				"Vite",
				"ApexCharts",
				"Appolo",
				"OpenLayers",
				"Paho MQTT",
				"Docker",
				"InfluxDB",
				"js"
			],
			"text": [
				"National Atmospheric Data | Capture data from airport sensor and visualize it.",
				"The NADA project is a student project. The team is composed of @creeperdeking, @RaphaelPainter, @maxerbox & @mlhoutel.",
				"They are IT students at IMT Atlantique, France. It allows an user to view on a web page (NADA-webapp) aggregated sensor data captured from sensors (NADA-sensio) served by a GraphQL Api (NADA-serve)",
				"[Browse frontend github repo](https://github.com/mlhoutel/NADA-webapp)",
				"[Browse backend github repo](https://github.com/mlhoutel/NADA-extended)"
			],
			"images": 5
		},
		{
			"title": "Graphs",
			"short": "graphs",
			"technos": ["java", "maven", "javadoc", "jgraphx", "Github Actions"],
			"text": [
				"Graphs general purpose framework, algorithms and visualisations.",
				"[Browse github repo](https://github.com/mlhoutel/Graphs)",
				"[Browse Documentation](https://mlhoutel.github.io/Graphs/)"
			],
			"images": 3
		},
		{
			"title": "Pico",
			"short": "pico",
			"technos": ["js", "Aseprite", "Pico-cad", "Pico webviewer", "Cannon"],
			"text": ["Web rendering project", "[Browse github repo](https://github.com/mlhoutel/Pico)"],
			"images": 3
		},
		{
			"title": "Nbody",
			"short": "nbody",
			"technos": ["js", "p5"],
			"text": [
				"This is a small project I made to test and train on the physic simulation method of the Verlet integration.",
				"With the Euler method, you have the positions of the body and the vectors of speed to calculate the positions. With the Verlet integration method, it's way simpler:",
				"You don't have to recalculate the vectors of speed, you only have to save the last position and make the difference to compute the next position.",
				"[Browse github repo](https://github.com/mlhoutel/Nbody)"
			],
			"images": 0
		},
		{
			"title": "Todo Vue",
			"short": "todovue",
			"technos": ["VueJs", "Typescript", "express"],
			"text": [
				"A simple todo app I made for training in VueJs",
				"[Browse github repo](https://github.com/mlhoutel/TodoVue)"
			],
			"images": 0
		}
	]

	export let dropdown = projects.map((p) => p.technos).flat();
	export let filters = new Set();
	export let filteredProjects = projects;

	export function updateFilter(f) {
		const arrayFilters = Array.from(filters);

		if (!arrayFilters.length) {
			filteredProjects = projects;
		} else {
			filteredProjects = projects.filter((p) => {
				return p.technos.some((t) => arrayFilters.indexOf(t) > -1);
			});
		}
	}
</script>

<section class="content-section background-primary" id="projects" use:scrollRef={'projects'}>
	<h1 class="content-h1">PROJECTS</h1>

	<TechnoSelect on:change={updateFilter} bind:options={dropdown} bind:selected={filters} />
	<div class="grid grid-cols-2 sm:grid-cols-4 gap-1 p-2">
		{#each filteredProjects as proj}
			<ProjectCard project={proj} />
		{/each}
	</div>
</section>
