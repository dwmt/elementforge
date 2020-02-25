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
import ElementForgeTheme from '@dwmt/elementforge-theme'
import ContainerComponent from '../ContainerComponent.vue'

export default {
	name: 'InputGroup',
	extends: ContainerComponent,
	props: ElementForgeTheme.props.InputGroup.container
}
</script>

<style>

</style>
