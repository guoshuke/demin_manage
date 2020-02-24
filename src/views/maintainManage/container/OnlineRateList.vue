<template>
  <div>
    <div class="flex-row filter-box flex-wrap">
      <div>
        <span>时间：</span>
        <el-date-picker
          v-model="requestParams.datetime"
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
        prop=""
        label="分类">
      </el-table-column>
      <el-table-column
        prop=""
        label="终端总量(台)">
      </el-table-column>
      <el-table-column
        prop=""
        label="终端联网量(台)">
      </el-table-column>
      <el-table-column
        prop=""
        label="在线率(％)">
      </el-table-column>
      <el-table-column
        label="操作"
        width="60">
        <template slot-scope="scope">
          <!--<el-button type="text" size="small" @click="dialogVisible=true">编辑</el-button>-->
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
  name: 'OnlineRateList',
  components: {
    PageChange,
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        datetime: '',
        pageNum: 1,
        pageSize: 10
      },
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

  }
}
</script>
<style scoped>

  .el-input {
    width: 150px;
  }
</style>
