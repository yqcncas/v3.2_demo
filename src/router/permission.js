import router from '@/router'
import store from '@/store'

const whiteList = ['/login'] // 用户没登录时也可访问的页面

router.beforeEach(async (to, from, next) => {
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      // 判断用户资料是否存在 不存在则调用获取用户信息
      if (store.getters.hasUserInfo) {
        const { permission } = await store.dispatch('user/userInfo')
        // 处理权限
        const filterRoutes = await store.dispatch('permission/filterRoutes', permission.menus)
        filterRoutes.forEach(item => {
          router.addRoute(item)
        })
        // 添加完路由 需要进行主动跳转
        return next(to.path)
      }
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
