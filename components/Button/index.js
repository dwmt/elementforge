import Button from './Button.vue'
import DefaultButton from './DefaultButton.vue'


module.exports = function (Vue, options) {
	Vue.component('Button', Button)
	Vue.component('default-button', DefaultButton)

}
