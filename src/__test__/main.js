import { createApp } from 'vue'
import App from './App.vue'
import ElementForge from '../ElementForge.js'

const app = createApp(App)

app.use(ElementForge)

app.mount('#app')
