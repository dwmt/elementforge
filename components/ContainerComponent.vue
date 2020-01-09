<script>
import Componentable from './Componentable'
import CTC from '../lib/theme/ComponentThemeContainer'
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
			let theme = CTC.getDefaultTheme()
			if (this.theme) {
				theme = this.theme
			}
			let appearance = CTC.getAppearance(theme, this.component, this.appearance)
			if (!appearance) {
				return this.deafultComponent
			}
			return appearance.componentName
		}
	}
}
</script>
