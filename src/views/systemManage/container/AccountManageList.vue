<template>
  <div>
    <div class="flex-row filter-box">
      <div>
        <span>登录名：</span>
        <el-input v-model="requestParams.userId" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>用户名称：</span>
        <el-input v-model="requestParams.userName" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <el-button type="primary">查询</el-button>
        <el-button type="primary">添加</el-button>
      </div>
    </div>
    <el-table
      :data="jsonName.res"
      border
      style="width: 100%">
      <el-table-column
        prop="userid"
        label="登录名">
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名称">
      </el-table-column>
      <el-table-column
        prop="userphone"
        label="电话号码">
      </el-table-column>
      <el-table-column
        label="权限">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="dialogVisible=true">权限管理</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="初始密码">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="dialogVisible=true">初始密码</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="门店配置">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="dialogVisible=true">门店配置</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="dialogVisible=true">编辑</el-button>
          <el-button type="text" size="small" @click="dialogVisible=true" class="ft-color-red">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-style">
      <PageChange :total="total" :pageSize="requestParams.pageSize" :pageNum="requestParams.pageNum" @getList="getListData"/>
    </div>
    <el-dialog
      title="标题"
      :visible.sync="dialogVisible"
      width="600px">
      <div style="max-height: 400px; overflow: auto">
        ererere
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import Api from "../util/api";
import PageChange from '../../../components/PageChange.vue'

