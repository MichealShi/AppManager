import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('../views/redirect/index'),
        meta: {
          keepAlive: true
        }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('../views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('../views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('../views/errorPage/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('../views/dashboard/index'),
        name: 'dashboard',
        meta: {
          title: 'dashboard',
          icon: 'dashboard',
          noCache: true,
          keepAlive: false
        }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/appManage',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'index',
        component: () => import('../views/appManage/index'),
        name: 'appManage',
        meta: {
          title: '应用管理',
          icon: 'tab',
          keepAlive: true
        }
      }, {
        path: 'detail',
        component: () => import('../views/appManage/detail'),
        name: 'versionDetail',
        meta: {
          title: '版本详情',
          keepAlive: true
        },
        hidden: true
      }
    ],
    meta: {
      roles: 'admin'
    }
  },
  {
    path: '/hotFixManage',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'index',
        component: () => import('../views/hotFixManage/index'),
        name: 'hotFixManage',
        meta: {
          title: '补丁管理',
          icon: 'example',
          keepAlive: true
        }
      }, {
        path: 'detail',
        component: () => import('../views/hotFixManage/detail'),
        name: 'hotFixDetail',
        meta: {
          title: '修复详情',
          keepAlive: false
        },
        hidden: true
      }
    ],
    meta: {
      roles: 'admin'
    }
  },
  {
    path: '/errorLog',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'log',
        component: () => import('../views/errorLog/index'),
        name: 'ErrorLog',
        meta: {
          title: '异常统计',
          icon: 'bug',
          keepAlive: true
        }
      },
      {
        path: 'detail',
        component: () => import('../views/errorLog/detail'),
        name: 'errorDetail',
        meta: {
          title: '错误详情',
          keepAlive: true
        },
        hidden: true
      }
    ],
    meta: {
      roles: 'admin'
    }
  },
  {
    path: '/logAnalyse',
    component: Layout,
    children: [
      {
        path: 'logAnalyse',
        component: () => import('../views/logAnalyse/index'),
        name: '日志分析',
        meta: {
          title: '日志分析',
          icon: 'clipboard',
          keepAlive: true
        }
      },
      {
        path: 'detail',
        component: () => import('../views/logAnalyse/detail'),
        name: '日志详情',
        meta: {
          title: '日志详情',
          noCache: true,
          keepAlive: true
        },
        hidden: true
      }
    ]
  },
  {
    path: '/querySQL',
    component: Layout,
    name: 'SQL查询',
    cache: true,
    children: [
      {
        path: 'index',
        component: () => import('../views/querySQL/index'),
        name: 'SQL查询',
        meta: {
          title: 'SQL查询',
          icon: 'international',
          noCache: false,
          keepAlive: true
        }
      }
    ],
    meta: {
      roles: 'admin'
    }
  },
  {
    path: '/userCenter',
    component: Layout,
    redirect: 'noredirect',
    name: 'userCenter',
    children: [
      {
        path: 'index',
        component: () => import('../views/userCenter/index'),
        name: '用户中心',
        meta: {
          title: '用户中心',
          icon: 'people',
          keepAlive: true
        }
      }
    ]
  },

  {
    path: '*',
    redirect: '/404',
    hidden: true,
    keepAlive: true
  }
]
