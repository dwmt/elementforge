const props = {
  modal: {
    type: Boolean,
    default: false
  }
}

export default {
  container: {
		...props,
		modelValue: {},
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
		},
		pointOfTime: {
			type: String
		},
		min: {
			type: String
		},
		max: {
			type: String
		}
	},
  renderable: {
		...props,
		toolbox: {
			type: Object,
			default: () => { return {} }
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
			type: Array
		},
		min: {
			type: Date
		},
		max: {
			type: Date
		}
	}
}
