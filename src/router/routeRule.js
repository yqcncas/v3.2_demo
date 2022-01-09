import path from 'path'
/**
 * 获取所有子集路由
 */
const getChildrenRoutes = routes => {
  let result = []
  routes.forEach(item => {
    if (item.children && item.children.length > 0) {
      result = [...result, ...item.children]
    }
  })
  return result
}

/**
 * 处理脱离层级的路由 也就是二级也被展示了 他应该在一级菜单里
 */
export const filterRoutes = routes => {
  // 所有的子级路由
  const childrenRoutes = getChildrenRoutes(routes)
  // 根据子集路由进行查重 把二级菜单显示在一级上的给他干掉
  return routes.filter(item => {
    // 因为存在了 则取反 给他剔除掉 filter false 不返回
    return !childrenRoutes.find(it => {
      return it.path === item.path
    })
  })
}

/**
 * 根据routes数据 返回menu信息数据
 */
 export const generateMenus = (routes, basePath = '') => {
   const result = []
   routes.forEach(item => {
     // 如果没children 且不存在meta 直接返回即可 也就是login 401 404这些页面
     if (isNull(item.children) && isNull(item.meta)) return
     // 有children 无meta 则递归执行插入数据
     if (isNull(item.meta) && !isNull(item.children)) {
       result.push(...generateMenus(item.children))
       return
     }
     // 如果没children 有meta 一般为一级 由于上面判断/路由 login 就不在上面了  进行路由合并 不拼接怎么跟上子级路径
     const routePath = path.resolve(basePath, item.path)

     // 可能存在同名父级路由 判断有没有
     let route = result.find(item => item.path === routePath)
     // 尚未有该一级目录
     if (!route) {
       // 基础配置
      route = {
        ...item,
        path: routePath,
        children: []
      }
      // 有icon 和 title情况直接插入 也就是平常的一级路由
      if (route.meta.icon && route.meta.title) {
        result.push(route)
      }
     }
      // 若数据 有children 有 meta 则就是插入子级 并带上基础路径
      if (!isNull(item.children)) {
        route.children.push(...generateMenus(item.children, route.path))
      }
   })
   return result
 }

 /**
  * 判断是否是空值
  */

const isNull = (data) => {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
}
