import Vue from 'vue'
import Router from 'vue-router'
import Initial from '@/components/Initial'
import Login from '@/components/Login'
import FullLayout from '@/components/FullLayout'
import { store } from '@/main'
import AccessManagment from '@/components/accessmanagement/AccessManagement'

Vue.use(Router)

const router = new Router({
  linkActiveClass: 'is-active',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      component: FullLayout,
      children: [
        {
          path: 'init',
          component: Initial,
          name: 'Initial',
          meta: {description: 'Initial GHIP Page'}
        },
        {
          path: 'accessmanagement',
          component: AccessManagment,
          name: 'AccessManagment',
          meta: {description: 'Managing security entities'}
        }]
    }]
})

router.beforeEach((to, from, next) => {
//  TODO: Cache a boolean to determine if we came from the application and in that case do a back after a login.
  if (store.getters.isAuthenticated || to.path === '/login') {
    next()
  } else {
    router.push('/login')
  }
})

export default router
