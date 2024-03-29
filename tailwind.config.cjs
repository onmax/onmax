const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				'sans': ['Merriweather', ...defaultTheme.fontFamily.sans],
				'serif': ['Work Sans', ...defaultTheme.fontFamily.serif],
			},
			colors: {
				'black': '#111414',
				'white': '#efefef',
				'primary': '#deded9',
			}
		},
	},
	plugins: [],
}
