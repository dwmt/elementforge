<template lang="pug">
.range-container
	input(
		type="range"
		:name="name"
    :min="min"
		:max="max"
		:value="value"
		:step="step"
		@input="input"
	)
</template>
<script>
import Props from '../../props/index.js'
import Events from '../../events/index.js'
import RenderableComponent from "../RenderableComponent.vue";

export default {
	name: 'DefaultSlider',
	extends: RenderableComponent,
	props: Props.Slider.renderable,
	emits: Events.Slider.renderable,
	computed: {
		classes () {
			let classes = []
			if (this.modifiers.length) {
				classes = classes.concat(this.modifiers)
			}
			if (this.darkMode) {
				classes.push('darkMode')
			}
			return classes
		}
	},
	methods: {
		input (e) {
			const value = Number(e.target.value)
			this.$emit('input', value)
		}
	}
}
</script>
<style>

</style>
