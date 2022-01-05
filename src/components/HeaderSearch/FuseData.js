import Path from 'path'
import i18n from '@/i18n'
export const generateRoutes = (routes, basePath = '/', prefixTitle = []) => {
  // 创建result数据
  let res = []
  for (const route of routes) {
    // 我们只需要用到path和title
    const data = {
      path: Path.resolve(basePath, route.path),
      title: [...prefixTitle]
    }
    // 存在meta需要国际化
    // 且动态路由不允许被检索
    const reg = /.*\/:.*/ // 匹配:号
    if (route.meta && route.meta.title && !reg.exec(route.path) && !res.find(item => item.path === data.path)) {
      const i18nTitle = i18n.global.t(`route.${route.meta.title}`)
      data.title = [...data.title, i18nTitle]
      res.push(data)
    }
    // 若有子级
    if (route.children) {
      const childrenRoutes = generateRoutes(route.children, data.path, data.title)
      if (childrenRoutes.length) {
        res = [...res, ...childrenRoutes]
      }
    }
  }
  return res
}
