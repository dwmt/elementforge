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
import Events from '../../events/index.js'
import ContainerComponent from '../ContainerComponent.vue'

import { optionalChaining } from  '../../utils/index.js'

import { OPTIONS_TYPES, STATES } from '../../consts'

import equal from 'fast-deep-equal'
// const equal = require('fast-deep-equal')

export default {
	name: 'Multiselect',
	extends: ContainerComponent,
	inject: {
		form: { default: null }
	},
	props: Props.Multiselect.container,
	emits: Events.Multiselect.container,
	data () {
		return {
			component: 'Multiselect',
			defaultComponent: 'default-multiselect',
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
				return OPTIONS_TYPES.COMPLEX
			}
			throw new Error('Provided options array is invalid!')
		},
		selectionOptions () {
			if (!this.options || !this.options.length) {
				return []
			}
			const optionsType = this.optionsType

			if (optionsType === OPTIONS_TYPES.ARRAY) {
				return this.options.map((o) => { return {key: o, value: o} })
			}
			return this.options
		},
		selectedItems () {
			return this.selectionOptions.filter((item) => {
				const found = this.modelValue.find((val) => equal(val, item.value))
				return found
			})
		},
		items () {
			return this.selectionOptions.filter((item) => {
				const found = this.modelValue.find((val) => equal(val, item.value))
				return !found
			})
		}
	},
	methods: {
		input (payload) {
			this.$emit('update:modelValue', payload)
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
			const items = [].concat(this.modelValue)
			items.push(value)
			this.input(items)
		},
		deleteItem (value) {
			const items = [].concat(this.modelValue)
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
