<template>
	<component
		:is="renderableComponent"

		:options="options"
		:required="required"
		:placeholder="placeholder"
		:value="value"
		:label="label"

		@click="click"
		@input="input"
		@focus="focus"
		@blur="blur"
		@keyup="keyup"
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
	data () {
		return {
			component: 'Select',
			defaultComponent: 'default-select',
			loader: null,
			isLoading: false
		}
	},
	methods: {
		click (payload) {
			this.$emit('click', payload)
		},
		input (payload) {
			this.$emit('input', payload)
		},
		focus (payload) {
			this.$emit('focus', payload)
		},
		blur (payload) {
			this.$emit('blur', payload)
		},
		keyup (payload) {
			this.$emit('keyup', payload)
		}
	},
	beforeMount () {
		this.loader = new Loader({
			onActivation: () => {
				this.isLoading = true
			},
			onTermination: () => {
				this.isLoading = false
			}
		})
	}
}
</script>

<style>

</style>
