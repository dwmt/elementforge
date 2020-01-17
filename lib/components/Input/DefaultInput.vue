<template lang="pug">
.input-container
	.label {{ label }}
	input(:value="value" @input="input" :type="type")
</template>

<script>
import RenderableComponent from '../RenderableComponent'
export default {
	name: 'DefaultInput',
	extends: RenderableComponent,
	props: {
		value: {},
		label: {},
		type: {}
	},
	methods: {
		input(e) {
			this.$emit('input', e.target.value)
		}
	}
}
</script>
