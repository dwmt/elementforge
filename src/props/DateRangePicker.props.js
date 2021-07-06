const props = {

}

const renderable = {
	...props,
	year: {
		type: Number
	},
	month: {
		type: Number
	},
	day: {
		type: Number
	},
	selectedInterval: {},
	days: {}
}

const container = {
	...props,
	modelValue: {}
}


export default {
	renderable,
	container
}
