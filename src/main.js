import Vue from 'vue'
import JsonViewer from 'vue-json-viewer'
import 'jquery'
import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import './styles/index.scss' // global css
import '../node_modules/bootstrap/dist/css/bootstrap.css'

import App from './App'
import router from './router'
import store from './store'

import i18n from './lang' // Internationalization
import './icons' // icon
import './errorLog' // error log
import './permission' // permission control
import './mock' // simulation data
import VCharts from 'v-charts'
import * as filters from './filter' // global filters
import dateUtil from './utils/dateAppUtil'
Vue.use(dateUtil)
Vue.use(VCharts)
Vue.use(JsonViewer)
Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

// router.beforeEach((to, from, next) => {
//   to.meta.keepAlive = true
// })
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
