import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../container/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: '/invoiceAuditList',
    component: Index,
    children: [
      {path: 'home', name: 'Home', component: () => import('../container/Home.vue')}, // 酒品定价及批价
      {path: 'invoiceAuditList', name: 'InvoiceAuditList', component: () => import('../container/InvoiceAuditList.vue')}, // 发票审核
      {path: 'memberTopupList', name: 'MemberTopupList', component: () => import('../container/MemberTopupList.vue')}, // 会员充值
      {path: 'storesIdList', name: 'StoresIdList', component: () => import('../container/StoresIdList.vue')}, // 门店账户
      {path: 'discountList', name: 'DiscountList', component: () => import('../container/DiscountList.vue')}, // 门店折扣比例
      {path: 'accountDetailList', name: 'AccountDetailList', component: () => import('../container/AccountDetailList.vue')}, // 门店账户明细
      {path: 'partnerAccountDetailList', name: 'PartnerAccountDetailList', component: () => import('../container/PartnerAccountDetailList.vue')}, // 合伙人账户明细
      {path: 'partnerDiscountList', name: 'PartnerDiscountList', component: () => import('../container/PartnerDiscountList.vue')}, // 合伙人折扣比例
      {path: 'mealFeeList', name: 'MealFeeList', component: () => import('../container/MealFeeList.vue')}, // 门店餐费核销
      {path: 'waiterAccountList', name: 'WaiterAccountList', component: () => import('../container/WaiterAccountList.vue')}, // 服务员账户
      {path: 'waiterAccountDetailList', name: 'WaiterAccountDetailList', component: () => import('../container/WaiterAccountDetailList.vue')}, // 服务员账户明细
      {path: 'professionalsAccountList', name: 'ProfessionalsAccountList', component: () => import('../container/ProfessionalsAccountList.vue')}, // 驻店专员账户
      {path: 'professionalsDiscountList', name: 'ProfessionalsDiscountList', component: () => import('../container/ProfessionalsDiscountList.vue')}, // 驻店专员折扣比例
      {path: 'professionalsAccountDetailList', name: 'ProfessionalsAccountDetailList', component: () => import('../container/ProfessionalsAccountDetailList.vue')}, // 驻店专员账户明细
      {path: 'makerAccountList', name: 'MakerAccountList', component: () => import('../container/MakerAccountList.vue')}, // 创客账户
      {path: 'makerAccountDetailList', name: 'MakerAccountDetailList', component: () => import('../container/MakerAccountDetailList.vue')}, // 创客账户明细
      {path: 'cashAuditList', name: 'CashAuditList', component: () => import('../container/CashAuditList.vue')}, // 提现审批
      {path: 'cashPayList', name: 'CashPayList', component: () => import('../container/CashPayList.vue')}, // 提现支付
      {path: 'cashQueryList', name: 'CashQueryList', component: () => import('../container/CashQueryList.vue')}, // 提现查询
      {path: 'cashPayErroerList', name: 'CashPayErroerList', component: () => import('../container/CashPayErroerList.vue')}, // 提现支付异常
    ]
  },
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
