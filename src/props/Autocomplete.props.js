const props = {
  label: {
    type: String,
    default: ''
  },
  type: {},
  modelValue: {},
  displaymodelValue: {
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

const container = {
  ...props,
  behaviour: {
    type: String,
    default: 'input'
  },
  autoFilter: {
    type: Boolean,
    default: () => true
  }
}

const renderable = {
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

export default {
  container,
  renderable
}
