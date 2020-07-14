<template>
<button :class="classes" :disabled="disabled" :name="name" @click="click" >
	<span v-if="!isLoading && text">{{ text }}</span>
	<span v-else>Loading...</span>
</button>
</template>
<script>
import Props from '../../props/index.js'
import RenderableComponent from "../RenderableComponent.vue";

export default {
	name: 'DefaultButton',
	extends: RenderableComponent,
	props: Props.Button.renderable,
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
