import Textarea from './Textarea.vue'
import DefaultTextarea from './DefaultTextarea.vue'

export default function (Vue, options) {
	Vue.component('Textarea', Textarea)
	Vue.component('default-textarea', DefaultTextarea)
}
