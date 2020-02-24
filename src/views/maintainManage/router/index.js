import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../container/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: '/terminalList',
    component: Index,
    children: [
      {path: 'terminalList', name: 'TerminalList', component: () => import('../container/TerminalList.vue')}, // 在线终端
      {path: 'terminalSearchList', name: 'TerminalSearchList', component: () => import('../container/TerminalSearchList.vue')}, // 终端查询
      {path: 'terminalVersionList', name: 'TerminalVersionList', component: () => import('../container/TerminalVersionList.vue')}, // 终端版本查看
      {path: 'terminalOnOfflineList', name: 'TerminalOnOfflineList', component: () => import('../container/TerminalOnOfflineList.vue')}, // 终端上下线记录
      {path: 'onlineRateList', name: 'OnlineRateList', component: () => import('../container/OnlineRateList.vue')}, // 终端在线率统计
      {path: 'barrelTrackingList', name: 'BarrelTrackingList', component: () => import('../container/BarrelTrackingList.vue')}, // 酒桶跟踪
      {path: 'barrelOnlineList', name: 'BarrelOnlineList', component: () => import('../container/BarrelOnlineList.vue')}, // 在线酒桶
      {path: 'barrelSoldOutList', name: 'BarrelSoldOutList', component: () => import('../container/BarrelSoldOutList.vue')}, // 酒桶下架
      {path: 'takeWIneErrorList', name: 'TakeWIneErrorList', component: () => import('../container/TakeWIneErrorList.vue')}, // 取酒异常处理
      {path: 'refillCardList', name: 'RefillCardList', component: () => import('../container/RefillCardList.vue')}, // 充值卡管理
      {path: 'experienceCardList', name: 'ExperienceCardList', component: () => import('../container/ExperienceCardList.vue')}, // 体验卡管理
      {path: 'takeUpWineCardList', name: 'TakeUpWineCardList', component: () => import('../container/TakeUpWineCardList.vue')}, // 充酒卡管理
      {path: 'brandList', name: 'BrandList', component: () => import('../container/BrandList.vue')}, // 酒品设置
      {path: 'experienceCardGiveList', name: 'ExperienceCardGiveList', component: () => import('../container/ExperienceCardGiveList.vue')}, // 体验卡赠送
      {path: 'wineCultureList', name: 'WineCultureList', component: () => import('../container/WineCultureList.vue')}, // 酒文化设置
      {path: 'orderList', name: 'OrderList', component: () => import('../container/OrderList.vue')}, // 订单处理
      {path: 'wineryOrderList', name: 'WineryOrderList', component: () => import('../container/WineryOrderList.vue')}, // 酒厂订酒
      {path: 'payErrorList', name: 'PayErrorList', component: () => import('../container/PayErrorList.vue')}, // 支付异常处理
    ]
  },
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
