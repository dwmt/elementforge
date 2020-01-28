<template lang="pug">
	.date-time-picker-container
</template>

<script>
import RenderableComponent from '../RenderableComponent.vue'
import DateTimePickerProps from './DateTimePicker.props'
export default {
	name: 'DefaultDateTimePicker',
	extends: RenderableComponent,
	props: DateTimePickerProps
}
</script>
