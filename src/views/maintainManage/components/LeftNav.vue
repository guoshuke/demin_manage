<template>
  <div class="left-nav">
      <el-menu
      :default-active="currentIndex"
      class="el-menu-vertical-demo"
      @select="handleSelect"
      @open="handleOpen"
      @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-goods"></i>
          <span>运维管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1"><router-link to="terminalList" tag="span">在线终端</router-link></el-menu-item>
          <el-menu-item index="1-2"><router-link to="terminalSearchList" tag="span">终端查询</router-link></el-menu-item>
          <el-menu-item index="1-3"><router-link to="terminalVersionList" tag="span">终端版本查看</router-link></el-menu-item>
          <el-menu-item index="1-4"><router-link to="terminalOnOfflineList" tag="span">终端上下线记录</router-link></el-menu-item>
          <el-menu-item index="1-5"><router-link to="onlineRateList" tag="span">终端在线率统计</router-link></el-menu-item>
          <el-menu-item index="1-6"><router-link to="barrelTrackingList" tag="span">酒桶跟踪</router-link></el-menu-item>
          <el-menu-item index="1-7"><router-link to="barrelOnlineList" tag="span">在线酒桶</router-link></el-menu-item>
          <el-menu-item index="1-8"><router-link to="barrelSoldOutList" tag="span">酒桶下架</router-link></el-menu-item>
          <el-menu-item index="1-9"><router-link to="takeWIneErrorList" tag="span">取酒异常处理</router-link></el-menu-item>
          <el-menu-item index="1-10"><router-link to="refillCardList" tag="span">充值卡管理</router-link></el-menu-item>
          <el-menu-item index="1-11"><router-link to="experienceCardList" tag="span">体验卡管理</router-link></el-menu-item>
          <el-menu-item index="1-12"><router-link to="takeUpWineCardList" tag="span">充酒卡管理</router-link></el-menu-item>
          <el-menu-item index="1-13"><router-link to="brandList" tag="span">酒品设置</router-link></el-menu-item>
          <el-menu-item index="1-14"><router-link to="experienceCardGiveList" tag="span">体验卡赠送</router-link></el-menu-item>
          <el-menu-item index="1-15"><router-link to="wineCultureList" tag="span">酒文化设置</router-link></el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-goods"></i>
          <span>订单管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1"><router-link to="orderList" tag="span">订单处理</router-link></el-menu-item>
          <el-menu-item index="2-2"><router-link to="wineryOrderList" tag="span">酒厂订酒</router-link></el-menu-item>
          <el-menu-item index="2-3"><router-link to="payErrorList" tag="span">支付异常处理</router-link></el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: "LeftNav",
    data() {
      return {
        currentIndex: '1-1',
        menuData: [
          {
            index: '1',
            icon: 'el-icon-goods',
            name: '商品管理',
            secondMenu: [
              {
                index: '1-1',
                name: '商品分类管理',
                url: ''
              },
              {
                index: '1-2',
                name: '商品管理',
                url: ''
              }
            ]
          },
          {
            index: '2',
            icon: 'el-icon-tickets',
            name: '订单管理',
            url: 'orderManage'
          },
          {
            index: '3',
            icon: 'el-icon-setting',
            name: '活动管理',
            secondMenu: [
              {
                index: '3-1',
                name: '助力免单管理',
                url: 'home'
              }
            ]
          },
          {
            index: '4',
            icon: 'el-icon-date',
            name: '数据统计',
            url: ''
          },
          {
            index: '5',
            icon: 'el-icon-setting',
            name: '系统管理',
            secondMenu: [
              {
                index: '5-1',
                name: '用户管理',
                url: ''
              },
              {
                index: '5-2',
                name: '角色管理',
                url: ''
              }
            ]
          },
          {
            index: '6',
            icon: 'el-icon-edit-outline',
            name: '基本配置',
            secondMenu: [
              {
                index: '6-1',
                name: 'banner管理',
                url: ''
              },
              {
                index: '6-2',
                name: '入驻城市',
                url: ''
              }
            ]
          },
        ]
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSelect(key, keyPath) {
        localStorage.setItem('menuIndex',key)
        console.log(key, keyPath);
      }
    },
    mounted() {
      // this.currentIndex = localStorage.getItem('menuIndex')
    }
  }
</script>

<style scoped>

</style>