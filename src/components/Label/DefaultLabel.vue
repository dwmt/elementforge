<template lang="pug">
.label-container
	.label-title {{ label }}
	.label-text {{ value }}
</template>

<script>
import Props from '../../props/index.js'
import Events from '../../events/index.js'
import RenderableComponent from "../RenderableComponent.vue";

export default {
	name: 'DefaultLabel',
	extends: RenderableComponent,
	props: Props.Label.renderable,
	emits: Events.Label.renderable

}
</script>
