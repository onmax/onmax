import plugin from 'tailwindcss/plugin';
import postcss from 'postcss';

const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
	corePlugins: {
		preflight: false,
	},
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				'sans': ['Inter', ...defaultTheme.fontFamily.sans],
				'serif': ['Merriweather', ...defaultTheme.fontFamily.serif],
				'mono': ['JetBrains Mono Variable', ...defaultTheme.fontFamily.mono],
			},
			boxShadow: {
				sm: 'var(--ds-shadow-border-small)',
			},
			colors: {
				'black': '#111414',
				'white': '#efefef',
				'primary': '#deded9',
				gray: {
					100: 'hsl(var(--color-gray-100) / <alpha-value>)',
					200: 'hsl(var(--color-gray-200) / <alpha-value>)',
					300: 'hsl(var(--color-gray-300) / <alpha-value>)',
					400: 'hsl(var(--color-gray-400) / <alpha-value>)',
					500: 'hsl(var(--color-gray-500) / <alpha-value>)',
					600: 'hsl(var(--color-gray-600) / <alpha-value>)',
					700: 'hsl(var(--color-gray-700) / <alpha-value>)',
					800: 'hsl(var(--color-gray-800) / <alpha-value>)',
					900: 'hsl(var(--color-gray-900) / <alpha-value>)',
					1000: 'hsl(var(--color-gray-1000) / <alpha-value>)',
					1100: 'hsl(var(--color-gray-1100) / <alpha-value>)',
					1200: 'hsl(var(--color-gray-1200) / <alpha-value>)',

					'alpha': {
						100: 'var(---color-gray-alpha-100)',
						200: 'var(---color-gray-alpha-200)',
						300: 'var(---color-gray-alpha-300)',
						400: 'var(---color-gray-alpha-400)',
						500: 'var(---color-gray-alpha-500)',
						600: 'var(---color-gray-alpha-600)',
						700: 'var(---color-gray-alpha-700)',
						800: 'var(---color-gray-alpha-800)',
						900: 'var(---color-gray-alpha-900)',
						1000: 'var(---color-gray-alpha-1000)',
						1100: 'var(---color-gray-alpha-1100)',
						1200: 'var(---color-gray-alpha-1200)',

					}
				}
			}
		},
	},
	plugins: [
		plugin(({ addComponents }) => addComponents({ '.main-container': { width: 'var(--container-width)' } })),
		plugin(function ({ addComponents }) {
			addComponents({
				'.hide-scrollbar': {
					'-ms-overflow-style': 'none',
					'scrollbar-width': 'none',
					'&::-webkit-scrollbar': { display: 'none' }
				},
			})
		}),
		plugin(({ addVariant, e }) => {
			addVariant('touch', ({ container, separator }) => {
				const touch = postcss.atRule({ name: 'media', params: '(hover: none)' })
				touch.append(container.nodes)
				container.append(touch)
				touch.walkRules(rule => rule.selector = `.${e(`touch${separator}${rule.selector.slice(1)}`)}`)
			})
		})



	],
}


// 	< !-- --color - gray - 100: #111110;
// --color - gray - 200: #191918;
// --color - gray - 300: #222221;
// --color - gray - 400: #2a2a28;
// --color - gray - 500: #31312e;
// --color - gray - 600: #3b3a37;
// --color - gray - 700: #494844;
// --color - gray - 800: #62605b;
// --color - gray - 900: #6f6d66;
// --color - gray - 1000: #7c7b74;
// --color - gray - 1100: #b5b3ad;
// --color - gray - 1200: #eeeeec;
// --color - gray - alpha - 100: #00000000;
// --color - gray - alpha - 200: #ffffff09;
// --color - gray - alpha - 300: #ffffff12;
// --color - gray - alpha - 400: #ffffff1b;
// --color - gray - alpha - 500: #ffffff22;
// --color - gray - alpha - 600: #ffffff2c;
// --color - gray - alpha - 700: #ffffff3b;
// --color - gray - alpha - 800: #ffffff55;
// --color - gray - alpha - 900: #ffffff64;
// --color - gray - alpha - 1000: #ffffff72;
// --color - gray - alpha - 1100: #ffffffaf;
// --color - gray - alpha - 1200: #ffffffed; -->


// --ds-inset-border: inset 0 0 0 1px rgba(0, 0, 0, .08);
// --ds-inset-border-light: inset 0 0 0 1px rgba(0, 0, 0, .08);
