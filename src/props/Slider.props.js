const props = {
  animated: {
    type: Boolean,
    required: false,
    default: false
  },
  min: {
    type: Number,
    required: false,
    default: 0
  },
  max: {
    type: Number,
    required: false,
    default: 100
  },
  step: {
    type: Number,
    required: false,
    default: 1
  }
}

export default {
  container: {
		modelValue: {
			type: Number
		},
		...props
	},
  renderable: {
		value: {
			type: Number
		},
		...props
	}
}
