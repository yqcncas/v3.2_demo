import { login, getUserInfo } from '@/api/sys.js'
import md5 from 'md5'
import router from '@/router'
import { setTimeStap } from '@/utils/auth.js'
export default {
  namespaced: true,
  state: () => ({
    token: localStorage.getItem('token') || '',
    userInfo: {}
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    login ({ commit }, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({
          username,
          password: md5(password)
        })
          .then(data => {
            console.log(data)
            commit('setToken', data.token)
            setTimeStap()
            router.replace('/')
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    async userInfo ({ commit }) {
      const res = await getUserInfo()
      console.log(res)
      commit('setUserInfo', res)
      return res
    },
    // 退出
    logout ({ commit }) {
      commit('setToken', '')
      commit('setUserInfo', {})
      localStorage.clear()
      router.replace('/login')
    }
  }
}
