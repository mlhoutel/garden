<script>
	import { scrollRef } from 'svelte-scrolling';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Folder, Mail, Hashtag, Link, MenuAlt1, Pencil } from '@steeze-ui/heroicons';
	import FalseWindow from '../global/FalseWindow.svelte';

	export let subject = '';
	export let body = '';

	function getCode() {
		const code = [
			'<span style="color: #3fdaa4">admin@web-console></span> grep',
			'$ Usage: grep [OPTION]... PATTERNS [FILE]...',
			"$ Try 'grep --help' for more information.",
			'',
			'<span style="color: #3fdaa4">admin@web-console></span> grep -iwn --color mlhoutel contacts.txt'
		];

		const contacts = [
			{
				label: '<span style="color: #3fdaa4">1:</span>EMAIL:',
				link: 'mailto:mlhoutel',
				text: '<span style="color: #d8627e">mlhoutel</span>@gmail.com'
			},
			{
				label: '<span style="color: #3fdaa4">2:</span>GITHUB',
				link: 'https://github.com/mlhoutel',
				text: 'https://github.com/<span style="color: #d8627e">mlhoutel</span>'
			},
			{
				label: '<span style="color: #3fdaa4">3:</span>GITLAB',
				link: 'https://gitlab.com/mlhoutel',
				text: 'https://gitlab.com/<span style="color: #d8627e">mlhoutel</span>'
			},
			{
				label: '<span style="color: #3fdaa4">4:</span>LINKEDIN',
				link: 'https://www.linkedin.com/in/mlhoutel/',
				text: 'https://www.linkedin.com/in/<span style="color: #d8627e">mlhoutel</span>/'
			},
			{
				label: '<span style="color: #3fdaa4">5:</span>HACKERRANK',
				link: 'https://www.hackerrank.com/mlhoutel/',
				text: 'https://www.hackerrank.com/<span style="color: #d8627e">mlhoutel</span>/'
			}
		].map((e) => {
			return `$ ${e.label} <a href=${e.link} style="text-decoration: underline" rel="external" target="_blank">${e.text}</a>`;
		});

		const bottom = [
			'',
			'',
			'',
			'',
			'<span style="color: #3fdaa4">admin@web-console></span> <span style="background-color: white; height: 1em; width: 0.7em; animation: blinker 1s linear infinite;"> </span>'
		];

		return [...code, ...contacts, ...bottom];
	}
</script>

<section class="content-section background-primary pb-10" id="resume" use:scrollRef={'contacts'}>
	<h1 class="content-h1">CONTACTS</h1>

	<div class="flex flex-col lg:flex-row justify-center">
		<div class="w-full lg:w-[700px] p-6">
			<FalseWindow class="bg-black">
				<div class="code-snippet">
					<pre>{#each getCode() as c}<code>{@html c}<br /></code>{/each}</pre>
				</div>
			</FalseWindow>
		</div>

		<div class="w-full lg:w-[700px] p-6">
			<FalseWindow>
				<form class="custom-form px-2">
					<div class="inline-flex border-b-2 border-gray-300 w-full p-1">
						<label for="recipient" class="text-gray-500">To</label>
						<input
							value="mlhoutel@gmail.com"
							name="recipient"
							class="w-full text-gray-500"
							readonly
						/>
					</div>
					<div class="inline-flex border-b-2 border-gray-300 w-full p-1">
						<label for="subject" class="text-gray-500">Subject</label>
						<input bind:value={subject} name="recipient" class="w-full" />
					</div>
					<div class="inline-flex border-b-2 border-gray-300 w-full p-1">
						<textarea bind:value={body} name="body" class="w-full" rows="10" />
					</div>
				</form>

				<div class="flex flex-row justify-between w-full p-1">
					<div class="inline-flex items-center text-grey">
						<Icon src={Folder} size="20px" />
						<Icon src={Hashtag} size="20px" />
						<Icon src={Link} size="20px" />
						<Icon src={MenuAlt1} size="20px" />
						<Icon src={Pencil} size="20px" />
					</div>

					<a
						href="mailto:mlhoutel@gmail.com.com?subject={subject}&body={body}"
						class="inline-flex bg-grey text-white text-lg font-semibold px-3 py-0.5 rounded-md items-center"
					>
						<Icon src={Mail} size="25px" class="mr-1" />
						<div>Send</div>
					</a>
				</div>
			</FalseWindow>
		</div>
	</div>
</section>
