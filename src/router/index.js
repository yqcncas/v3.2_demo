import { createRouter, createWebHashHistory } from 'vue-router'
import layout from '@/layout/index'
import UserManageRouter from './modules/UserManage'
import RoleListRouter from './modules/RoleList'
import PermissionListRouter from './modules/PermissionList'
import ArticleRouter from './modules/Article'
import ArticleCreaterRouter from './modules/ArticleCreate'
import store from '@/store'

// 私有路由表 得判断权限
export const privateRoutes = [
  UserManageRouter,
  RoleListRouter,
  PermissionListRouter,
  ArticleRouter,
  ArticleCreaterRouter
  // {
  //   path: '/user',
  //   component: layout,
  //   redirect: '/user/manage',
  //   meta: {
  //     title: 'user',
  //     icon: 'personnel'
  //   },
  //   children: [
  //     {
  //       path: '/user/manage',
  //       component: () => import('@/views/user-manage/index'),
  //       meta: {
  //         title: 'userManage',
  //         icon: 'personnel-manage'
  //       }
  //     },
  //     {
  //       path: '/user/role',
  //       component: () => import('@/views/role-list/index'),
  //       meta: {
  //         title: 'roleList',
  //         icon: 'role'
  //       }
  //     },
  //     {
  //       path: '/user/permission',
  //       component: () => import('@/views/permission-list/index'),
  //       meta: {
  //         title: 'permissionList',
  //         icon: 'permission'
  //       }
  //     },
  //     {
  //       path: '/user/info/:id',
  //       name: 'userInfo',
  //       component: () => import('@/views/user-info/index'),
  //       props: true,
  //       meta: {
  //         title: 'userInfo'
  //       }
  //     },
  //     {
  //       path: '/user/import',
  //       name: 'import',
  //       component: () => import('@/views/import/index'),
  //       meta: {
  //         title: 'excelImport'
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: '/article',
  //   component: layout,
  //   redirect: '/article/ranking',
  //   meta: {
  //     title: 'article',
  //     icon: 'article'
  //   },
  //   children: [
  //     {
  //       path: '/article/ranking',
  //       component: () => import('@/views/article-ranking/index'),
  //       meta: {
  //         title: 'articleRanking',
  //         icon: 'article-ranking'
  //       }
  //     },
  //     {
  //       path: '/article/:id',
  //       component: () => import('@/views/article-detail/index'),
  //       meta: {
  //         title: 'articleDetail'
  //       }
  //     },
  //     {
  //       path: '/article/create',
  //       component: () => import('@/views/article-create/index'),
  //       meta: {
  //         title: 'articleCreate',
  //         icon: 'article-create'
  //       }
  //     },
  //     {
  //       path: '/article/editor/:id',
  //       component: () => import('@/views/article-create/index'),
  //       meta: {
  //         title: 'articleEditor'
  //       }
  //     }
  //   ]
  // }
]

// 公有路由表 无权限也可访问
export const publicRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/',
    redirect: '/profile',
    component: layout,
    children: [
      // 个人中心
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/index.vue'),
        meta: {
          title: 'profile',
          icon: 'el-icon-user'
        }
      },
      // 404
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/error-page/404.vue')
      },
      // 401
      {
        path: '/401',
        name: '401',
        component: () => import('@/views/error-page/401.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes
})

/**
 * 初始化路由表
 */
 export function resetRouter() {
   console.log('123123dsasdads')
   console.log(store.getters.userInfo)
  if (
    store.getters.userInfo &&
    store.getters.userInfo.permission &&
    store.getters.userInfo.permission.menus
  ) {
    const menus = store.getters.userInfo.permission.menus
    console.log(menus)
    menus.forEach(menu => {
      console.log(menu)
      router.removeRoute(menu)
    })
  }
}

export default router
