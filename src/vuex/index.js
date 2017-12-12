import Vue from 'vue'
import Vuex from 'vuex'
import appService from '../app.service'
import { router } from '@/main'

Vue.use(Vuex)

const state = {
  isAuthenticated: false
}

const store = new Vuex.Store({
  state,
  getters: {
    isAuthenticated: (state) => {
      return state.isAuthenticated
    }
  },
  actions: {
    logout (context) {
      context.commit('logout')
    },
    login (context, credentials) {
      return new Promise((resolve) => {
        appService.login(credentials)
          .then((data) => {
            context.commit('login', data)
            resolve()
          })
          .catch(() => {
            window.alert('Could not Login!')
          })
      })
    }
  },
  mutations: {
    logout (state) {
      if (typeof window !== 'undefined') {
        var tokenId = window.localStorage.getItem('tokenId')
        window.localStorage.removeItem('acessToken')
        window.localStorage.removeItem('expiresIn')
        window.localStorage.removeItem('tokenId')
        appService.revokeToken(tokenId)
        router.push('/login')
      }
      state.isAuthenticated = false
    },
    login (state, token) {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('tokenId', token.tokenId)
        window.localStorage.setItem('acessToken', token.acessToken)
        window.localStorage.setItem('expiresIn', token.expiresIn)
      }
      state.isAuthenticated = true
    }

  }
})

export default store
