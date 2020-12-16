<template lang="pug">
component(
	:is="renderableComponent"
	:value="value"
	:label="label"
	:properties="properties"
	:modifiers="modifiers",

	@click="click"
)
</template>

<script>
import Props from '../../props/index.js'
import ContainerComponent from '../ContainerComponent.vue'

export default {
	name: 'Label',
	extends: ContainerComponent,
	props: Props.Label.container,
	data () {
		return {
			component: 'Label',
			defaultComponent: 'default-label'
		}
	},
	methods: {
		click () {
			this.$emit('click')
		}
	}
}
</script>
