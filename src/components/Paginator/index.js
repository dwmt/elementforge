import Paginator from './Paginator.vue'
import DefaultPaginator from './DefaultPaginator.vue'

export default function (Vue, options) {
  Vue.component('Paginator', Paginator)
  Vue.component('default-paginator', DefaultPaginator)
}
