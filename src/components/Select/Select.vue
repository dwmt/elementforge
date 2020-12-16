<template>
<component
	:is="renderableComponent"

	:darkMode="darkMode"
	:errors="errorsComputed"
	:name="name"
	:isValid="isValidComputed"
	:modifiers="modifiers"
	:properties="properties"

	:options="selectionOptions"
	:required="required"
	:value="selectionValue"
	:selectedIndex="selectedIndex"
	:label="label"
	:toggled="toggled"
	:disabled="disabled"

	@click="click"
	@focus="focus"
	@blur="blur"
	@keyup="keyup"
	@input="select"
	@toggle="toggle"
/>
</template>

<script>
import Props from '../../props/index.js'
import ContainerComponent from '../ContainerComponent.vue'

import {optionalChaining} from '../../utils'

import { OPTIONS_TYPES, STATES } from '../../consts'

const equal = require('fast-deep-equal')

export default {
	name: 'Select',
	extends: ContainerComponent,
	inject: {
		form: { default: null }
	},
	props: Props.Select.container,
	data () {
		return {
			component: 'Select',
			defaultComponent: 'default-select',
			state: STATES.PRISTINE,
			isValidInherit: null,
			errorsInherit: null,
			toggled: false,
			selectedIndex: -1
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
		},
		selectionValue () {
			let optionsType = this.optionsType
			let value = this.selectionOptions.find((option) => {
				return equal(option.value, this.value)
			})
			if (!value)
				return undefined
			return value.key
		},
		optionsType () {
			let allString = true
			let allObject = true
			let allNormalKey = true
			let allObjKey = true
			this.options.forEach(option => {
				if (typeof option === 'string') {
					allObject = false
				}
				if (typeof option === 'object') {
					allString = false
					if (typeof option.key === 'string') {
						allObjKey = false
					}
					if (typeof option.key === 'object') {
						allNormalKey = false
					}
				}
			})
			if (allString) {
				return OPTIONS_TYPES.ARRAY
			}

			if (allObject && allNormalKey) {
				return OPTIONS_TYPES.NORMAL
			}

			if (allObject && allObjKey) {
				return OPTIONS_TYPES.LOCALIZED
			}
			throw new Error('Provided options array is invalid!')
		},
		selectionOptions () {
			if (!this.options || !this.options.length) {
				return []
			}
			let optionsType = this.optionsType

			if (optionsType === OPTIONS_TYPES.ARRAY) {
				return this.options.map((o) => { return {key: o, value: o} })
			}

			if (optionsType === OPTIONS_TYPES.NORMAL && !this.localisation) {
				return this.options
			}
			if (optionsType === OPTIONS_TYPES.NORMAL && this.localisation) {
				return this.options.map((o) => {
					return {
						key: this.translate(o.key),
						value: o.value
					}
				})
			}

			if (optionsType === OPTIONS_TYPES.LOCALIZED) {
				return this.options.map((o, key) => {
					return {
						key: o[optionalChaining(this, $i18n.locale)] || o.default || 'No Key #' + key,
						value: o.value
					}
				})
			}

		}
	},
	watch: {
		toggled () {
			if (this.toggled) {
				document.addEventListener('click', this.blurEvent)
			} else {
				document.removeEventListener('click', this.blurEvent)
			}
		}
	},
	methods: {
		blurEvent (e) {
			if (!this.$el.contains(e.target)) {
				this.close()
			}
		},
		close () {
			this.toggled = false
		},
		toggle () {
			this.toggled = !this.toggled
		},
		translate (key) {
			if (!this.$t) {
				return key
			}
			return this.$t(key)
		},
		click (payload) {
			this.$emit('click', payload)
		},
		select (key) {
			this.selectedIndex = key
			this.$emit('input', this.selectionOptions[key].value)
			this.toggled = false
			this.state = STATES.DIRTY
			if (this.form) {
				this.form.dirty(this.name)
			}
		},
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
		keyup (payload) {
			this.$emit('keyup', payload)
		}
	},
	mounted () {
		this.selectedIndex = this.options.findIndex(option => option.value ? option.value === this.value : option === this.value)
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
