<template>
  <div>
    <div class="flex-row filter-box flex-wrap">
      <div>
        <span>门店名称：</span>
        <el-input v-model="requestParams.storeName" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>专员手机号：</span>
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
  name: 'ProfessionalsAccountDetailList',
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
      jsonName: {"jvcpagename":"yjm_storeCommissionerAccountDetail","jvcoldpageName":"yjm_storeCommissionerAccountDetail","cmd":"query","returnvalue":"1","res.recordsperpage":"12","RecordsPerPage":"-1","res":[{"detailid":"18","deductbalancehist":"1200","detailamount":"240","proportion":"20","afteramount":"3720","beforeamount":"3480","costfrom":"1","getouttime":"2019-11-07 13:24:16","orderid":"0","phone":"13852516898","wineorderid":"17859","row":"1","detailtype":"1","storename":"渝滋味霸王牛肉","detailtime":"2019-11-17 00:00:25","payamounthist":"0","getoutnumber":"50","detailcase":"1","accountid":"10","price":"12000","remark":"取酒码：5369223专员分成，酒券分成：2.4元，提成比例：20","detailcasename":"提成","storeid":"2580","reporttime":"2019-11-07 13:25:13","getoutid":"3613679","je":"1200","brandname":"泸州老窖永盛烧坊[10]"},{"detailid":"17","deductbalancehist":"0","detailamount":"760","proportion":"20","afteramount":"940","beforeamount":"180","costfrom":"2","getouttime":"2019-05-23 20:11:34","orderid":"0","phone":"18951058027","wineorderid":"17002","row":"2","detailtype":"1","storename":"楼上楼私房菜","detailtime":"2019-06-17 00:00:19","payamounthist":"3800","getoutnumber":"50","detailcase":"1","accountid":"11","price":"38000","remark":"取酒码：1140197专员分成，现金分成：7.6元，提成比例：20","detailcasename":"提成","storeid":"2581","reporttime":"2019-05-23 20:12:26","getoutid":"3610377","je":"3800","brandname":"五粮液股份[纯粮陈窖]52°"},{"detailid":"16","deductbalancehist":"0","detailamount":"480","proportion":"20","afteramount":"1440","beforeamount":"960","costfrom":"2","getouttime":"2019-05-02 12:11:07","orderid":"0","phone":"15861345670","wineorderid":"16930","row":"3","detailtype":"1","storename":"老刘家火锅","detailtime":"2019-05-28 00:00:20","payamounthist":"2400","getoutnumber":"100","detailcase":"1","accountid":"12","price":"12000","remark":"取酒码：9327108专员分成，现金分成：4.8元，提成比例：20","detailcasename":"提成","storeid":"2582","reporttime":"2019-05-02 12:12:01","getoutid":"3609935","je":"2400","brandname":"泸州老窖永盛烧坊[10]"},{"detailid":"15","deductbalancehist":"0","detailamount":"480","proportion":"20","afteramount":"3480","beforeamount":"3000","costfrom":"2","getouttime":"2019-04-26 18:30:07","orderid":"0","phone":"13852516898","wineorderid":"16907","row":"4","detailtype":"1","storename":"渝滋味霸王牛肉","detailtime":"2019-05-17 00:00:21","payamounthist":"2400","getoutnumber":"100","detailcase":"1","accountid":"10","price":"12000","remark":"取酒码：3530750专员分成，现金分成：4.8元，提成比例：20","detailcasename":"提成","storeid":"2580","reporttime":"2019-04-26 18:31:02","getoutid":"3609828","je":"2400","brandname":"泸州老窖永盛烧坊[10]"},{"detailid":"14","deductbalancehist":"0","detailamount":"720","proportion":"20","afteramount":"3000","beforeamount":"2280","costfrom":"2","getouttime":"2019-04-18 18:38:05","orderid":"0","phone":"13852516898","wineorderid":"16854","row":"5","detailtype":"1","storename":"渝滋味霸王牛肉","detailtime":"2019-05-17 00:00:21","payamounthist":"3600","getoutnumber":"150","detailcase":"1","accountid":"10","price":"12000","remark":"取酒码：6767275专员分成，现金分成：7.2元，提成比例：20","detailcasename":"提成","storeid":"2580","reporttime":"2019-04-18 18:39:05","getoutid":"3609548","je":"3600","brandname":"泸州老窖永盛烧坊[10]"},{"detailid":"13","deductbalancehist":"0","detailamount":"240","proportion":"20","afteramount":"960","beforeamount":"720","costfrom":"2","getouttime":"2019-04-13 20:14:46","orderid":"0","phone":"15861345670","wineorderid":"16829","row":"6","detailtype":"1","storename":"老刘家火锅","detailtime":"2019-04-28 00:00:22","payamounthist":"1200","getoutnumber":"50","detailcase":"1","accountid":"12","price":"12000","remark":"取酒码：9868694专员分成，现金分成：2.4元，提成比例：20","detailcasename":"提成","storeid":"2582","reporttime":"2019-04-13 20:15:25","getoutid":"3609448","je":"1200","brandname":"泸州老窖永盛烧坊[10]"},{"detailid":"12","deductbalancehist":"0","detailamount":"480","proportion":"20","afteramount":"2280","beforeamount":"1800","costfrom":"2","getouttime":"2019-04-09 18:15:52","orderid":"0","phone":"13852516898","wineorderid":"16792","row":"7","detailtype":"1","storename":"渝滋味霸王牛肉","detailtime":"2019-04-17 00:00:23","payamounthist":"2400","getoutnumber":"100","detailcase":"1","accountid":"10","price":"12000","remark":"取酒码：8663904专员分成，现金分成：4.8元，提成比例：20","detailcasename":"提成","storeid":"2580","reporttime":"2019-04-09 18:16:51","getoutid":"3609341","je":"2400","brandname":"泸州老窖永盛烧坊[10]"},{"detailid":"11","deductbalancehist":"0","detailamount":"540","proportion":"20","afteramount":"1800","beforeamount":"1260","costfrom":"2","getouttime":"2019-04-03 18:34:45","orderid":"0","phone":"13852516898","wineorderid":"16746","row":"8","detailtype":"1","storename":"渝滋味霸王牛肉","detailtime":"2019-04-17 00:00:23","payamounthist":"2700","getoutnumber":"150","detailcase":"1","accountid":"10","price":"9000","remark":"取酒码：1677768专员分成，现金分成：5.4元，提成比例：20","detailcasename":"提成","storeid":"2580","reporttime":"2019-04-03 18:35:38","getoutid":"3609183","je":"2700","brandname":"曼珠沙华"},{"detailid":"10","deductbalancehist":"0","detailamount":"540","proportion":"20","afteramount":"1260","beforeamount":"720","costfrom":"2","getouttime":"2019-03-28 18:48:28","orderid":"0","phone":"13852516898","wineorderid":"16707","row":"9","detailtype":"1","storename":"渝滋味霸王牛肉","detailtime":"2019-04-17 00:00:23","payamounthist":"2700","getoutnumber":"150","detailcase":"1","accountid":"10","price":"9000","remark":"取酒码：5581523专员分成，现金分成：5.4元，提成比例：20","detailcasename":"提成","storeid":"2580","reporttime":"2019-03-28 18:49:24","getoutid":"3608970","je":"2700","brandname":"曼珠沙华"},{"detailid":"9","deductbalancehist":"0","detailamount":"240","proportion":"20","afteramount":"720","beforeamount":"480","costfrom":"2","getouttime":"2019-03-20 19:29:39","orderid":"0","phone":"13852516898","wineorderid":"16667","row":"10","detailtype":"1","storename":"渝滋味霸王牛肉","detailtime":"2019-04-17 00:00:23","payamounthist":"1200","getoutnumber":"50","detailcase":"1","accountid":"10","price":"12000","remark":"取酒码：3646362专员分成，现金分成：2.4元，提成比例：20","detailcasename":"提成","storeid":"2580","reporttime":"2019-03-20 19:31:57","getoutid":"3608823","je":"1200","brandname":"泸州老窖永盛烧坊[10]"},{"detailid":"8","deductbalancehist":"0","detailamount":"720","proportion":"20","afteramount":"720","beforeamount":"0","costfrom":"2","getouttime":"2019-03-14 18:58:07","orderid":"0","phone":"15861345670","wineorderid":"16635","row":"11","detailtype":"1","storename":"老刘家火锅","detailtime":"2019-03-28 00:00:25","payamounthist":"3600","getoutnumber":"200","detailcase":"1","accountid":"12","price":"9000","remark":"取酒码：2362634专员分成，现金分成：7.2元，提成比例：20","detailcasename":"提成","storeid":"2582","reporttime":"2019-03-14 18:59:07","getoutid":"3608573","je":"3600","brandname":"曼珠沙华"},{"detailid":"6","deductbalancehist":"0","detailamount":"240","proportion":"20","afteramount":"480","beforeamount":"240","costfrom":"2","getouttime":"2019-03-11 18:28:06","orderid":"0","phone":"13852516898","wineorderid":"16613","row":"12","detailtype":"1","storename":"渝滋味霸王牛肉","detailtime":"2019-03-17 00:00:26","payamounthist":"1200","getoutnumber":"50","detailcase":"1","accountid":"10","price":"12000","remark":"取酒码：8868289专员分成，现金分成：2.4元，提成比例：20","detailcasename":"提成","storeid":"2580","reporttime":"2019-03-11 18:28:58","getoutid":"3608445","je":"1200","brandname":"泸州老窖永盛烧坊[10]"}],"res.page":[{"RecordsCount":14,"hasNextPage":true,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12,"TotalPageCount":2}],"res.size":"14","single.recordsperpage":"-1","row":"1","single.row":"1","allamount":"6100","single.allamount":"6100","returnview":""}
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
