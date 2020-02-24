<template>
  <div>
    <div class="flex-row filter-box flex-wrap">
      <div>
        <span>门店名称：</span>
        <el-input v-model="requestParams.storeName" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>服务员手机号：</span>
        <el-input v-model="requestParams.phone" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>银行流水编号：</span>
        <el-input v-model="requestParams.orderId" clearable placeholder="请输入内容"></el-input>
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
        prop="phone"
        label="服务员手机号">
      </el-table-column>
      <el-table-column
        prop="detailcasename"
        label="类型">
      </el-table-column>
      <el-table-column
        prop="getoutnumber"
        label="出酒(ML)">
      </el-table-column>
      <el-table-column
        prop=""
        label="取酒金额">
      </el-table-column>
      <el-table-column
        prop=""
        label="现金支付">
      </el-table-column>
      <el-table-column
        prop=""
        label="抵扣支付">
      </el-table-column>
      <el-table-column
        prop="proportion"
        label="提成比例%">
      </el-table-column>
      <el-table-column
        label="提成金额">
        <template slot-scope="scope">
          <span>{{scope.row.detailamount/100}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="detailtime"
        label="提成时间">
      </el-table-column>
      <el-table-column
        prop="orderid"
        label="银行流水编号">
      </el-table-column>
      <el-table-column
        label="操作前金额">
        <template slot-scope="scope">
          <span>{{scope.row.beforeamount/100}}</span>
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
      <el-table-column
        prop="brandname"
        label="品牌">
      </el-table-column>
      <el-table-column
        prop="reporttime"
        label="上报时间">
      </el-table-column>
      <el-table-column
        prop="getouttime"
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
  name: 'WaiterAccountDetailList',
  components: {
    PageChange,
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        storeName: '',
        detailCase: '',
        phone: '',
        orderId: '',
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
      jsonName: {"jvcpagename":"yjm_waiteraccountdetail","jvcoldpageName":"yjm_waiteraccountdetail","cmd":"query","returnvalue":"1","res.recordsperpage":"12","RecordsPerPage":"-1","res":[{"detailid":"9427","deductbalancehist":"26000","detailamount":"780","proportion":"3","afteramount":"29746","beforeamount":"28966","costfrom":"1","getouttime":"2020-01-15 15:01:42","orderid":"0","phone":"null","wineorderid":"18135","row":"1","detailtype":"1","storename":"扬州得民（门店）","detailtime":"2020-01-15 15:02:57","payamounthist":"0","getoutnumber":"200","detailcase":"1","accountid":"581","price":"65000","remark":"取酒码5899952服务员代取酒，酒券分成：7.8，提成比例：3","detailcasename":"提成","storeid":"1144","reporttime":"2020-01-15 15:02:48","getoutid":"3615146","je":"26000","brandname":"贵州茅台.华茅酒[得民精选]"},{"detailid":"9426","deductbalancehist":"15200","detailamount":"456","proportion":"3","afteramount":"28966","beforeamount":"28510","costfrom":"1","getouttime":"2020-01-15 14:27:21","orderid":"0","phone":"null","wineorderid":"18134","row":"2","detailtype":"1","storename":"扬州得民（门店）","detailtime":"2020-01-15 14:28:47","payamounthist":"0","getoutnumber":"200","detailcase":"1","accountid":"581","price":"38000","remark":"取酒码3707599服务员代取酒，酒券分成：4.56，提成比例：3","detailcasename":"提成","storeid":"1144","reporttime":"2020-01-15 14:28:19","getoutid":"3615143","je":"15200","brandname":"五粮液股份[纯粮陈窖]52°"},{"detailid":"9425","deductbalancehist":"15200","detailamount":"456","proportion":"3","afteramount":"28510","beforeamount":"28054","costfrom":"1","getouttime":"2020-01-15 14:20:57","orderid":"0","phone":"null","wineorderid":"18133","row":"3","detailtype":"1","storename":"扬州得民（门店）","detailtime":"2020-01-15 14:22:45","payamounthist":"0","getoutnumber":"200","detailcase":"1","accountid":"581","price":"38000","remark":"取酒码6546880服务员代取酒，酒券分成：4.56，提成比例：3","detailcasename":"提成","storeid":"1144","reporttime":"2020-01-15 14:21:57","getoutid":"3615142","je":"15200","brandname":"五粮液股份[纯粮陈窖]52°"},{"detailid":"9424","deductbalancehist":"0","detailamount":"195","proportion":"3","afteramount":"28054","beforeamount":"27859","costfrom":"2","getouttime":"2020-01-08 10:46:29","orderid":"0","phone":"null","wineorderid":"18121","row":"4","detailtype":"1","storename":"成都得民科技云酒柜","detailtime":"2020-01-08 10:48:54","payamounthist":"6500","getoutnumber":"50","detailcase":"1","accountid":"581","price":"65000","remark":"取酒码5651160服务员代取酒，现金分成：1.95，提成比例：3","detailcasename":"提成","storeid":"324","reporttime":"2020-01-08 10:48:01","getoutid":"3615014","je":"6500","brandname":"沱牌生态[10年]酱香"},{"detailid":"9423","deductbalancehist":"","detailamount":"263","proportion":"","afteramount":"0","beforeamount":"263","costfrom":"0","getouttime":"","orderid":"1850","phone":"18006100345","wineorderid":"0","row":"5","detailtype":"0","storename":"丹徒区新城新锦尚餐厅宝龙店","detailtime":"2020-01-06 11:44:03","payamounthist":"","getoutnumber":"","detailcase":"0","accountid":"225","price":"0","remark":"服务员代申请取酒提现：2.63元，实到：2.63元","detailcasename":"提现","storeid":"2473","reporttime":"","getoutid":"0","je":"","brandname":""},{"detailid":"9422","deductbalancehist":"1200","detailamount":"36","proportion":"3","afteramount":"27859","beforeamount":"27823","costfrom":"1","getouttime":"2019-12-26 14:49:29","orderid":"0","phone":"null","wineorderid":"18096","row":"6","detailtype":"1","storename":"扬州得民（门店）","detailtime":"2019-12-26 14:50:34","payamounthist":"0","getoutnumber":"50","detailcase":"1","accountid":"581","price":"12000","remark":"取酒码7742734服务员代取酒，酒券分成：0.36，提成比例：3","detailcasename":"提成","storeid":"1144","reporttime":"2019-12-26 14:50:27","getoutid":"3614753","je":"1200","brandname":"泸州老窖永盛烧坊[10]"},{"detailid":"9421","deductbalancehist":"","detailamount":"1841","proportion":"","afteramount":"0","beforeamount":"1841","costfrom":"0","getouttime":"","orderid":"1835","phone":"18655007507","wineorderid":"0","row":"7","detailtype":"0","storename":"惠惠小筑(江大店）","detailtime":"2019-12-13 18:04:20","payamounthist":"","getoutnumber":"","detailcase":"0","accountid":"241","price":"0","remark":"服务员代申请取酒提现：18.41元，实到：18.41元","detailcasename":"提现","storeid":"2469","reporttime":"","getoutid":"0","je":"","brandname":""},{"detailid":"9420","deductbalancehist":"13000","detailamount":"390","proportion":"3","afteramount":"27823","beforeamount":"27433","costfrom":"1","getouttime":"2019-11-22 15:53:44","orderid":"0","phone":"null","wineorderid":"17925","row":"8","detailtype":"1","storename":"成都得民科技云酒柜","detailtime":"2019-11-22 15:55:07","payamounthist":"0","getoutnumber":"100","detailcase":"1","accountid":"581","price":"65000","remark":"取酒码8147546服务员代取酒，酒券分成：3.9，提成比例：3","detailcasename":"提成","storeid":"324","reporttime":"2019-11-22 15:54:54","getoutid":"3614080","je":"13000","brandname":"沱牌生态[10年]酱香"},{"detailid":"9419","deductbalancehist":"6500","detailamount":"195","proportion":"3","afteramount":"27433","beforeamount":"27238","costfrom":"1","getouttime":"2019-11-22 15:51:01","orderid":"0","phone":"null","wineorderid":"17924","row":"9","detailtype":"1","storename":"成都得民科技云酒柜","detailtime":"2019-11-22 15:52:06","payamounthist":"0","getoutnumber":"50","detailcase":"1","accountid":"581","price":"65000","remark":"取酒码3398672服务员代取酒，酒券分成：1.95，提成比例：3","detailcasename":"提成","storeid":"324","reporttime":"2019-11-22 15:51:55","getoutid":"3614079","je":"6500","brandname":"沱牌生态[10年]酱香"},{"detailid":"9418","deductbalancehist":"0","detailamount":"36","proportion":"3","afteramount":"27238","beforeamount":"27202","costfrom":"2","getouttime":"2019-11-18 18:44:33","orderid":"0","phone":"null","wineorderid":"17908","row":"10","detailtype":"1","storename":"老名堂粗菜馆","detailtime":"2019-11-18 18:47:13","payamounthist":"1200","getoutnumber":"50","detailcase":"1","accountid":"581","price":"12000","remark":"取酒码9272397服务员代取酒，现金分成：0.36，提成比例：3","detailcasename":"提成","storeid":"2440","reporttime":"2019-11-18 18:46:43","getoutid":"3613972","je":"1200","brandname":"泸州老窖永盛烧坊[10]"},{"detailid":"9417","deductbalancehist":"0","detailamount":"78","proportion":"3","afteramount":"2492","beforeamount":"2414","costfrom":"2","getouttime":"2019-11-13 17:39:59","orderid":"0","phone":"13861076901","wineorderid":"17878","row":"11","detailtype":"1","storename":"明都枫泽山庄","detailtime":"2019-11-13 17:41:50","payamounthist":"2600","getoutnumber":"50","detailcase":"1","accountid":"492","price":"26000","remark":"取酒码3263393服务员代取酒，现金分成：0.78，提成比例：3","detailcasename":"提成","storeid":"2550","reporttime":"2019-11-13 17:40:51","getoutid":"3613829","je":"2600","brandname":"泸州老窖永盛烧坊[20]"},{"detailid":"9416","deductbalancehist":"0","detailamount":"195","proportion":"3","afteramount":"27202","beforeamount":"27007","costfrom":"2","getouttime":"2019-11-01 17:08:07","orderid":"0","phone":"null","wineorderid":"17837","row":"12","detailtype":"1","storename":"九炉分座","detailtime":"2019-11-01 17:10:22","payamounthist":"6500","getoutnumber":"50","detailcase":"1","accountid":"581","price":"65000","remark":"取酒码3618802服务员代取酒，现金分成：1.95，提成比例：3","detailcasename":"提成","storeid":"2400","reporttime":"2019-11-01 17:09:48","getoutid":"3613589","je":"6500","brandname":"贵州茅台.华茅酒[得民精选]"}],"res.page":[{"RecordsCount":9308,"hasNextPage":true,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12,"TotalPageCount":776}],"res.size":"9308","single.recordsperpage":"-1","row":"1","single.row":"1","allamount":"4025156","single.allamount":"4025156","returnview":""}
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
