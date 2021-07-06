import DateRange from './DateRange.vue'
import DefaultDateRange from './DefaultDateRange.vue'

export default function (Vue, options) {
	Vue.component('DateRange', DateRange)
	Vue.component('default-daterange', DefaultDateRange)
}
