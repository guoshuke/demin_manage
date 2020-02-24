<template>
  <div>
    <div class="flex-row filter-box flex-wrap">
      <div>
        <span>活动名称：</span>
        <el-input v-model="requestParams.activityName" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>开始时间：</span>
        <el-date-picker
          v-model="requestParams.beginTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div>
        <span>结束时间：</span>
        <el-date-picker
          v-model="requestParams.endTime"
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
        label="编号"
        width="60">
      </el-table-column>
      <el-table-column
        prop=""
        label="活动名称">
      </el-table-column>
      <el-table-column
        prop=""
        label="活动图片">
      </el-table-column>
      <el-table-column
        prop=""
        label="背景颜色">
      </el-table-column>
      <el-table-column
        prop=""
        label="优惠券名称">
      </el-table-column>
      <el-table-column
        prop=""
        label="优惠券批次号">
      </el-table-column>
      <el-table-column
        prop=""
        label="开始时间">
      </el-table-column>
      <el-table-column
        prop=""
        label="结束时间">
      </el-table-column>
      <el-table-column
        label="操作"
        width="80">
        <template slot-scope="scope">
          <!--<el-button type="text" size="small" @click="dialogVisible=true">查看</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <div class="page-style">
      <PageChange :total="total" :pageSize="requestParams.pageSize" :pageNum="requestParams.pageNum" @getList="getListData"/>
    </div>
    <el-dialog
      title="标题"
      :visible.sync="dialogVisible"
      width="60%">
      <div style="max-height: 400px; overflow: auto">
        弹窗内容
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
  name: 'ActivityList',
  components: {
    PageChange
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        activityName: '',
        beginTime: '',
        endTime: '',
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

  }
}
</script>
<style scoped>

  .el-input {
    width: 180px;
  }
  .el-icon-edit {
    font-size: 16px;
  }
</style>
