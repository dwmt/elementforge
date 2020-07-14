<template>
	<select name="" @input="input">
		<option v-for="(option, index) in options" :key=index :selected="value === option.value">{{ option.value }}</option>
	</select>
</template>

<script>

import RenderableComponent from "../RenderableComponent.vue";
import Props from '../../props/index.js'

export default {
	name: 'DefaultSelect',
	extends: RenderableComponent,
	props: Props.Select.renderable,
	methods: {
		click (e) {
			if (this.disabled) {
				return
			}
			this.$emit('click', { event: e, data: this.value})
		},
		input (e) {
			this.$emit('input', e.target.value)
		}
	}
}
</script>
