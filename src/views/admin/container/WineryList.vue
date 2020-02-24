<template>
  <div>
    <div class="flex-row filter-box">
      <div>
        <span>编号/名称：</span>
        <el-input v-model="requestParams.storeName" clearable placeholder="请输入内容"></el-input>
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
        prop="storeid"
        label="编号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="storename"
        width="120"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="storeperson"
        label="负责人"
        width="80">
      </el-table-column>
      <el-table-column
        prop="storeaddr"
        label="地址">
      </el-table-column>
      <el-table-column
        prop="location"
        label="LOGO"
        width="180">
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
import Breadcrumb from '@/components/Breadcrumb.vue'

export default {
  name: 'WineryList',
  components: {
    PageChange,
    Breadcrumb
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        storeName: '',
        pageNum: 1,
        pageSize: 10
      },
      dialogVisible: false,
      jsonName: {}
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
