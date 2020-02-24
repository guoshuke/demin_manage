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
          <span>基础设置</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1"><router-link to="accountManageList" tag="span">账户管理</router-link></el-menu-item>
          <el-menu-item index="1-2"><router-link to="partnerAccountManageList" tag="span">合伙人账户管理</router-link></el-menu-item>
          <el-menu-item index="1-3"><router-link to="roleManageList" tag="span">角色管理</router-link></el-menu-item>
          <el-menu-item index="1-4"><router-link to="moduleManageList" tag="span">模块管理</router-link></el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-goods"></i>
          <span>数据设置</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1"><router-link to="dataQueryList" tag="span">数据查询</router-link></el-menu-item>
          <el-menu-item index="2-2"><router-link to="dataConfigList" tag="span">数据配置</router-link></el-menu-item>
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