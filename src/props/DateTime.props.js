const props = {
	value: {},
	type: {
		type: String,
		default: 'date'
	},
	label: {
		type: String,
		default: ''
	},
	required: {
		default: false,
		type: Boolean
	},
	disabled: {
		default: false,
		type: Boolean
	},
}

const container = {
	...props,
	modal: {
		type: Boolean,
		default: false
	},
	returnDate: {
		type: Boolean,
		default: false
	},
	defaultDate: {
		default: () => new Date()
	},
	format: {
		type: String
	}
}

const renderable = {
	...props
}

export default {
	container,
	renderable
}
