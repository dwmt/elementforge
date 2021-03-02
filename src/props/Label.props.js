const props = {
  value: {
    default: ''
  },
  label: {
    type: String
  },
  disabled: {
    type: Boolean,
    deafult: false
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
