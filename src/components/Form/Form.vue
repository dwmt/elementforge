<template>
<div class="form">
	<slot></slot>
</div>
</template>
<script>
const STATES = {
	'PRISTINE': 0,	// entry was not interacted yet
	'UNTOUCHED': 1,	// entry not lost focus yet
	'TOUCHED': 2,		// entry lost focus at least once
	'DIRTY': 3			// interaction occured with entry
}
const v = require('vindication.js')
export default {
	name: 'Form',
	data () {
		return {
			formState: {},
			watchers: {},
			submits: {},
			isValid: true
		}
	},
	provide () {
		return {
			form: this
		}
	},
	watch: {
		value: {
			deep: true,
			handler () {
				this.validateAll()
			}
		}
	},
	props: {
		resetValue: {
			type: Object,
			default: () => {}
		},
		value: {
			type: Object,
			default: () => {}
		},
		rules: {
			type: Object,
			default: () => {}
		}
	},
	methods: {
		resetForm () {
			this.$emit('input', this.resetValue)
			let entries = Object.keys(this.formState)
			entries.forEach((entry) => {
				this.formState[entry].state = STATES.PRISTINE
				this.formState[entry].isValid = true
				this.formState[entry].errors = []
				this.isValid = true
				this.watchers[entry](true, [], true)
			})
		},
		registerEntry (name) {
			this.formState[name] = {
				state: STATES.PRISTINE,
				isValid: null,
				errors: []
			}
		},
		focus (name) {
			this.formState[name].state = STATES.UNTOUCHED
		},
		blur (name) {
			if (this.formState[name].state !== STATES.DIRTY)
				this.formState[name].state = STATES.TOUCHED
			this.validate(name)
		},
		dirty (name) {
			this.formState[name].state = STATES.DIRTY
			this.validate(name)
		},
		validate (name) {
			let validation = v.validate(
				{[name]: this.value[name]},
				{[name]: this.rules[name]}
			)
			let isValid = validation === null
			let errors = []
			this.formState[name].isValid = isValid
			this.formState[name].errors = errors
			if (validation !== null) {
				errors = (Array.isArray(validation[name])) ? validation[name] : [validation[name]]
				this.formState[name].errors = errors
			}
			this.watchers[name](isValid, errors)
			this.checkValidity()
		},
		validateAll (opts = {}) {
			let entries = Object.keys(this.formState)
			entries.forEach((entry) => {
				if (!opts.ignoreState && this.formState[entry].state === STATES.PRISTINE || this.formState[entry].state === STATES.UNTOUCHED) {
					return
				}
				this.validate(entry)
			})
			this.checkValidity(opts)
		},
		checkValidity (opts = {}) {
			let entries = Object.values(this.formState)
			let isValid = true
			entries.forEach((entry) => {
				if (!opts.ignoreState && (entry.state === STATES.PRISTINE || entry.state === STATES.UNTOUCHED)) {
					return
				}
				if (entry.isValid !== null && !entry.isValid) isValid = false
			})
			this.isValid = isValid
			this.informSubmits()
		},
		informSubmits () {
			let submits = Object.values(this.submits)
			submits.forEach((inform) => {
				inform(!this.isValid)
			})
		},
		validateForm () {
			this.validateAll({ignoreState: true})
			return this.isValid
		},
		watchSubmit (name, cb) {
			this.submits[name] = cb
		},
		watchEntry (name, cb) {
			this.watchers[name] = cb
		}
	}
}
</script>
