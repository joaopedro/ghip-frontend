import Vue from 'vue'
import Vuex from 'vuex'
import aaaService from '@/services/aaa.service'
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
    },
    userUsername: (state) => {
      return state.decodedToken.sub
    }

  },
  actions: {
    logout (context) {
      context.commit('logout', context.getters.tokenId)
    },
    login (context, credentials) {
      return new Promise((resolve, reject) => {
        aaaService.login(credentials)
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
        window.localStorage.removeItem('accessToken')
        window.localStorage.removeItem('expiresIn')
        aaaService.revokeToken(tokenId)
        router.push('/login')
      }
      state.isAuthenticated = false
    },
    login (state, token) {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('accessToken', token.accessToken)
        window.localStorage.setItem('expiresIn', token.expiresIn)
      }
      state.decodedToken = decode(token.accessToken)
      state.isAuthenticated = true
    },
    parseToken (state, token) {
      state.decodedToken = decode(token)
      state.isAuthenticated = true
    }

  }
})

export default store
