<template>
	<component
		:is="renderableComponent"

		:darkMode="darkModeState"
		:errors="errors"
		:name="name"
		:isValid="isValid"
		:modifiers="modifiers"
		:properties="properties"

		:value="value"
		:required="required"
		:minlength="minlength"
		:maxlength="maxlength"
		:label="label"
		:placeholder="placeholder"

		@click="click"
		@focus="focus"
		@blur="blur"
		@input="input"
		@keyup="keyup"
	/>
</template>

<script>
import ContainerComponent from '../ContainerComponent.vue'

export default {
	name: 'Textarea',
	extends: ContainerComponent,
	data () {
		return {
			component: 'Textarea',
			defaultComponent: 'default-textarea',
		}
	},
	props: {
		value: {
			type: String
		},
		required: {
			default: false
		},
		minlength: {
			default: 0
		},
		placeholder: {},
		maxlength: {},
		label: {}
	},
	methods: {
		click () {},
		focus () {},
		blur () {},
		input (payload) {
			this.$emit('input', payload)
		},
		keyup () {}
	}

}
</script>

<style>

</style>
