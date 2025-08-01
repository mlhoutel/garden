const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				sans: ['"Open Sans"', 'sans-serif'],
				serif: ['Vollkorn', 'serif'],
				mono: ['Inconsolata', 'monospace']
			},
			backgroundImage: {
				mountain: `url(./images/compressed_mountain.jpg)`
			},
			screens: {
				sm: '480px',
				md: '768px',
				lg: '976px',
				xl: '1440px'
			},
			colors: {
				/* DARKS PALETTE */
				black: '#1F272D',
				grey: '#223344',
				darker: '#1E2722',
				dark: '#282c34',
				light: '#3F434C',
				lighter: '#3F434C',
				white: '#F4F0EB',

				/* COLORS PALETTE */
				orange: '#FFB528',
				beige: '#faf8f0',
				brown: '#c6ac8f',
				blue: '#7fb4e0',
				marine: '#124559',

				/* PASTEL PALETTE */
				pink: '#ffb3ba',
				sand: '#ffdfba',
				yellow: '#ffffba',
				green: '#baffc9',
				ocean: '#bae1ff',
				violet: '#cc9af4'
			},
			transitionProperty: {
				padding: 'padding',
				margin: 'margin'
			}
		}
	},
	plugins: [require('@tailwindcss/typography')]
};

module.exports = config;
