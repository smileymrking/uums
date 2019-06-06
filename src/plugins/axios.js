import axios from 'axios'
import store from '../store'
import Cookies from 'js-cookie'

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  withCredentials: false,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  timeout: 100000
})

instance.interceptors.request.use((config) => {
  config.headers['Authorization'] = Cookies.get('token') || null
  config.headers['Accept-Language'] = localStorage.getItem('language') || 'zh-CN'
  return config
}, (error) => {
  return Promise.reject(error)
})

instance.interceptors.response.use((res) => {
  return res.data
}, (error) => {
  if (error.response && error.response.status === 401) store.commit('AUTH_LOGOUT')
  return Promise.reject(error)
})

export default instance
