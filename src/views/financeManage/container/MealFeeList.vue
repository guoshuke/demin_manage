<template>
  <div>
    <div class="flex-row filter-box flex-wrap">
      <div>
        <span>门店名称：</span>
        <el-input v-model="requestParams.storeName" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>时间：</span>
        <el-date-picker
          v-model="requestParams.appendTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div>
        <el-button type="primary">查询</el-button>
        <el-button type="primary">押金</el-button>
        <el-button type="primary">核销</el-button>
      </div>
    </div>
    <el-table
      :data="jsonName.res"
      border
      style="width: 100%">
      <el-table-column
        prop="storename"
        label="门店名称">
      </el-table-column>
      <el-table-column
        prop="detailcasename"
        label="类型">
      </el-table-column>
      <el-table-column
        prop="detailtypename"
        label="状态">
      </el-table-column>
      <el-table-column
        label="金额">
        <template slot-scope="scope">
          <span>{{scope.row.detailamount/100}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="detailtime"
        label="时间">
      </el-table-column>
      <el-table-column
        label="操作前金额">
        <template slot-scope="scope">
          <span>{{scope.row.detailamount == 0? 0:scope.row.beforeamount/100}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作后余额">
        <template slot-scope="scope">
          <span>{{scope.row.afteramount/100}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注">
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
  name: 'MealFeeList',
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
      jsonName: {"jvcpagename":"se_accountdetail","jvcoldpageName":"se_accountdetail","cmd":"querynew","returnvalue":"1","query.s-storeType":"3","res.recordsperpage":"12","RecordsPerPage":"12","res":[{"detailid":"709088","detailamount":"22950","proportion":"","afteramount":"22950","wineuserid":"","beforeamount":"0","orderid":"","row":"1","wineorderid":"","detailtype":"1","storename":"奇布宠物","detailtime":"2020-01-30 18:38:34","detailcase":"1","remark":"账户充值：","storeid":"2795","detailcasename":"充值","detailtypename":"收入","getoutid":""},{"detailid":"709087","detailamount":"5000000","proportion":"","afteramount":"5000000","wineuserid":"","beforeamount":"0","orderid":"","row":"2","wineorderid":"","detailtype":"1","storename":"扬州思达乐户外","detailtime":"2020-01-21 00:45:16","detailcase":"8","remark":"操作员:demin,增加餐费额度：50000，","storeid":"2944","detailcasename":"餐费额度","detailtypename":"收入","getoutid":""},{"detailid":"709063","detailamount":"5000000","proportion":"","afteramount":"5000000","wineuserid":"","beforeamount":"0","orderid":"","row":"3","wineorderid":"","detailtype":"1","storename":"筋牛座","detailtime":"2020-01-14 09:10:18","detailcase":"8","remark":"操作员:demin,增加餐费额度：50000，","storeid":"2941","detailcasename":"餐费额度","detailtypename":"收入","getoutid":""},{"detailid":"709062","detailamount":"11050","proportion":"","afteramount":"11050","wineuserid":"","beforeamount":"0","orderid":"","row":"4","wineorderid":"","detailtype":"1","storename":"帽牌货冒菜","detailtime":"2020-01-13 10:11:01","detailcase":"1","remark":"账户充值：","storeid":"2813","detailcasename":"充值","detailtypename":"收入","getoutid":""},{"detailid":"709057","detailamount":"305150","proportion":"","afteramount":"305150","wineuserid":"","beforeamount":"0","orderid":"","row":"5","wineorderid":"","detailtype":"1","storename":"富春（绿杨邨店）","detailtime":"2020-01-10 09:57:14","detailcase":"1","remark":"账户充值：","storeid":"2451","detailcasename":"充值","detailtypename":"收入","getoutid":""},{"detailid":"709056","detailamount":"5000000","proportion":"","afteramount":"5000000","wineuserid":"","beforeamount":"0","orderid":"","row":"6","wineorderid":"","detailtype":"1","storename":"特百惠（兴城路店）","detailtime":"2020-01-09 14:35:02","detailcase":"8","remark":"操作员:demin,增加餐费额度：50000，","storeid":"2938","detailcasename":"餐费额度","detailtypename":"收入","getoutid":""},{"detailid":"709055","detailamount":"5000000","proportion":"","afteramount":"5000000","wineuserid":"","beforeamount":"0","orderid":"","row":"7","wineorderid":"","detailtype":"1","storename":"欧派家纺生活馆","detailtime":"2020-01-09 14:34:56","detailcase":"8","remark":"操作员:demin,增加餐费额度：50000，","storeid":"2939","detailcasename":"餐费额度","detailtypename":"收入","getoutid":""},{"detailid":"709054","detailamount":"5000000","proportion":"","afteramount":"5000000","wineuserid":"","beforeamount":"0","orderid":"","row":"8","wineorderid":"","detailtype":"1","storename":"御景房产","detailtime":"2020-01-09 14:34:51","detailcase":"8","remark":"操作员:demin,增加餐费额度：50000，","storeid":"2940","detailcasename":"餐费额度","detailtypename":"收入","getoutid":""},{"detailid":"709053","detailamount":"5000000","proportion":"","afteramount":"5000000","wineuserid":"","beforeamount":"0","orderid":"","row":"9","wineorderid":"","detailtype":"1","storename":"YOCO眼镜","detailtime":"2020-01-08 14:17:41","detailcase":"8","remark":"操作员:demin,增加餐费额度：50000，","storeid":"2937","detailcasename":"餐费额度","detailtypename":"收入","getoutid":""},{"detailid":"709050","detailamount":"5000000","proportion":"","afteramount":"5000000","wineuserid":"","beforeamount":"0","orderid":"","row":"10","wineorderid":"","detailtype":"1","storename":"fashion宝妈产后恢复中心","detailtime":"2020-01-07 11:42:27","detailcase":"8","remark":"操作员:demin,增加餐费额度：50000，","storeid":"2933","detailcasename":"餐费额度","detailtypename":"收入","getoutid":""},{"detailid":"709049","detailamount":"5000000","proportion":"","afteramount":"5000000","wineuserid":"","beforeamount":"0","orderid":"","row":"11","wineorderid":"","detailtype":"1","storename":"依视诺","detailtime":"2020-01-07 11:42:21","detailcase":"8","remark":"操作员:demin,增加餐费额度：50000，","storeid":"2934","detailcasename":"餐费额度","detailtypename":"收入","getoutid":""},{"detailid":"709048","detailamount":"5000000","proportion":"","afteramount":"5000000","wineuserid":"","beforeamount":"0","orderid":"","row":"12","wineorderid":"","detailtype":"1","storename":"汪喵宠物生活馆","detailtime":"2020-01-07 11:42:14","detailcase":"8","remark":"操作员:demin,增加餐费额度：50000，","storeid":"2935","detailcasename":"餐费额度","detailtypename":"收入","getoutid":""}],"res.page":[{"RecordsCount":503,"hasNextPage":true,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12,"TotalPageCount":42}],"res.size":"503","returnview":""},
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
