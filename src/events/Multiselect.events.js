const events = {

}

const container = {
	...events,
	blur: {},
	'update:modelValue': {},
	focus: {}
}

const renderable = {
	...events,
	select: {},
	selectAll: {},
	delete: {},
	deleteAll: {}
}

export default {
  container,
  renderable
}
