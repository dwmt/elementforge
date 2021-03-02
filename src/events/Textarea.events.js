const events = ['click', 'focus', 'blur', 'input', 'keyup']

export default {
  container: ['update:modelValue', ...events],
  renderable: [...events]
}
