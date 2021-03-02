const props = {
  disabled: {
    type: Boolean,
    default: false
  },
  label: {}
}

const container = {
  ...props,
  modelValue: {},
  options: {},
	localisation: {}
}

const renderable = {
  ...props,
  selectedItems: {
    type: Array,
    default: () => []
  },
  items: {
    type: Array,
    default: () => []
  }
}

export default {
  container,
  renderable
}
