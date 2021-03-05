import { createApp } from 'vue'
import App from './App.vue'
import routes from './routes'
import i18n from './locales'

import './assets/styles/app.scss'
import 'eva-icons/style/eva-icons.css'


createApp(App).use(routes).use(i18n).mount('#app')
