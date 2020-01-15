<template>
	<component
		:is="renderableComponent"

		:options="selectionOptions"
		:required="required"
		:value="selectionValue"
		:label="label"
		:toggled="toggled"

		@click="click"
		@focus="focus"
		@blur="blur"
		@keyup="keyup"
		@input="select"
		@toggle="toggle"
	/>
</template>

<script>
import ContainerComponent from '../ContainerComponent'
import {optionalChaining} from '../../utils'

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
	name: 'Select',
	extends: ContainerComponent,
	props: {
		options: {
			type: Array,
			default: () => []
		},
		required: {
			default: false
		},
		value: {},
		label: {},
		localisation: {
			type: Boolean,
			default: false
		}
	},
	data () {
		return {
			component: 'Select',
			defaultComponent: 'default-select',
			loader: null,
			isLoading: false,
			toggled: false
		}
	},
	computed: {
		selectionValue () {
			let optionsType = this.optionsType
			let value = this.selectionOptions.find((option) => {
				return option.value === this.value
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
	methods: {
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
			this.$emit('input', this.selectionOptions[key].value)
			this.toggled = false
		},
		focus (payload) {
			this.$emit('focus', payload)
		},
		blur (payload) {
			this.$emit('blur', payload)
		},
		keyup (payload) {
			this.$emit('keyup', payload)
		}
	},
	beforeMount () {
		this.loader = new Loader({
			onActivation: () => {
				this.isLoading = true
			},
			onTermination: () => {
				this.isLoading = false
			}
		})
	}
}
</script>
