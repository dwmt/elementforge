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
	DateTimePicker(
		v-if="pickerVisible"
		:theme="theme"
		:model-value="modelValue"
		:type="type"
		:defaultDate="defaultDate"
		:modal="true"
		:returnDate="true"

		@close="closePicker"
		@update:model-value="changeTime"
	)
</template>

<script>
import Props from '../../props/index.js'
import Events from '../../events/index.js'
import ContainerComponent from '../ContainerComponent.vue'

import DateTimePicker from '../DateTimePicker/DateTimePicker.vue'

import {format} from 'date-fns'
const isNull = (value) => typeof value === "object" && !value

export default {
	name: 'DateTime',
	extends: ContainerComponent,
	components: { DateTimePicker },
	data () {
		return {
			component: 'DateTime',
			defaultComponent: 'default-datetime',
			pickerVisible: false,
			datePickerRemoveFunc: null
		}
	},
	props: Props.DateTime.container,
	emits: Events.DateTime.container,
	computed: {
		computedFormat () {
			if (!this.format) {
				if (this.type === 'datetime') {
					return 'yyyy-MM-dd HH:mm'
				}
				if (this.type === 'date') {
					return 'yyyy-MM-dd'
				}
			}
			return this.format
		},
		displayDate () {
			let val = this.modelValue
			val = (typeof val === 'undefined') ? '' : format(isNull(val) ? new Date() : new Date(val), this.computedFormat)
			return val
		}
	},
	methods: {
		changeTime (payload) {
			this.$emit('update:modelValue', payload)
		},
		// TODO: Refactor this with teleport when vue 3 is available
		openPicker () {
			if (this.pickerVisible) return
			this.pickerVisible = true
			const appContainer = this.$root.$el
			const datePickerContainer = document.createElement('div')
			const datePickerID = 'ef-datepicker-container' + Date.now()
			datePickerContainer.id = datePickerID

			appContainer.appendChild(datePickerContainer)

		},
		closePicker () {
			this.pickerVisible = false
			if (!this.datePickerRemoveFunc) return
			this.datePickerRemoveFunc()
			this.datePickerRemoveFunc = null
		}
	}
}
</script>
