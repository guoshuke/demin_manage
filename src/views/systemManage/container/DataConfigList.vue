<template>
  <div>
    <div class="flex-row filter-box">
      <div>
        <span>参数名称：</span>
        <el-input v-model="requestParams.keyName" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <el-button type="primary">查询</el-button>
        <el-button type="primary">添加</el-button>
        <el-button type="primary">刷新缓存</el-button>
      </div>
    </div>
    <el-table
      :data="jsonName.res"
      border
      style="width: 100%">
      <el-table-column
        prop="keyname"
        label="参数名称">
      </el-table-column>
      <el-table-column
        prop="keyvalue"
        label="参数值">
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述">
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
  </div>
</template>

<script>
// @ is an alias to /src
import Api from "../util/api";
import PageChange from '../../../components/PageChange.vue'

export default {
  name: 'DataConfigList',
  components: {
    PageChange
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        keyName: '',
        pageNum: 1,
        pageSize: 10
      },
      jsonName: {"jvcpagename":"sm_sysconfig","jvcoldpageName":"sm_sysconfig","cmd":"query","returnvalue":"1","res.recordsperpage":"10","RecordsPerPage":"10","res":[{"keyvalue":" ","description":" ","keyname":" ","row":"1"},{"keyvalue":"http://weixin.demin.com/new/menunew/hdymnr1.jsp?advertisementPic=??&activityURL=??&activityExpTime=??&viewNum=??","description":"活动分享地址","keyname":"activitySharedURL","row":"2"},{"keyvalue":"5000","description":"提现申请额度。单位/分。门店金额-全部服务员额度","keyname":"amountApply","row":"3"},{"keyvalue":"http://127.0.0.1:8082/dataserver","description":"接口地址","keyname":"apiURL","row":"4"},{"keyvalue":"5000","description":"换桶阀值","keyname":"barrelLastRemain","row":"5"},{"keyvalue":"Order.debugGetOutReport,Client.checkVersionForClient,Client.synchroTime","description":"屏蔽日志","keyname":"DataServerTripIntefaceLog","row":"6"},{"keyvalue":"http://119.254.95.107:8555/","description":"后台","keyname":"deminCoreURL","row":"7"},{"keyvalue":"400-718-9899","description":"得民总热线","keyname":"deminservicehotline","row":"8"},{"keyvalue":"4","description":"服务员发展会员提成","keyname":"developMember","row":"9"},{"keyvalue":"http://119.254.95.107:9102/","description":"文件服务器","keyname":"FileServer","row":"10"}],"res.page":[{"RecordsCount":63,"hasNextPage":true,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":10,"TotalPageCount":7}],"res.size":"63","returnview":""},
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
