import Sorter from './Sorter.vue'
import DefaultSorter from './DefaultSorter.vue'

export default function (Vue, options) {
	Vue.component('Sorter', Sorter)
	Vue.component('default-sorter', DefaultSorter)
}
