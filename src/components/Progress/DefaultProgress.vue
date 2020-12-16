<template>
<progress class="default" :value="value" max="100"/>
</template>
<script>
import Props from '../../props/index.js'
import RenderableComponent from "../RenderableComponent.vue";

export default {
	name: 'DefaultProgress',
	extends: RenderableComponent,
	props: Props.Progress.renderable,
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
