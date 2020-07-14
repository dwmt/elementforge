const props = {
	modal: {
		type: Boolean,
		default: false
	}
}

const container = {
	...props,
	value: {},
	type: {
		type: String,
		default: 'date'
	},
	returnDate: {
		type: Boolean,
		default: false
	},
	defaultDate: {
		default: () => new Date()
	}
}

const renderable = {
	...props,
	toolbox: {
		type: Object,
		default: () => {}
	},

	year: {
		type: Number
	},
	month: {
		type: Number
	},
	day: {
		type: Number
	},

	needTime: {
		type: Boolean,
		default: false
	},
	hour: {
		type: Number
	},
	minute: {
		type: Number
	},

	selectedYear: {
		type: Number
	},
	selectedMonth: {
		type: Number
	},
	selectedDay: {
		type: Number
	},
	selectedHour: {
		type: Number
	},
	selectedMinute: {
		type: Number
	},
	days: {
		type: Array,
	}
}

export default {
	container,
	renderable
}
