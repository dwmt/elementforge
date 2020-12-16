import Select from './Select.vue'
import DefaultSelect from './DefaultSelect.vue'

export default function (Vue, options) {
  Vue.component('Select', Select)
  Vue.component('default-select', DefaultSelect)
}
