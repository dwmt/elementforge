const props = {
  label: {
    type: String
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    default: false
  }
}

export default {
  container: {
		...props,
		data: {
			type: Object
		},
		truemodelValue: {
			default: true
		},
		falsemodelValue: {
			default: false
		},
		modelValue: {}
	},
  renderable: {
		...props,
		checked: {
			type: Boolean,
			default: false
		},
		isLoading: {
			default: null
		},
		data: {}
	}
}
