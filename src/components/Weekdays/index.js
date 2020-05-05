import Weekdays from './Weekdays.vue'
import DefaultWeekdays from './DefaultWeekdays.vue'

export default function (Vue, options) {
	Vue.component('Weekdays', Weekdays)
	Vue.component('default-weekdays', DefaultWeekdays)
}
