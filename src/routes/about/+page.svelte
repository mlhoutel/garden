<script>
	import { browser } from '$app/environment';
	import IFrame from '$components/global/IFrame.svelte';

	let lang = 'en'; // default language

	function toggleLang() {
		lang = lang === 'en' ? 'fr' : 'en';
	}

	// compute the src URL based on selected language
	$: iframeSrc =
		lang === 'en'
			? 'https://mlhoutel-curriculum.vercel.app/en'
			: 'https://mlhoutel-curriculum.vercel.app/fr';

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

<div
	id="print"
	class="sticky top-0 mr-[-70px] z-30 md:flex md:justify-center mb-[-160px] overflow-hidden"
>
	<div class="w-full flex md:justify-end pb-10" style="width: 210mm">
		<button
			on:click={print}
			class="overflow-hidden background-primary h-[70px] w-[70px] rounded-full mx-1 mt-3
           transition-all duration-300 ease-in-out
            hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow-lg"
			style="box-shadow: rgba(0,0,0,0.5) 0px 3px 5px 0px;"
		>
			<i class="material-icons !text-3xl">print</i>
		</button>

		<button
			on:click={toggleLang}
			class="overflow-hidden background-primary h-[70px] w-[70px] rounded-full mx-1 mt-3
             transition-all duration-300 ease-in-out
             hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow-lg"
			style="box-shadow: rgba(0,0,0,0.5) 0px 3px 5px 0px;"
		>
			<div class="relative w-full h-full flex items-center justify-center">
				<!-- Fixed translation icon -->
				<i class="material-icons !text-3xl">language</i>

				<!-- Small language label overlay -->
				<p
					class="absolute bottom-2 right-1 font-bold text-lg background-primary rounded-sm font-mono tracking-[0.15em] px-1"
				>
					{lang === 'en' ? 'FR' : 'EN'}
				</p>
			</div>
		</button>
	</div>
</div>

<div class="block mt-10 max-w-[100vw] overflow-auto">
	<container id="cv" class="md:flex md:justify-center">
		<div class="A4 tracking-wider font-thin relative bg-white shadow-xl">
			<IFrame
				title="curriculum"
				src={iframeSrc}
				style=""
				class="A4 tracking-wider font-thin relative bg-white shadow-xl"
			/>
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
