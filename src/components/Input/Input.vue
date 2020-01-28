<template lang="pug">
	component(
		:is="renderableComponent"

		:darkMode="darkMode"
		:errors="errors"
		:name="name"
		:isValid="isValid"
		:modifiers="modifiers"
		:properties="properties"
		:type="type"

		:label="label"
		:value="value"
		@input="input"
		@click="click"
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
		value: {},
		type: {}
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
		},
		click () {
			this.$emit('click')
		}
	}
}
</script>
