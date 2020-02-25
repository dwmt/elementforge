<template>
	<component
		:is="renderableComponent"

		:darkMode="darkModeState"
		:errors="errorsComputed"
		:name="name"
		:isValid="isValidComputed"
		:modifiers="modifiers"
		:properties="properties"

		:value="value"
		:required="required"
		:minlength="minlength"
		:maxlength="maxlength"
		:label="label"
		:placeholder="placeholder"
		:disabled="disabled"

		@click="click"
		@focus="focus"
		@blur="blur"
		@input="input"
		@keyup="keyup"
	/>
</template>

<script>
import ElementForgeTheme from '@dwmt/elementforge-theme'
import ContainerComponent from '../ContainerComponent.vue'

import { STATES } from '../../consts'

export default {
	name: 'Textarea',
	extends: ContainerComponent,
	inject: {
		form: { default: null }
	},
	data () {
		return {
			component: 'Textarea',
			defaultComponent: 'default-textarea',
			state: STATES.PRISTINE,
			isValidInherit: null,
			errorsInherit: null
		}
	},
	props: ElementForgeTheme.props.Textarea.container,
	computed: {
		isValidComputed () {
			if (!this.form || this.isValidInherit === null) {
				return this.isValid
			}
			return this.isValidInherit
		},
		errorsComputed () {
			if (!this.form || this.errorsInherit === null) {
				return this.errors
			}
			return this.errorsInherit
		},
	},
	methods: {
		click () {},
		focus (payload) {
			this.$emit('focus', payload)
			this.state = STATES.UNTOUCHED
			if (this.form) {
				this.form.focus(this.name)
			}
		},
		blur (payload) {
			this.$emit('blur', payload)
			if (this.state !== STATES.DIRTY) {
				this.state = STATES.TOUCHED
			}
			if (this.form) {
				this.form.blur(this.name)
			}
		},
		input (payload) {
			this.$emit('input', payload)
		},
		keyup () {}
	},
	mounted () {
		if (this.form) {
			this.form.registerEntry(this.name)
			this.form.watchEntry(this.name, (isValid, errors, reset) => {
				if (reset) {
					this.isValidInherit = null
					this.errorsInherit = null
					return
				}
				this.isValidInherit = !!isValid
				this.errorsInherit = errors || null
			})
		}
	}

}
</script>

<style>

</style>
