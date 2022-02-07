<template>
<component
	:is="renderableComponent"
	:properties="properties"
	:modifiers="modifiers"
	:darkMode="darkModeState"

	:name="name"
	:year="year"
	:month="month"
	:day="day"
	:needTime="type === 'datetime'"
	:hour="hour"
	:minute="minute"

	:selectedYear="selectedYear"
	:selectedMonth="selectedMonth"
	:selectedDay="selectedDay"
	:selectedHour="selectedHour"
	:selectedMinute="selectedMinute"
	:days="days"

	@previousYear="previousYear"
	@nextYear="nextYear"
	@selectYear="selectYear"

	@previousMonth="previousMonth"
	@nextMonth="nextMonth"
	@selectMonth="selectMonth"

	@previousDay="previousDay"
	@nextDay="nextDay"
	@selectDay="selectDay"

	@previousHour="previousHour"
	@nextHour="nextHour"
	@selectHour="selectHour"

	@previousMinute="previousMinute"
	@nextMinute="nextMinute"
	@selectMinute="selectMinute"
	@input="input"
	@close="close"

	:modal="modal"
	:toolbox="toolbox"
/>
</template>

<script>
import Props from '../../props/index.js'
import Events from '../../events/index.js'
import ContainerComponent from '../ContainerComponent.vue'

function daysInMonth (year, month) {
	return (new Date(year, month + 1, 0)).getUTCDate() + 1
}

const range = (start, end, length = end - start + 1) => Array.from({ length }, (_, i) => start + i)

export default {
	name: 'DateTimePicker',
	extends: ContainerComponent,
	data () {
		return {
			component: 'DateTimePicker',
			defaultComponent: 'default-datetimepicker',

			selectedYear: 0,
			selectedMonth: 0,
			selectedDay: 0,

			selectedHour: 0,
			selectedMinute: 0,

			toolbox: {
				daysInMonth
			}
		}
	},
	props: Props.DateTimePicker.container,
	emits: Events.DateTimePicker.container,
	watch: {
		modelValue () {
			this.selectedYear = this.year
			this.selectedMonth = this.month
			this.selectedDay = this.day
			this.selectedHour = this.hour
			this.selectedMinute = this.minute
		}
	},
	computed: {
		dateValue () {
			if (!this.modelValue) {
				return new Date(this.defaultDate)
			}
			return new Date(this.modelValue)
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
		hour () {
			return this.dateValue.getHours()
		},
		minute () {
			return this.dateValue.getMinutes()
		},
		days () {
			const days = daysInMonth(this.selectedYear, this.selectedMonth)
			return range(1, days)
		},
		selectedDate () {
			if(this.type === 'date') {
				return new Date(this.selectedYear, this.selectedMonth, this.selectedDay)
			}
			return new Date(this.selectedYear, this.selectedMonth, this.selectedDay, this.selectedHour, this.selectedMinute)
		},
		isValidDate () {
			let validMonth = true
			let validDay = true

			if (this.selectedMonth < 0 || this.selectedMonth > 11) {
				validMonth = false
			}

			const days = daysInMonth(this.selectedYear, this.selectedMonth)

			if (this.selectedDay < 0 || this.selectedDay > days) {
				validDay = false
			}

			return validMonth && validDay
		}
	},
	methods: {
		close (e) {
			this.$emit('close', e)
		},
		input () {
			if (this.returnDate) {
				this.$emit('update:modelValue', this.selectedDate)
				this.$emit('close')
				return
			}
			this.$emit('update:modelValue', this.selectedDate.getTime())
			this.$emit('close')
		},

		nextYear () {
			this.selectedYear += 1
		},
		previousYear () {
			this.selectedYear -= 1
		},
		selectYear (year) {
			this.selectedYear = year
		},

		nextMonth () {
			let selectedMonth = this.selectedMonth + 1
			if (selectedMonth > 11) {
				this.nextYear()
				selectedMonth = 0
			}
			this.selectedMonth = selectedMonth
		},
		previousMonth () {
			let selectedMonth = this.selectedMonth - 1
			if (selectedMonth < 0) {
				this.previousYear()
				selectedMonth = 11
			}
			this.selectedMonth = selectedMonth
		},
		selectMonth (month) {
			let selectedMonth = month
			if (month > 11 || month < 0) {
				selectedMonth = 0
				return
			}
			this.selectedMonth = selectedMonth
		},

		previousDay () {
			let selectedDay = this.selectedDay - 1
			if (selectedDay < 0) {
				this.previousMonth()
				selectedDay = daysInMonth(this.selectedYear, this.selectedMonth)
			}
			this.selectedDay = selectedDay
			if (this.type === 'date' && this.isValidDate) {
				this.input()
			}
		},
		nextDay () {
			let selectedDay = this.selectedDay + 1
			const days = daysInMonth(this.selectedYear, this.selectedMonth)
			if (selectedDay > days) {
				this.nextMonth()
				selectedDay = 0
			}
			this.selectedDay = selectedDay
			if (this.type === 'date' && this.isValidDate) {
				this.input()
			}
		},
		selectDay (day) {
			let selectedDay = day
			const days = daysInMonth(this.selectedYear, this.selectedMonth)
			if (day < 0 || day > days) {
				selectedDay = 0
			}
			this.selectedDay = selectedDay
			if (this.emitOnSelect && this.type === 'date' && this.isValidDate) {
				this.input()
			}
		},

		previousHour () {
			let selectedHour = this.selectedHour - 1
			if (selectedHour < 0) selectedHour = 23
			this.selectedHour = selectedHour
			if (this.emitOnSelect && this.type === 'datetime' && this.isValidDate) {
				this.input()
			}
		},
		nextHour () {
			let selectedHour = this.selectedHour + 1
			if (selectedHour > 23) selectedHour = 0
			this.selectedHour = selectedHour
			if (this.emitOnSelect && this.type === 'datetime' && this.isValidDate) {
				this.input()
			}
		},
		selectHour (hour) {
			this.selectedHour = (hour < 0 || hour > 23) ? 0 : hour
			if (this.emitOnSelect && this.type === 'datetime' && this.isValidDate) {
				this.input()
			}
		},

		previousMinute () {
			let selectedMinute = this.selectedMinute - 1
			if (selectedMinute < 0) selectedMinute = 59
			this.selectedMinute = selectedMinute
			if (this.emitOnSelect && this.type === 'datetime' && this.isValidDate) {
				this.input()
			}
		},
		nextMinute () {
			let selectedMinute = this.selectedMinute + 1
			if (selectedMinute > 59) selectedMinute = 0
			this.selectedMinute = selectedMinute
			if (this.emitOnSelect && this.type === 'datetime' && this.isValidDate) {
				this.input()
			}
		},
		selectMinute (minute) {
			this.selectedMinute = (minute < 0 || minute > 59) ? 0 : minute
			if (this.emitOnSelect && this.type === 'datetime' && this.isValidDate) {
				this.input()
			}
		}
	},
	mounted () {
		if (this.type !== 'date' && this.type !== 'datetime') {
			throw new Error(`[ElementForge][DateTimePicker][${this.theme}]${this.type} type is not supported`)
		}
		console.log('DateTimePicker', this.hour, this.minute)
		this.selectedYear = this.year
		this.selectedMonth = this.month
		this.selectedDay = this.day
		this.selectedHour = this.hour
		this.selectedMinute = this.minute
	}
}
</script>
