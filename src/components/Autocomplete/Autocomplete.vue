<template lang="pug">
.autocomplete-component
	Input(
		:theme="theme"
		:value="displayValue"
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

		@input="input"
		@focus="focus"
		@blur="blur"
		@keydown="keypress"
	)
	component(
		:is="renderableComponent"
		:properties="properties"
		:modifiers="modifiers"
		:darkMode="darkModeState"

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

import Input from '../Input/Input.vue'


export default {
	name: 'Autocomplete',
	extends: ContainerComponent,
	components: { Input },
	data () {
		return {
			component: 'Autocomplete',
			defaultComponent: 'default-autocomplete',
			dropdownVisible: false,
			displayValue: '',
			selectedOption: 0,
			optionsCleaned: []
		}
	},
	props: ElementForgeTheme.props.Autocomplete.container,
	computed: {
		optionsComputed () {
			return this.optionsCleaned
		}
	},
	methods: {
		// Input events
		input (payload) {
			if (!this.autoFilter) {
				this.$emit('filter', payload)
			}
			this.displayValue = payload
			if (this.behaviour.toLowerCase() === 'input') {
				this.$emit('input', payload)
			}
		},
		focus () {
			this.dropdownVisible = true
		},
		blur () {
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
			this.displayValue = selectedOption.value
			this.$emit('input', selectedOption.value)
			this.dropdownVisible = false
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
		}
	},
	mounted () {
		this.optionsCleaned = this.cleanOptions(this.options)
	},
	beforeDestroy () {
		this.optionsCleaned = []
	}
}
</script>
