<template>
<select name="">
	<option @click="input(index)" v-for="(option, index) in options" :key="index" :selected="value === option.value">{{ option.key }}</option>
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
			this.$emit('click', { event: e, data: this.value})
		},
		input (e) {
			this.$emit('input', e)
		}
	}
}
</script>
