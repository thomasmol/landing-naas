/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {},
    container: {
      center: true,
      padding: '2rem',
      screens: {
        sm: '600px',
        md: '728px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1280px',
      },
    }
	},
	plugins: []
};
