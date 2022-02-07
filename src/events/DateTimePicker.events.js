const events = {
	'update:modelValue': {},
	close: {}
}

const container = {
  ...events
}

const renderable = {
  ...events,
  previousYear: {},
  nextYear: {},
  selectYear: {},
  previousMonth: {},
  nextMonth: {},
  selectMonth: {},
  previousDay: {},
  nextDay: {},
  selectDay: {},
  previousHour: {},
  nextHour: {},
  selectHour: {},
  previousMinute: {},
  nextMinute: {},
  selectMinute: {},
  input: {}
}

export default {
  container,
  renderable
}
