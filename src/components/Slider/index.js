import Slider from './Slider.vue'
import DefaultSlider from './DefaultSlider.vue'


export default function (Vue, options) {
	Vue.component('Slider', Slider)
	Vue.component('default-slider', DefaultSlider)
}
