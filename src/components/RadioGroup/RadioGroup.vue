<template>
<div class="radio-group">
	<slot></slot>
</div>
</template>
<script>
import ElementForgeTheme from '@dwmt/elementforge-theme'

export default {
	name: 'RadioGroup',
	props: ElementForgeTheme.props.RadioGroup.container,
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
		value: {
			deep: true,
			handler () {
				this.informAll()
			}
		}
	},
	methods: {
		input (payload) {
			this.$emit('input', payload)
		},
		registerEntry (name, cb) {
			this.watchers[name] = cb
			return {
				value: this.value,
				disabled: this.disabled
			}
		},
		deleteEntry (name) {
			delete this.watchers[name]
		},
		informAll () {
			let watchers = Object.keys(this.watchers)
			for (let watcher of watchers) {
				this.watchers[watcher]({ value: this.value, disabled: this.disabled })
			}
		}
	}
}
</script>
