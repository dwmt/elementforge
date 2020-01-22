<template>
	<textarea
		:value="value"
		:required="required"
		:placeholder="placeholder"
		:disabled="disabled"
		:minlength="minlength"
		:maxlength="maxlength"

		@click="click"
		@input="input"
		@focus="focus"
		@blur="blur"
		@keyup="keyup"
	/>
</template>

<script>
import RenderableComponent from '../RenderableComponent.vue'

export default {
	name: 'DefaultTextarea',
	extends: RenderableComponent,
	props: [
		'value',
		'label',
		'required',
		'placeholder',
		'disabled',
		'isLoading',
		'minlength',
		'maxlength'
	],
	methods: {
		click (e) {
			if (this.disabled) {
				return
			}
			this.$emit('click', { event: e, data: this.value })
		},
		input (e) {
			this.$emit('input', e.target.value )
		},
		focus (e) {
			this.$emit('focus', e)
		},
		blur (e) {
			this.$emit('blur', e)
		},
		keyup (e) {
			this.$emit('keyup', e)
		}
	}

}
</script>

<style>

</style>
