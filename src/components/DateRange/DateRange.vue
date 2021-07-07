<template lang="pug">
.date-time-component
	component(
		:is="renderableComponent"
		:properties="properties"
		:modifiers="modifiers"
		:darkMode="darkModeState"

		:name="name"
		:model-value="displayDate"
		:label="label"
		:disabled="disabled"
		:required="required"
		@click="openPicker"
	)
	DateRangePicker(
		v-if="pickerVisible"
		:theme="theme"
		:model-value="modelValue"

		@close="closePicker"
		@update:model-value="input"
	)
</template>

<script>
import Props from '../../props/index.js'
import Events from '../../events/index.js'
import ContainerComponent from '../ContainerComponent.vue'

import DateRangePicker from '../DateRangePicker/DateRangePicker.vue'

import { format } from 'date-fns'
import isEqual from 'lodash/isEqual'

export default {
	name: 'DateRange',
	extends: ContainerComponent,
	components: { DateRangePicker },
	props: Props.DateRange.container,
	emits: Events.DateRange.container,
	data () {
		return {
			component: 'DateRange',
			defaultComponent: 'default-daterange',
			pickerVisible: false
		}
	},
	computed: {
		computedFormat () {
			if (!this.format) return 'yyyy-MM-dd'
			return this.format
		},
		displayDate () {
			const { start, end } = this.modelValue
			if (!start) return ''
			if (isEqual(start, end)) return format(new Date(start), this.computedFormat)
			return `${format(new Date(start), this.computedFormat)} - ${format(new Date(end), this.computedFormat)}`
		}
	},
	methods: {
		input (payload) {
			this.$emit('update:modelValue', payload)
		},
		openPicker () {
			if (this.pickerVisible) return
			this.pickerVisible = true
		},
		closePicker () {
			this.pickerVisible = false
		}
	}
}
</script>
