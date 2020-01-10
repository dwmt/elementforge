<script>
import RenderableComponent from './RenderableComponent'
import ElementForge from '../index'
export default {
	name: 'ContainerComponent',
	extends: RenderableComponent,
	data () {
		globalDarkMode: false
	},
	props: {
		theme: {
			type: String
		},
		appearance: {
			type: String
		}
	},
	computed: {
		darkModeState () {
			if (this.darkMode) {
				return this.darkMode
			}
			return this.globalDarkMode
		},
		renderableComponent () {
			let theme = ElementForge.container.getDefaultTheme()
			if (this.theme) {
				theme = this.theme
			}
			let appearance = ElementForge.container.getAppearance(theme, this.component, this.appearance)
			if (!appearance) {
				return this.deafultComponent
			}
			return appearance.componentName
		}
	},
	beforeMount () {
		this.globalDarkMode = ElementForge.getDarkMode((darkMode) => {
			this.globalDarkMode = darkMode
		})
	}
}
</script>
