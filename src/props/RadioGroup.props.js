const props = {
  modelmodelValue: {},
  required: {
    default: false,
    type: Boolean
  },
  disabled: {
    default: false,
    type: Boolean
  }
}

const container = {
  ...props
}

const renderable = {
  ...props
}

export default {
  container,
  renderable
}
