const props = {
	value: {
		type: String
	},
	required: {
		default: false
	},
	minlength: {
		default: 0
	},
	placeholder: {},
	maxlength: {},
	label: {},
	disabled: {
		default: false,
		type: Boolean
	}
}

const container = {
	...props
}

const renderable = {
	isLoading: {},
	...props	
}

export default {
	container,
	renderable
}
