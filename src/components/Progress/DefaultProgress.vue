<template>
	<progress class="default" :value="value" max="100"/>
</template>
<script>
import ElementForgeTheme from '@dwmt/elementforge-theme'

export default {
	name: 'DefaultProgress',
	extends: ElementForgeTheme.RenderableComponent,
	props: ElementForgeTheme.props.Progress.renderable,
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
