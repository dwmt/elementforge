const props = {
  label: {
    type: String,
    default: ''
  },
  type: {},
  modelValue: {},
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
  }
}

const container = {
  ...props
}

const renderable = {
  ...props,
  editable: {}
}

export default {
  container,
  renderable
}
