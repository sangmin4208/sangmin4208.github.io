import { createApp, App } from 'vue'
import AppComponent from './App.vue'
import router from './router'
import { auth } from './firebase/config'
import { onAuthStateChanged } from 'firebase/auth'

// global styles
import './assets/global.scss'
import 'mosha-vue-toastify/dist/style.css'

// Markdown

let app: App<Element>
onAuthStateChanged(auth, () => {
  if (app) {
    return
  }
  app = createApp(AppComponent)
  app.use(router)
  app.mount('#app')
})
