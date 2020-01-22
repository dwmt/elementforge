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
		}
	},
	props: {
		text: {
			type: String,
			default: ''
		},
		data: {
			type: Object
		}
	},
	methods: {
		click (payload) {
			if (this.isLoading || this.disabled) {
				return
			}
			this.$emit('click', payload)
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
