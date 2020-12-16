import Input from './Input.vue'
import DefaultInput from './DefaultInput.vue'

export default function (Vue, options) {
  Vue.component('Input', Input)
  Vue.component('default-input', DefaultInput)
}
