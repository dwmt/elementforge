import Checkbox from './Checkbox.vue'
import DefaultCheckbox from './DefaultCheckbox.vue'

export default function (Vue, options) {
	Vue.component('Checkbox', Checkbox)
	Vue.component('default-checkbox', DefaultCheckbox)
}
