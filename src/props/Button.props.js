const props = {
  data: {
    type: Object
  },
  text: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false
  }
}

const container = {
  type: {
    type: String,
    required: false,
    default: 'default'
  },
  formInstance: {
    type: Object,
    default () {
      return null
    }
  },
  ...props
}

const renderable = {
  isLoading: {
    default: null
  },
  ...props
}

export default {
  container,
  renderable
}
