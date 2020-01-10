<script>
export default {
	name: 'RenderableComponent',
	props: {
		modifier: {
			type: String
		},
		name: {
			type: String
		},
		isValid: {
			type: Boolean,
			default: true
		},
		errors: {
			type: Array
		},
		properties: {
			type: Object
		},
		darkMode: {
			type: Boolean,
			default: false
		}
	}
}
</script>
