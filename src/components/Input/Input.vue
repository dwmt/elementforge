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
	:modelValue="modelValue"
	v-on="inputListeners"
)
</template>

<script>
import Props from '../../props/index.js'
import Events from '../../events/index.js'
import ContainerComponent from '../ContainerComponent.vue'

import { STATES } from '../../consts'

export default {
	name: 'Input',
	extends: ContainerComponent,
	inject: {
		form: { default: null }
	},
	props: Props.Input.container,
	emits: Events.Input.container,
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
			return {
				'update:modelValue': (event) => {
					this.input(event)
				},
				blur: (event) => {
					this.blur(event)
				},
				click: (event) => {
					this.$emit('click', event)
				},
				focus: (event) => {
					this.focus(event)
				},
				keyup: (event) => {
					this.$emit('keyup', event)
				},
				keydown: (event) => {
					this.$emit('keydown', event)
				},
				keypress: (event) => {
					this.$emit('keypress', event)
				}
			}
		},
		isValidComputed () {
			if (!this.form || this.isValidInherit === null || !this.validable) {
				return this.isValid
			}
			return this.isValidInherit
		},
		errorsComputed () {
			if (!this.form || this.errorsInherit === null || !this.validable) {
				return this.errors
			}
			return this.errorsInherit
		}
	},
	methods: {
		input (e) {
			this.$emit('update:modelValue', e)
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
