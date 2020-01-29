<template lang="pug">
.input-container
	.label {{ label }}
	input(:value="value" @input="input" :type="type", :readonly="!editable")
</template>

<script>
import RenderableComponent from '../RenderableComponent.vue'
export default {
	name: 'DefaultInput',
	extends: RenderableComponent,
	props: {
		value: {},
		label: {},
		type: {},
		editable: {}
	},
	methods: {
		input(e) {
			this.$emit('input', e.target.value)
		}
	}
}
</script>
