<script lang="ts">
import {defineComponent} from 'vue'
export default defineComponent({
	name: 'RenderableComponent',
	props: {
		modifiers: {
			type: Array,
			default: () => { return [] }
		},
		name: {
			type: String
		},
		isValid: {
			default: null
		},
		errors: {
			type: Array,
			default: () => []
		},
		properties: {
			type: Object,
			default: () => { return {} }
		},
		darkMode: {
			type: Boolean,
			default: false
		}
	}
})
</script>
