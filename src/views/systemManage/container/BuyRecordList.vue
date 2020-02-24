<template>
  <div>
    <div class="flex-row filter-box">
      <div>
        <span>账号：</span>
        <el-input v-model="requestParams.buyerUserId" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>会员手机：</span>
        <el-input v-model="requestParams.userPhone" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>时间：</span>
        <el-date-picker
          v-model="requestParams.buyTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div>
        <span>购买方式：</span>
        <el-select v-model="requestParams.buyType" placeholder="请选择">
          <el-option
            v-for="item in options"
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
        prop=""
        label="购买时间"
        width="150">
      </el-table-column>
      <el-table-column
        prop=""
        width="120"
        label="用户">
      </el-table-column>
      <el-table-column
        prop=""
        label="品牌">
      </el-table-column>
      <el-table-column
        prop=""
        label="购买数量(ML)"
        width="120">
      </el-table-column>
      <el-table-column
        prop=""
        label="金额(元)"
        width="180">
      </el-table-column>
      <el-table-column
        prop=""
        label="购买方式"
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

export default {
  name: 'BuyRecordList',
  components: {
    PageChange,
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        buyerUserId: '',
        userPhone: '',
        buyTime: '',
        buyType: '',
        pageNum: 1,
        pageSize: 10
      },
      dialogVisible: false,
      options: [{
        value: '',
        label: '全部'
      }, {
        value: '1',
        label: '自助购买'
      }, {
        value: '2',
        label: '代购'
      }, {
        value: '3',
        label: '充酒卡'
      }, {
        value: '10',
        label: '钱包购买'
      }, {
        value: '12',
        label: '代付'
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
</style>
