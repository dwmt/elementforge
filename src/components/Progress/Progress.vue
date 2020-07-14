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
		:animated="animated"
	/>
</template>
<script>
import Props from '../../props/index.js'
import ContainerComponent from '../ContainerComponent.vue'

export default {
	name: 'Progress',
	extends: ContainerComponent,
	props: Props.Progress.container,
	data () {
		return {
			component: 'Progress',
			defaultComponent: 'default-progress'
		}
	}
}
</script>
