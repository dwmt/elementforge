export default {
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
	},

	modal: {
		type: Boolean,
		default: false
	}
}
