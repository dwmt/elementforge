export interface Appearance {
	default: boolean
	name: string
	vueComponent: any
	componentName: string
}
type Appearances = Map<string, Map<string, Appearance>>
export interface ThemeInterface {
	name: string
	appearances: Appearances
	registerAppearance(component: string, appearanceName: string, VueComponent: any, isDefault: boolean): void
}
export class Theme implements ThemeInterface {
  name: string 
  appearances: Appearances
	constructor (name: string) {
		this.name = name
		this.appearances = new Map<string, Map<string, Appearance>>()
	}
	registerAppearance (component: string, appearanceName: string, VueComponent: any, isDefault: boolean = false): void {
		if (!this.appearances.has(component)) {
			this.appearances.set(component, new Map<string, Appearance>())
		}
	
		if (isDefault) {
			for(const appearanceKey of this.appearances.get(component)!.keys()){
				this.appearances.get(component)!.get(appearanceKey)!.default = false
			}
		}
	
		let def = isDefault
		if (!this.appearances.get(component)!.size) {
			def = true
		}
	
		this.appearances.get(component)!.set(appearanceName, {
			default: def,
			name: appearanceName,
			vueComponent: VueComponent,
			componentName: `${this.name}-${component}-${appearanceName}`
		}) 
	}
}
