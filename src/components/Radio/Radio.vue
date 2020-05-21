<template>
	<component
		:is="renderableComponent"

		:darkMode="darkMode"
		:name="nameComputed"
		:modifiers="modifiers"
		:properties="properties"

		:value="valueComputed"
		:data="dataComputed"
		:label="label"
		:checked="checked"
		:disabled="disabledComputed"

		@click="click"
		@input="input"
	/>
</template>

<script>
import ElementForgeTheme from '@dwmt/elementforge-theme'
import ContainerComponent from '../ContainerComponent.vue'

import {optionalChaining} from '../../utils'

const equal = require('fast-deep-equal')

export default {
	name: 'Radio',
	extends: ContainerComponent,
	inject: {
		radioGroup: { default: null }
	},
	props: ElementForgeTheme.props.Radio.container,
	data () {
		return {
			component: 'Radio',
			defaultComponent: 'default-radio',
			dataComputed: null,
			nameComputed: null,
			valueInherit: null,
			disabledInherit: null
		}
	},
	computed: {
		checked () {
			return equal(this.valueComputed, this.dataComputed)
		},
		valueComputed () {
			if (this.radioGroup) {
				return this.valueInherit
			}
			return this.value
		},
		disabledComputed () {
			let disabledInherit = (this.disabledInherit === null) ? false : this.disabledInherit

			return this.disabledInherit || this.disabled
		},
		groupIdentifier () {
			return `${this.nameComputed}-${this.dataComputed}`
		}
	},
	methods: {
		click (payload) {
			this.$emit('click', payload)
		},
		input () {
			this.$emit('input', this.dataComputed)
			if (this.radioGroup) {
				this.radioGroup.input(this.dataComputed)
			}
		}
	},
	mounted () {
		if (typeof this.data === 'undefined') {
			throw new Error('Data property is mandatory!')
		}
		this.dataComputed = this.data
		this.nameComputed = this.name || 'radio-' + Math.floor(Math.random() * 100) + 1
		if (this.radioGroup) {
			let inheritValues = this.radioGroup.registerEntry(this.groupIdentifier, (newValue) => {
				this.valueInherit = newValue.value
				this.disabledInherit = newValue.disabled
			})
			this.valueInherit = inheritValues.value
			this.disabledInherit = inheritValues.disabled
		}
	},
	beforeDestroy () {
		if (this.radioGroup) {
			this.radioGroup.deleteEntry(this.groupIdentifier)
		}
	}
}
</script>
