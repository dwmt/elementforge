<template>
<component
	:is="renderableComponent"

	:darkMode="darkMode"
	:errors="errorsComputed"
	:name="name"
	:isValid="isValidComputed"
	:modifiers="modifiers"
	:properties="properties"


	:selectedItems="selectedItems"
	:items="items"
	:label="label"
	:disabled="disabled"

	@focus="focus"
	@blur="blur"
	@select="selectItem"
	@delete="deleteItem"
	@selectAll="selectAll"
	@deleteAll="deleteAll"
/>
</template>

<script>
import Props from '../../props/index.js'
import ContainerComponent from '../ContainerComponent.vue'

import { OPTIONS_TYPES, STATES } from '../../consts'

const equal = require('fast-deep-equal')

export default {
	name: 'Weekdays',
	extends: ContainerComponent,
	inject: {
		form: { default: null }
	},
	props: Props.Weekdays.container,
	data () {
		return {
			component: 'Weekdays',
			defaultComponent: 'default-weekdays',
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
		},
		selectedItems () {
			return this.selectionOptions.filter((item) => {
				let found = this.value.find((val) => equal(val, item.value))
				return found
			})
		},
		items () {
			return this.selectionOptions
		}
	},
	methods: {
		input (payload) {
			this.$emit('input', payload)
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
		selectItem (value) {
			let items = [].concat(this.value)
			items.push(value)
			this.input(items)
		},
		deleteItem (value) {
			let items = [].concat(this.value)
			this.input(items.filter((item) => !equal(item, value)))
		},
		selectAll () {
			this.input(this.selectionOptions.map((item) => item.value))
		},
		deleteAll () {
			this.input([])
		}
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
