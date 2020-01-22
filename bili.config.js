/** @type {import('bili').Config} */
module.exports = {
	input: 'src/ElementForge.js',
	output: {
		extractCSS: false,
		format: 'esm'
	},
	plugins: {
		vue: true
	}
}
