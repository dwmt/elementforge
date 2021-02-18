<template lang="pug">
.date-time-component
	component(
		:is="renderableComponent"
		:properties="properties"
		:modifiers="modifiers"
		:darkMode="darkModeState"

		:name="name"
		:value="displayDate"
		:label="label"
		:disabled="disabled"
		:required="required"
		@click="openPicker"
	)
	// DateTimePicker(:theme="theme" :value="value" :type="type" :defaultDate="defaultDate" @input="changeTime" :modal="true" v-if="pickerVisible" @close="closePicker" :returnDate="true")
</template>

<script>
import Props from '../../props/index.js'
import ContainerComponent from '../ContainerComponent.vue'

import DateTimePicker from '../DateTimePicker/DateTimePicker.vue'

import Vue from 'vue'

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
			let val = this.value
			val = (typeof val === 'undefined') ? '' : format(isNull(val) ? new Date() : new Date(val), this.computedFormat)
			return val
		}
	},
	methods: {
		changeTime (payload) {
			this.$emit('input', payload)
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

			let datePickerComp = Vue.extend(DateTimePicker)
			let self = this
			let datePicker = new datePickerComp({
				propsData: {
					theme: self.theme,
					value: self.value,
					type: self.type,
					defaultDate: self.defaultDate,
					modal: true,
					returnDate: true,
				},
				created () {
					this.$on('close', self.closePicker)
					this.$on('input', self.changeTime)
				}
			}).$mount(`#${datePickerID}`)

			this.datePickerRemoveFunc = function () {
				appContainer.removeChild(datePicker.$el)
			}
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
