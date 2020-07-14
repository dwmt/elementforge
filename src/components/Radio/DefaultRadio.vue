<template lang="pug">
label(:for="name")
	input(type="radio" :value="data" :checked="checked", @click="click", @input="input")
	span {{ label }}
</template>

<script>
import Props from '../../props/index.js'
import RenderableComponent from "../RenderableComponent.vue";

export default {
	name: 'DefaultRadio',
	extends: RenderableComponent,
	props: Props.Radio.renderable,
	methods: {
		click (e) {
			if (this.disabled) {
				return
			}
			this.$emit('click', { event: e, data: this.data, value: this.value})
		},
		input (e) {
			if (this.disabled) {
				return
			}
			this.$emit('input', e.target.value)
		}
	}
}
</script>
