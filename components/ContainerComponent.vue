<script>
import Componentable from './Componentable'
import {container} from '../index'
export default {
	name: 'ContainerComponent',
	extends: Componentable,
	props: {
		theme: {
			type: String
		},
		appearance: {
			type: String
		}
	},
	computed: {
		renderableComponent () {
			let theme = container.getDefaultTheme()
			if (this.theme) {
				theme = this.theme
			}
			let appearance = container.getAppearance(theme, this.component, this.appearance)
			if (!appearance) {
				return this.deafultComponent
			}
			return appearance.componentName
		}
	}
}
</script>
