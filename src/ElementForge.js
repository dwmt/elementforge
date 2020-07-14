import container from './Container.js'
import bus from './CommunicationBus.js'
import Theme from './Theme.js'

import RenderableComponent from "./components/RenderableComponent.vue";

import components from './components/index.js'
import props from './props/index.js'

let VueInst = null

export default {
	container,
	bus,
	Theme,
	RenderableComponent,
	components: props,
	install (Vue, options = {}) {
		components.install(Vue, options)
		VueInst = Vue
		if (options.darkMode) {
			this.setDarkMode(options.darkMode)
		}
		if (options.strict) {
			container.setStrictMode(options.strict)
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
	},
	setDefaultTheme (themeName) {
		container.setDefaultTheme(themeName)
	}
}
