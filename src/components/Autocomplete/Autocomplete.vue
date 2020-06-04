<template lang="pug">
.autocomplete-component
	Input(
		:theme="theme"
		:value="computedValue"
		:type="type"
		:properties="properties"
		:modifiers="modifiers"
		:label="label"
		:editable="editable"
		:required="required"
		:disabled="disabled"
		:precision="precision"
		:max="max"
		:min="min"
		:isValid="isValidComputed"
		:errors="errorsComputed"
		:validable="false"

		@input="input"
		@focus="focus"
		@blur="blur"
		@keydown="keypress"
		ref="inputField"
	)
	component(
		:is="renderableComponent"
		:properties="properties"
		:modifiers="modifiers"
		:darkMode="darkModeState"
		:isValid="isValidComputed"
		:errors="errorsComputed"

		:options="optionsComputed"
		:selectedOption="selectedOption"
		:visible="dropdownVisible"
		@select="selectOption"
		@moveSelection="moveSelection"
	)
</template>

<script>
import ElementForgeTheme from '@dwmt/elementforge-theme'
import ContainerComponent from '../ContainerComponent.vue'

import { STATES } from '../../consts'

import Input from '../Input/Input.vue'

const equal = require('fast-deep-equal')

export default {
	name: 'Autocomplete',
	extends: ContainerComponent,
	components: { Input },
	inject: {
		form: { default: null }
	},
	data () {
		return {
			component: 'Autocomplete',
			defaultComponent: 'default-autocomplete',
			dropdownVisible: false,
			computedValue: '',
			selectedOption: 0,
			optionsCleaned: [],
			state: STATES.PRISTINE,
			isValidInherit: null,
			errorsInherit: null
		}
	},
	props: ElementForgeTheme.props.Autocomplete.container,
	computed: {
		optionsComputed () {
			return this.optionsCleaned
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
		// Input events
		input (payload) {
			if (!this.autoFilter) {
				this.$emit('filter', payload)
			}
			this.computedValue = payload
			if (this.behaviour.toLowerCase() === 'input') {
				this.$emit('input', payload)
			}
			this.makeDirty()
		},
		makeDirty () {
			this.state = STATES.DIRTY
			if (this.form) {
				this.form.dirty(this.name)
			}
		},
		focus () {
			this.dropdownVisible = true
			this.state = STATES.UNTOUCHED
			if (this.form) {
				this.form.focus(this.name)
			}
		},
		blur () {
			if (this.state !== STATES.DIRTY) {
				this.state = STATES.TOUCHED
			}
			if (this.form) {
				this.form.blur(this.name)
			}
			setTimeout(() => {
				this.dropdownVisible = false
				this.selectedOption = 0
			}, 250)
		},
		arrowUp () {
			this.selectedOption = (this.selectedOption - 1 >= 0) ? this.selectedOption - 1 : 0
		},
		arrowDown () {
			this.selectedOption = (this.selectedOption + 1 < this.optionsComputed.length) ? this.selectedOption + 1 : this.optionsComputed.length - 1
		},
		keypress (e) {
			if (!this.dropdownVisible) {
				this.dropdownVisible = true
				return
			}
			if (e.keyCode == 38) {
				e.preventDefault()
				this.arrowUp()
			}
			if (e.keyCode == 40) {
				e.preventDefault()
				this.arrowDown()
			}
			if (e.keyCode == 13) {
				e.preventDefault()
				this.selectOption(this.selectedOption)
			}
			if (e.keyCode == 9) {
				this.selectOption(this.selectedOption)
			}
		},

		// Autocomplete events
		moveSelection (index) {
			this.selectedOption = index
		},
		selectOption (optionIndex) {
			console.log('Selecting option...')
			let selectedOption = this.optionsComputed[optionIndex]
			this.computedValue = selectedOption.value
			this.$emit('input', selectedOption.value)
			this.dropdownVisible = false
			this.makeDirty()
		},

		setComputedValue () {
			let val = this.optionsCleaned.find(o => equal(o.value, this.value))

			if (!!val) {
				this.computedValue = val.key
				return
			}
			if (typeof this.value === 'string') {
				this.computedValue = this.value
			} else {
				this.computedValue = this.displayValue
			}
		},

		cleanOptions (options) {
			let res = []
			for (let option of options) {
				if (typeof option === 'string') {
					res.push({ key: option, value: option })
				} else {
					res.push(option)
				}
			}
			return res
		}
	},
	watch: {
		options: {
			deep: true,
			handler: function (newVal) {
				this.optionsCleaned = this.cleanOptions(newVal)
			}
		},
		value: {
			deep: true,
			handler: function () {
				this.setComputedValue()
			}
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
		this.optionsCleaned = this.cleanOptions(this.options)
		this.setComputedValue()

	},
	beforeDestroy () {
		this.optionsCleaned = []
	}
}
</script>
