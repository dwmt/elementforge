<template lang="pug">
	component(
		:is="renderableComponent"

		:darkMode="darkMode"
		:name="name"
		:modifiers="modifiers"
		:properties="properties"

		:value="value"
		:label="label"
		:disabled="disabled"

		@input="input"
	)
</template>

<script>
import ElementForgeTheme from '@dwmt/elementforge-theme'
import ContainerComponent from '../ContainerComponent.vue'

let stateMatrix = {
	'0': 1,
	'1': -1,
	'-1': 0
}

export default {
	name: 'Sorter',
	extends: ContainerComponent,
	props: ElementForgeTheme.props.Sorter.container,
	data () {
		return {
			component: 'Sorter',
			defaultComponent: 'default-sorter'
		}
	},
	computed: {
		nextState () {
			return stateMatrix[this.value.toString()]
		}
	},
	methods: {
		input () {
			this.$emit('input', this.nextState)
		}
	}
}
</script>
