<template>
	<component
		:is="renderableComponent"
		:text="text"
		:properties="properties"
		:modifier="modifier"
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
import RenderableComponent from '../RenderableComponent'

const Loader = require('@dwmt/loader/lib/Loader')

export default {
	name: 'Button',
	extends: RenderableComponent,
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
			required: true
		},
		data: {
			type: Object
		}
	},
	methods: {
		click (payload) {
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
