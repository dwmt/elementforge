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
import Props from '../../props/index.js'
import ContainerComponent from '../ContainerComponent.vue'

export default {
	name: 'InputGroup',
	extends: ContainerComponent,
	props: Props.InputGroup.container
}
</script>

<style>

</style>
