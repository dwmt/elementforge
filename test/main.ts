import { createApp } from 'vue'
import { createFurnace } from '../src/ElementForge'
import App from './App.vue'

const elementForge = createFurnace()

createApp(App).use(elementForge).mount('#app')
