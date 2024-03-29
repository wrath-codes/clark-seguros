module.exports = {
	content: [
		'./src/**/*.{js,jsx,ts,tsx}',
		'./src/styles/**/*.css',
		'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
	],
	daisyui: {
		themes: [
			{
				clarkTheme: {
					primary: '#51A8B1',
					secondary: '#007CBA',
					accent: '#dfa8ff',
					neutral: '#374151',
					'base-100': '#f5f5f4',
					info: '#67e8f9',
					success: '#4CEB9E',
					warning: '#fde047',
					error: '#F75755'
				}
			}
		]
	},
	theme: {
		extend: {}
	},
	// add daisyUI plugin
	plugins: [
		require('@tailwindcss/typography'),
		require('flowbite/plugin'),
		require('daisyui')
	]
}
