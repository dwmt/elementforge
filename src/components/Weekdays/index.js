import Weekdays from './Weekdays.vue'
import DefaultWeekdays from './DefaultWeekdays.vue'

export default function (Vue) {
  Vue.component('Weekdays', Weekdays)
  Vue.component('default-weekdays', DefaultWeekdays)
}
