import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../container/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: '/couponList',
    component: Index,
    children: [
      {path: 'couponList', name: 'CouponList', component: () => import('../container/CouponList.vue')}, // 优惠券列表
      {path: 'couponAdd', name: 'CouponAdd', component: () => import('../container/CouponAdd.vue')}, // 增加优惠券
      {path: 'cashCouponAdd', name: 'CashCouponAdd', component: () => import('../container/CashCouponAdd.vue')}, // 增加现金券
      {path: 'couponSet', name: 'CouponSet', component: () => import('../container/CouponSet.vue')}, // 站外优惠券设置
      {path: 'integralRuleList', name: 'IntegralRuleList', component: () => import('../container/IntegralRuleList.vue')}, // 积分规则
      {path: 'forGoodsList', name: 'ForGoodsList', component: () => import('../container/ForGoodsList.vue')}, // 兑换商品
      {path: 'prizeGoodsList', name: 'PrizeGoodsList', component: () => import('../container/PrizeGoodsList.vue')}, // 抽奖商品
      {path: 'userNtegralList', name: 'UserNtegralList', component: () => import('../container/UserNtegralList.vue')}, // 用户积分
      {path: 'userNtegralDetailList', name: 'UserNtegralDetailList', component: () => import('../container/UserNtegralDetailList.vue')}, // 用户积分明细
      {path: 'userNtegralOrderList', name: 'UserNtegralOrderList', component: () => import('../container/UserNtegralOrderList.vue')}, // 站外优惠券设置
      {path: 'freightTemplateList', name: 'FreightTemplateList', component: () => import('../container/FreightTemplateList.vue')}, // 运费模版
      {path: 'bannerList', name: 'BannerList', component: () => import('../container/BannerList.vue')}, // 轮播图
      {path: 'distributionStatisticalList', name: 'DistributionStatisticalList', component: () => import('../container/DistributionStatisticalList.vue')}, // 分销统计
      {path: 'joinAuditList', name: 'JoinAuditList', component: () => import('../container/JoinAuditList.vue')}, // 异业联盟审核
      {path: 'joinIntentionApplyList', name: 'JoinIntentionApplyList', component: () => import('../container/JoinIntentionApplyList.vue')}, // 加盟申请意向
      {path: 'activityList', name: 'ActivityList', component: () => import('../container/ActivityList.vue')}, // 活动列表
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
