// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/index'

Vue.config.productionTip = false

if (typeof window !== 'undefined') {
  let expiresAt = new Date(parseInt(window.localStorage.getItem('expiresIn')))
  var currentDate = new Date()

  if (expiresAt !== null && expiresAt > currentDate) {
    store.state.isAuthenticated = true
  }
}

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

export {app, router, store}
