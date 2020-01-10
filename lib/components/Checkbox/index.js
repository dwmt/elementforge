import Checkbox from './Checkbox.vue'
import DefaultCheckbox from './DefaultCheckbox.vue'

module.exports = function (Vue, options) {
	Vue.component('Checkbox', Checkbox)
	Vue.component('DefaultCheckbox', DefaultCheckbox)
}
