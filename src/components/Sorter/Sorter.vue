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
import Props from '../../props/index.js'
import ContainerComponent from '../ContainerComponent.vue'

let stateMatrix = {
	'0': 1,
	'1': -1,
	'-1': 0
}

export default {
	name: 'Sorter',
	extends: ContainerComponent,
	props: Props.Sorter.container,
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
