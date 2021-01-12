<template lang="pug">
.input-container
	.label {{ label }}
	input(:value="modelValue" @input="input" :type="type", :readonly="!editable")
</template>

<script>
import Props from '../../props/index.js'
import Events from '../../events/index.js'
import RenderableComponent from "../RenderableComponent.vue";

export default {
	name: 'DefaultInput',
	extends: RenderableComponent,
	props: Props.Input.renderable,
	emits: Events.Input.renderable,
	methods: {
		input(e) {
			this.$emit('update:modelValue', e.target.value)
		}
	}
}
</script>
