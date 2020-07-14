const props = {
	value: {},
	options: {
		type: Array,
		default: () => []
	},
	required: {
		default: false
	},
	label: {},
	disabled: {
		default: false,
		type: Boolean
	}
}

const container = {
	localisation: {
		type: Boolean,
		default: false
	},
	...props
}

const renderable = {
	...props,
	toggled: {
		type: Boolean,
		default: false
	}
}

export default {
	container,
	renderable
}
