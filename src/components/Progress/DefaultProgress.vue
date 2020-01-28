<template>
	<progress class="default" :value="value" max="100"/>
</template>
<script>
import RenderableComponent from '../RenderableComponent.vue'

export default {
	name: 'DefaultProgress',
	extends: RenderableComponent,
	props: [
		'value',
		'label',
		'showPercentage',
		'animated'
	],
	computed: {
		classes () {
			let classes = []
			if (this.modifiers.length) {
				classes = classes.concat(this.modifiers)
			}
			if (this.darkMode) {
				classes.push('darkMode')
			}
			return classes
		}
	},
	methods: {
	}
}
</script>
<style>

</style>
