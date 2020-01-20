<template>
	<component
		:is="renderableComponent"
		:properties="properties"
		:modifiers="modifiers"
		:name="name"
		:darkMode="darkModeState"
		:label="label"
		:value="value"
		:showPercentage="showPercentage"
	/>
</template>
<script>
import ContainerComponent from '../ContainerComponent.vue'

export default {
	name: 'Progress',
	extends: ContainerComponent,
	data () {
		return {
			component: 'Progress',
			defaultComponent: 'default-progress'
		}
	},
	props: {
		value: {
			type: Number
		},
		label: {
			type: String,
			required: false
		},
		showPercentage: {
			type: Boolean,
			required: false,
			default: false
		}
	}
}
</script>
