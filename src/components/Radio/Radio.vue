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
import Props from '../../props/index.js'
import Events from '../../events/index.js'
import ContainerComponent from '../ContainerComponent.vue'

import equal from 'fast-deep-equal'
// const equal = require('fast-deep-equal')

export default {
	name: 'Radio',
	extends: ContainerComponent,
	inject: {
		radioGroup: { default: null }
	},
	props: Props.Radio.container,
	emits: Events.Radio.container,
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
			return this.modelValue
		},
		disabledComputed () {
			const disabledInherit = (this.disabledInherit === null) ? false : this.disabledInherit

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
			this.$emit('update:modelValue', this.dataComputed)
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
			const inheritValues = this.radioGroup.registerEntry(this.groupIdentifier, (newValue) => {
				console.log(newValue)
				this.valueInherit = newValue.value
				this.disabledInherit = newValue.disabled
			})
			this.valueInherit = inheritValues.value
			this.disabledInherit = inheritValues.disabled
		}
	},
	beforeUnmount () {
		if (this.radioGroup) {
			this.radioGroup.deleteEntry(this.groupIdentifier)
		}
	}
}
</script>
