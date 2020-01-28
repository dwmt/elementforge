<template lang="pug">
.date-time-component
	component(
		:is="renderableComponent"
		:properties="properties"
		:modifiers="modifiers"
		:darkMode="darkModeState"
		
		:name="name"
		:value="value"
		@click="openPicker"
	)
	DateTimePicker(:theme="theme" :value="value" :type="type" :defaultDate="defaultDate" @input="changeTime" :modal="true" v-if="pickerVisible")
</template>

<script>
import ContainerComponent from '../ContainerComponent.vue'
import DateTimePicker from '../DateTimePicker/DateTimePicker.vue'
export default {
	name: 'DateTime',
	extends: ContainerComponent,
	components: {DateTimePicker},
	data () {
		return {
			component: 'DateTime',
			defaultComponent: 'default-datetime',
			pickerVisible: false
		}
	},
	props: {
		value: {},
		modal: {
			type: Boolean,
			default: false
		},
		type: {
			type: String,
			default: 'date'
		},
		returnDate: {
			type: Boolean,
			default: false
		},
		defaultDate: {
			default: () => new Date()
		}
	},
	computed: {
		displayDate () {
			// TODO: implement format..
			return this.value
		}
	},
	methods: {
		changeTime (payload) {
			this.$emit('input', payload)
		},
		openPicker () {
			this.pickerVisible = true
		}
	}
}
</script>
