const props = {
  options: {
    type: Array,
    default: () => []
  },
  required: {
    default: false
  },
  label: {},
  disabled: {
    default: false,
    type: Boolean
  }
}

export default {
  container: {
		modelValue: {},
		...props
	}
	,
  renderable: {
		...props,
		value: {},
		toggled: {
			type: Boolean,
			default: false
		},
		selectedIndex: {
			type: Number,
			default: -1
		}
	}
}
