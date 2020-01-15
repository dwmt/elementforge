<template lang="pug">
	component(
		:is="renderableComponent"

		:darkMode="darkMode"
		:errors="errors"
		:name="name"
		:isValid="isValid"
		:modifiers="modifiers"
		:properties="properties"
		
		:label="label"
		:value="value"
		@input="input"
	)
</template>

<script>
import ContainerComponent from '../ContainerComponent.vue'
export default {
	name: 'Input',
	extends: ContainerComponent,
	props: {
		label: {
			type: String,
			default: ''
		},
		value: {}
	},
	data () {
		return {
			component: 'Input',
			defaultComponent: 'default-input'
		}
	},
	methods: {
		input (e) {
			this.$emit('input', e)
		}
	}
}
</script>
