<template>
	<component
		:is="renderableComponent"

		:darkMode="darkMode"
		:name="name"
		:modifiers="modifiers"
		:properties="properties"

		:value="value"
		:label="label"
		:disabled="disabled"

		@input="input"
	/>
</template>

<script>
import ElementForgeTheme from '@dwmt/elementforge-theme'
import ContainerComponent from '../ContainerComponent.vue'

export default {
	name: 'Sorter',
	extends: ContainerComponent,
	props: ElementForgeTheme.props.Sorter.container,
	data () {
		return {
			component: 'Sorter',
			defaultComponent: 'default-sorter'
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
