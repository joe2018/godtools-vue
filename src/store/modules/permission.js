import { constantRoutes } from '@/router'
import Layout from '@/layout/index'
import router from '@/router'
const permission = {
  state: {
    routes: [],//后台获取的菜单列表
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.routes = constantRoutes.concat(routes)//把后台返回的菜单和原有的菜单整合在一起
      router.options.routes = state.routes;//手动添加菜单避免添加失败
      router.addRoutes(routes)//添加菜单
    }
  },
  actions: {
    GenerateRoutes({ commit }) {
      return new Promise(resolve => {//调用获取菜单接口
        const loginkk = [//模拟后端返回来的菜单数据
          // {
          //   path: '/moneyManage',
          //   component: 'Layout',
          //   redirect: '/moneyManage/table',
          //   name: 'moneyManage',
          //   meta: { title: '客户管理', icon: 'el-icon-s-tools' },
          //   children: [
          //     {
          //       path: 'account',
          //       name: 'account',
          //       component: 'moneyManage/account/index',
          //       meta: { title: '客户管理', icon: 'el-icon-user-solid' }
          //     },
          //   ]
          // },
          // {
          //   path: '/InvoiceDetails',
          //   component: 'Layout',
          //   redirect: '/InvoiceDetails/table',
          //   name: 'InvoiceDetails',
          //   meta: { title: '发票明细', icon: 'el-icon-s-tools' },
          //   children: [
          //     {
          //       path: 'account',
          //       name: 'account',
          //       component: 'InvoiceDetails/account/index',
          //       meta: { title: '发票明细', icon: 'el-icon-edit-outline' }
          //     },
          //   ]
          // },
          // {
          //   path: '/collectionDetails',
          //   component: 'Layout',
          //   redirect: '/collectionDetails/table',
          //   name: 'collectionDetails',
          //   meta: { title: '收款明细', icon: 'el-icon-s-tools' },
          //   children: [
          //     {
          //       path: 'account',
          //       name: 'account',
          //       component: 'collectionDetails/account/index',
          //       meta: { title: '收款明细', icon: 'el-icon-edit-outline' }
          //     },
          //   ]
          // },
          // {
          //   path: '/WriteOffDetails',
          //   component: 'Layout',
          //   redirect: '/WriteOffDetails/table',
          //   name: 'WriteOffDetails',
          //   meta: { title: '发票核销明细', icon: 'el-icon-s-tools' },
          //   children: [
          //     {
          //       path: 'account',
          //       name: 'account',
          //       component: 'WriteOffDetails/account/index',
          //       meta: { title: '发票核销明细', icon: 'el-icon-edit-outline' }
          //     },
          //   ]
          // },
          {
            path: '/sourceDataManagement',
            component: 'Layout',
            redirect: '/sourceDataManagement/table',
            name: 'sourceDataManagement',
            meta: { title: '数据源管理', icon: 'el-icon-s-tools' },
            children: [
              {
                path: 'account',
                name: 'account',
                component: 'sourceDataManagement/account/index',
                meta: { title: '数据源管理', icon: 'el-icon-folder-checked' }
              },
            ]
          },
          {
            path: '/importManagement',
            component: 'Layout',
            redirect: '/importManagement/table',
            name: 'importManagement',
            meta: { title: '导入管理', icon: 'el-icon-s-tools' },
            children: [
              {
                path: 'account',
                name: 'account',
                component: 'importManagement/account/index',
                meta: { title: '导入管理', icon: 'el-icon-upload' }
              },
            ]
          },
        ]
        const accessedRoutes = filterAsyncRouter(loginkk)//调用filterAsyncRouter整理后端菜单数据
        accessedRoutes.push({ path: '*', redirect: '/404', hidden: true })//404页面在最后添加
        commit('SET_ROUTES', accessedRoutes)//调用SET_ROUTES添加后端菜单到路由中
        resolve(accessedRoutes)
      })
    }
  }
}

function filterAsyncRouter(asyncRouterMap) {//处理后端返回的菜单JSON数据，转为可用的路由对象
  return asyncRouterMap.filter(route => {
    if (route.component) {
      if (route.component === 'Layout') {
        route.component = Layout
      } else {
        route.component = loadView(route.component)//后端返回的component是一个路径，根据路径加载组件
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })
}
const loadView = (view) => { // 路由懒加载
  return (resolve) => require([`@/views/${view}`], resolve)
}
export default permission
