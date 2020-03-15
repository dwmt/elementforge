<template lang="pug">
	component(
		:is="renderableComponent"
		:properties="properties"
		:modifiers="modifiers"

		:value="value"
		:totalPages="totalPages"

		@input="input"
	)
</template>

<script>
import ElementForgeTheme from '@dwmt/elementforge-theme'
import ContainerComponent from '../ContainerComponent.vue'

export default {
	name: 'Paginator',
	extends: ContainerComponent,
	props: ElementForgeTheme.props.Paginator.container,
	data () {
		return {
			component: 'Paginator',
			defaultComponent: 'default-paginator'
		}
	},
	methods: {
		input (e) {
			this.$emit('input', e)
		}
	}
}
</script>
