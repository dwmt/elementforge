import Label from './Label.vue'
import DefaultLabel from './DefaultLabel.vue'

export default function (Vue, options) {
  Vue.component('Label', Label)
  Vue.component('default-label', DefaultLabel)
}
