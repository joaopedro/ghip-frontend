import Vue from 'vue'
import Vuex from 'vuex'
import appService from '../app.service'
import { router } from '@/main'
import decode from 'jwt-decode'

Vue.use(Vuex)

const state = {
  isAuthenticated: false,
  decodedToken: {}
}

const store = new Vuex.Store({
  state,
  getters: {
    isAuthenticated: (state) => {
      return state.isAuthenticated
    },
    decodedToken: (state) => {
      return state.decodedToken
    },
    tokenId: (state) => {
      return state.decodedToken.jti
    },
    userGivenName: (state) => {
      return state.decodedToken.given_name
    }
  },
  actions: {
    logout (context) {
      context.commit('logout', context.getters.tokenId)
    },
    login (context, credentials) {
      return new Promise((resolve, reject) => {
        appService.login(credentials)
          .then((data) => {
            context.commit('login', data)
            resolve()
          })
          .catch((data) => {
            reject(data)
          })
      })
    },
    parseToken (context, data) {
      context.commit('parseToken', data)
    }
  },
  mutations: {
    logout (state, tokenId) {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('acessToken')
        window.localStorage.removeItem('expiresIn')
        appService.revokeToken(tokenId)
        router.push('/login')
      }
      state.isAuthenticated = false
    },
    login (state, token) {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('acessToken', token.acessToken)
        window.localStorage.setItem('expiresIn', token.expiresIn)
      }
      state.decodedToken = decode(token.acessToken)
      state.isAuthenticated = true
    },
    parseToken (state, token) {
      state.decodedToken = decode(token)
      state.isAuthenticated = true
    }

  }
})

export default store
