const ComponentThemeContainer = require('./lib/theme/ComponentThemeContainer')
const container = new ComponentThemeContainer()

const components = require('./components')

let VueInst = null

const ElementForge = {
	container,
	install (Vue, options) {
		components.install(Vue, options)
		VueInst = Vue
		if (options.defaultTheme) {
			container.setDefaultTheme(options.defaultTheme)
		}
	},
	use (theme) {
		if (!VueInst) {
			throw new Error('ElementForge must be installed first!')
		}
		theme.install(container, VueInst)
	}
}

module.exports = ElementForge
