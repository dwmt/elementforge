<template lang="pug">
.asd
</template>

<script>
import Props from '../../props/index.js'
import Events from '../../events/index.js'
import RenderableComponent from "../RenderableComponent.vue";

export default {
	name: 'DefaultDateTime',
	props: Props.DateTime.renderable,
	emits: Events.DateTime.renderable,
	extends: RenderableComponent
}
</script>
