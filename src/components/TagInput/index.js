import TagInput from './TagInput.vue'
import DefaultTagInput from './DefaultTagInput.vue'

export default function (Vue, options) {
	Vue.component('TagInput', TagInput)
	Vue.component('default-taginput', DefaultTagInput)
}
