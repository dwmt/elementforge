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
			type: Boolean
		},
		errors: {
			type: Array
		},
		properties: {
			type: Object
		},
		loader: {
			type: Object
		},
		darkMode: {
			type: Boolean,
			default: false
		}
	}
}
</script>
