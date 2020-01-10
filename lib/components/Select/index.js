import Select from './Select'
import DefaultSelect from './DefaultSelect'

module.exports = function (Vue, options) {
	Vue.component('Select', Select)
	Vue.component('DefaultSelect', DefaultSelect)
}
