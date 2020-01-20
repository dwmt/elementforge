<template>
	<div>
		<slot>
	</div>
</template>

<script>
import RenderableComponent from '../RenderableComponent.vue'

export default {
	name: 'DefaultInputGroup',
	extends: RenderableComponent,
	props: ['label']
}
</script>

<style>

</style>
