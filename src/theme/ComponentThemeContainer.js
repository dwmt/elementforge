function ComponentThemeContainer (options) {
	this.themes = {},
	this.defaultTheme = 'default'
	this.darkMode = false
	this.strict = options.strict || false
}

ComponentThemeContainer.prototype.registerTheme = function (name) {
	if (this.themes[name] && this.strict) {
		throw new Error(`Theme ${name} already exists`)
	}
	if (name === 'default') {
		throw new Error(`Name default is reserved`)
	}
	this.themes[name] = {}
}

ComponentThemeContainer.prototype.setStrictMode = function (strict) {
	this.strict = strict
}

ComponentThemeContainer.prototype.setDarkMode = function (state = true) {
	this.darkMode = state
}
ComponentThemeContainer.prototype.getDarkMode = function () {
	return this.darkMode
}

ComponentThemeContainer.prototype.registerComponent = function (theme, component) {
	if (!this.themes[theme] && this.strict) {
		throw new Error(`Theme ${theme} does not exist`)
	}
	if (!this.themes[theme][component]) {
		this.themes[theme][component] = { defaultAppearance: '' }
	}
}

ComponentThemeContainer.prototype.registerAppearance = function (theme, component, appearance) {
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

ComponentThemeContainer.prototype.setDefaultTheme = function (theme) {
	if (theme === 'default' || Object.keys(this.themes).includes(theme)) {
		this.defaultTheme = theme
	} else {
		throw new Error(`Theme ${theme} does not exist`)
	}
}

ComponentThemeContainer.prototype.getDefaultTheme = function () {
	return this.defaultTheme
}

ComponentThemeContainer.prototype.getAppearance = function (theme, component, appearanceName) {
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

export default ComponentThemeContainer
