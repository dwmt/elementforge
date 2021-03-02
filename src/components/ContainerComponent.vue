<script>
import RenderableComponent from "./RenderableComponent.vue"
import { Loader } from '@dwmt/loader'
export default {
	name: 'ContainerComponent',
	extends: RenderableComponent,
	data () {
		return {
			globalDarkMode: false,
			loader: null,
			isLoading: false
		}
	},
	props: {
		theme: {
			type: String
		},
		appearance: {
			type: String
		},
		validable: {
			type: Boolean,
			default: true
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
			let theme = this.$furnace.getDefaultTheme()
			if (this.theme) {
				theme = this.theme
			}
			let appearance = this.$furnace.getAppearance(theme, this.component, this.appearance)
			if (!appearance) {
				return this.defaultComponent
			}
			return appearance.componentName
		}
	},
	beforeMount () {
		this.globalDarkMode = this.$furnace.onDarkMode((darkMode) => {
			this.globalDarkMode = darkMode
		})
		this.loader = new Loader({
			onActivation: () => {
				this.isLoading = true
			},
			onTermination: () => {
				this.isLoading = false
			}
		})
	}
}
</script>
