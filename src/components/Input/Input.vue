<template lang="pug">
component(
	:is="renderableComponent"

	:darkMode="darkMode"
	:errors="errorsComputed"
	:name="name"
	:isValid="isValidComputed"
	:modifiers="modifiers"
	:properties="properties"
	:type="type"
	:editable="editable"
	:disabled="disabled"

	:precision="precision"
	:min="min"
	:max="max"

	:required="required"

	:label="label"
	:value="value"
	v-on="inputListeners"
)
</template>

<script>
import ElementForgeTheme from '@dwmt/elementforge-theme'
import ContainerComponent from '../ContainerComponent.vue'

import { STATES } from '../../consts'

export default {
	name: 'Input',
	extends: ContainerComponent,
	inject: {
		form: { default: null }
	},
	props: ElementForgeTheme.props.Input.container,
	data () {
		return {
			component: 'Input',
			defaultComponent: 'default-input',
			state: STATES.PRISTINE,
			isValidInherit: null,
			errorsInherit: null
		}
	},
	computed: {
		inputListeners: function () {
			var vm = this
			return Object.assign({},
				this.$listeners,
				{
					input: function (event) {
						vm.input(event)
					},
					blur: function (event) {
						vm.focus(event)
					},
					click: function (event) {
						vm.$emit('click', event)
					},
					focus: function (event) {
						vm.focus(event)
					},
					keyup: function (event) {
						vm.$emit('keyup', event)
					},
					keydown: function (event) {
						vm.$emit('keydown', event)
					},
					keypress: function (event) {
						vm.$emit('keypress', event)
					}
				}
			)
		},
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
		}
	},
	methods: {
		input (e) {
			this.$emit('input', e)
			this.makeDirty()
		},
		makeDirty () {
			this.state = STATES.DIRTY
			if (this.form) {
				this.form.dirty(this.name)
			}
		},
		click (e) {
			this.$emit('click', e)
		},
		focus (e) {
			this.$emit('focus', e)
			this.state = STATES.UNTOUCHED
			if (this.form) {
				this.form.focus(this.name)
			}
		},
		blur (e) {
			this.$emit('blur', e)
			if (this.state !== STATES.DIRTY) {
				this.state = STATES.TOUCHED
			}
			if (this.form) {
				this.form.blur(this.name)
			}
		},
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
