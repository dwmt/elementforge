const events = {
	'update:modelValue': {},
}

const container = {
	...events,
	focus: {},
	blur: {},
	click: {},
	keyup: {},
	keydown: {},
	keypress: {}
}

const renderable = {
  ...events
}

export default {
  container,
  renderable
}
