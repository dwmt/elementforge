<template>
	<component
		:is="renderableComponent"
		:text="text"
		:properties="properties"
		:modifiers="modifiers"
		:name="name"
		:isValid="isValid"
		:errors="errors"
		:data="data"
		:darkMode="darkModeState"
		:disabled="disabledComputed"

		:isLoading="isLoading"

		@click="click"
	/>
</template>
<script>
import ContainerComponent from '../ContainerComponent.vue'

const Loader = require('@dwmt/loader/lib/Loader')

export default {
	name: 'Button',
	extends: ContainerComponent,
	data () {
		return {
			component: 'Button',
			defaultComponent: 'default-button',
			loader: null,
			isLoading: false,
			disabledInherit: null
		}
	},
	inject: {
		form: { default: null }
	},
	props: {
		type: {
			type: String,
			required: false,
			default: 'default'
		},
		text: {
			type: String,
			required: true
		},
		data: {
			type: Object
		},
		disabled: {
			type: Boolean,
			required: false,
			default: false
		},
		formInstance: {
			type: Object,
			default () {
				return this.form
			}
		}
	},
	computed: {
		disabledComputed () {
			if (this.disabledInherit === null || this.type !== 'submit') {
				return this.disabled
			}
			return this.disabledInherit
		}
	},
	methods: {
		click (payload) {
			if (this.isLoading || this.disabledComputed) {
				return
			}
			if (this.type === 'submit' && this.formInstance !== null && !this.formInstance.validateForm()) {
				return
			}
			this.$emit('click', payload)
		}
	},
	watch: {
		formInstance () {
			if (this.formInstance) {
				this.formInstance.watchSubmit(this.name || Math.random(), (disabled) => {
					this.disabledInherit = disabled
				})
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
