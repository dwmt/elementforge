import DateRangePicker from './DateRangePicker.vue'
import DefaultDateRangePicker from './DefaultDateRangePicker.vue'

export default function (Vue, options) {
  Vue.component('DateRangePicker', DateRangePicker)
  Vue.component('default-daterangepicker', DefaultDateRangePicker)
}
