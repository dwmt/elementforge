const props = {
  label: {},
  data: {},
  disabled: {
    default: false,
    type: Boolean
  }
}

const container = {
	modelValue: {},
  ...props
}

const renderable = {
  ...props,
	value: {},
  checked: {
    type: Boolean,
    default: false
  }
}

export default {
  container,
  renderable
}
