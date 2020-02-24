import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../container/Index.vue'
import Home from '../container/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: '/home',
    component: Index,
    children: [
      {path: 'home', name: 'Home', component: Home},
      {path: 'wineryList', name: 'WineryList', component: () => import('../container/WineryList.vue')},
      {path: 'makerList', name: 'MakerList', component: () => import('../container/MakerList.vue')},
      {path: 'shopList', name: 'ShopList', component: () => import('../container/ShopList.vue')},
      {path: 'investorList', name: 'InvestorList', component: () => import('../container/InvestorList.vue')},
      {path: 'appMenuList', name: 'AppMenuList', component: () => import('../container/AppMenuList.vue')},
      {path: 'groupList', name: 'GroupList', component: () => import('../container/GroupList.vue')},
      {path: 'wineInfromationList', name: 'WineInfromationList', component: () => import('../container/WineInfromationList.vue')},
      {path: 'barrelInfromationList', name: 'BarrelInfromationList', component: () => import('../container/BarrelInfromationList.vue')},
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
