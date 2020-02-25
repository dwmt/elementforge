<template lang="pug">
.input-container
	.label {{ label }}
	input(:value="value" @input="input" :type="type", :readonly="!editable")
</template>

<script>
import ElementForgeTheme from '@dwmt/elementforge-theme'

export default {
	name: 'DefaultInput',
	extends: ElementForgeTheme.RenderableComponent,
	props: ElementForgeTheme.props.Input.renderable,
	methods: {
		input(e) {
			this.$emit('input', e.target.value)
		}
	}
}
</script>
