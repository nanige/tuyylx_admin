// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iview from 'iview'
import axios from 'axios'
import cookie from 'vue-cookie'

import './assets/css/pulic.css'
import './assets/iconfont/iconfont.css'

import 'iview/dist/styles/iview.css'

Vue.use(iview)
Vue.use(cookie)
Vue.config.productionTip = false
Vue.prototype.$http = axios

axios.defaults.withCredentials = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
