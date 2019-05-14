import Vue from 'vue'
import App from './App'
import axios from 'axios'
import '@/styles/index.scss'
import './assets/svg'

Vue.config.productionTip = false
Vue.axios = Vue.prototype.$axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
