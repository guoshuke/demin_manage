<template>
  <div>
    <div class="flex-row filter-box flex-wrap">
      <div>
        <span>提交时间：</span>
        <el-date-picker
          v-model="requestParams.lastSubmitTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div>
        <span>用户手机号：</span>
        <el-input v-model="requestParams.phoneNumber" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>商户简称：</span>
        <el-input v-model="requestParams.shortName" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>订单状态：</span>
        <el-select v-model="requestParams.checkStatus" placeholder="请选择">
          <el-option
            v-for="item in checkStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
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
        prop="tenantid"
        label="编号"
        width="60">
      </el-table-column>
      <el-table-column
        prop="phonenumber"
        label="用户手机号"
        width="110">
      </el-table-column>
      <el-table-column
        prop="shortname"
        label="商户简称">
      </el-table-column>
      <el-table-column
        prop="odertypename"
        label="所在省"
        width="100">
        <template slot-scope="scope">
          <span>{{scope.row.tenantaddress.split(' ')[0]}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="storename"
        label="所在市"
        width="100">
        <template slot-scope="scope">
          <span>{{scope.row.tenantaddress.split(' ')[1]}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop=""
        label="区/县"
        width="100">
        <template slot-scope="scope">
          <span>{{scope.row.tenantaddress.split(' ')[2]}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="firstsubmittime"
        label="首次提交时间"
        width="160">
      </el-table-column>
      <el-table-column
        prop="lastsubmittime"
        label="最后提交时间"
        width="160">
      </el-table-column>
      <el-table-column
        prop="checkstatusname"
        label="审核状态"
        width="100">
      </el-table-column>
      <el-table-column
        label="操作"
        width="80">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="dialogVisible=true">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="操作日志"
        width="80">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="dialogVisible=true">查看</el-button>
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
  name: 'JoinAuditList',
  components: {
    PageChange
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        lastSubmitTime: '',
        phoneNumber: '',
        shortName: '',
        checkStatus: '',
        pageNum: 1,
        pageSize: 10
      },
      dialogVisible: false,
      checkStatusOptions: [{
        value: '0',
        label: '全部'
      }, {
        value: '1',
        label: '待审核'
      }, {
        value: '2',
        label: '重新提交审核'
      }, {
        value: '3',
        label: '审核不通过'
      }, {
        value: '4',
        label: '审核通过'
      }],
      jsonName: {"jvcpagename":"yjm_creator","jvcoldpageName":"yjm_creator","cmd":"queryAllianceList","res":[{"checkstatus":"4","shortname":"海上好多电话","checkstatusname":"审核通过","isenable":"1","phonenumber":"18671040942","lastsubmittime":"2018-04-08 11:20:18","tenantid":"92","row":"1","firstsubmittime":"2018-02-09 16:08:56","tenantaddress":"四川省 成都市 锦江区"},{"checkstatus":"4","shortname":"几次了","checkstatusname":"审核通过","isenable":"1","phonenumber":"18582592470","lastsubmittime":"2018-02-10 14:36:05","tenantid":"97","row":"2","firstsubmittime":"2018-02-10 14:21:38","tenantaddress":" 安徽省 黄山市 市辖区"},{"checkstatus":"3","shortname":"茉莉花","checkstatusname":"审核不通过","isenable":"1","phonenumber":"15881009184","lastsubmittime":"2018-02-09 11:27:26","tenantid":"96","row":"3","firstsubmittime":"2018-02-09 11:27:26","tenantaddress":"四川省 成都市 武侯区"},{"checkstatus":"4","shortname":"红太阳KTV","checkstatusname":"审核通过","isenable":"2","phonenumber":"","lastsubmittime":"2018-02-09 11:13:21","tenantid":"94","row":"4","firstsubmittime":"2018-02-09 11:11:33","tenantaddress":"四川省 成都市 武侯区"}],"res.page":[{"TotalPageCount":1,"hasNextPage":false,"RecordsCount":4,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12}],"returnview":""},
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
