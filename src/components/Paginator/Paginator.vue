<template lang="pug">
component(
	:is="renderableComponent"
	:properties="properties"
	:modifiers="modifiers"

	:modelValue="modelValue"
	:totalPages="totalPages"

	@input="input"
)
</template>

<script>
import Props from '../../props/index.js'
import Events from '../../events/index.js'
import ContainerComponent from '../ContainerComponent.vue'

export default {
	name: 'Paginator',
	extends: ContainerComponent,
	props: Props.Paginator.container,
	emits: Events.Paginator.container,
	data () {
		return {
			component: 'Paginator',
			defaultComponent: 'default-paginator'
		}
	},
	methods: {
		input (e) {
			this.$emit('update:modelValue', e)
		}
	}
}
</script>
