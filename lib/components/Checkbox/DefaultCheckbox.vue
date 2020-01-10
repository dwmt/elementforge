<template>
	<input
		type="checkbox"
		:name="name"
		:disabled="disabled"
		:readonly="readonly"
		:checked="checked"
		@input="input"
		@click="click"
	/>
</template>

<script>
import RenderableComponent from '../RenderableComponent'

export default {
	name: 'DefaultCheckbox',
	extends: RenderableComponent,
	props: [
		'checked',
		'label',
		'disabled',
		'isLoading',
		'readonly'
	],
	methods: {
		click (e) {
			if (!this.isValid || this.disabled) {
					return
			}
			this.$emit('click', { event: e, data: this.data })
		},
		input (e) {
			this.$emit('input', e.target.checked)
		}
	}
}
</script>

<style>
</style>
