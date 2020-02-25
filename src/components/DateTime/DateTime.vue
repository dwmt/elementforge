<template lang="pug">
.date-time-component
	component(
		:is="renderableComponent"
		:properties="properties"
		:modifiers="modifiers"
		:darkMode="darkModeState"
		
		:name="name"
		:value="displayDate"
		@click="openPicker"
	)
	DateTimePicker(:theme="theme" :value="value" :type="type" :defaultDate="defaultDate" @input="changeTime" :modal="true" v-if="pickerVisible" @close="closePicker" :returnDate="true")
</template>

<script>
import ElementForgeTheme from '@dwmt/elementforge-theme'
import ContainerComponent from '../ContainerComponent.vue'

import DateTimePicker from '../DateTimePicker/DateTimePicker.vue'

import {format} from 'date-fns'

export default {
	name: 'DateTime',
	extends: ContainerComponent,
	components: { DateTimePicker },
	data () {
		return {
			component: 'DateTime',
			defaultComponent: 'default-datetime',
			pickerVisible: false
		}
	},
	props: ElementForgeTheme.props.DateTime.container,
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
			val = format(new Date(val), this.computedFormat)
			return val
		}
	},
	methods: {
		changeTime (payload) {
			this.$emit('input', payload)
		},
		openPicker () {
			this.pickerVisible = true
		},
		closePicker () {
			this.pickerVisible = false
		}
	}
}
</script>
