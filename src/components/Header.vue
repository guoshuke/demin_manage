<template>
  <div class="header flex-row flex-center space-between">
    <div class="flex-row flex-center">
      <div class="logo">
        <img src="../../public/img/logo.png" alt="" />
      </div>
      <div class="header-nav">
        <el-button type="text" :class="{'active':activeName=='index.html'}"><a href='/index.html'>基本信息</a></el-button>
        <el-button type="text" :class="{'active':activeName=='userManage.html'}"><a href='/userManage.html'>用户管理</a></el-button>
        <el-button type="text" :class="{'active':activeName=='financeManage.html'}"><a href='/financeManage.html'>财务管理</a></el-button>
        <el-button type="text" :class="{'active':activeName=='operationManage.html'}"><a href='/operationManage.html'>运营管理</a></el-button>
        <el-button type="text" :class="{'active':activeName=='systemManage.html'}"><a href='/systemManage.html'>系统管理</a></el-button>
        <el-button type="text" :class="{'active':activeName=='maintainManage.html'}"><a href='/maintainManage.html'>日常运维</a></el-button>
      </div>
    </div>
    <div>
      <el-button type="text" size="small">修改密码</el-button>
      <el-button type="text" size="small">退出</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Header",
    data() {
      return {
        activeName: ''
      }
    },
    methods: {

    },
    created() {
      let url = window.location.pathname
      this.activeName = url.slice(1,url.length)
      console.log(url)
    },
  }
</script>

<style scoped lang="less">
.header-nav {
  span {
    padding: 0 10px;
  }
  .el-button--text {
    color: #666;
    font-size: 16px;
    padding: 8px 10px;
  }
  .active {
    background: #3592FF;
    color: #fff;
    a {
      color: #fff;
    }
  }
}
</style>