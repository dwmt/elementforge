const props = {
  useAutocomplete: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: ''
  },
  type: {},
  modelValue: {},
  displayValue: {
    type: String,
    default: ''
  },
  editable: {
    type: Boolean,
    default: true
  },
  required: {
    default: false,
    type: Boolean
  },
  disabled: {
    default: false,
    type: Boolean
  },
  precision: {
    type: Number,
    default: 0
  },
  max: {
    type: Number
  },
  min: {
    type: Number
  },
  options: {
    type: Array,
    default: () => []
  }
}

export default {
  container: {
		...props,
		behaviour: {
			type: String,
			default: 'input'
		},
		autoFilter: {
			type: Boolean,
			default: () => true
		}
	},
  renderable: {
		...props,
		selectedOption: {
			type: Number,
			default: () => 0
		},
		visible: {
			type: Boolean,
			default: () => false
		},
		selectedIndex: {
			type: Number,
			default: () => -1
		}
	}
}
