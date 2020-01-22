<template lang="pug">
.label-container
	.label-title {{ label }}
	.label-text {{ value }}
</template>

<script>
import RenderableComponent from '../RenderableComponent.vue';
export default {
	name: 'DefaultLabel',
	extends: RenderableComponent,
	props: [
		'value',
		'label'
	]
}
</script>
