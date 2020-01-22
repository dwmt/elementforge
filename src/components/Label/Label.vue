<template lang="pug">
	component(
		:is="renderableComponent"
		:value="value"
		:label="label"
		:properties="properties"
		:modifiers="modifiers"
	)
</template>

<script>
import ContainerComponent from '../ContainerComponent.vue'

export default {
	name: 'Label',
	extends: ContainerComponent,
	props: {
		value: {
			type: String,
			default: ''
		},
		label: {
			type: String
		}
	},
	data () {
		return {
			component: 'Label',
			defaultComponent: 'default-label'
		}
	}
}
</script>
