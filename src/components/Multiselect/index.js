import Multiselect from './Multiselect.vue'
import DefaultMultiselect from './DefaultMultiselect.vue'

export default function (Vue, options) {
  Vue.component('Multiselect', Multiselect)
  Vue.component('default-multiselect', DefaultMultiselect)
}
