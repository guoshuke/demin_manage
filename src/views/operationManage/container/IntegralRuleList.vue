<template>
  <div>
    <el-table
      :data="jsonName.res"
      border
      style="width: 100%">
      <el-table-column
        prop="ruleid"
        label="xxxx"
        width="100">
      </el-table-column>
      <el-table-column
        prop="ruletypename"
        label="xxxx">
      </el-table-column>
      <el-table-column
        prop="helperStatus"
        label="操作"
        width="60">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="dialogVisible=true"><i class="el-icon-edit icon-size"></i></el-button>
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
  name: 'WineMachineList',
  components: {
    PageChange,
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        pageNum: 1,
        pageSize: 10
      },
      dialogVisible: false,
      jsonName: {"jvcpagename":"yjm_integral","jvcoldpageName":"yjm_integral","cmd":"queryIntegralRule","returnvalue":"1","res.recordsperpage":"12","RecordsPerPage":"12","res":[{"oncegetmin":"","ruletype":"1","isyearclear":"0","paymoneyget":"","getrestrictcustomdays":"","getrestricttype":"","oncegetmax":"","orderamountmin":"","globalgetrestrict":"10000000","validdays":"1000","integralvalue":"100","ruleid":"1","ruletypename":"基础设置","getrestrictnum":"","row":"1"},{"oncegetmin":"","ruletype":"2","isyearclear":"","paymoneyget":"1","getrestrictcustomdays":"0","getrestricttype":"0","oncegetmax":"","orderamountmin":"","globalgetrestrict":"","validdays":"","integralvalue":"","ruleid":"2","ruletypename":"充值","getrestrictnum":"0","row":"2"},{"oncegetmin":"1","ruletype":"3","isyearclear":"","paymoneyget":"","getrestrictcustomdays":"0","getrestricttype":"5","oncegetmax":"100","orderamountmin":"100","globalgetrestrict":"","validdays":"","integralvalue":"","ruleid":"3","ruletypename":"一般评论","getrestrictnum":"1000","row":"3"},{"oncegetmin":"0","ruletype":"4","isyearclear":"","paymoneyget":"","getrestrictcustomdays":"0","getrestricttype":"0","oncegetmax":"0","orderamountmin":"0","globalgetrestrict":"","validdays":"","integralvalue":"","ruleid":"4","ruletypename":"评论满100字","getrestrictnum":"0","row":"4"},{"oncegetmin":"","ruletype":"5","isyearclear":"","paymoneyget":"1","getrestrictcustomdays":"0","getrestricttype":"0","oncegetmax":"","orderamountmin":"","globalgetrestrict":"","validdays":"0","integralvalue":"","ruleid":"5","ruletypename":"买单","getrestrictnum":"0","row":"5"}],"res.page":[{"RecordsCount":5,"hasNextPage":false,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12,"TotalPageCount":1}],"res.size":"5","returnview":""},
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
  .el-icon-edit {
    font-size: 16px;
  }
</style>
