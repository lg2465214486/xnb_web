import messages from './locale/index'


let i18nConfig = {
  locale: localStorage.getItem("language") ? localStorage.getItem("language") : 'en',
  messages
}

// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const i18n = new VueI18n(i18nConfig)
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	i18n,
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import { createI18n } from 'vue-i18n'
const i18n = createI18n(i18nConfig)
export function createApp() {
  const app = createSSRApp(App)
  app.use(i18n)
  return {
    app
  }
}
// #endif