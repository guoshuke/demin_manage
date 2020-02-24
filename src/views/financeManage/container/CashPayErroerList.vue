<template>
  <div>
    <div class="flex-row filter-box flex-wrap">
      <div>
        <span>银行流水ID：</span>
        <el-input v-model="requestParams.orderId" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>批次号：</span>
        <el-input v-model="requestParams.batchNo" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>银行卡号：</span>
        <el-input v-model="requestParams.cardNo" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>持卡人姓名：</span>
        <el-input v-model="requestParams.storeName" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <el-button type="primary">查询</el-button>
        <el-button type="primary">重置</el-button>
      </div>
    </div>
    <el-table
      :data="jsonName.res"
      border
      style="width: 100%">
      <el-table-column
        prop="orderid"
        label="银行流水ID"
        width="100">
      </el-table-column>
      <el-table-column
        prop=""
        label="持卡人姓名"
        width="100">
      </el-table-column>
      <el-table-column
        prop="batchno"
        label="批次号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="电话号码"
        width="110">
      </el-table-column>
      <el-table-column
        prop=""
        label="发送时间">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="失败原因">
      </el-table-column>
      <el-table-column
        label="操作"
        width="60">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="dialogVisible=true">编辑</el-button>
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
  name: 'CashPayErroerList',
  components: {
    PageChange,
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        orderId: '',
        storeName: '',
        cardNo: '',
        storeId: '',
        pageNum: 1,
        pageSize: 10
      },
      options: [{
        value: '',
        label: '全部'
      }, {
        value: '1',
        label: '个人'
      }, {
        value: '2',
        label: '对公账户'
      }],
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
  .app-icon {
    width: 46px;
    height: 46px;
  }
</style>
