<template>
  <div>
    <div class="flex-row filter-box">
      <div>
        <span>操作者：</span>
        <el-input v-model="requestParams.operator" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>操作时间：</span>
        <el-date-picker
          v-model="requestParams.operateTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div>
        <el-button type="primary">查询</el-button>
      </div>
    </div>
    <el-table
      :data="jsonName.res"
      border
      style="width: 100%">
      <el-table-column
        prop="operatetime"
        label="操作时间">
      </el-table-column>
      <el-table-column
        prop="operator"
        label="操作者">
      </el-table-column>
      <el-table-column
        prop="parentmodule"
        label="父模块">
      </el-table-column>
      <el-table-column
        prop="operatemodule"
        label="操作模块">
      </el-table-column>
      <el-table-column
        prop="loginfo"
        label="操作内容">
      </el-table-column>
      <el-table-column
        prop="operateresult"
        label="操作结果">
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
  name: 'DataQueryList',
  components: {
    PageChange
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        operator: '',
        operateTime: '',
        pageNum: 1,
        pageSize: 10
      },
      jsonName: {"jvcpagename":"sm_weblog","jvcoldpageName":"sm_weblog","cmd":"query","returnvalue":"1","res.recordsperpage":"12","RecordsPerPage":"12","res":[{"operator":"demin","logid":"103673","parentmodule":"160342","operateresult":"1","operatemodule":"160475","consumetime":"0","row":"1","loginfo":"","operatetime":"2020-02-15 13:26:02"},{"operator":"demin","logid":"103672","parentmodule":"160341","operateresult":"1","operatemodule":"160346","consumetime":"0","row":"2","loginfo":"","operatetime":"2020-02-15 13:14:08"},{"operator":"demin","logid":"103671","parentmodule":"160341","operateresult":"1","operatemodule":"160346","consumetime":"0","row":"3","loginfo":"","operatetime":"2020-02-15 13:13:32"},{"operator":"demin","logid":"103670","parentmodule":"160341","operateresult":"1","operatemodule":"160345","consumetime":"0","row":"4","loginfo":"","operatetime":"2020-02-15 13:02:32"},{"operator":"demin","logid":"103669","parentmodule":"160341","operateresult":"1","operatemodule":"160497","consumetime":"0","row":"5","loginfo":"","operatetime":"2020-02-15 13:01:35"},{"operator":"demin","logid":"103668","parentmodule":"160341","operateresult":"1","operatemodule":"160497","consumetime":"0","row":"6","loginfo":"","operatetime":"2020-02-15 12:59:18"},{"operator":"demin","logid":"103667","parentmodule":"160341","operateresult":"1","operatemodule":"160344","consumetime":"1","row":"7","loginfo":"","operatetime":"2020-02-15 12:45:39"},{"operator":"demin","logid":"103666","parentmodule":"160341","operateresult":"1","operatemodule":"160344","consumetime":"0","row":"8","loginfo":"","operatetime":"2020-02-15 12:34:12"},{"operator":"demin","logid":"103665","parentmodule":"160290","operateresult":"1","operatemodule":"160469","consumetime":"0","row":"9","loginfo":"","operatetime":"2020-02-15 12:33:51"},{"operator":"demin","logid":"103664","parentmodule":"0","operateresult":"1","operatemodule":"0","consumetime":"21","row":"10","loginfo":"登陆OPC后台管理","operatetime":"2020-02-15 12:33:50"},{"operator":"zhoulinling","logid":"103663","parentmodule":"160228","operateresult":"1","operatemodule":"160231","consumetime":"0","row":"11","loginfo":"","operatetime":"2020-02-15 10:32:03"},{"operator":"zhoulinling","logid":"103662","parentmodule":"160228","operateresult":"1","operatemodule":"160229","consumetime":"0","row":"12","loginfo":"","operatetime":"2020-02-15 10:32:00"}],"res.page":[{"RecordsCount":103673,"hasNextPage":true,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12,"TotalPageCount":8640}],"res.size":"103673","returnview":""},
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
