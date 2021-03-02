<template lang="pug">
.ef-nlv8.text-purple-darker.button-container(@click="click", :class="containerClasses")
	div.button(v-if="!isLoading", :class="[animationName, ...classes, {'cursor-pointer': !disabled, 'cursor-not-allowed': disabled}]")
		span.flex.items-center.justify-center.left-icon(v-if="properties.icon && properties.icon.left", :class="[animationClass]")
			i.left-icon(:class="[ properties.icon.left, (properties.icon.size || '') ]")
		span.button-text(v-if="!!text", :class="[{ 'delayed': properties.animation }, animationClass]") {{ text }}
		span.flex.items-center.justify-center.right-icon(v-if="properties.icon && properties.icon.right", :class="[animationClass]")
			i.right-icon(:class="[ properties.icon.right, (properties.icon.size || '') ]")
	div.button-loading(v-else)
		span.loading-icon(class="nlv8-refresh")
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import { RenderableComponent, components, events } from '../src/ElementForge.ts'
export default defineComponent({
	name: 'LineButton',
	extends: RenderableComponent,
	props: components.Button.renderable,
	emits: events.Button.renderable,
	methods: {
		click (e: any) {
			this.$emit('click', e)
		}
	},
	computed: {
		containerClasses () {
			let classes = []
			let block = this.modifiers.find((m: string) => m === 'block')
			if (block) {
				classes.push('block')
			}
			return classes
		},
		classes () {
			let classes = []
			let modifiers = [].concat(this.modifiers)
			modifiers.filter((m) => m !== 'block')
			if (modifiers) {
				classes = classes.concat(this.modifiers)
			}
			if (this.darkMode) {
				classes.push('darkMode')
			}
			if (this.disabled) {
				classes.push('disabled')
			}
			return classes
		},
		animationName () {
			if (this.disabled) {
				return ''
			}
			if (this.properties.animation) {
				return this.properties.animation.name
			} else if (this.properties.keyframe) {
				return this.properties.keyframe
			} else {
				return ''
			}
		},
		animationClass () {
			if (this.disabled || !this.properties.animation) {
				return ''
			}
			const animationDirection = this.properties.animation.direction
			return animationDirection === 'left' ? `${this.animationName}-left` : `${this.animationName}-right`
		}
	}
})
</script>
