<template>
  <div class="left-nav">
    <!--<el-menu-->
      <!--default-active="2"-->
      <!--class="el-menu-vertical-demo"-->
      <!--@open="handleOpen"-->
      <!--@close="handleClose">-->
      <!--<el-submenu  v-for="item in menuData" :index="item.index" :key="item.index">-->
        <!--<template slot="title">-->
          <!--<i :class="item.icon"></i>-->
          <!--<span>-->
            <!--<router-link :to="item.url" tag="span" v-if="item.url">{{item.name}}</router-link>-->
            <!--<span v-else>{{item.name}}</span>-->
          <!--</span>-->
        <!--</template>-->
        <!--<el-menu-item-group v-if="item.secondMenu != undefined && item.secondMenu.length > 0">-->
          <!--<el-menu-item v-for="c_item in item.secondMenu" :index="c_item.index" :key="c_item.index">{{c_item.name}}</el-menu-item>-->
        <!--</el-menu-item-group>-->
      <!--</el-submenu>-->
    <!--</el-menu>-->
      <el-menu
      :default-active="currentIndex"
      class="el-menu-vertical-demo"
      @select="handleSelect"
      @open="handleOpen"
      @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-goods"></i>
          <span>客户信息</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1"><router-link to="home" tag="span">门店信息</router-link></el-menu-item>
          <el-menu-item index="1-2"><router-link to="wineryList" tag="span">酒厂信息</router-link></el-menu-item>
          <el-menu-item index="1-3"><router-link to="makerList" tag="span">创客信息</router-link></el-menu-item>
          <el-menu-item index="1-4"><router-link to="shopList" tag="span">创客门店列表</router-link></el-menu-item>
          <el-menu-item index="1-5"><router-link to="investorList" tag="span">投资人信息</router-link></el-menu-item>
          <el-menu-item index="1-6"><router-link to="appMenuList" tag="span">app菜单设置</router-link></el-menu-item>
          <el-menu-item index="1-7"><router-link to="groupList" tag="span">分组设置</router-link></el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>酒品信息</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1"><router-link to="wineInfromationList" tag="span">酒品信息</router-link></el-menu-item>
          <el-menu-item index="2-2"><router-link to="barrelInfromationList" tag="span">门店酒桶</router-link></el-menu-item>
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