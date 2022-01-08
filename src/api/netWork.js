import axios from 'axios'
import { ElNotification } from 'element-plus'
import { h } from 'vue'
// import router from '@/router'
import { isCheckTimeout } from '@/utils/auth.js'
import store from '@/store'
const service = axios.create(
  {
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
  }
)

service.interceptors.request.use(config => {
  config.headers['Accept-Language'] = localStorage.getItem('lang')
  if (localStorage.getItem('token')) {
    // 是否登录超时
    if (isCheckTimeout()) {
      store.dispatch('user/logout')
      return Promise.reject(new Error('token 失效'))
    }
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

service.interceptors.response.use(response => {
  const { success, message, data } = response.data
  if (success) {
    return data
  } else {
    ElNotification({
      title: '错误提示',
      message: h('i', { style: 'color: teal' }, message),
      type: 'error'
    })
    return Promise.reject(new Error(message))
  }
},
error => {
  // token超时
  if (error.response && error.response.status === 401) {
    store.dispatch('user/logout')
  }

  error.response && ElNotification({
    title: error.response.status,
    message: h('i', { style: 'color: teal' }, error.response.data),
    type: 'error'
  })
  return Promise.reject(new Error(error))
}
)

export default service
