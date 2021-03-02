const events = {
	'update:modelValue': {},
	click: {},
	input: {}
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
