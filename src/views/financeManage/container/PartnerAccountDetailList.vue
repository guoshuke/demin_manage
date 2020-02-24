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
        <el-button type="primary">导出</el-button>
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
  name: 'PartnerAccountDetailList',
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
      jsonName: {"jvcpagename":"se_accountdetail","jvcoldpageName":"se_accountdetail","cmd":"query","returnvalue":"1","query.s-storeType":"4","res.recordsperpage":"12","RecordsPerPage":"-1","res":[{"detailid":"709085","deductbalancehist":"0","detailamount":"4800","proportion":"30","afteramount":"18848087","wineuserid":"-1","beforeamount":"18843287","getouttime":"2020-01-18 11:58:05","orderid":"0","row":"1","wineorderid":"18145","detailtype":"1","storename":"江苏得民数联智能设备科技有限公司","detailtime":"2020-01-18 11:59:56","payamounthist":"16000","getoutnumber":"250","detailcase":"4","remark":"合伙人:1111进行酒水成本结算，取酒码8717606返还酒水成本金额：48.0元","detailcasename":"酒水成本","storeid":"1111","getoutid":"3615225","reporttime":"2020-01-18 11:59:06","je":"16000","brandname":"五粮液股份[纯粮陈窖]42°"},{"detailid":"709083","deductbalancehist":"0","detailamount":"5700","proportion":"30","afteramount":"18843287","wineuserid":"-1","beforeamount":"18837587","getouttime":"2020-01-17 18:42:03","orderid":"0","row":"2","wineorderid":"18144","detailtype":"1","storename":"江苏得民数联智能设备科技有限公司","detailtime":"2020-01-17 18:43:19","payamounthist":"19000","getoutnumber":"250","detailcase":"4","remark":"合伙人:1111进行酒水成本结算，取酒码1200202返还酒水成本金额：57.0元","detailcasename":"酒水成本","storeid":"1111","getoutid":"3615214","reporttime":"2020-01-17 18:43:06","je":"19000","brandname":"五粮液股份[纯粮陈窖]52°"},{"detailid":"709080","deductbalancehist":"39000","detailamount":"11700","proportion":"30","afteramount":"18837587","wineuserid":"39071","beforeamount":"18825887","getouttime":"2020-01-16 12:25:37","orderid":"0","row":"3","wineorderid":"18141","detailtype":"1","storename":"江苏得民数联智能设备科技有限公司","detailtime":"2020-01-16 12:26:25","payamounthist":"0","getoutnumber":"300","detailcase":"4","remark":"合伙人:1111进行酒水成本结算，取酒码1714379返还酒水成本金额：117.0元","detailcasename":"酒水成本","storeid":"1111","getoutid":"3615185","reporttime":"2020-01-16 12:26:23","je":"39000","brandname":"贵州茅台.华茅酒[得民精选]"},{"detailid":"709082","deductbalancehist":"39000","detailamount":"4290","proportion":"11","afteramount":"822334","wineuserid":"39071","beforeamount":"818044","getouttime":"2020-01-16 12:25:37","orderid":"0","row":"4","wineorderid":"18141","detailtype":"1","storename":"江苏得民数联智能设备科技有限公司","detailtime":"2020-01-16 12:26:25","payamounthist":"0","getoutnumber":"300","detailcase":"5","remark":"合伙人:1111进行运营利润分成，取酒码1714379酒券支付：390.0现金支付：0.0分成金额：42.9元","detailcasename":"运营服务费","storeid":"1111","getoutid":"3615185","reporttime":"2020-01-16 12:26:23","je":"39000","brandname":"贵州茅台.华茅酒[得民精选]"},{"detailid":"709077","deductbalancehist":"52000","detailamount":"15600","proportion":"30","afteramount":"18825887","wineuserid":"39071","beforeamount":"18810287","getouttime":"2020-01-16 12:22:47","orderid":"0","row":"5","wineorderid":"18140","detailtype":"1","storename":"江苏得民数联智能设备科技有限公司","detailtime":"2020-01-16 12:24:24","payamounthist":"0","getoutnumber":"400","detailcase":"4","remark":"合伙人:1111进行酒水成本结算，取酒码8355270返还酒水成本金额：156.0元","detailcasename":"酒水成本","storeid":"1111","getoutid":"3615184","reporttime":"2020-01-16 12:23:40","je":"52000","brandname":"贵州茅台.华茅酒[得民精选]"},{"detailid":"709079","deductbalancehist":"52000","detailamount":"5720","proportion":"11","afteramount":"818044","wineuserid":"39071","beforeamount":"812324","getouttime":"2020-01-16 12:22:47","orderid":"0","row":"6","wineorderid":"18140","detailtype":"1","storename":"江苏得民数联智能设备科技有限公司","detailtime":"2020-01-16 12:24:24","payamounthist":"0","getoutnumber":"400","detailcase":"5","remark":"合伙人:1111进行运营利润分成，取酒码8355270酒券支付：520.0现金支付：0.0分成金额：57.2元","detailcasename":"运营服务费","storeid":"1111","getoutid":"3615184","reporttime":"2020-01-16 12:23:40","je":"52000","brandname":"贵州茅台.华茅酒[得民精选]"},{"detailid":"709074","deductbalancehist":"52000","detailamount":"15600","proportion":"30","afteramount":"18810287","wineuserid":"39071","beforeamount":"18794687","getouttime":"2020-01-16 12:20:32","orderid":"0","row":"7","wineorderid":"18138","detailtype":"1","storename":"江苏得民数联智能设备科技有限公司","detailtime":"2020-01-16 12:22:23","payamounthist":"0","getoutnumber":"400","detailcase":"4","remark":"合伙人:1111进行酒水成本结算，取酒码6011901返还酒水成本金额：156.0元","detailcasename":"酒水成本","storeid":"1111","getoutid":"3615183","reporttime":"2020-01-16 12:21:32","je":"52000","brandname":"贵州茅台.华茅酒[得民精选]"},{"detailid":"709076","deductbalancehist":"52000","detailamount":"5720","proportion":"11","afteramount":"812324","wineuserid":"39071","beforeamount":"806604","getouttime":"2020-01-16 12:20:32","orderid":"0","row":"8","wineorderid":"18138","detailtype":"1","storename":"江苏得民数联智能设备科技有限公司","detailtime":"2020-01-16 12:22:23","payamounthist":"0","getoutnumber":"400","detailcase":"5","remark":"合伙人:1111进行运营利润分成，取酒码6011901酒券支付：520.0现金支付：0.0分成金额：57.2元","detailcasename":"运营服务费","storeid":"1111","getoutid":"3615183","reporttime":"2020-01-16 12:21:32","je":"52000","brandname":"贵州茅台.华茅酒[得民精选]"},{"detailid":"709071","deductbalancehist":"52000","detailamount":"15600","proportion":"30","afteramount":"18794687","wineuserid":"39071","beforeamount":"18779087","getouttime":"2020-01-16 12:17:28","orderid":"0","row":"9","wineorderid":"18137","detailtype":"1","storename":"江苏得民数联智能设备科技有限公司","detailtime":"2020-01-16 12:19:22","payamounthist":"0","getoutnumber":"400","detailcase":"4","remark":"合伙人:1111进行酒水成本结算，取酒码8041010返还酒水成本金额：156.0元","detailcasename":"酒水成本","storeid":"1111","getoutid":"3615182","reporttime":"2020-01-16 12:18:50","je":"52000","brandname":"贵州茅台.华茅酒[得民精选]"},{"detailid":"709073","deductbalancehist":"52000","detailamount":"5720","proportion":"11","afteramount":"806604","wineuserid":"39071","beforeamount":"800884","getouttime":"2020-01-16 12:17:28","orderid":"0","row":"10","wineorderid":"18137","detailtype":"1","storename":"江苏得民数联智能设备科技有限公司","detailtime":"2020-01-16 12:19:22","payamounthist":"0","getoutnumber":"400","detailcase":"5","remark":"合伙人:1111进行运营利润分成，取酒码8041010酒券支付：520.0现金支付：0.0分成金额：57.2元","detailcasename":"运营服务费","storeid":"1111","getoutid":"3615182","reporttime":"2020-01-16 12:18:50","je":"52000","brandname":"贵州茅台.华茅酒[得民精选]"},{"detailid":"709070","deductbalancehist":"26000","detailamount":"2860","proportion":"11","afteramount":"800884","wineuserid":"52","beforeamount":"798024","getouttime":"2020-01-15 15:01:42","orderid":"0","row":"11","wineorderid":"18135","detailtype":"1","storename":"江苏得民数联智能设备科技有限公司","detailtime":"2020-01-15 15:02:57","payamounthist":"0","getoutnumber":"200","detailcase":"5","remark":"合伙人:1111进行运营利润分成，取酒码5899952酒券支付：260.0现金支付：0.0分成金额：28.6元","detailcasename":"运营服务费","storeid":"1111","getoutid":"3615146","reporttime":"2020-01-15 15:02:48","je":"26000","brandname":"贵州茅台.华茅酒[得民精选]"},{"detailid":"709069","deductbalancehist":"26000","detailamount":"7800","proportion":"30","afteramount":"18779087","wineuserid":"52","beforeamount":"18771287","getouttime":"2020-01-15 15:01:42","orderid":"0","row":"12","wineorderid":"18135","detailtype":"1","storename":"江苏得民数联智能设备科技有限公司","detailtime":"2020-01-15 15:02:56","payamounthist":"0","getoutnumber":"200","detailcase":"4","remark":"合伙人:1111进行酒水成本结算，取酒码5899952返还酒水成本金额：78.0元","detailcasename":"酒水成本","storeid":"1111","getoutid":"3615146","reporttime":"2020-01-15 15:02:48","je":"26000","brandname":"贵州茅台.华茅酒[得民精选]"}],"res.page":[{"RecordsCount":10690,"hasNextPage":true,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12,"TotalPageCount":891}],"res.size":"10690","single.recordsperpage":"-1","row":"1","single.row":"1","sumdetailamount":"31630730","single.sumdetailamount":"31630730","returnview":""},
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
