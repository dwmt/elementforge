import InputGroup from './InputGroup'
import DefaultInputGroup from './DefaultInputGroup'

export default function (Vue, options) {
	Vue.component('InputGroup', InputGroup)
	Vue.component('default-input-group', DefaultInputGroup)
}
