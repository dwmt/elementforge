<template lang="pug">
.asd
</template>

<script>
import Props from '../../props/index.js'
import Events from '../../events/index.js'
import RenderableComponent from "../RenderableComponent.vue";

export default {
	name: 'DefaultAutocomplete',
	props: Props.Autocomplete.renderable,
	emits: Events.Autocomplete.renderable,
	extends: RenderableComponent
}
</script>
