import Button from './Button'
import Checkbox from './Checkbox'
import Textarea from './Textarea'
import Select from './Select'
import Label from './Label'
import Input from './Input'
import Progress from './Progress'
import Multiselect from './Multiselect'
import DateTimePicker from './DateTimePicker'
import DateTime from './DateTime'
import TagInput from './TagInput'
import Form from './Form'
import Paginator from './Paginator'

let components = {
	'Button': Button,
	'Checkbox': Checkbox,
	'Textarea': Textarea,
	'Select': Select,
	'Label': Label,
	'Input': Input,
	'Progress': Progress,
	'Multiselect': Multiselect,
	'DateTimePicker': DateTimePicker,
	'DateTime': DateTime,
	'TagInput': TagInput,
	'Form': Form,
	'Paginator': Paginator
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
