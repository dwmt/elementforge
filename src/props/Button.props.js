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

export default {
  container: {
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
	},
  renderable: {
		isLoading: {
			default: null
		},
		...props
	}
}
