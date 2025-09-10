<script>
	import { browser } from '$app/environment';
	import IFrame from '$components/global/IFrame.svelte';

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
	<div class="w-full flex md:justify-end pb-10" style="width: 210mm">
		<button
			on:click={print}
			class="overflow-hidden background-primary h-[70px] w-[70px] rounded-full mx-3 mt-10
           transition-all duration-300 ease-in-out
            hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow-lg"
			style="box-shadow: rgba(0,0,0,0.5) 0px 3px 5px 0px;"
		>
			<i class="material-icons !text-3xl">print</i>
		</button>
	</div>
</div>

<div class="block mt-10 max-w-[100vw] overflow-auto">
	<container id="cv" class="md:flex md:justify-center">
		<div class="A4 tracking-wider font-thin relative bg-white shadow-xl">
			<IFrame
				title="curriculum"
				src="https://mlhoutel-curriculum.vercel.app/"
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
