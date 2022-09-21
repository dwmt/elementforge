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
	type: String | Number
  },
  max: {
  	default: '',
	type: String | Number
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
			default: false
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
