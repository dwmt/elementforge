const props = {
	value: {
		type: Number
	},
	totalPages: {
		type: Number,
		required: true
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
