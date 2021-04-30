import { createApp } from 'vue'
import App from './App.vue'
import routes from './routes'
import i18n from './locales'
import store from './store'

import './assets/styles/app.scss'
import 'eva-icons/style/eva-icons.css'

const app = createApp(App)
app.use(store)
app.use(routes)
app.use(i18n)
app.mount('#app')
