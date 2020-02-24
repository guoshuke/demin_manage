import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../container/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: '/accountManageList',
    component: Index,
    children: [
      {path: 'accountManageList', name: 'AccountManageList', component: () => import('../container/AccountManageList.vue')}, // 账户管理
      {path: 'partnerAccountManageList', name: 'PartnerAccountManageList', component: () => import('../container/PartnerAccountManageList.vue')},// 合伙人账户管理
      {path: 'roleManageList', name: 'RoleManageList', component: () => import('../container/RoleManageList.vue')}, // 角色管理
      {path: 'moduleManageList', name: 'ModuleManageList', component: () => import('../container/ModuleManageList.vue')}, // 模块管理
      {path: 'dataQueryList', name: 'DataQueryList', component: () => import('../container/DataQueryList.vue')}, // 数据查询
      {path: 'dataConfigList', name: 'DataConfigList', component: () => import('../container/DataConfigList.vue')}, // 数据配置
    ]
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
