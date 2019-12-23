const ComponentThemeContainer = require('./lib/theme/ComponentThemeContainer')
const container = new ComponentThemeContainer()

const components = require('./components')

const ElementForge = {
	container,
	install (Vue, options) {
		// install all the components
		components.install(Vue, options)
		if (options.defaultTheme) {
			container.setDefaultTheme(options.defaultTheme)
		}
	},
	use (theme) {
		// install theme into container...
		theme.install(container)
	}
}

module.exports = ElementForge
