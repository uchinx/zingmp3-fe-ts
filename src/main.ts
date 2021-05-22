import { createApp } from 'vue'
import PerfectScrollbar from 'vue3-perfect-scrollbar'
import VueTippy from 'vue-tippy'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'

import App from './App.vue'
import routes from './routes'
import store from './store'

import './assets/styles/app.scss'
import 'tippy.js/dist/tippy.css' 

const app = createApp(App)
app.use(store)
app.use(routes)
app.use(PerfectScrollbar)
app.use(VueTippy)
app.mount('#app')
