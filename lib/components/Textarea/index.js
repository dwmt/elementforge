import Textarea from './Textarea.vue'
import DefaultTextarea from './DefaultTextarea.vue'

module.exports = function (Vue, options) {
	Vue.component('Textarea', Textarea)
	Vue.component('DefaultTextarea', DefaultTextarea)
}
