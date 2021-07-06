const events = {
	close: {}
}
export default {
	container: {
		...events,
		'update:modelValue': {}
	},
	renderable: {
		...events,
		previousYear: {},
		nextYear: {},
		selectYear: {},
		previousMonth: {},
		nextMonth: {},
		selectMonth: {},
		selectDay: {},
		selectInterval: {}
	}
}
