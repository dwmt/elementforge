import Input from './Input'

let components = {
	'Input': Input
}

module.exports = {
	install: function (Vue, options) {
		const disabled = options.disabled || []
		const enabled = options.enabled || false
		if (enabled) {
			enabled.forEach(component => {
				if (!disabled.includes(component)) {
					components[component](Vue, options)
				}
			})
			return;
		}
		Object.keys(components).forEach(componentName => {
			if (!disabled.includes(componentName)) {
				components[componentName](Vue, options)
			}
		})
	}
}
