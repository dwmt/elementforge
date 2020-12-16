import Progress from './Progress.vue'
import DefaultProgress from './DefaultProgress.vue'

export default function (Vue, options) {
  Vue.component('Progress', Progress)
  Vue.component('default-progress', DefaultProgress)
}
