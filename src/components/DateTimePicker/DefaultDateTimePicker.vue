<template lang="pug">
.date-time-picker-container
</template>
<script>
import Props from '../../props/index.js'
import RenderableComponent from "../RenderableComponent.vue";

export default {
	name: 'DefaultDateTimePicker',
	extends: RenderableComponent,
	props: Props.DateTimePicker.renderable
}
</script>
