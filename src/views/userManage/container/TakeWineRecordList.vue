<template>
  <div>
    <div class="flex-row filter-box flex-wrap flex-center">
      <div>
        <span>会员账号：</span>
        <el-input v-model="requestParams.buyerUserId" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>上报时间：</span>
        <el-date-picker
          v-model="requestParams.reportTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div>
        <span>门店编号/名称：</span>
        <el-input v-model="requestParams.storeName" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>取酒码来源：</span>
        <el-select v-model="requestParams.isTicket" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <span></span>
        <el-checkbox v-model="requestParams.checked">补现支付</el-checkbox>
      </div>
      <div>
        <span>酒品：</span>
        <el-input v-model="requestParams.brandNameQ1" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <el-button type="primary">查询</el-button>
        <el-button type="primary">重置</el-button>
        <el-button type="primary">导出</el-button>
      </div>
    </div>
    <el-table
      :data="jsonName.res"
      border
      style="width: 100%">
      <el-table-column
        prop=""
        label="编号"
        width="50">
      </el-table-column>
      <el-table-column
        prop=""
        width="110"
        label="微信/支付宝订单号">
      </el-table-column>
      <el-table-column
        prop=""
        label="上报时间"
        width="110">
      </el-table-column>
      <el-table-column
        prop=""
        label="门店">
      </el-table-column>
      <el-table-column
        prop=""
        label="服务员手机号"
        width="120">
      </el-table-column>
      <el-table-column
        prop=""
        label="取酒码"
        width="80">
      </el-table-column>
      <el-table-column
        prop=""
        label="请求(ML)"
        width="90">
      </el-table-column>
      <el-table-column
        prop=""
        label="出酒(ML)"
        width="80">
      </el-table-column>
      <el-table-column
        prop=""
        label="金额(元)"
        width="80">
      </el-table-column>
      <el-table-column
        prop=""
        label="现金支付"
        width="80">
      </el-table-column>
      <el-table-column
        prop=""
        label="现金出酒"
        width="80">
      </el-table-column>
      <el-table-column
        prop=""
        label="酒券支付"
        width="80">
      </el-table-column>
      <el-table-column
        prop=""
        label="酒券出酒"
        width="80">
      </el-table-column>
      <el-table-column
        prop=""
        label="优惠券支付"
        width="100">
      </el-table-column>
      <el-table-column
        prop=""
        label="优惠券出酒"
        width="100">
      </el-table-column>
      <el-table-column
        prop=""
        label="会员账户"
        width="80">
      </el-table-column>
      <el-table-column
        prop=""
        label="取酒码来源"
        width="100">
      </el-table-column>
      <el-table-column
        prop=""
        label="品牌"
        width="80">
      </el-table-column>
      <el-table-column
        prop=""
        label="取酒时间"
        width="80">
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
  name: 'MakerList',
  components: {
    PageChange
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        buyerUserId: '',
        reportTime: '',
        storeName: '',
        isTicket: '',
        brandIdQ1: '',
        brandNameQ1: '',
        checked: false,
        pageNum: 1,
        pageSize: 10
      },
      dialogVisible: false,
      options: [{
        value: '',
        label: '全部'
      }, {
        value: '0',
        label: '订单购酒'
      }, {
        value: '1',
        label: '分享送酒'
      }],
      jsonName: {

      }
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
