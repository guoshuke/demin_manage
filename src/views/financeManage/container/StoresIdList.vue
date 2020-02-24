<template>
  <div>
    <div class="flex-row filter-box flex-wrap">
      <div>
        <span>编号/名称：</span>
        <el-input v-model="requestParams.buyerUserId" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>消费提现金额：</span>
        <el-input v-model="requestParams.userPhone" clearable placeholder="请输入内容"></el-input>至
        <el-input v-model="requestParams.userPhone" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>消费额度：</span>
        <el-input v-model="requestParams.userPhone" clearable placeholder="请输入内容"></el-input>至
        <el-input v-model="requestParams.userPhone" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>酒水成本：</span>
        <el-input v-model="requestParams.userPhone" clearable placeholder="请输入内容"></el-input>至
        <el-input v-model="requestParams.userPhone" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>运营提成：</span>
        <el-input v-model="requestParams.userPhone" clearable placeholder="请输入内容"></el-input>至
        <el-input v-model="requestParams.userPhone" clearable placeholder="请输入内容"></el-input>
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
        prop="storeid"
        label="门店编号"
        width="90">
      </el-table-column>
      <el-table-column
        prop="storename"
        label="门店名称">
      </el-table-column>
      <el-table-column
        label="消费提现金额(元)"
        width="130">
        <template slot-scope="scope">
          <span>{{scope.row.cashaccount/100}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="消费额度(元)"
        width="120">
        <template slot-scope="scope">
          <span>{{scope.row.consumeraccount/100}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="酒水成本(元)"
        width="100">
        <template slot-scope="scope">
          <span>{{scope.row.winecostamount/100}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="运营提成(元)"
        width="100">
        <template slot-scope="scope">
          <span>{{scope.row.profitamount/100}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="80">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="dialogVisible=true">查看明细</el-button>
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
  name: 'StoresIdList',
  components: {
    PageChange,
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        buyerUserId: '',
        userPhone: '',
        brandId: '',
        surplusDrink: '',
        pageNum: 1,
        pageSize: 10
      },
      dialogVisible: false,
      jsonName: {"jvcpagename":"se_account","jvcoldpageName":"se_account","cmd":"query","returnvalue":"1","res.recordsperpage":"12","RecordsPerPage":"12","res":[{"storename":"赤峰翁牛特旗云龙大酒店(吧台）","profitamount":"0","remark":"","winecostamount":"0","cashaccount":"0","storeid":"1083","disprofitamount":"0","consumeraccount":"0","storetype":"3","diswinecostamount":"0","row":"1"},{"storename":"江苏得民数联智能设备科技有限公司","profitamount":"811134","remark":"","winecostamount":"18848087","cashaccount":"0","storeid":"1111","disprofitamount":"0","consumeraccount":"0","storetype":"4","diswinecostamount":"0","row":"2"},{"storename":"宜春市得民酒业有限公司","profitamount":"12758","remark":"","winecostamount":"186954","cashaccount":"0","storeid":"1121","disprofitamount":"0","consumeraccount":"0","storetype":"4","diswinecostamount":"0","row":"3"},{"storename":"宜春得民酒业翡翠城店","profitamount":"540","remark":"","winecostamount":"0","cashaccount":"0","storeid":"1136","disprofitamount":"0","consumeraccount":"0","storetype":"3","diswinecostamount":"0","row":"4"},{"storename":"江西宜春得民酒业","profitamount":"0","remark":"","winecostamount":"0","cashaccount":"0","storeid":"1137","disprofitamount":"0","consumeraccount":"0","storetype":"3","diswinecostamount":"0","row":"5"},{"storename":"宜春商泉酒家","profitamount":"0","remark":"","winecostamount":"0","cashaccount":"0","storeid":"1140","disprofitamount":"0","consumeraccount":"0","storetype":"3","diswinecostamount":"0","row":"6"},{"storename":"扬州得民（门店）","profitamount":"10200","remark":"","winecostamount":"0","cashaccount":"560","storeid":"1144","disprofitamount":"4740","consumeraccount":"497900","storetype":"3","diswinecostamount":"0","row":"7"},{"storename":"扬州塞纳左岸咖啡","profitamount":"255","remark":"","winecostamount":"0","cashaccount":"0","storeid":"1145","disprofitamount":"0","consumeraccount":"500000","storetype":"3","diswinecostamount":"0","row":"8"},{"storename":"蒸达人海鲜馆（已撤）","profitamount":"0","remark":"","winecostamount":"0","cashaccount":"0","storeid":"1148","disprofitamount":"0","consumeraccount":"799800","storetype":"3","diswinecostamount":"0","row":"9"},{"storename":"乐山打渔子","profitamount":"0","remark":"","winecostamount":"0","cashaccount":"0","storeid":"1345","disprofitamount":"0","consumeraccount":"0","storetype":"3","diswinecostamount":"0","row":"10"},{"storename":"赣州德聚仁合会所","profitamount":"0","remark":"","winecostamount":"0","cashaccount":"0","storeid":"1467","disprofitamount":"0","consumeraccount":"0","storetype":"3","diswinecostamount":"0","row":"11"},{"storename":"江西赣州徐静","profitamount":"1003","remark":"","winecostamount":"2736","cashaccount":"0","storeid":"1484","disprofitamount":"0","consumeraccount":"0","storetype":"4","diswinecostamount":"0","row":"12"}],"res.page":[{"RecordsCount":550,"hasNextPage":true,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12,"TotalPageCount":46}],"res.size":"550","returnview":"@json"},
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
