import axios from 'axios'

axios.defaults.baseURL = 'https://aaa-node.herokuapp.com'
// axios.defaults.baseURL = 'http://localhost:9090'

axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.post['Accept'] = 'application/json, text/plain, */*'
axios.defaults.headers.post['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, Authorization, Access-Control-Allow-Origin'

axios.interceptors.request.use(function (config) {
  if (window === 'undefined') {
    return config
  }
  const token = window.localStorage.getItem('acessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

const appService = {
  getUsers () {
    return new Promise((resolve, reject) => {
      axios.get('/users')
        .then(response => {
          resolve(response.data)
        }).catch(response => {
          reject(response.status)
        })
    })
  },
  login (credentials) {
    return new Promise((resolve, reject) => {
      axios.post('/token/generate', credentials)
        .then(response => {
          resolve(response.data)
        }).catch(response => {
          reject(response.status)
        })
    })
  },
  revokeToken (tokenId) {
    axios.post(`/token/invalidate/${tokenId}`)
      .then(() => console.info('token invalidated successfully.'))
      .catch(() => console.error('Unable to Invalidate token.'))
  }
}

export default appService
