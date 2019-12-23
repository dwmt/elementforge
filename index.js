const ComponentThemeContainer = require('./lib/theme/ComponentThemeContainer')

const container = new ComponentThemeContainer()

const ElementForge = {
	container,
	install (Vue, options) {
		// install all the components
	},
	use (theme) {
		// install theme into container...
	},
	registerTemplate () {}
}

module.exports = ElementForge
