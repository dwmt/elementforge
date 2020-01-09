const ComponentThemeContainer = require('./lib/theme/ComponentThemeContainer')
const container = new ComponentThemeContainer()

const CommunicationBus = require('./lib/CommunicationBus')

const bus = new CommunicationBus()

const components = require('./components')

let VueInst = null

const ElementForge = {
	container,
	bus,
	install (Vue, options) {
		components.install(Vue, options)
		VueInst = Vue
		if (options.defaultTheme) {
			container.setDefaultTheme(options.defaultTheme)
		}
		if (options.darkMode) {
			this.setDarkMode(options.darkMode)
		}
	},
	use (theme) {
		if (!VueInst) {
			throw new Error('ElementForge must be installed first!')
		}
		theme.install(container, VueInst)
	},
	/**
	 * @event darkMode:change
	 * @param {*} state 
	 */
	setDarkMode(state = true) {
		container.setDarkMode(state)
		bus.emit('darkMode:change', state)
	},
	isDarkMode () {
		return container.getDarkMode()
	},
	getDarkMode (callback) {
		bus.on('darkMode:change', callback)
		return container.getDarkMode()
	}
}

module.exports = ElementForge
