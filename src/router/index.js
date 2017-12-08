import Vue from 'vue'
import Router from 'vue-router'
import Initial from '@/components/Initial'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Initial',
      component: Initial
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }

  ]
})
