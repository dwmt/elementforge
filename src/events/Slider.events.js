const events = {
	'update:modelValue': {}
}

export default {
  container: {
		...events,
		click: {},
		dragstart: {},
		dragend: {}
	},
  renderable: {
		...events,
		input: {}
	}
}
