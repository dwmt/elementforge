const events = {
	'update:modelValue': {},
	click: {}
}

const container = {
	...events,
	focus: {},
	blur: {},
	keyup: {}
}

const renderable = {
  ...events
}

export default {
  container,
  renderable
}
