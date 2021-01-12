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
import Events from '../../events/index.js'
import ContainerComponent from '../ContainerComponent.vue'

export default {
	name: 'Slider',
	extends: ContainerComponent,
	props: Props.Slider.container,
	emits: Events.Slider.container,
	data () {
		return {
			component: 'Slider',
			defaultComponent: 'default-slider'
		}
	},
	computed: {
		inputListeners: function () {
			return {
				'update:modelValue': (event) => {
					this.$emit('update:modelValue', event)
				},
				click: (event) => {
					this.$emit('click', event)
				},
				dragstart: (event) => {
					this.$emit('dragstart', event)
				},
				dragend: (event) => {
					this.$emit('dragend', event)
				}
			}
		},
	}
}
</script>
