import Auth from '../../../api/auth'
import Cookies from 'js-cookie'
import _ from 'lodash'

const state = {
  user: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null,
  isMailSend: false,
  isPasswordReset: false
}

const mutations = {
  LOGIN_SUCCESS (state, data) {
    const user = _.pick(data.data.user, ['id', 'uid', 'name', 'email'])
    const token = data.data.token_type + ' ' + data.data.access_token
    state.user = user
    if (data.remember === 1) {
      Cookies.set('token', token, { expires: 7 })
      Cookies.set('user', JSON.stringify(user), { expires: 7 })
    } else {
      Cookies.set('token', token)
      Cookies.set('user', JSON.stringify(user))
    }
  },
  AUTH_LOGOUT (state) {
    state.user = null
    Cookies.remove('user')
    Cookies.remove('token')
  },
  SEND_RESET_MAIL_SUCCESS (state) {
    state.isMailSend = true
  },
  RESET_PASSWORD_SUCCESS (state) {
    state.isPasswordReset = true
  }
}

const actions = {
  async login ({ commit }, params) {
    const { data } = await Auth.login(params)
    commit('LOGIN_SUCCESS', { data: data, remember: params.remember }) // 登录成功设置cookie
  },
  async logout ({ commit }) {
    await Auth.logout()
    commit('AUTH_LOGOUT')
  },
  async sendResetEmail ({ commit }, params) {
    await Auth.passwordEmail(params)
    commit('SEND_RESET_MAIL_SUCCESS')
  },
  async resetPassword ({ commit }, params) {
    await Auth.passwordReset(params)
    commit('RESET_PASSWORD_SUCCESS')
  }
}

const getters = {
  getAuthUser: state => state.user,
  getMenu: state => state.menu
}

export default {
  state,
  mutations,
  actions,
  getters
}
