const props = {
	value: {},
	label: {},
	data: {},
	disabled: {
		default: false,
		type: Boolean
	}
}

const container = {
	...props
}

const renderable = {
	...props,
	checked: {
		type: Boolean,
		default: false
	}
}

export default {
	container,
	renderable
}
