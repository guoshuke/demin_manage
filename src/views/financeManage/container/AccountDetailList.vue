<template>
  <div>
    <div class="flex-row filter-box flex-wrap">
      <div>
        <span>门店名称：</span>
        <el-input v-model="requestParams.storeName" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>提成时间：</span>
        <el-date-picker
          v-model="requestParams.appendTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div>
        <span>类型：</span>
        <el-select v-model="requestParams.detailCase" placeholder="请选择">
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
        prop="storename"
        label="门店名称">
      </el-table-column>
      <el-table-column
        prop="storeid"
        width="80"
        label="门店编号">
      </el-table-column>
      <el-table-column
        prop="detailcasename"
        label="类型"
        width="80">
      </el-table-column>
      <el-table-column
        prop="getoutnumber"
        label="出酒(ML)"
        width="80">
      </el-table-column>
      <el-table-column
        prop=""
        label="取酒金额"
        width="80">
      </el-table-column>
      <el-table-column
        prop=""
        width="80"
        label="现金支付">
      </el-table-column>
      <el-table-column
        prop=""
        width="80"
        label="抵扣支付">
      </el-table-column>
      <el-table-column
        prop="proportion"
        width="90"
        label="提成比例%">
      </el-table-column>
      <el-table-column
        width="90"
        label="提成金额">
        <template slot-scope="scope">
          <span>{{scope.row.detailamount/100}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="detailtime"
        width="100"
        label="提成时间">
      </el-table-column>
      <el-table-column
        width="100"
        label="操作前金额">
        <template slot-scope="scope">
          <span>{{scope.row.beforeamount/100}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="100"
        label="操作后余额">
        <template slot-scope="scope">
          <span>{{scope.row.afteramount/100}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注">
      </el-table-column>
      <el-table-column
        prop="brandname"
        width="120"
        label="品牌">
      </el-table-column>
      <el-table-column
        prop="reporttime"
        width="100"
        label="上报时间">
      </el-table-column>
      <el-table-column
        prop="getouttime"
        width="100"
        label="取酒时间">
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
  name: 'AccountDetailList',
  components: {
    PageChange,
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        storeName: '',
        detailCase: '',
        morethan: '',
        lessthan: '',
        pageNum: 1,
        pageSize: 10
      },
      options: [{
        value: '',
        label: '全部'
      }, {
        value: '1',
        label: '充值'
      }, {
        value: '2',
        label: '餐费提现'
      }, {
        value: '3',
        label: '押金'
      }, {
        value: '5',
        label: '运营服务费'
      }, {
        value: '7',
        label: '运营服务费划拨'
      }, {
        value: '8',
        label: '手动增加餐费额度'
      }],
      value: '',
      tableData: [],
      jsonName: {"jvcpagename":"se_accountdetail","jvcoldpageName":"se_accountdetail","cmd":"query","returnvalue":"1","query.s-storeType":"3","res.recordsperpage":"12","RecordsPerPage":"-1","res":[{"detailid":"709088","deductbalancehist":"","detailamount":"22950","proportion":"","afteramount":"22950","wineuserid":"","beforeamount":"0","getouttime":"","orderid":"","row":"1","wineorderid":"","detailtype":"1","storename":"奇布宠物","detailtime":"2020-01-30 18:38:34","payamounthist":"","getoutnumber":"","detailcase":"1","remark":"账户充值：","detailcasename":"充值","storeid":"2795","getoutid":"","reporttime":"","je":"","brandname":""},{"detailid":"709087","deductbalancehist":"","detailamount":"5000000","proportion":"","afteramount":"5000000","wineuserid":"","beforeamount":"0","getouttime":"","orderid":"","row":"2","wineorderid":"","detailtype":"1","storename":"扬州思达乐户外","detailtime":"2020-01-21 00:45:16","payamounthist":"","getoutnumber":"","detailcase":"8","remark":"操作员:demin,增加餐费额度：50000，","detailcasename":"手动增加餐费额度","storeid":"2944","getoutid":"","reporttime":"","je":"","brandname":""},{"detailid":"709086","deductbalancehist":"0","detailamount":"15840","proportion":"99","afteramount":"207405","wineuserid":"-1","beforeamount":"191565","getouttime":"2020-01-18 11:58:05","orderid":"0","row":"3","wineorderid":"18145","detailtype":"1","storename":"顾家厨房","detailtime":"2020-01-18 11:59:56","payamounthist":"16000","getoutnumber":"250","detailcase":"5","remark":"门店:2401进行运营利润分成，取酒码8717606现金支付：160.0提成金额：158.4元,提成比例：99","detailcasename":"运营服务费","storeid":"2401","getoutid":"3615225","reporttime":"2020-01-18 11:59:06","je":"16000","brandname":"五粮液股份[纯粮陈窖]42°"},{"detailid":"709084","deductbalancehist":"0","detailamount":"18810","proportion":"99","afteramount":"191565","wineuserid":"-1","beforeamount":"172755","getouttime":"2020-01-17 18:42:03","orderid":"0","row":"4","wineorderid":"18144","detailtype":"1","storename":"顾家厨房","detailtime":"2020-01-17 18:43:19","payamounthist":"19000","getoutnumber":"250","detailcase":"5","remark":"门店:2401进行运营利润分成，取酒码1200202现金支付：190.0提成金额：188.1元,提成比例：99","detailcasename":"运营服务费","storeid":"2401","getoutid":"3615214","reporttime":"2020-01-17 18:43:06","je":"19000","brandname":"五粮液股份[纯粮陈窖]52°"},{"detailid":"709081","deductbalancehist":"39000","detailamount":"5850","proportion":"15","afteramount":"31245","wineuserid":"39071","beforeamount":"25395","getouttime":"2020-01-16 12:25:37","orderid":"0","row":"5","wineorderid":"18141","detailtype":"1","storename":"楼上楼私房菜","detailtime":"2020-01-16 12:26:25","payamounthist":"0","getoutnumber":"300","detailcase":"5","remark":"门店:2581进行运营利润分成，取酒码1714379酒劵支付：390.0提成金额：58.5元,提成比例：15","detailcasename":"运营服务费","storeid":"2581","getoutid":"3615185","reporttime":"2020-01-16 12:26:23","je":"39000","brandname":"贵州茅台.华茅酒[得民精选]"},{"detailid":"709078","deductbalancehist":"52000","detailamount":"7800","proportion":"15","afteramount":"25395","wineuserid":"39071","beforeamount":"17595","getouttime":"2020-01-16 12:22:47","orderid":"0","row":"6","wineorderid":"18140","detailtype":"1","storename":"楼上楼私房菜","detailtime":"2020-01-16 12:24:24","payamounthist":"0","getoutnumber":"400","detailcase":"5","remark":"门店:2581进行运营利润分成，取酒码8355270酒劵支付：520.0提成金额：78.0元,提成比例：15","detailcasename":"运营服务费","storeid":"2581","getoutid":"3615184","reporttime":"2020-01-16 12:23:40","je":"52000","brandname":"贵州茅台.华茅酒[得民精选]"},{"detailid":"709075","deductbalancehist":"52000","detailamount":"7800","proportion":"15","afteramount":"17595","wineuserid":"39071","beforeamount":"9795","getouttime":"2020-01-16 12:20:32","orderid":"0","row":"7","wineorderid":"18138","detailtype":"1","storename":"楼上楼私房菜","detailtime":"2020-01-16 12:22:23","payamounthist":"0","getoutnumber":"400","detailcase":"5","remark":"门店:2581进行运营利润分成，取酒码6011901酒劵支付：520.0提成金额：78.0元,提成比例：15","detailcasename":"运营服务费","storeid":"2581","getoutid":"3615183","reporttime":"2020-01-16 12:21:32","je":"52000","brandname":"贵州茅台.华茅酒[得民精选]"},{"detailid":"709072","deductbalancehist":"52000","detailamount":"7800","proportion":"15","afteramount":"9795","wineuserid":"39071","beforeamount":"1995","getouttime":"2020-01-16 12:17:28","orderid":"0","row":"8","wineorderid":"18137","detailtype":"1","storename":"楼上楼私房菜","detailtime":"2020-01-16 12:19:22","payamounthist":"0","getoutnumber":"400","detailcase":"5","remark":"门店:2581进行运营利润分成，取酒码8041010酒劵支付：520.0提成金额：78.0元,提成比例：15","detailcasename":"运营服务费","storeid":"2581","getoutid":"3615182","reporttime":"2020-01-16 12:18:50","je":"52000","brandname":"贵州茅台.华茅酒[得民精选]"},{"detailid":"709064","deductbalancehist":"","detailamount":"11050","proportion":"","afteramount":"0","wineuserid":"0","beforeamount":"11050","getouttime":"","orderid":"1853","row":"9","wineorderid":"0","detailtype":"0","storename":"帽牌货冒菜","detailtime":"2020-01-14 16:08:27","payamounthist":"","getoutnumber":"","detailcase":"2","remark":"门店财务人员:13913108816进行提现操作，提现金额：110.5元","detailcasename":"提现","storeid":"2813","getoutid":"0","reporttime":"","je":"","brandname":""},{"detailid":"709063","deductbalancehist":"","detailamount":"5000000","proportion":"","afteramount":"5000000","wineuserid":"","beforeamount":"0","getouttime":"","orderid":"","row":"10","wineorderid":"","detailtype":"1","storename":"筋牛座","detailtime":"2020-01-14 09:10:18","payamounthist":"","getoutnumber":"","detailcase":"8","remark":"操作员:demin,增加餐费额度：50000，","detailcasename":"手动增加餐费额度","storeid":"2941","getoutid":"","reporttime":"","je":"","brandname":""},{"detailid":"709062","deductbalancehist":"","detailamount":"11050","proportion":"","afteramount":"11050","wineuserid":"","beforeamount":"0","getouttime":"","orderid":"","row":"11","wineorderid":"","detailtype":"1","storename":"帽牌货冒菜","detailtime":"2020-01-13 10:11:01","payamounthist":"","getoutnumber":"","detailcase":"1","remark":"账户充值：","detailcasename":"充值","storeid":"2813","getoutid":"","reporttime":"","je":"","brandname":""},{"detailid":"709060","deductbalancehist":"6500","detailamount":"975","proportion":"15","afteramount":"1995","wineuserid":"39071","beforeamount":"1020","getouttime":"2020-01-12 19:14:54","orderid":"0","row":"12","wineorderid":"18129","detailtype":"1","storename":"楼上楼私房菜","detailtime":"2020-01-12 19:15:37","payamounthist":"0","getoutnumber":"50","detailcase":"5","remark":"门店:2581进行运营利润分成，取酒码6252016酒劵支付：65.0提成金额：9.75元,提成比例：15","detailcasename":"运营服务费","storeid":"2581","getoutid":"3615116","reporttime":"2020-01-12 19:15:34","je":"6500","brandname":"贵州茅台.华茅酒[得民精选]"}],"res.page":[{"RecordsCount":1424,"hasNextPage":true,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12,"TotalPageCount":119}],"res.size":"1424","single.recordsperpage":"-1","row":"1","single.row":"1","sumdetailamount":"1452072491","single.sumdetailamount":"1452072491","returnview":""}
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
