import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVueStyled from 'primevue/styled'

const app = createApp(App)

app.use(router)
app.use(PrimeVueStyled)

app.mount('#app')
