const props = {
	value: {
		type: Number
	},
	label: {
		type: String,
		required: false
	},
	showPercentage: {
		type: Boolean,
		required: false,
		default: false
	},
	animated: {
		type: Boolean,
		required: false,
		default: false
	}
}

const container = {
	...props
}

const renderable = {
	...props
}

export default {
	container,
	renderable
}
