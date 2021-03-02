<template lang="pug">
component(
	:is="renderableComponent"

	:darkMode="darkMode"
	:name="name"
	:modifiers="modifiers"
	:properties="properties"

	:value="modelValue"
	:label="label"
	:disabled="disabled"

	@input="input"
)
</template>

<script>
import Props from '../../props/index.js'
import ContainerComponent from '../ContainerComponent.vue'

const stateMatrix = {
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
			return stateMatrix[this.modelValue.toString()]
		}
	},
	methods: {
		input () {
			this.$emit('update:modelValue', this.nextState)
		}
	}
}
</script>
