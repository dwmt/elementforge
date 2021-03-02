const props = {
  label: {
    type: String,
    required: false
  },
  showPercentage: {
    type: Boolean,
    required: false,
    default: false
  },
  animated: {
    type: Boolean,
    required: false,
    default: false
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
