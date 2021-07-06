const props = {
	modelValue: {},
	label: {
		default: '',
		type: String
	},
	required: {
		default: false,
		type: Boolean
	},
	disabled: {
		default: false,
		type: Boolean
	}
}

export default {

	container: {
		...props,
		format: {
			type: String
		}
	},

	renderable: {
		...props
	}
}
