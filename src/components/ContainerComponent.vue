<script>
import RenderableComponent from "./RenderableComponent.vue"

const Loader = require('@dwmt/loader/lib/Loader')
import container from '../Container'
import bus from '../CommunicationBus.js'
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
		bus.on('darkMode:change', (darkMode) => {
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
