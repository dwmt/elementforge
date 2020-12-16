<template>
<component
	:is="renderableComponent"
	:properties="properties"
	:modifiers="modifiers"
	:name="name"
	:darkMode="darkModeState"

	:value="value"
	:animated="animated"
	:min="min"
	:max="max"
	:step="step"

	v-on="inputListeners"
/>
</template>
<script>
import Props from '../../props/index.js'
import ContainerComponent from '../ContainerComponent.vue'

export default {
	name: 'Slider',
	extends: ContainerComponent,
	props: Props.Slider.container,
	data () {
		return {
			component: 'Slider',
			defaultComponent: 'default-slider'
		}
	},
	computed: {
		inputListeners: function () {
			var vm = this
			return Object.assign({},
				this.$listeners,
				{
					input: function (event) {
						vm.$emit('input', event)
					},
					click: function (event) {
						vm.$emit('click', event)
					},
					dragstart: function (event) {
						vm.$emit('dragstart', event)
					},
					dragend: function (event) {
						vm.$emit('dragend', event)
					}
				}
			)
		},
	}
}
</script>
