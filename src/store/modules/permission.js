import { publicRoutes, privateRoutes } from '@/router/'
export default {
  namespaced: true,
  state: () => ({
    routes: publicRoutes
  }),
  mutations: {
    // 增加路由
    setRoutes(state, newRoutes) {
      state.routes = [...publicRoutes, ...newRoutes]
    }
  },
  actions: {
    filterRoutes({ commit }, menus) {
      const routes = [] // 筛选后 需要添加的路由表
      menus.forEach(name => {
        routes.push(...privateRoutes.filter(item => item.name === name))
      })
      // 最后添加404页面
      routes.push({ path: '/:pathMatch(.*)*', redirect: '/404' })
      commit('setRoutes', routes)
      return routes
    }
  }
}
