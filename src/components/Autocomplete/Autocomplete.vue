<template lang="pug">
.autocomplete-component
	Input(
		:theme="theme"
		:model-value="computedValue"
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
		:isValid="isValid"
		:errors="errors"
		:validable="false"

		@update:model-value="input"
		@focus="focus"
		@blur="blur"
		@keydown.self="keypress"
		ref="inputField"
	)
	component(
		:is="renderableComponent"
		:properties="properties"
		:modifiers="modifiers"
		:darkMode="darkModeState"
		:isValid="isValid"
		:errors="errors"

		:options="optionsComputed"
		:selectedOption="selectedOption"
		:selectedIndex="selectedIndex"
		:visible="dropdownVisible"
		@select="selectOption"
		@moveSelection="moveSelection"
	)
</template>

<script>
import Props from '../../props/index.js'
import Events from '../../events/index.js'
import ContainerComponent from '../ContainerComponent.vue'

import { STATES } from '../../consts'

import Input from '../Input/Input.vue'

import equal from 'fast-deep-equal'

// const equal = require('fast-deep-equal')

export default {
	name: 'Autocomplete',
	extends: ContainerComponent,
	components: { Input },
	data () {
		return {
			component: 'Autocomplete',
			defaultComponent: 'default-autocomplete',
			dropdownVisible: false,
			computedValue: '',
			selectedOption: 0,
			selectedIndex: -1,
			state: STATES.PRISTINE,
		}
	},
	props: Props.Autocomplete.container,
	emits: Events.Autocomplete.container,
	computed: {
		optionsCleaned () {
			const res = []
			for (const option of this.options) {
				if (typeof option === 'string') {
					res.push({ key: option, listKey: option, value: option })
				} else if (Object.keys(option).includes('listKey')) {
					res.push(option)
				} else {
					res.push({ key: option.key, listKey: option.key, value: option.value })
				}
			}
			return res
		},
		optionsComputed () {
			if (this.autoFilter) {
				return this.optionsCleaned.filter(option => this.autoFilterFunction(option.key, this.computedValue))
			}
			return this.optionsCleaned
		},
	},
	methods: {

		autoFilterFunction (element, expression) {
			return element.toLocaleLowerCase().includes(expression.toLocaleLowerCase())
		},

		// Input events
		input (payload) {
			if (!this.autoFilter) {
				this.$emit('filter', payload)
			}
			this.computedValue = payload
			if (this.behaviour.toLowerCase() === 'input') {
				this.$emit('update:modelValue', payload)
			}
			this.makeDirty()
		},
		makeDirty () {
			this.state = STATES.DIRTY
		},
		focus () {
			this.dropdownVisible = true
			this.state = STATES.UNTOUCHED
		},
		blur () {
			if (this.state !== STATES.DIRTY) {
				this.state = STATES.TOUCHED
			}
			setTimeout(() => {
				this.dropdownVisible = false
				this.selectedOption = 0
				if (this.behaviour === 'select') {
					this.setComputedValue()
				}
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
			if (e.keyCode === 38) {
				e.preventDefault()
				this.arrowUp()
			}
			if (e.keyCode === 40) {
				e.preventDefault()
				this.arrowDown()
			}
			if (e.keyCode === 13) {
				e.preventDefault()
				if (!this.optionsComputed.length) return
				this.selectOption(this.selectedOption)
			}
			if (e.keyCode === 9) {
				e.preventDefault()
				if (!this.optionsComputed.length) return
				this.selectOption(this.selectedOption)
			}
		},

		// Autocomplete events
		moveSelection (index) {
			this.selectedOption = index
		},
		selectOption (optionIndex) {
			const selectedOption = this.optionsComputed[optionIndex]
			this.$emit('optionSelected', selectedOption.value)
			this.$emit('update:modelValue', selectedOption.value)
			this.dropdownVisible = false
			this.makeDirty()
		},

		// TODO: rethink this
		setComputedValue () {
			if (!this.modelValue) {
				this.computedValue = ''
				this.selectedIndex = -1
				return
			}
			if (this.behaviour === 'select') {
				const val = this.optionsComputed.find(o => equal(o.value, this.modelValue))
				if (val) {
					this.selectedIndex = this.optionsCleaned.indexOf(val)
					this.computedValue = val.key
				}
				return
			}
			this.computedValue = this.modelValue
		},
	},
	watch: {
		modelValue: {
			deep: true,
			handler: function () {
				this.setComputedValue()
			}
		}
	},
	mounted () {
		this.setComputedValue()
	}
}
</script>
