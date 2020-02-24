<template>
  <div>
    <div class="flex-row filter-box flex-wrap">
      <div>
        <span>名称：</span>
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
        width="60"
        label="编号">
      </el-table-column>
      <el-table-column
        prop="storename"
        label="投资人姓名">
      </el-table-column>
      <el-table-column
        prop="freewinecost"
        label="免费代取酒服务员提成（%）">
      </el-table-column>
      <el-table-column
        prop="cashwinecost"
        label="现金代取酒服务员提成（%）">
      </el-table-column>
      <el-table-column
        prop="onespreadcost"
        label="会员一级推广提成（%）">
      </el-table-column>
      <el-table-column
        prop="twospreadcost"
        label="会员二级推广提成（%）">
      </el-table-column>
      <el-table-column
        prop="winecost"
        label="酒水成本（%）">
      </el-table-column>
      <el-table-column
        prop="investorfreecost"
        label="投资人酒券提成（%）">
      </el-table-column>
      <el-table-column
        prop="investorcashcost"
        label="投资人现金提成（%）">
      </el-table-column>
      <el-table-column
        prop="detailtime"
        label="投资人现金二级分销（%）">
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
  name: 'PartnerDiscountList',
  components: {
    PageChange,
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        storeName: '',
        pageNum: 1,
        pageSize: 10
      },
      jsonName: {"jvcpagename":"se_store","jvcoldpageName":"se_store","cmd":"queryInvestorDivide","returnvalue":"1","res.recordsperpage":"12","RecordsPerPage":"12","res":[{"storecom_noguarantee_freecost10k":"20","storecom_withguarantee_cashcost50k":"20","freewinecost":"3","cashwinecost":"3","investorcashcost":"0","storecom_withguarantee_freecost20k":"20","storecom_withguarantee_freecost5k":"20","storecom_noguarantee_freecost50k":"20","storecom_noguarantee_cashcost10k":"20","row":"1","storecom_noguarantee_freecost100k":"20","storecom_withguarantee_cashcost100k":"20","storecom_noguarantee_cashcost100k":"20","storecom_withguarantee_cashcost20k":"20","storecom_noguarantee_freecost5k":"20","storename":"江苏得民数联智能设备科技有限公司","storecom_noguarantee_cashcost50k":"20","storecom_withguarantee_cashcost5k":"20","storecom_noguarantee_freecost20k":"20","investorspreadcost":"0","storecom_withguarantee_freecost10k":"20","investorid":"1111","onespreadcost":"4","storeid":"1111","storecom_withguarantee_freecost100k":"20","storecom_noguarantee_cashcost20k":"20","winecost":"30","storecom_noguarantee_cashcost5k":"20","storecom_withguarantee_freecost50k":"20","storecom_withguarantee_cashcost10k":"20","investorfreecost":"11","twospreadcost":"1"},{"storecom_noguarantee_freecost10k":"0","storecom_withguarantee_cashcost50k":"0","freewinecost":"3","cashwinecost":"3","investorcashcost":"0","storecom_withguarantee_freecost20k":"0","storecom_withguarantee_freecost5k":"0","storecom_noguarantee_freecost50k":"0","storecom_noguarantee_cashcost10k":"0","row":"2","storecom_noguarantee_freecost100k":"0","storecom_withguarantee_cashcost100k":"0","storecom_noguarantee_cashcost100k":"0","storecom_withguarantee_cashcost20k":"0","storecom_noguarantee_freecost5k":"0","storename":"小民公司","storecom_noguarantee_cashcost50k":"0","storecom_withguarantee_cashcost5k":"0","storecom_noguarantee_freecost20k":"0","investorspreadcost":"0","storecom_withguarantee_freecost10k":"0","investorid":"1858","onespreadcost":"4","storeid":"1858","storecom_withguarantee_freecost100k":"0","storecom_noguarantee_cashcost20k":"0","winecost":"30","storecom_noguarantee_cashcost5k":"0","storecom_withguarantee_freecost50k":"0","storecom_withguarantee_cashcost10k":"0","investorfreecost":"11","twospreadcost":"1"},{"storecom_noguarantee_freecost10k":"0","storecom_withguarantee_cashcost50k":"0","freewinecost":"3","cashwinecost":"3","investorcashcost":"0","storecom_withguarantee_freecost20k":"0","storecom_withguarantee_freecost5k":"0","storecom_noguarantee_freecost50k":"0","storecom_noguarantee_cashcost10k":"0","row":"3","storecom_noguarantee_freecost100k":"0","storecom_withguarantee_cashcost100k":"0","storecom_noguarantee_cashcost100k":"0","storecom_withguarantee_cashcost20k":"0","storecom_noguarantee_freecost5k":"0","storename":"甘肃得民电子商务有限公司","storecom_noguarantee_cashcost50k":"0","storecom_withguarantee_cashcost5k":"0","storecom_noguarantee_freecost20k":"0","investorspreadcost":"0","storecom_withguarantee_freecost10k":"0","investorid":"1514","onespreadcost":"4","storeid":"1514","storecom_withguarantee_freecost100k":"0","storecom_noguarantee_cashcost20k":"0","winecost":"30","storecom_noguarantee_cashcost5k":"0","storecom_withguarantee_freecost50k":"0","storecom_withguarantee_cashcost10k":"0","investorfreecost":"11","twospreadcost":"1"},{"storecom_noguarantee_freecost10k":"0","storecom_withguarantee_cashcost50k":"0","freewinecost":"3","cashwinecost":"3","investorcashcost":"0","storecom_withguarantee_freecost20k":"0","storecom_withguarantee_freecost5k":"0","storecom_noguarantee_freecost50k":"0","storecom_noguarantee_cashcost10k":"0","row":"4","storecom_noguarantee_freecost100k":"0","storecom_withguarantee_cashcost100k":"0","storecom_noguarantee_cashcost100k":"0","storecom_withguarantee_cashcost20k":"0","storecom_noguarantee_freecost5k":"0","storename":"江西赣州徐静","storecom_noguarantee_cashcost50k":"0","storecom_withguarantee_cashcost5k":"0","storecom_noguarantee_freecost20k":"0","investorspreadcost":"0","storecom_withguarantee_freecost10k":"0","investorid":"1484","onespreadcost":"4","storeid":"1484","storecom_withguarantee_freecost100k":"0","storecom_noguarantee_cashcost20k":"0","winecost":"30","storecom_noguarantee_cashcost5k":"0","storecom_withguarantee_freecost50k":"0","storecom_withguarantee_cashcost10k":"0","investorfreecost":"11","twospreadcost":"1"},{"storecom_noguarantee_freecost10k":"0","storecom_withguarantee_cashcost50k":"0","freewinecost":"3","cashwinecost":"3","investorcashcost":"0","storecom_withguarantee_freecost20k":"0","storecom_withguarantee_freecost5k":"0","storecom_noguarantee_freecost50k":"0","storecom_noguarantee_cashcost10k":"0","row":"5","storecom_noguarantee_freecost100k":"0","storecom_withguarantee_cashcost100k":"0","storecom_noguarantee_cashcost100k":"0","storecom_withguarantee_cashcost20k":"0","storecom_noguarantee_freecost5k":"0","storename":"宜春市得民酒业有限公司","storecom_noguarantee_cashcost50k":"0","storecom_withguarantee_cashcost5k":"0","storecom_noguarantee_freecost20k":"0","investorspreadcost":"0","storecom_withguarantee_freecost10k":"0","investorid":"1121","onespreadcost":"4","storeid":"1121","storecom_withguarantee_freecost100k":"0","storecom_noguarantee_cashcost20k":"0","winecost":"30","storecom_noguarantee_cashcost5k":"0","storecom_withguarantee_freecost50k":"0","storecom_withguarantee_cashcost10k":"0","investorfreecost":"11","twospreadcost":"1"},{"storecom_noguarantee_freecost10k":"0","storecom_withguarantee_cashcost50k":"0","freewinecost":"3","cashwinecost":"3","investorcashcost":"0","storecom_withguarantee_freecost20k":"0","storecom_withguarantee_freecost5k":"0","storecom_noguarantee_freecost50k":"0","storecom_noguarantee_cashcost10k":"0","row":"6","storecom_noguarantee_freecost100k":"0","storecom_withguarantee_cashcost100k":"0","storecom_noguarantee_cashcost100k":"0","storecom_withguarantee_cashcost20k":"0","storecom_noguarantee_freecost5k":"0","storename":"山东得民良诚商贸有限公司","storecom_noguarantee_cashcost50k":"0","storecom_withguarantee_cashcost5k":"0","storecom_noguarantee_freecost20k":"0","investorspreadcost":"0","storecom_withguarantee_freecost10k":"0","investorid":"887","onespreadcost":"4","storeid":"887","storecom_withguarantee_freecost100k":"0","storecom_noguarantee_cashcost20k":"0","winecost":"30","storecom_noguarantee_cashcost5k":"0","storecom_withguarantee_freecost50k":"0","storecom_withguarantee_cashcost10k":"0","investorfreecost":"11","twospreadcost":"1"},{"storecom_noguarantee_freecost10k":"0","storecom_withguarantee_cashcost50k":"0","freewinecost":"3","cashwinecost":"3","investorcashcost":"0","storecom_withguarantee_freecost20k":"0","storecom_withguarantee_freecost5k":"0","storecom_noguarantee_freecost50k":"0","storecom_noguarantee_cashcost10k":"0","row":"7","storecom_noguarantee_freecost100k":"0","storecom_withguarantee_cashcost100k":"0","storecom_noguarantee_cashcost100k":"0","storecom_withguarantee_cashcost20k":"0","storecom_noguarantee_freecost5k":"0","storename":"镇江得民数联智能设备科技有限责任公司","storecom_noguarantee_cashcost50k":"0","storecom_withguarantee_cashcost5k":"0","storecom_noguarantee_freecost20k":"0","investorspreadcost":"0","storecom_withguarantee_freecost10k":"0","investorid":"2407","onespreadcost":"4","storeid":"2407","storecom_withguarantee_freecost100k":"0","storecom_noguarantee_cashcost20k":"0","winecost":"30","storecom_noguarantee_cashcost5k":"0","storecom_withguarantee_freecost50k":"0","storecom_withguarantee_cashcost10k":"0","investorfreecost":"11","twospreadcost":"1"},{"storecom_noguarantee_freecost10k":"18","storecom_withguarantee_cashcost50k":"0","freewinecost":"3","cashwinecost":"3","investorcashcost":"0","storecom_withguarantee_freecost20k":"15","storecom_withguarantee_freecost5k":"5","storecom_noguarantee_freecost50k":"20","storecom_noguarantee_cashcost10k":"0","row":"8","storecom_noguarantee_freecost100k":"20","storecom_withguarantee_cashcost100k":"0","storecom_noguarantee_cashcost100k":"0","storecom_withguarantee_cashcost20k":"0","storecom_noguarantee_freecost5k":"16","storename":"常州得民数联智能设备科技有限公司","storecom_noguarantee_cashcost50k":"0","storecom_withguarantee_cashcost5k":"0","storecom_noguarantee_freecost20k":"20","investorspreadcost":"0","storecom_withguarantee_freecost10k":"10","investorid":"2510","onespreadcost":"4","storeid":"2510","storecom_withguarantee_freecost100k":"15","storecom_noguarantee_cashcost20k":"0","winecost":"40","storecom_noguarantee_cashcost5k":"0","storecom_withguarantee_freecost50k":"15","storecom_withguarantee_cashcost10k":"0","investorfreecost":"4","twospreadcost":"1"},{"storecom_noguarantee_freecost10k":"0","storecom_withguarantee_cashcost50k":"0","freewinecost":"3","cashwinecost":"3","investorcashcost":"0","storecom_withguarantee_freecost20k":"0","storecom_withguarantee_freecost5k":"0","storecom_noguarantee_freecost50k":"0","storecom_noguarantee_cashcost10k":"0","row":"9","storecom_noguarantee_freecost100k":"0","storecom_withguarantee_cashcost100k":"0","storecom_noguarantee_cashcost100k":"0","storecom_withguarantee_cashcost20k":"0","storecom_noguarantee_freecost5k":"0","storename":"河南得民数联科技智能有限公司","storecom_noguarantee_cashcost50k":"0","storecom_withguarantee_cashcost5k":"0","storecom_noguarantee_freecost20k":"0","investorspreadcost":"0","storecom_withguarantee_freecost10k":"0","investorid":"2023","onespreadcost":"4","storeid":"2023","storecom_withguarantee_freecost100k":"0","storecom_noguarantee_cashcost20k":"0","winecost":"30","storecom_noguarantee_cashcost5k":"0","storecom_withguarantee_freecost50k":"0","storecom_withguarantee_cashcost10k":"0","investorfreecost":"11","twospreadcost":"1"},{"storecom_noguarantee_freecost10k":"0","storecom_withguarantee_cashcost50k":"0","freewinecost":"3","cashwinecost":"3","investorcashcost":"0","storecom_withguarantee_freecost20k":"0","storecom_withguarantee_freecost5k":"0","storecom_noguarantee_freecost50k":"0","storecom_noguarantee_cashcost10k":"0","row":"10","storecom_noguarantee_freecost100k":"0","storecom_withguarantee_cashcost100k":"0","storecom_noguarantee_cashcost100k":"0","storecom_withguarantee_cashcost20k":"0","storecom_noguarantee_freecost5k":"0","storename":"苏州得民","storecom_noguarantee_cashcost50k":"0","storecom_withguarantee_cashcost5k":"0","storecom_noguarantee_freecost20k":"0","investorspreadcost":"0","storecom_withguarantee_freecost10k":"0","investorid":"2601","onespreadcost":"4","storeid":"2601","storecom_withguarantee_freecost100k":"0","storecom_noguarantee_cashcost20k":"0","winecost":"30","storecom_noguarantee_cashcost5k":"0","storecom_withguarantee_freecost50k":"0","storecom_withguarantee_cashcost10k":"0","investorfreecost":"11","twospreadcost":"1"},{"storecom_noguarantee_freecost10k":"","storecom_withguarantee_cashcost50k":"","freewinecost":"","cashwinecost":"","investorcashcost":"","storecom_withguarantee_freecost20k":"","storecom_withguarantee_freecost5k":"","storecom_noguarantee_freecost50k":"","storecom_noguarantee_cashcost10k":"","row":"11","storecom_noguarantee_freecost100k":"","storecom_withguarantee_cashcost100k":"","storecom_noguarantee_cashcost100k":"","storecom_withguarantee_cashcost20k":"","storecom_noguarantee_freecost5k":"","storename":"苏州天下有酒智能设备科技有限公司","storecom_noguarantee_cashcost50k":"","storecom_withguarantee_cashcost5k":"","storecom_noguarantee_freecost20k":"","investorspreadcost":"","storecom_withguarantee_freecost10k":"","investorid":"2720","onespreadcost":"","storeid":"","storecom_withguarantee_freecost100k":"","storecom_noguarantee_cashcost20k":"","winecost":"","storecom_noguarantee_cashcost5k":"","storecom_withguarantee_freecost50k":"","storecom_withguarantee_cashcost10k":"","investorfreecost":"","twospreadcost":""}],"res.page":[{"RecordsCount":11,"hasNextPage":false,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12,"TotalPageCount":1}],"res.size":"11","returnview":"@json"},
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
