import Button from './Button.vue'
import DefaultButton from './DefaultButton.vue'

export default function (Vue, options) {
  Vue.component('Button', Button)
  Vue.component('default-button', DefaultButton)
}
