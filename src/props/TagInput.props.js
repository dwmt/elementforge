const props = {
  required: {
    default: false
  },
  disabled: {
    default: false
  },
  editable: {
    default: true
  },
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number
  },
  label: {
    type: String
  }
}

const container = {
  ...props,
  modelValue: {
    type: Array,
    default: () => []
  }
}

const renderable = {
  ...props,
  modelValue: {
    type: String,
    default: ''
  },
  tags: {
    type: Array
  }
}

export default {
  container: Object.assign({}, container),
  renderable: Object.assign({}, renderable)
}
