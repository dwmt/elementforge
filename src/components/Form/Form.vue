<template>
<div class="form">
	<slot></slot>
</div>
</template>
<script>
import Props from '../../props/index.js'

import { STATES } from '../../consts'

const v = require('vindication.js')

export default {
	name: 'Form',
	props: Props.Form.container,
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
				console.log('Value changed...')
				this.validateAll()
			}
		},
		isValid (newVal) {
			this.$emit('validation', newVal)
		}
	},
	methods: {
		resetForm (valueReset = true) {
			if (valueReset) {
				this.$emit('input', this.resetValue)
			}
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
				this.value[name],
				this.rules[name]
			)
			let isValid = validation === null
			let errors = []
			this.formState[name].isValid = isValid
			this.formState[name].errors = errors
			if (validation !== null) {
				errors = (Array.isArray(validation)) ? validation : [validation]
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
