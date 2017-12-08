import Vue from 'vue'
import Vuex from 'vuex'
import appService from '../app.service'

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
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('tokenExpiration')
      }
      state.isAuthenticated = false
    },
    login (state, token) {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('token', token.token)
        window.localStorage.setItem('tokenExpiration', token.expiration)
      }
      state.isAuthenticated = true
    }

  }
})

if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function (event) {
    let expiration = window.localStorage.getItem('tokenExpiration')
    var unixTimestamp = new Date().getTime() / 1000

    if (expiration !== null && parseInt(expiration) - unixTimestamp > 0) {
      store.state.isAuthenticated = true
    }
  })
}

export default store
