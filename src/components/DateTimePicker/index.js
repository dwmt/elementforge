import DateTimePicker from './DateTimePicker.vue'
import DefaultDateTimePicker from './DefaultDateTimePicker.vue'

export default function (Vue, options) {
  Vue.component('DateTimePicker', DateTimePicker)
  Vue.component('default-datetimepicker', DefaultDateTimePicker)
}
