import DateTime from './DateTime.vue'
import DefaultDateTime from './DefaultDateTime.vue'

export default function (Vue, options) {
	Vue.component('DateTime', DateTime)
	Vue.component('default-datetime', DefaultDateTime)
}
