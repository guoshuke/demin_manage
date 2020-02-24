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
          <span>优惠券信息</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1"><router-link to="couponList" tag="span">优惠券列表</router-link></el-menu-item>
          <el-menu-item index="1-2"><router-link to="couponAdd" tag="span">增加优惠券</router-link></el-menu-item>
          <el-menu-item index="1-3"><router-link to="cashCouponAdd" tag="span">增加现金券</router-link></el-menu-item>
          <el-menu-item index="1-4"><router-link to="couponSet" tag="span">站外优惠券设置</router-link></el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-goods"></i>
          <span>积分系统</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1"><router-link to="integralRuleList" tag="span">积分规则</router-link></el-menu-item>
          <el-menu-item index="2-2"><router-link to="forGoodsList" tag="span">兑换商品</router-link></el-menu-item>
          <el-menu-item index="2-3"><router-link to="prizeGoodsList" tag="span">抽奖商品</router-link></el-menu-item>
          <el-menu-item index="2-4"><router-link to="userNtegralList" tag="span">用户积分</router-link></el-menu-item>
          <el-menu-item index="2-5"><router-link to="userNtegralDetailList" tag="span">用户积分明细</router-link></el-menu-item>
          <el-menu-item index="2-6"><router-link to="userNtegralOrderList" tag="span">用户积分订单</router-link></el-menu-item>
          <el-menu-item index="2-7"><router-link to="freightTemplateList" tag="span">运费模版</router-link></el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-goods"></i>
          <span>图片管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1"><router-link to="bannerList" tag="span">轮播图</router-link></el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-goods"></i>
          <span>分销统计</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1"><router-link to="distributionStatisticalList" tag="span">分销统计</router-link></el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-goods"></i>
          <span>合作加盟</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="5-1"><router-link to="joinAuditList" tag="span">异业联盟审核</router-link></el-menu-item>
          <el-menu-item index="5-2"><router-link to="joinIntentionApplyList" tag="span">加盟申请意向</router-link></el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title">
          <i class="el-icon-goods"></i>
          <span>活动列表</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="6-1"><router-link to="activityList" tag="span">活动列表</router-link></el-menu-item>
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