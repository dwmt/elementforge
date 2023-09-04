const props = {
  modelValue: {},
  type: {
    type: String,
    default: 'date'
  },
  label: {
    type: String,
    default: ''
  },
  required: {
    default: false,
    type: Boolean
  },
  disabled: {
    default: false,
    type: Boolean
  },
  min: {
    default: '',
	type: String
  },
  max: {
    default: '',
	type: String
  }
}

export default {
  container: {
		...props,
		modal: {
			type: Boolean,
			default: false
		},
		returnDate: {
			type: Boolean,
			default: true
		},
		pointOfTime: {
			type: String,
		},
		defaultDate: {
			default: () => new Date()
		},
		format: {
			type: String
		}
	},
  renderable: props
}
