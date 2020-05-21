import Radio from './Radio.vue'
import DefaultRadio from './DefaultRadio.vue'

export default function (Vue, options) {
	Vue.component('Radio', Radio)
	Vue.component('default-radio', DefaultRadio)
}
