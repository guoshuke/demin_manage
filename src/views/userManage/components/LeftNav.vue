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
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1"><router-link to="home" tag="span">手动赠送分享礼包</router-link></el-menu-item>
          <el-menu-item index="1-2"><router-link to="userManageList" tag="span">会员管理</router-link></el-menu-item>
          <el-menu-item index="1-3"><router-link to="orderList" tag="span">会员订单</router-link></el-menu-item>
          <el-menu-item index="1-4"><router-link to="orderConfirmList" tag="span">餐费订单确认</router-link></el-menu-item>
          <el-menu-item index="1-5"><router-link to="takeWineCodeList" tag="span">会员取酒码</router-link></el-menu-item>
          <el-menu-item index="1-6"><router-link to="takeWineRecordList" tag="span">用户取酒记录</router-link></el-menu-item>
          <el-menu-item index="1-7"><router-link to="wineMachineList" tag="span">会员酒柜</router-link></el-menu-item>
          <!--<el-menu-item index="1-8"><router-link to="topupCarList" tag="span">会员取酒卡</router-link></el-menu-item>-->
          <el-menu-item index="1-9"><router-link to="buyRecordList" tag="span">用户购酒记录</router-link></el-menu-item>
          <el-menu-item index="1-10"><router-link to="changeWineRecordList" tag="span">用户换酒记录</router-link></el-menu-item>
          <el-menu-item index="1-11"><router-link to="topupCarList" tag="span">会员充酒卡</router-link></el-menu-item>
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