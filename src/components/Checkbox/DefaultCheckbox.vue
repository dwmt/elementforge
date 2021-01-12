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
import Props from '../../props/index.js'
import Events from '../../events/index.js'
import RenderableComponent from "../RenderableComponent.vue";

export default {
	name: 'DefaultCheckbox',
	extends: RenderableComponent,
	props: Props.Checkbox.renderable,
	emits: Events.Checkbox.renderable,
	methods: {
		click (e) {
			if (!this.isValid || this.disabled) {
					return
			}
			this.$emit('click', { event: e, data: this.data })
		},
		input (e) {
			this.$emit('update:modelValue', e.target.checked)
		}
	}
}
</script>
