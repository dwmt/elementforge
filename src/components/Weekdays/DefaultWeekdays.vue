<template lang="pug">
.weekdays
	div(v-for="(day, index) in items", :key="index")
		span.inline-flex.items-center.justify-center.rounded-full.w-8.h-8.text-white.day-selector.cursor-pointer(class="hover:bg-purple-darker ease", :class="[ active(day.day) ? 'bg-gradient' : 'bg-gray-light']", @click="selectItem(day.value)") {{ day.key }}
</template>

<script>
import ElementForgeTheme from '@dwmt/elementforge-theme'

export default {
	name: 'DefaultWeekdays',
	extends: ElementForgeTheme.RenderableComponent,
	props: ElementForgeTheme.props.Weekdays.renderable,
	methods: {
		selectItem (value) {
			this.$emit('select', value)
		},
		deleteItem (value) {
			this.$emit('delete', value)
		},
		selectAll () {
			this.$emit('selectAll')
		},
		deleteAll () {
			this.$emit('deleteAll')
		},
		active () {
			return this.selectedItems.find(d => d.value === day )
		}
	}
}
</script>
