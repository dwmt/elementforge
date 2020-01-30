let props = {
	required: {
		default: false
	},
	disabled: {
		default: false
	},
	editable: {
		default: true
	},
	min: {
		type: Number,
		default: 0
	},
	max: {
		type: Number
	},
	label: {
		type: String
	}
}

let container = {
	...props,
	value: {
		type: Array,
		default: () => []
	}
}

let renderable = {
	...props,
	value: {
		type: String,
		default: ''
	},
	tags: {
		type: Array
	}
}

export default {
	container: Object.assign({}, container),
	renderable: Object.assign({}, renderable)
}
