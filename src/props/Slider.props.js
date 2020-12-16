const props = {
  value: {
    type: Number
  },
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
