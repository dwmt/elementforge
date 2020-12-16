import Autocomplete from './Autocomplete.vue'
import DefaultAutocomplete from './DefaultAutocomplete.vue'

export default function (Vue, options) {
  Vue.component('Autocomplete', Autocomplete)
  Vue.component('default-autocomplete', DefaultAutocomplete)
}