export default {
  name: 'home',
  components: {
    PageChange
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        userId: '',
        userName: '',
        pageNum: 1,
        pageSize: 10
      },
      dialogVisible: false,
      jsonName: {"jvcpagename":"sm_opcuser","jvcoldpageName":"sm_opcuser","cmd":"query","returnvalue":"1","res.recordsperpage":"12","RecordsPerPage":"12","res":[{"row":"1","userid":"13665227522","username":"汪伟","userpassword":"","userphone":"13665227522","useremail":"","useraddress":"","randomkey":"","isenabled":"1","ramark":"","loginlasttime":"","logincurrtime":"","loginip":"","multionline":"","weblogin":"1","ukeylogin":"","createtime":"2020-01-21 00:45:56.0","usergroup":"","openid":"","clientid":"","password":"","rolename":"门店管理员,门店财务管理员,门店收银员"},{"row":"2","userid":"13338129933","username":"张新风","userpassword":"","userphone":"13338129933","useremail":"","useraddress":"","randomkey":"","isenabled":"1","ramark":"","loginlasttime":"","logincurrtime":"","loginip":"","multionline":"","weblogin":"1","ukeylogin":"","createtime":"2020-01-15 17:50:22.0","usergroup":"","openid":"oZzYbwtKAxuDrhqo2J4sNitBlg38 ","clientid":"","password":"","rolename":"门店管理员,门店财务管理员,门店收银员"},{"row":"3","userid":"13032576868","username":"陈霞","userpassword":"","userphone":"13032576868","useremail":"","useraddress":"","randomkey":"","isenabled":"1","ramark":"","loginlasttime":"","logincurrtime":"","loginip":"","multionline":"","weblogin":"1","ukeylogin":"","createtime":"2020-01-15 17:49:30.0","usergroup":"","openid":"","clientid":"","password":"","rolename":"门店管理员,门店财务管理员,门店收银员"},{"row":"4","userid":"15551511229","username":"郭雷","userpassword":"","userphone":"15551511229","useremail":"","useraddress":"","randomkey":"","isenabled":"1","ramark":"","loginlasttime":"","logincurrtime":"","loginip":"","multionline":"","weblogin":"1","ukeylogin":"","createtime":"2020-01-14 09:11:16.0","usergroup":"","openid":"oZzYbwn4ChpqAVHQSuuYAB1R6ark ","clientid":"","password":"","rolename":"门店管理员,门店财务管理员,门店收银员"},{"row":"5","userid":"13912149679","username":"冯燕","userpassword":"","userphone":"13912149679","useremail":"","useraddress":"","randomkey":"","isenabled":"1","ramark":"","loginlasttime":"","logincurrtime":"","loginip":"","multionline":"","weblogin":"1","ukeylogin":"","createtime":"2020-01-09 14:37:15.0","usergroup":"","openid":"oZzYbwp7YDrEgGkF_IU4fN5eLZVM ","clientid":"","password":"","rolename":"门店管理员,门店财务管理员,门店收银员"},{"row":"6","userid":"18361822307","username":"姜彦辰","userpassword":"","userphone":"18361822307","useremail":"","useraddress":"","randomkey":"","isenabled":"1","ramark":"","loginlasttime":"","logincurrtime":"","loginip":"","multionline":"","weblogin":"1","ukeylogin":"","createtime":"2020-01-09 14:36:24.0","usergroup":"","openid":"oZzYbwkYQDTDNQoUNhbhhz_TQ4Xw ","clientid":"","password":"","rolename":"门店管理员,门店财务管理员,门店收银员"},{"row":"7","userid":"18252750658","username":"高骊荣","userpassword":"","userphone":"18252750658","useremail":"","useraddress":"","randomkey":"","isenabled":"1","ramark":"","loginlasttime":"","logincurrtime":"","loginip":"","multionline":"","weblogin":"1","ukeylogin":"","createtime":"2020-01-09 14:35:19.0","usergroup":"","openid":"oZzYbwlHqcEQgqiV6gH3SrSWaHvo ","clientid":"","password":"","rolename":"门店管理员,门店财务管理员,门店收银员"},{"row":"8","userid":"15152748103","username":"邱宇","userpassword":"","userphone":"15152748103","useremail":"","useraddress":"","randomkey":"","isenabled":"1","ramark":"","loginlasttime":"","logincurrtime":"","loginip":"","multionline":"","weblogin":"1","ukeylogin":"","createtime":"2020-01-08 14:18:10.0","usergroup":"","openid":"oZzYbwn1i2e3fu-HZhP-PTbk4y-Q ","clientid":"","password":"","rolename":"门店管理员,门店财务管理员,门店收银员"},{"row":"9","userid":"18952722261","username":"林卫","userpassword":"","userphone":"18952722261","useremail":"","useraddress":"","randomkey":"","isenabled":"1","ramark":"","loginlasttime":"","logincurrtime":"","loginip":"","multionline":"","weblogin":"1","ukeylogin":"","createtime":"2020-01-07 11:45:47.0","usergroup":"","openid":"","clientid":"","password":"","rolename":"门店管理员,门店财务管理员,门店收银员"},{"row":"10","userid":"13665245113","username":"金燕燕","userpassword":"","userphone":"13665245113","useremail":"","useraddress":"","randomkey":"","isenabled":"1","ramark":"","loginlasttime":"","logincurrtime":"","loginip":"","multionline":"","weblogin":"1","ukeylogin":"","createtime":"2020-01-07 11:44:46.0","usergroup":"","openid":"oZzYbwtW0zGmTW5B8zdiEdcPaSTU ","clientid":"","password":"","rolename":"门店管理员,门店财务管理员,门店收银员"},{"row":"11","userid":"15380306255","username":"周国荣","userpassword":"","userphone":"15380306255","useremail":"","useraddress":"","randomkey":"","isenabled":"1","ramark":"","loginlasttime":"","logincurrtime":"","loginip":"","multionline":"","weblogin":"1","ukeylogin":"","createtime":"2020-01-07 11:43:39.0","usergroup":"","openid":"oZzYbwu08k32tstwTSHKX4RwMwI8 ","clientid":"","password":"","rolename":"门店管理员,门店财务管理员,门店收银员"},{"row":"12","userid":"15396762981","username":"蒋梅","userpassword":"","userphone":"15396762981","useremail":"","useraddress":"","randomkey":"","isenabled":"1","ramark":"","loginlasttime":"","logincurrtime":"","loginip":"","multionline":"","weblogin":"1","ukeylogin":"","createtime":"2020-01-07 11:42:39.0","usergroup":"","openid":"","clientid":"","password":"","rolename":"门店管理员,门店财务管理员,门店收银员"}],"res.page":[{"RecordsCount":882,"hasNextPage":true,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12,"TotalPageCount":74}],"res.size":"882","returnview":""},
    }
  },
  methods: {
    // 获取列表内容
    async getListData(val) {
      // this.requestParams.pageNum = val?val:1
      const listData = await Api.getAllList()
      this.dateArry = listData.data
    },
    // 筛选

  },
  created() {
    // this.getAllData()
  },
  mounted() {
    this.$store.dispatch("Breadecrumb",this.breadData)
  }
}
</script>
<style scoped>

  .el-input {
    width: 150px;
  }
</style>
