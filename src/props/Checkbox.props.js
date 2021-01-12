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

const container = {
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
}

const renderable = {
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

export default {
  container,
  renderable
}
