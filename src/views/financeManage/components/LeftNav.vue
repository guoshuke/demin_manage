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
          <span>财务处理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1"><router-link to="home" tag="span">酒品定价及批价</router-link></el-menu-item>
          <el-menu-item index="1-2"><router-link to="invoiceAuditList" tag="span">发票审核</router-link></el-menu-item>
          <el-menu-item index="1-3"><router-link to="memberTopupList" tag="span">会员充值</router-link></el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-goods"></i>
          <span>门店账务</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1"><router-link to="storesIdList" tag="span">门店账户</router-link></el-menu-item>
          <el-menu-item index="2-2"><router-link to="discountList" tag="span">门店折扣比例</router-link></el-menu-item>
          <el-menu-item index="2-3"><router-link to="accountDetailList" tag="span">门店账户明细</router-link></el-menu-item>
          <el-menu-item index="2-4"><router-link to="partnerAccountDetailList" tag="span">合伙人账户明细</router-link></el-menu-item>
          <el-menu-item index="2-5"><router-link to="partnerDiscountList" tag="span">合伙人折扣比例</router-link></el-menu-item>
          <el-menu-item index="2-6"><router-link to="mealFeeList" tag="span">门店餐费核销</router-link></el-menu-item>
          <el-menu-item index="2-7"><router-link to="waiterAccountList" tag="span">服务员账户</router-link></el-menu-item>
          <el-menu-item index="2-8"><router-link to="waiterAccountDetailList" tag="span">服务员账户明细</router-link></el-menu-item>
          <el-menu-item index="2-9"><router-link to="professionalsAccountList" tag="span">驻店专员账户</router-link></el-menu-item>
          <el-menu-item index="2-10"><router-link to="professionalsDiscountList" tag="span">驻店专员折扣比例</router-link></el-menu-item>
          <el-menu-item index="2-11"><router-link to="professionalsAccountDetailList" tag="span">驻店专员账户明细</router-link></el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-goods"></i>
          <span>合作加盟</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1"><router-link to="makerAccountList" tag="span">创客账户</router-link></el-menu-item>
          <el-menu-item index="3-2"><router-link to="makerAccountDetailList" tag="span">创客账户明细</router-link></el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-goods"></i>
          <span>结算</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="4-1"><router-link to="cashAuditList" tag="span">提现审批</router-link></el-menu-item>
          <el-menu-item index="4-2"><router-link to="cashPayList" tag="span">提现支付</router-link></el-menu-item>
          <el-menu-item index="4-3"><router-link to="cashQueryList" tag="span">提现查询</router-link></el-menu-item>
          <el-menu-item index="4-4"><router-link to="cashPayErroerList" tag="span">提现支付异常</router-link></el-menu-item>
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