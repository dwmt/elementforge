<template>
<textarea
	:value="modelValue"
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
import Props from '../../props/index.js'
import RenderableComponent from "../RenderableComponent.vue";

export default {
	name: 'DefaultTextarea',
	extends: RenderableComponent,
	props: Props.Textarea.renderable,
	methods: {
		click (e) {
			if (this.disabled) {
				return
			}
			this.$emit('click', { event: e, data: this.modelValue })
		},
		input (e) {
			this.$emit('update:modelValue', e.target.value )
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
