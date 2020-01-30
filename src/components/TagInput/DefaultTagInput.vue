<template lang="pug">
.tag-input-container
	.tags
		.tag(v-for="(tag, key) in tags" :key="key")
			span.name {{ tag }}
			span.delete(@click="remove(tag)") x
	input(:value="value", @input="input", @keypress.enter="enter", @keyup.delete="backspace")
</template>

<script>
import RenderableComponent from '../RenderableComponent.vue'
import TagInputProps from './TagInput.props'

export default {
	name: 'DefaultTagInput',
	extends: RenderableComponent,
	props: TagInputProps.renderable,
	methods: {
		enter () {
			this.$emit('enter')
		},
		input (e) {
			this.$emit('input', e.target.value)
		},
		remove (tag) {
			this.$emit('remove', tag)
		},
		backspace (e) {
			this.$emit('backspace', e)
		}
	}
}
</script>

<style lang="stylus">
.tag-input-container
	display flex
	flex-direction row
	border 1px solid black
	.tags
		display flex
		flex-direction row
		.tag
			display flex
			justify-content center
			align-items center
			padding 0.1rem 0.3rem
			margin 0.1rem
			background #5c6bc0
			color #FFFFFF
			.delete
				padding-left 0.3rem
				cursor pointer
	input
		flex-grow 1
		padding 0.1rem 0rem
</style>
