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
        prop="creatorname"
        label="创客姓名">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="创客手机">
      </el-table-column>
      <el-table-column
        prop="detailtypename"
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
      jsonName: {"jvcpagename":"yjm_creator","jvcoldpageName":"yjm_creator","cmd":"queryAccountDetail","returnvalue":"1","res.recordsperpage":"12","RecordsPerPage":"-1","res":[{"detailamount":"20150","province":"","getoutid":"","wineuserid":"","creatorname":"徐颖宏","wineorderid":"","phone":"15062833338","detailtypename":"提现","getouttime":"","starttime":"2019-01-17 11:45:57","bankcardno":"6216666100002473998","openname":"徐颖宏","afteramount":"0","row":"1","deductbalancehist":"","bankcardname":"BOC","je":"","city":"","remark":"创客联盟每月提现：201.5","banktype":"1","getoutnumber":"","storepreviou":"1111","cardid":"321002196809170318","storeid":"","detailtime":"2020-02-01 00:04:54","brandname":"","reporttime":"","detailid":"416","orderid":"1854","beforeamount":"20150","creatorid":"75","detailtype":"2","storename":"","alipayid":"","alipayname":"","proportion":"","payamounthist":""},{"detailamount":"1300","province":"","getoutid":"","wineuserid":"","creatorname":"傅涵","wineorderid":"","phone":"13914026305","detailtypename":"提现","getouttime":"","starttime":"2019-08-19 14:19:49","bankcardno":"34343535332","openname":"5343434","afteramount":"0","row":"2","deductbalancehist":"","bankcardname":"ICBC","je":"","city":"","remark":"创客联盟每月提现：13.0","banktype":"1","getoutnumber":"","storepreviou":"1858","cardid":"342221199610014156","storeid":"","detailtime":"2020-02-01 00:04:54","brandname":"","reporttime":"","detailid":"417","orderid":"1855","beforeamount":"1300","creatorid":"77","detailtype":"2","storename":"","alipayid":"","alipayname":"","proportion":"","payamounthist":""},{"detailamount":"3900","province":"","getoutid":"3615185","wineuserid":"39071","creatorname":"徐颖宏","wineorderid":"18141","phone":"15062833338","detailtypename":"分成","getouttime":"2020-01-16 12:25:37","starttime":"2019-01-17 11:45:57","bankcardno":"6216666100002473998","openname":"徐颖宏","afteramount":"20150","row":"3","deductbalancehist":"39000","bankcardname":"BOC","je":"39000","city":"","remark":"门店:2581进行运营利润分成;取酒码1714379;免费赠送取酒支付390.0;分成金额：39.0元。","banktype":"1","getoutnumber":"300","storepreviou":"1111","cardid":"321002196809170318","storeid":"2581","detailtime":"2020-01-16 12:26:25","brandname":"贵州茅台.华茅酒[得民精选]","reporttime":"2020-01-16 12:26:23","detailid":"415","orderid":"1854","beforeamount":"16250","creatorid":"75","detailtype":"1","storename":"楼上楼私房菜","alipayid":"","alipayname":"","proportion":"10","payamounthist":"0"},{"detailamount":"5200","province":"","getoutid":"3615184","wineuserid":"39071","creatorname":"徐颖宏","wineorderid":"18140","phone":"15062833338","detailtypename":"分成","getouttime":"2020-01-16 12:22:47","starttime":"2019-01-17 11:45:57","bankcardno":"6216666100002473998","openname":"徐颖宏","afteramount":"16250","row":"4","deductbalancehist":"52000","bankcardname":"BOC","je":"52000","city":"","remark":"门店:2581进行运营利润分成;取酒码8355270;免费赠送取酒支付520.0;分成金额：52.0元。","banktype":"1","getoutnumber":"400","storepreviou":"1111","cardid":"321002196809170318","storeid":"2581","detailtime":"2020-01-16 12:24:24","brandname":"贵州茅台.华茅酒[得民精选]","reporttime":"2020-01-16 12:23:40","detailid":"414","orderid":"1854","beforeamount":"11050","creatorid":"75","detailtype":"1","storename":"楼上楼私房菜","alipayid":"","alipayname":"","proportion":"10","payamounthist":"0"},{"detailamount":"5200","province":"","getoutid":"3615183","wineuserid":"39071","creatorname":"徐颖宏","wineorderid":"18138","phone":"15062833338","detailtypename":"分成","getouttime":"2020-01-16 12:20:32","starttime":"2019-01-17 11:45:57","bankcardno":"6216666100002473998","openname":"徐颖宏","afteramount":"11050","row":"5","deductbalancehist":"52000","bankcardname":"BOC","je":"52000","city":"","remark":"门店:2581进行运营利润分成;取酒码6011901;免费赠送取酒支付520.0;分成金额：52.0元。","banktype":"1","getoutnumber":"400","storepreviou":"1111","cardid":"321002196809170318","storeid":"2581","detailtime":"2020-01-16 12:22:23","brandname":"贵州茅台.华茅酒[得民精选]","reporttime":"2020-01-16 12:21:32","detailid":"413","orderid":"1854","beforeamount":"5850","creatorid":"75","detailtype":"1","storename":"楼上楼私房菜","alipayid":"","alipayname":"","proportion":"10","payamounthist":"0"},{"detailamount":"5200","province":"","getoutid":"3615182","wineuserid":"39071","creatorname":"徐颖宏","wineorderid":"18137","phone":"15062833338","detailtypename":"分成","getouttime":"2020-01-16 12:17:28","starttime":"2019-01-17 11:45:57","bankcardno":"6216666100002473998","openname":"徐颖宏","afteramount":"5850","row":"6","deductbalancehist":"52000","bankcardname":"BOC","je":"52000","city":"","remark":"门店:2581进行运营利润分成;取酒码8041010;免费赠送取酒支付520.0;分成金额：52.0元。","banktype":"1","getoutnumber":"400","storepreviou":"1111","cardid":"321002196809170318","storeid":"2581","detailtime":"2020-01-16 12:19:22","brandname":"贵州茅台.华茅酒[得民精选]","reporttime":"2020-01-16 12:18:50","detailid":"412","orderid":"1854","beforeamount":"650","creatorid":"75","detailtype":"1","storename":"楼上楼私房菜","alipayid":"","alipayname":"","proportion":"10","payamounthist":"0"},{"detailamount":"650","province":"","getoutid":"3615116","wineuserid":"39071","creatorname":"徐颖宏","wineorderid":"18129","phone":"15062833338","detailtypename":"分成","getouttime":"2020-01-12 19:14:54","starttime":"2019-01-17 11:45:57","bankcardno":"6216666100002473998","openname":"徐颖宏","afteramount":"650","row":"7","deductbalancehist":"6500","bankcardname":"BOC","je":"6500","city":"","remark":"门店:2581进行运营利润分成;取酒码6252016;免费赠送取酒支付65.0;分成金额：6.5元。","banktype":"1","getoutnumber":"50","storepreviou":"1111","cardid":"321002196809170318","storeid":"2581","detailtime":"2020-01-12 19:15:37","brandname":"贵州茅台.华茅酒[得民精选]","reporttime":"2020-01-12 19:15:34","detailid":"411","orderid":"1854","beforeamount":"0","creatorid":"75","detailtype":"1","storename":"楼上楼私房菜","alipayid":"","alipayname":"","proportion":"10","payamounthist":"0"},{"detailamount":"1300","province":"","getoutid":"3615014","wineuserid":"-1","creatorname":"傅涵","wineorderid":"18121","phone":"13914026305","detailtypename":"分成","getouttime":"2020-01-08 10:46:29","starttime":"2019-08-19 14:19:49","bankcardno":"34343535332","openname":"5343434","afteramount":"1300","row":"8","deductbalancehist":"0","bankcardname":"ICBC","je":"6500","city":"","remark":"门店:324进行运营利润分成;取酒码5651160;现金取酒支付65.0;分成金额：13.0元。","banktype":"1","getoutnumber":"50","storepreviou":"1858","cardid":"342221199610014156","storeid":"324","detailtime":"2020-01-08 10:48:54","brandname":"沱牌生态[10年]酱香","reporttime":"2020-01-08 10:48:01","detailid":"410","orderid":"1855","beforeamount":"0","creatorid":"77","detailtype":"1","storename":"成都得民科技云酒柜","alipayid":"","alipayname":"","proportion":"20","payamounthist":"6500"},{"detailamount":"1300","province":"","getoutid":"","wineuserid":"","creatorname":"戴德全","wineorderid":"","phone":"13852900866","detailtypename":"提现","getouttime":"","starttime":"2018-02-06 00:00:00","bankcardno":"6236681300001909872","openname":"戴德全","afteramount":"0","row":"9","deductbalancehist":"","bankcardname":"CCB","je":"","city":"","remark":"创客联盟每月提现：13.0","banktype":"1","getoutnumber":"","storepreviou":"1111","cardid":"321102197210293821","storeid":"","detailtime":"2019-12-01 00:04:58","brandname":"","reporttime":"","detailid":"407","orderid":"1830","beforeamount":"1300","creatorid":"20","detailtype":"2","storename":"","alipayid":"","alipayname":"","proportion":"","payamounthist":""},{"detailamount":"240","province":"","getoutid":"","wineuserid":"","creatorname":"赵勇","wineorderid":"","phone":"15995128777","detailtypename":"提现","getouttime":"","starttime":"2018-03-21 00:00:00","bankcardno":"6228480445142819470","openname":"赵勇","afteramount":"0","row":"10","deductbalancehist":"","bankcardname":"ABC","je":"","city":"","remark":"创客联盟每月提现：2.4","banktype":"1","getoutnumber":"","storepreviou":"1111","cardid":"321002196508210312","storeid":"","detailtime":"2019-12-01 00:04:58","brandname":"","reporttime":"","detailid":"408","orderid":"1831","beforeamount":"240","creatorid":"33","detailtype":"2","storename":"","alipayid":"","alipayname":"","proportion":"","payamounthist":""},{"detailamount":"1950","province":"","getoutid":"","wineuserid":"","creatorname":"傅涵","wineorderid":"","phone":"13914026305","detailtypename":"提现","getouttime":"","starttime":"2019-08-19 14:19:49","bankcardno":"34343535332","openname":"5343434","afteramount":"0","row":"11","deductbalancehist":"","bankcardname":"ICBC","je":"","city":"","remark":"创客联盟每月提现：19.5","banktype":"1","getoutnumber":"","storepreviou":"1858","cardid":"342221199610014156","storeid":"","detailtime":"2019-12-01 00:04:58","brandname":"","reporttime":"","detailid":"409","orderid":"1832","beforeamount":"1950","creatorid":"77","detailtype":"2","storename":"","alipayid":"","alipayname":"","proportion":"","payamounthist":""},{"detailamount":"1300","province":"","getoutid":"3614080","wineuserid":"21101","creatorname":"傅涵","wineorderid":"17925","phone":"13914026305","detailtypename":"分成","getouttime":"2019-11-22 15:53:44","starttime":"2019-08-19 14:19:49","bankcardno":"34343535332","openname":"5343434","afteramount":"1950","row":"12","deductbalancehist":"13000","bankcardname":"ICBC","je":"13000","city":"","remark":"门店:324进行运营利润分成;取酒码8147546;免费赠送取酒支付130.0;分成金额：13.0元。","banktype":"1","getoutnumber":"100","storepreviou":"1858","cardid":"342221199610014156","storeid":"324","detailtime":"2019-11-22 15:55:07","brandname":"沱牌生态[10年]酱香","reporttime":"2019-11-22 15:54:54","detailid":"406","orderid":"1832","beforeamount":"650","creatorid":"77","detailtype":"1","storename":"成都得民科技云酒柜","alipayid":"","alipayname":"","proportion":"10","payamounthist":"0"}],"res.page":[{"RecordsCount":417,"hasNextPage":true,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12,"TotalPageCount":35}],"res.size":"417","single.recordsperpage":"-1","row":"1","single.row":"1","adddetailamount":"977677","single.adddetailamount":"977677","reducedetailamount":"960157","single.reducedetailamount":"960157","returnview":""},
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
