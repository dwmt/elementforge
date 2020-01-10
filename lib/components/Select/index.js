import Select from './Select'
import DefaultSelect from './DefaultSelect'

export default function (Vue, options) {
	Vue.component('Select', Select)
	Vue.component('default-select', DefaultSelect)
}
