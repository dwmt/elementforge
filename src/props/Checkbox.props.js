const props = {
	label: {
		type: String
	},
	disabled: {
		type: Boolean,
		default: false
	},
	readonly: {
		default: false
	},
}

const container = {
	...props,
	data: {
		type: Object
	},
	trueValue: {
		default: true
	},
	falseValue: {
		default: false
	},
	value: {}
}

const renderable = {
	...props,
	checked: {
		type: Boolean,
		default: false
	},
	isLoading: {
		default: null
	},
	data: {}
}

export default {
	container,
	renderable
}
