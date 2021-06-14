module.exports = {
	mode: 'jit',
	purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			backgroundImage: (theme) => ({
				'main-bg': "url('/720498.svg')"
			})
		},
		backgroundPosition: {
			right2: 'center  right -30em'
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
};
