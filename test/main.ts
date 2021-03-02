import { createApp } from 'vue'
import { createFurnace, Theme } from '../src/ElementForge'
import App from './App.vue'
import LineButton from './LineButton.vue'

const ExampleTheme = new Theme('example')

ExampleTheme.registerAppearance('Button', 'line', LineButton, true)

const elementForge = createFurnace()
elementForge.use(ExampleTheme)
elementForge.setDefaultTheme('example')

createApp(App).use(elementForge).mount('#app')
