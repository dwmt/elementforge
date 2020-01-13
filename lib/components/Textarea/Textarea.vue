<template>
	<component
		:is="renderableComponent"
		:value="value"
		:required="required"
		:minlength="minlength"
		:maxlength="maxlength"
		:label="label"
		:placeholder="placeholder"
		:isValid="isValid"
		:errors="errors"
		:darkMode="darkModeState"

		:isLoading="isLoading"

		@click="click"
		@focus="focus"
		@blur="blur"
		@input="input"
		@keyup="keyup"
	/>
</template>

<script>
import ContainerComponent from '../ContainerComponent'

const Loader = require('@dwmt/loader/lib/Loader')

export default {
	name: 'Textarea',
	extends: ContainerComponent,
	data () {
		return {
			component: 'Textarea',
			defaultComponent: 'default-textarea',
			loader: null,
			isLoading: false
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
