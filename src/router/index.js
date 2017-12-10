import Vue from 'vue'
import Router from 'vue-router'
import Initial from '@/components/Initial'
import Login from '@/components/Login'
import FullLayout from '@/components/FullLayout'

Vue.use(Router)

const router = new Router({
  mode: 'history',
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
          alias: '',
          component: Initial,
          name: 'Initial',
          meta: {description: 'Initial GHIP Page'}
        }]
    }]
})

router.beforeEach((to, from, next) => {
  console.log('Check if AUthenticated and in not redirect to Login!!!!')
  next()
})

export default router
