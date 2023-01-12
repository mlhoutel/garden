<script>
	import { scrollRef, scrollTo } from 'svelte-scrolling';
	import { base } from '$app/paths';
</script>

<section class="content-section background-primary" id="home" use:scrollRef={'home'}>
	<div class="flex flex-col md:flex-row">
		<div
			class="md:flex-none md:w-[55%] bg-cover bg-center pt-1"
			style="background-image: url('{base}/images/compressed_mountain.png')"
		>
			<svg
				class="background-fill-primary mt-[300px] md:mt-[600px] md:fill-transparent dark:md:fill-transparent"
				viewBox="0 0 1440 270"
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					style="filter: hue-rotate(-90deg);"
					d="M0,27L288,216L576,189L864,189L1152,27L1440,81L1728,189L2016,54L2304,189L2592,108L2880,108L3168,27L3456,27L3744,243L4032,216L4320,135L4608,81L4896,189L5184,162L5472,27L5760,189L6048,0L6336,0L6624,81L6912,189L6912,270L6624,270L6336,270L6048,270L5760,270L5472,270L5184,270L4896,270L4608,270L4320,270L4032,270L3744,270L3456,270L3168,270L2880,270L2592,270L2304,270L2016,270L1728,270L1440,270L1152,270L864,270L576,270L288,270L0,270Z"
				/>
				<path
					d="M0,135L288,54L576,243L864,189L1152,135L1440,54L1728,216L2016,162L2304,54L2592,81L2880,216L3168,162L3456,108L3744,243L4032,162L4320,216L4608,135L4896,216L5184,216L5472,54L5760,162L6048,27L6336,54L6624,135L6912,0L6912,270L6624,270L6336,270L6048,270L5760,270L5472,270L5184,270L4896,270L4608,270L4320,270L4032,270L3744,270L3456,270L3168,270L2880,270L2592,270L2304,270L2016,270L1728,270L1440,270L1152,270L864,270L576,270L288,270L0,270Z"
				/>
			</svg>
		</div>

		<div
			class="md:grow background-primary px-3 md:semi-skewed md:ml-[-100px] md:pt-[150px] lg:pt-[200px] md:pl-20 md:pr-10"
		>
			<div class="md:anti-semi-skewed">
				<p class="content-big text-orange">Hi,</p>
				<p class="content-medium">I'm Maël, a French engineering student.</p>
				<p class="content-base text-justify">I live in the mountain chain of the Alps, near the Mont Blanc. Welcome to my portfolio, where you can discover who I am and some of my realizations.</p>

				<div class="full-centered">
					<a
						href="{base}/curriculum/LHOUTELLIER_Maël_CV_English.pdf"
						rel="noreferrer"
						target="_blank"
					>
						<button class="button-rounded bg-grey text-white content-small">
							Check my Curriculum Vitae
						</button>
					</a>
				</div>
			</div>
		</div>
	</div>

	<button
		use:scrollTo={'resume'}
		class="button-squared background-secondary font-semibold text-grey dark:text-grey text-lg w-full md:p-5 md:text-3xl"
	>
		Next
	</button>
</section>
