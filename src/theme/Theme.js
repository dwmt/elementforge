function Theme (name) {
	this.name = name
	this.appearances = {}
}

Theme.prototype.install = function (container, VueInst) {
	try {
		container.registerTheme(this.name)
		Object.keys(this.appearances).forEach((componentKey) => {
			container.registerComponent(this.name, componentKey)
			Object.keys(this.appearances[componentKey]).forEach((appearanceKey) => {
				let appearanceObject = this.appearances[componentKey][appearanceKey]
				container.registerAppearance(this.name, componentKey, appearanceObject)
				VueInst.component(appearanceObject.componentName, appearanceObject.vueComponent)
			})
		})
	} catch (e) {}
}

Theme.prototype.registerAppearance = function (component, appearanceName, VueComponent, isDefault = false) {
	if (!this.appearances[component]) {
		this.appearances[component] = {}
	}

	if (isDefault) {
		Object.keys(this.appearances[component]).forEach((appearanceKey) => {
			this.appearances[component][appearanceKey].default = false
		})
	}

	let def = isDefault
	if (!Object.keys(this.appearances[component]).length) {
		def = true
	}

	this.appearances[component][appearanceName] = {
		default: def,
		name: appearanceName,
		vueComponent: VueComponent,
		componentName: `${this.name}-${component}-${appearanceName}`
	}
}

export default Theme
