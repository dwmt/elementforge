<template>
	<component
		:is="renderableComponent"

		:options="options"
		:required="required"
	/>
</template>

<script>
import ContainerComponent from '../ContainerComponent'

const Loader = require('@dwmt/loader/lib/Loader')

export default {
	name: 'Select',
	extends: ContainerComponent,
	props: {
		options: {
			required: true
		},
		required: {
			default: false
		},
		placeholder: {},
		value: {},
		label: {}
	},
	methods: {
		click () {},
		input () {},
		focus () {},
		blur () {},
		keyup () {}
	}
}
</script>

<style>

</style>
