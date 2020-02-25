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
import ElementForgeTheme from '@dwmt/elementforge-theme'
import ContainerComponent from '../ContainerComponent.vue'

export default {
	name: 'Progress',
	extends: ContainerComponent,
	props: ElementForgeTheme.props.Progress.container,
	data () {
		return {
			component: 'Progress',
			defaultComponent: 'default-progress'
		}
	}
}
</script>
