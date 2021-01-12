const events = {
	'update:modelValue': {}
}

const container = {
	...events,
	click: {},
	dragstart: {},
	dragend: {}
}

const renderable = {
  ...events
}

export default {
  container,
  renderable
}
