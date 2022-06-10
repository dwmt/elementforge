import { createApp } from 'vue'
import ElementForge from '../src/ElementForge'
import App from './App.vue'
import LineButton from './LineButton.vue'

const ExampleTheme = new ElementForge.Theme('example')

ExampleTheme.registerAppearance('Button', 'line', LineButton, true)

const elementForge = ElementForge.createFurnace()
elementForge.use(ExampleTheme)
elementForge.setDefaultTheme('example')

createApp(App).use(elementForge).mount('#app')
