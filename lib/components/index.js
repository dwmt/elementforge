import Button from './Button'
import Checkbox from './Checkbox'
import Textarea from './Textarea'
import Select from './Select'
import Label from './Label'

let components = {
	'Button': Button,
	'Checkbox': Checkbox,
	'Textarea': Textarea,
	'Select': Select,
	'Label': Label
}

export default {
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
