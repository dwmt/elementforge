<template>
<component
	:is="renderableComponent"
	:properties="properties"
	:modifiers="modifiers"
	:darkMode="darkModeState"

	:name="name"

	:selectedInterval="selectedInterval"

	:year="state.year"
	:month="state.month"
	:day="state.day"

	:days="days"

	@previousYear="previousYear"
	@nextYear="nextYear"
	@selectYear="selectYear"

	@previousMonth="previousMonth"
	@nextMonth="nextMonth"
	@selectMonth="selectMonth"

	@selectDay="selectDay"

	@selectInterval="selectInterval"

	@close="close"
/>
</template>

<script>
import Props from '../../props/index.js'
import Events from '../../events/index.js'
import ContainerComponent from '../ContainerComponent.vue'

import isEqual from 'lodash/isEqual'
import sortBy from 'lodash/sortBy'

function daysInMonth (year, month) {
	return (new Date(year, month + 1, 0)).getUTCDate() + 1
}

function compareStates (a, b) {
	return isEqual(a, sortBy([a, b], ['year', 'month', 'day']).reverse()[0])
}

const range = (start, end, length = end - start + 1) => Array.from({ length }, (_, i) => start + i)

const IntervalSelectionState = {
	'START': 0,
	'END': 1
}

export default {
	name: 'DateRangePicker',
	extends: ContainerComponent,
	props: Props.DateRangePicker.container,
	emits: Events.DateRangePicker.container,
	data () {
		return {
			component: 'DateRangePicker',
			defaultComponent: 'default-daterangepicker',
			state: {
				year: 0,
				month: 0,
				day: 0
			},
			selectionState: IntervalSelectionState.START,

			selectedInterval: {
				start: {
					year: 0,
					month: 0,
					day: 0
				},
				end: {
					year: 0,
					month: 0,
					day: 0
				}
			}
		}
	},
	computed: {
		dateValue () {
			const { start, end } = this.modelValue
			if (!start) return new Date()
			if (!end) return new Date(start)
			return new Date(end)
		},
		year () {
			return this.dateValue.getFullYear()
		},
		month () {
			return this.dateValue.getMonth()
		},
		day () {
			return this.dateValue.getDate()
		},
		days () {
			let date = new Date(this.state.year, this.state.month, 1)
			let startDay = date.getUTCDay()
			function createDates (year, month, day) {
				return {
					day: day,
					date: new Date(year, month, day)
				}
			}

			const daysInPrevMonth = daysInMonth(this.state.year, this.state.month - 1)
			const daysBefore = range(daysInPrevMonth - startDay + 1, daysInPrevMonth).map((day) => createDates(this.state.year, this.state.month - 1, day))
			const days = range(1, daysInMonth(this.state.year, this.state.month)).map((day) => createDates(this.state.year, this.state.month, day))
			// Number of days in a week minus the number of days from the current month on that week
			const daysAfter = range(1, 7 - (startDay + days.length) % 7 + 1 ).map((day) => createDates(this.state.year, this.state.month + 1, day))

			const rowsNeeded = Math.ceil((startDay + days.length) / 7)
			const allDays = [...daysBefore, ...days, ...daysAfter]

			let result = []
			for (let i = 0; i < rowsNeeded; i++) {
				let startIndex = i * 7
				let endIndex = startIndex + 7
				result.push([...allDays.slice(startIndex, endIndex)])
			}
			return result
		},
	},
	methods: {
		close (e) {
			this.$emit('close', e)
		},
		input () {
			const newInterval = {
				start: new Date(this.selectedInterval.start.year, this.selectedInterval.start.month, this.selectedInterval.start.day),
				end: new Date(this.selectedInterval.end.year, this.selectedInterval.end.month, this.selectedInterval.end.day)
			}
			this.$emit('update:modelValue', newInterval)
		},
		nextYear () {
			this.state.year += 1
		},
		previousYear () {
			this.state.year -= 1
		},
		nextMonth () {
			let selectedMonth = this.state.month + 1
			if (selectedMonth > 11) {
				this.nextYear()
				selectedMonth = 0
			}
			this.state.month = selectedMonth
		},
		previousMonth () {
			let selectedMonth = this.state.month - 1
			if (selectedMonth < 0) {
				this.previousYear()
				selectedMonth = 11
			}
			this.state.month = selectedMonth
		},
		selectInterval (dayCount) {
			const today = new Date()
			this.selectedInterval.end = {
				day: today.getDate(),
				month: today.getMonth(),
				year: today.getFullYear()
			}
			const start = new Date(today.valueOf() - 1000 * 60 * 60 * 24 * dayCount)
			this.selectedInterval.start = {
				day: start.getDate(),
				month: start.getMonth(),
				year: start.getFullYear()
			}
			this.input()
		},
		selectYear (payload) {
			this.state.year = payload
		},
		selectMonth (payload) {
			this.state.month = payload
		},
		selectDay (payload) {
			const state = {
				year: this.state.year,
				month: this.state.month,
				day: payload
			}

			if (this.selectionState === IntervalSelectionState.START) {
				this.selectedInterval.start = state
				this.selectedInterval.end = state
				this.selectionState = IntervalSelectionState.END
			} else {
				compareStates(state, this.selectedInterval.start) ? this.selectedInterval.end = state : this.selectedInterval.start = state
				this.selectionState = IntervalSelectionState.START
			}
			this.input()
		}
	},
	mounted () {
		this.state.year = this.year
		this.state.month = this.month
		this.state.day = this.day
		this.selectedInterval.start = {
			year: this.year,
			month: this.month,
			day: this.day
		}
		this.selectedInterval.end = {
			year: this.year,
			month: this.month,
			day: this.day
		}
	}
}
</script>
