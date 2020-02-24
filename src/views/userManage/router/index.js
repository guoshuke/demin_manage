import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../container/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: '/home',
    component: Index,
    children: [
      {path: 'home', name: 'Home', component: () => import('../container/Home.vue')}, // 手动赠送分享礼包
      {path: 'userManageList', name: 'UserManageList', component: () => import('../container/UserManageList.vue')}, // 会员管理
      {path: 'orderList', name: 'OrderList', component: () => import('../container/OrderList.vue')}, // 会员订单
      {path: 'orderConfirmList', name: 'OrderConfirmList', component: () => import('../container/OrderConfirmList.vue')}, // 餐费订单确认
      {path: 'takeWineCodeList', name: 'TakeWineCodeList', component: () => import('../container/TakeWineCodeList.vue')}, // 会员取酒码
      {path: 'takeWineRecordList', name: 'TakeWineRecordList', component: () => import('../container/TakeWineRecordList.vue')}, // 用户取酒记录
      {path: 'wineMachineList', name: 'WineMachineList', component: () => import('../container/WineMachineList.vue')}, // 会员酒柜
      {path: 'topupCarList', name: 'TopupCarList', component: () => import('../container/TopupCarList.vue')}, // 会员充酒卡
      {path: 'buyRecordList', name: 'BuyRecordList', component: () => import('../container/BuyRecordList.vue')}, // 用户购酒记录
      {path: 'changeWineRecordList', name: 'ChangeWineRecordList', component: () => import('../container/ChangeWineRecordList.vue')}, // 用户换酒记录
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
