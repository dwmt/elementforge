<template>
<select name="" @input="input">
	<option v-for="(option, index) in options" :key=index :selected="modelValue === option.value">{{ option.value }}</option>
</select>
</template>

<script>

import RenderableComponent from "../RenderableComponent.vue";
import Props from '../../props/index.js'
import Events from '../../events/index.js'

export default {
	name: 'DefaultSelect',
	extends: RenderableComponent,
	props: Props.Select.renderable,
	emits: Events.Select.renderable,
	methods: {
		click (e) {
			if (this.disabled) {
				return
			}
			this.$emit('click', { event: e, data: this.modelValue})
		},
		input (e) {
			this.$emit('update:modelValue', e.target.value)
		}
	}
}
</script>
