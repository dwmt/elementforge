import Theme from './theme/Theme.js'
import container from './Container'
import bus from './Bus'

import RenderableComponent from './components/RenderableComponent.vue'

import DateTimePickerProps from './components/DateTimePicker/DateTimePicker.props'
import DateTimeProps from './components/DateTime/DateTime.props'

import components from './components'

let VueInst = null

export default {
	container,
	bus,
	theme: {
		Theme,
		RenderableComponent,
		props: {
			DateTimePicker: DateTimePickerProps,
			DateTime: DateTimeProps
		}
	},
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
		bus.$emit('darkMode:change', state)
	},
	isDarkMode () {
		return container.getDarkMode()
	},
	getDarkMode (callback) {
		bus.$on('darkMode:change', callback)
		return container.getDarkMode()
	},
	setDefaultTheme (themeName) {
		container.setDefaultTheme(themeName)
	}
}
