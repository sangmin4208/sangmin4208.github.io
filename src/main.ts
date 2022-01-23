import { ComponentPublicInstance, createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { auth } from './firebase/config'
// global styles
import { onAuthStateChanged } from 'firebase/auth'
import './assets/global.scss'
import 'highlight.js/styles/monokai.css'
import 'mosha-vue-toastify/dist/style.css'

let app: ComponentPublicInstance

onAuthStateChanged(auth, () => {
  if (app) {
    return
  }
  app = createApp(App).use(router).mount('#app')
})
