<script>
export default {
	name: 'Componentable',
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
		}
	}
}
</script>
