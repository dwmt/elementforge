<template>
	<component
		:is="renderableComponent"
		:properties="properties"
		:modifiers="modifiers"
		:name="name"
		:darkMode="darkModeState"
		:label="label"
		:showPercentage="showPercentage"
	/>
</template>

<script>
import ContainerComponent from '../ContainerComponent.vue'

export default {
	name: 'InputGroup',
	extends: ContainerComponent,
	props: {
		label: {
			required: false,
			type: String
		}
	}
}
</script>

<style>

</style>
