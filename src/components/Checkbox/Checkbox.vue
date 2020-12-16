<template>
<component
	:is="renderableComponent"
	:label="label"
	:properties="properties"
	:modifiers="modifiers"
	:name="name"
	:isValid="isValid"
	:errors="errors"
	:data="data"
	:readonly="readonly"
	:checked="checked"
	:disabled="disabled"

	:isLoading="isLoading"

	@click="click"
	@input="input"
/>
</template>

<script>
import Props from '../../props/index.js'
import ContainerComponent from '../ContainerComponent.vue'

const Loader = require('@dwmt/loader/lib/Loader')

export default {
	name: 'Checkbox',
	extends: ContainerComponent,
	data () {
		return {
			component: 'Checkbox',
			defaultComponent: 'default-checkbox',
			loader: null,
			isLoading: false
		}
	},
	props: Props.Checkbox.container,
	computed: {
		checked () {
			return this.value === this.trueValue
		}
	},
	methods: {
		click (payload) {
			this.$emit('click', payload)
		},
		input (payload) {
			if (!payload) {
				this.$emit('input', this.falseValue)
			} else {
				this.$emit('input', this.trueValue)
			}
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
