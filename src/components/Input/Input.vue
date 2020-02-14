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

		:label="label"
		:value="value"
		@input="input"
		@click="click"
		@focus="focus"
		@blur="blur"
	)
</template>

<script>
import ContainerComponent from '../ContainerComponent.vue'
const STATES = {
	'PRISTINE': 0,	// entry was not interacted yet
	'UNTOUCHED': 1,	// entry not lost focus yet
	'TOUCHED': 2,		// entry lost focus at least once
	'DIRTY': 3			// interaction occured with entry
}
export default {
	name: 'Input',
	extends: ContainerComponent,
	inject: {
		form: { default: null }
	},
	props: {
		label: {
			type: String,
			default: ''
		},
		value: {},
		type: {},
		editable: {
			type: Boolean,
			default: true
		}
	},
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
