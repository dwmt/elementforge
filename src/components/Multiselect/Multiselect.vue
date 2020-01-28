<template>
	<component
		:is="renderableComponent"
		:properties="properties"
		:modifiers="modifiers"
		:darkMode="darkMode"
		
		:name="name"
		:isValid="isValid"
		:errors="errors"
		:disabled="disabled"

		:selectedItems="selectedItems"
		:items="items"

		@select="selectItem"
		@delete="deleteItem"
		@selectAll="selectAll"
		@deleteAll="deleteAll"
	/>
</template>

<script>
import ContainerComponent from '../ContainerComponent.vue'

const equal = require('fast-deep-equal')

const Loader = require('@dwmt/loader/lib/Loader')

const OPTIONS_TYPE_ARRAY = 'OPTIONS_TYPE_ARRAY'
const OPTIONS_TYPE_KEY_VALUE_NORMAL = 'OPTIONS_TYPE_KEY_VALUE_NORMAL'
const OPTIONS_TYPE_KEY_VALUE_LOCALIZED = 'OPTIONS_TYPE_KEY_VALUE_LOCALIZED'

const OPTIONS_TYPES = {
	'ARRAY': OPTIONS_TYPE_ARRAY,
	'NORMAL': OPTIONS_TYPE_KEY_VALUE_NORMAL,
	'LOCALIZED': OPTIONS_TYPE_KEY_VALUE_LOCALIZED
}

export default {
	name: 'Multiselect',
	extends: ContainerComponent,
	data () {
		return {
			component: 'Multiselect',
			defaultComponent: 'default-multiselect',
			loader: null,
			isLoading: false
		}
	},
	props: {
		disabled: {
			type: Boolean,
			default: false
		},
		value: {},
		options: {}
	},
	computed: {
		checked () {
			return this.value === this.trueValue
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
			return this.selectionOptions.filter((item) => {
				let found = this.value.find((val) => equal(val, item.value))
				return !found
			})
		}
	},
	methods: {
		input (payload) {
			this.$emit('input', payload)
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
}
</script>
