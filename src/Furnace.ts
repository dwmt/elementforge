import { App } from 'vue'
import { TinyEmitter } from 'tiny-emitter'
import { ThemeInterface } from './theme/Theme' 
import { furnaceKey } from './symbols'

import componentLibrary from './components/index.js'

export type ElementForgeOptions = {
	darkMode?: boolean
	strict?: boolean,
	installOptions?: any
	defaultTheme?: string
}

export class Furnace {
	bus: TinyEmitter
	darkMode: boolean
	strict: boolean
	installOptions: any
	themes: any
	defaultTheme: string
	app?: App
	constructor (options: ElementForgeOptions = {}) {
		this.bus = new TinyEmitter()
		this.themes = {}
		this.darkMode = options.darkMode ?? false
		this.strict = options.strict ?? false
		this.defaultTheme = options.defaultTheme ?? 'default'
		this.installOptions = {}
	}

	setInstallOptions (installOptions: any) {
		this.installOptions = installOptions
	}
	registerTheme (name: string) {
		if (this.themes[name] && this.strict) {
			throw new Error(`Theme ${name} already exists`)
		}
		if (name === 'default') {
			throw new Error('Name default is reserved')
		}
		this.themes[name] = {
			_installed: false
		}
	}

	setStrictMode (strict: boolean) {
		this.strict = strict
	}
	
	setDarkMode (state = true) {
		this.darkMode = state
		this.bus.emit('darkMode:change', state)
	}

	onDarkMode (callback: any) {
		this.bus.on('darkMode:change', callback)
		return this.darkMode
	}
	getDarkMode () {
		return this.darkMode
	}

	registerComponent (theme: string, component: string) {
		if (!this.themes[theme] && this.strict) {
			throw new Error(`Theme ${theme} does not exist`)
		}
		if (!this.themes[theme][component]) {
			this.themes[theme][component] = { defaultAppearance: '' }
		}
	}

	registerAppearance (theme: string, component: string, appearance: any) {
		if (!this.themes[theme]) {
			throw new Error(`Theme ${theme} does not exist`)
		}
		if (!this.themes[theme][component]) {
			throw new Error(`Component type ${component} does not exist in theme ${theme}`)
		}

		this.themes[theme][component][appearance.name] = appearance

		if (appearance.default) {
			this.themes[theme][component].defaultAppearance = appearance.name
		}
	}

	setDefaultTheme (theme: string) {
		if (theme === 'default' || Object.keys(this.themes).includes(theme)) {
			this.defaultTheme = theme
		} else {
			throw new Error(`Theme ${theme} does not exist`)
		}
	}
	
	getDefaultTheme (): string {
		return this.defaultTheme
	}
	
	getAppearance (theme: string, component: string, appearanceName: string) {
		if (theme !== 'default' && !this.themes[theme] && this.strict) {
			throw new Error(`Theme ${theme} does not exist`)
		}
	
		if (!this.themes[theme] || !this.themes[theme][component]) {
			return false
		}
	
		let appearance = appearanceName
		if (!appearance) {
			appearance = this.themes[theme][component].defaultAppearance
		}
		return this.themes[theme][component][appearance]
	}

	install (app: App) {
		const furnace = this
		this.app = app
		componentLibrary.install(app, this.installOptions)
		if (this.installOptions.darkMode) {
			this.setDarkMode(this.installOptions.darkMode)
		}
		if (this.installOptions.strict) {
			this.setStrictMode(this.installOptions.strict)
		}
		app.config.globalProperties.$furnace = furnace
		app.provide(furnaceKey, furnace)
		this.installRequiredThemes()
	}

	use (theme: ThemeInterface): void {
		this.registerTheme(theme.name)
		for(const componentKey of theme.appearances.keys()) {
			this.registerComponent(theme.name, componentKey)
			for(const appearanceKey of theme.appearances.get(componentKey)!.keys()) {
				const appearanceObject = theme.appearances.get(componentKey)!.get(appearanceKey)!
				this.registerAppearance(theme.name, componentKey, appearanceObject)
				
			}
		}
		if (this.app) {
			this.installTheme(theme.name)
		}
	}
	installRequiredThemes (): void {
		for(const theme of Object.keys(this.themes)) {
			if (!this.themes[theme]._installed) {
				this.installTheme(theme)
			}
		}
	}

	installTheme (themeName: string): void {
		if (!this.app) {
			return
		}
		if (!this.themes[themeName] && this.strict) {
			throw new Error(`Theme ${themeName} does not exist`)
		}
		for(const componentKey of Object.keys(this.themes[themeName])) {
			for(const appearanceKey of Object.keys(this.themes[themeName][componentKey])) {
				this.app!.component(this.themes[themeName][componentKey][appearanceKey].componentName, this.themes[themeName][componentKey][appearanceKey].vueComponent)
			}
		}
		this.themes[themeName]._installed = true
	}
}

export function createFurnace () {
	return new Furnace()
}
