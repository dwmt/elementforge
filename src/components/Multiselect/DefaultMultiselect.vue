<template lang="pug">
.multi-select-container
	.items
		.item(v-for="(item, key) in items", :key="key", @click="selectItem(item.value)") {{ item.key }}
	.options
		.select-all(@click="selectAll") Select all
		.delete-all(@click="deleteAll") Delete all
	.selectedItems
		.item(v-for="(item, key) in selectedItems", :key="key", @click="deleteItem(item.value)") {{ item.key }}
</template>

<script>
import Props from '../../props/index.js'
import Events from '../../events/index.js'
import RenderableComponent from "../RenderableComponent.vue";

export default {
	name: 'DefaultMultiselect',
	extends: RenderableComponent,
	props: Props.Multiselect.renderable,
	emits: Events.Multiselect.renderable,
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
		}
	}
}
</script>

<style lang="stylus">
.multi-select-container
	display flex
	flex-direction row
	border 1px solid black
	padding 1rem
	border-radius 15px
	.items
		flex-grow 1
	.options
		margin 0rem 1rem
		.select-all, .delete-all
			cursor pointer
	.selectedItems
		flex-grow 1
	.item
		cursor pointer
</style>
