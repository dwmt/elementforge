<template lang="pug">
component(
	:is="renderableComponent"

	:modifiers="modifiers"
	:name="name"
	:isValid="isValid"
	:errors="errors"
	:properties="properties"
	:darkMode="darkModeState"

	v-model="tag"

	:tags="value"
	:editable="editable"
	:required="required"
	:label="label"
	:disabled="disabled"

	@enter="enter"
	@remove="remove"
	@backspace="backspace"
)
</template>

<script>
import Props from '../../props/index.js'
import ContainerComponent from '../ContainerComponent.vue'

export default {
	name: 'Select',
	extends: ContainerComponent,
	props: Props.TagInput.container,
	data () {
		return {
			component: 'TagInput',
			defaultComponent: 'default-taginput',
			tag: '',
			backspaceDelete: true
		}
	},
	watch: {
		tag (newTag, oldTag) {
			if (newTag !== '') {
				this.backspaceDelete = false
			}
			if (this.tag.indexOf(',') !== -1) {
				const tags = [].concat(this.value)
				let tag = '' + this.tag
				tag = tag.replace(',', '')
				if (tags.includes(tag) || tag === '') {
					this.tag = '' + tag
					return
				}
				tags.push(tag)
				this.tag = ''
				this.$emit('update:modelValue', tags)
			}
		}
	},
	methods: {
		enter () {
			const tags = [].concat(this.value)
			let tag = '' + this.tag
			tag = tag.replace(',', '')
			if (tags.includes(tag) || tag === '') {
				return
			}
			tags.push(tag)
			this.tag = ''
			this.$emit('update:modelValue', tags)
		},
		remove (tag) {
			const tags = [].concat(this.value)
			this.$emit('update:modelValue', tags.filter(t => t !== tag))
		},
		backspace (e) {
			if (this.backspaceDelete) {
				const lastTag = this.value[this.value.length - 1]
				this.remove(lastTag)
			}
			if (this.tag === '') {
				this.backspaceDelete = true
			}
		}
	}
}
</script>
