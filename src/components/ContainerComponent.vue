<script>
import RenderableComponent from './RenderableComponent.vue'
import container from '../Container'
import bus from '../Bus'
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
			let theme = container.getDefaultTheme()
			if (this.theme) {
				theme = this.theme
			}
			let appearance = container.getAppearance(theme, this.component, this.appearance)
			if (!appearance) {
				return this.defaultComponent
			}
			return appearance.componentName
		}
	},
	beforeMount () {
		this.globalDarkMode = container.getDarkMode()
		bus.$on('darkMode:change', (darkMode) => {
			this.globalDarkMode = darkMode
		})
	}
}
</script>
