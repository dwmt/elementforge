<template>
<div class="radio-group">
	<slot></slot>
</div>
</template>
<script>
import Props from '../../props/index.js'
import Events from '../../events/index.js'

export default {
	name: 'RadioGroup',
	props: Props.RadioGroup.container,
	emits: Events.RadioGroup.container,
	data () {
		return {
			watchers: {},
		}
	},
	provide () {
		return {
			radioGroup: this
		}
	},
	watch: {
		modelValue: {
			deep: true,
			handler () {
				this.informAll()
			}
		}
	},
	methods: {
		input (payload) {
			this.$emit('update:modelValue', payload)
		},
		registerEntry (name, cb) {
			this.watchers[name] = cb
			return {
				value: this.modelValue,
				disabled: this.disabled
			}
		},
		deleteEntry (name) {
			delete this.watchers[name]
		},
		informAll () {
			for (const watcher of this.watchers) {
				this.watchers[watcher]({ value: this.modelValue, disabled: this.disabled })
			}
		}
	}
}
</script>
