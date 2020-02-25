<template>
<button :class="classes" :disabled="disabled" :name="name" @click="click" >
	<span v-if="!isLoading && text">{{ text }}</span>
	<span v-else>Loading...</span>
</button>
</template>
<script>
import ElementForgeTheme from '@dwmt/elementforge-theme'

export default {
	name: 'DefaultButton',
	extends: ElementForgeTheme.RenderableComponent,
	props: ElementForgeTheme.props.Button.renderable,
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
		click (e) {
			if (!this.isValid || this.disabled) {
				return
			}
			this.$emit('click', {event: e, data: this.data})
		}
	}
}
</script>
