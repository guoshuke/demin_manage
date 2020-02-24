<template>
  <div>
    <div class="flex-row filter-box flex-wrap">
      <div>
        <span>账户：</span>
        <el-input v-model="requestParams.buyerUserId" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>会员手机：</span>
        <el-input v-model="requestParams.userPhone" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>取酒码：</span>
        <el-input v-model="requestParams.codeNo" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>生成时间：</span>
        <el-date-picker
          v-model="requestParams.beginTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
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
        prop="userid"
        label="账号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="phonenumber"
        width="110"
        label="会员手机">
      </el-table-column>
      <el-table-column
        prop="codeno"
        label="取酒码"
        width="90">
      </el-table-column>
      <el-table-column
        prop="begintime"
        label="有效时间"
        width="160">
      </el-table-column>
      <el-table-column
        prop="endtime"
        label="失效时间"
        width="160">
      </el-table-column>
      <el-table-column
        prop="storename"
        label="门店">
      </el-table-column>
      <el-table-column
        prop="brandname"
        label="品牌">
      </el-table-column>
      <el-table-column
        prop="mltotal"
        label="总量"
        width="60">
      </el-table-column>
      <el-table-column
        prop="mltotal"
        label="余量"
        width="60">
      </el-table-column>
      <el-table-column
        prop=""
        label="剩余现金"
        width="100">
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
  name: 'InvestorList',
  components: {
    PageChange
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        buyerUserId: '',
        userPhone: '',
        codeNo: '',
        beginTime: '',
        pageNum: 1,
        pageSize: 10
      },
      dialogVisible: false,
      jsonName: {"jvcpagename":"ur_getoutcode","jvcoldpageName":"ur_getoutcode","cmd":"query","returnvalue":"1","query.a-extend1":"2","res.recordsperpage":"12","RecordsPerPage":"-1","res":[{"extend2":"","codeno":"1714379","extend1":"","discouponprice":"0","lastlogintime":"","deductbalance":"39000","usercredits":"0","codestate":"3","wechatid":"oOL3g1YFOja6zjaY9qWwl-Y-L54E_demin","codefrom":"18141","row":"1","city":"1110","dispayamount":"0","disdeductbalance":"39000","mlget":"300","retailprice":"65000","loginpwd":"","userpassword":"","endtime":"2020-01-16 12:55:15","remainpayamount":"0","codestatus":"1","spreadcode":"0u5b","couponprice":"0","storeid":"2581","status":"0","brandname":"贵州茅台.华茅酒[得民精选]","mltotal":"300","ispwd":"","usergrade":"","codearea":"无门店限制","phonenumber":"17751366866","codestatename":"使用完","buyeruserid":"39071","registertime":"2019-10-11 12:20:18","payamount":"0","recomuserid":"22077","codeid":"13918","brandid":"174","storename":"楼上楼私房菜","begintime":"2020-01-16 12:25:15","userid":"39071","consumepwd":"","usersource":"0","type":"0"},{"extend2":"","codeno":"8355270","extend1":"","discouponprice":"0","lastlogintime":"","deductbalance":"52000","usercredits":"0","codestate":"3","wechatid":"oOL3g1YFOja6zjaY9qWwl-Y-L54E_demin","codefrom":"18140","row":"2","city":"1110","dispayamount":"0","disdeductbalance":"52000","mlget":"400","retailprice":"65000","loginpwd":"","userpassword":"","endtime":"2020-01-16 12:52:29","remainpayamount":"0","codestatus":"1","spreadcode":"0u5b","couponprice":"0","storeid":"2581","status":"0","brandname":"贵州茅台.华茅酒[得民精选]","mltotal":"400","ispwd":"","usergrade":"","codearea":"无门店限制","phonenumber":"17751366866","codestatename":"使用完","buyeruserid":"39071","registertime":"2019-10-11 12:20:18","payamount":"0","recomuserid":"22077","codeid":"13917","brandid":"174","storename":"楼上楼私房菜","begintime":"2020-01-16 12:22:29","userid":"39071","consumepwd":"","usersource":"0","type":"0"},{"extend2":"","codeno":"6011901","extend1":"","discouponprice":"0","lastlogintime":"","deductbalance":"52000","usercredits":"0","codestate":"3","wechatid":"oOL3g1YFOja6zjaY9qWwl-Y-L54E_demin","codefrom":"18138","row":"3","city":"1110","dispayamount":"0","disdeductbalance":"52000","mlget":"400","retailprice":"65000","loginpwd":"","userpassword":"","endtime":"2020-01-16 12:49:51","remainpayamount":"0","codestatus":"1","spreadcode":"0u5b","couponprice":"0","storeid":"2581","status":"0","brandname":"贵州茅台.华茅酒[得民精选]","mltotal":"400","ispwd":"","usergrade":"","codearea":"无门店限制","phonenumber":"17751366866","codestatename":"使用完","buyeruserid":"39071","registertime":"2019-10-11 12:20:18","payamount":"0","recomuserid":"22077","codeid":"13916","brandid":"174","storename":"楼上楼私房菜","begintime":"2020-01-16 12:19:51","userid":"39071","consumepwd":"","usersource":"0","type":"0"},{"extend2":"","codeno":"8041010","extend1":"","discouponprice":"0","lastlogintime":"","deductbalance":"52000","usercredits":"0","codestate":"3","wechatid":"oOL3g1YFOja6zjaY9qWwl-Y-L54E_demin","codefrom":"18137","row":"4","city":"1110","dispayamount":"0","disdeductbalance":"52000","mlget":"400","retailprice":"65000","loginpwd":"","userpassword":"","endtime":"2020-01-16 12:46:58","remainpayamount":"0","codestatus":"1","spreadcode":"0u5b","couponprice":"0","storeid":"2581","status":"0","brandname":"贵州茅台.华茅酒[得民精选]","mltotal":"400","ispwd":"","usergrade":"","codearea":"无门店限制","phonenumber":"17751366866","codestatename":"使用完","buyeruserid":"39071","registertime":"2019-10-11 12:20:18","payamount":"0","recomuserid":"22077","codeid":"13915","brandid":"174","storename":"楼上楼私房菜","begintime":"2020-01-16 12:16:58","userid":"39071","consumepwd":"","usersource":"0","type":"0"},{"extend2":"","codeno":"8344294","extend1":"","discouponprice":"0","lastlogintime":"","deductbalance":"52000","usercredits":"0","codestate":"5","wechatid":"oOL3g1fJUevH3A-IlWCae52IbRKk_demin","codefrom":"18136","row":"5","city":"1110","dispayamount":"0","disdeductbalance":"0","mlget":"0","retailprice":"65000","loginpwd":"","userpassword":"","endtime":"2020-01-15 15:41:07","remainpayamount":"0","codestatus":"","spreadcode":"001g","couponprice":"0","storeid":"1144","status":"1","brandname":"贵州茅台.华茅酒[得民精选]","mltotal":"400","ispwd":"1","usergrade":"","codearea":"无门店限制","phonenumber":"18652756881","codestatename":"","buyeruserid":"52","registertime":"2017-06-21 15:26:24","payamount":"0","recomuserid":"3731","codeid":"13914","brandid":"174","storename":"扬州得民（门店）","begintime":"2020-01-15 15:11:07","userid":"52","consumepwd":"86b086adc8d4567c583772a412c5ba75","usersource":"0","type":"0"},{"extend2":"","codeno":"5899952","extend1":"","discouponprice":"0","lastlogintime":"","deductbalance":"26000","usercredits":"0","codestate":"3","wechatid":"oOL3g1fJUevH3A-IlWCae52IbRKk_demin","codefrom":"18135","row":"6","city":"1110","dispayamount":"0","disdeductbalance":"26000","mlget":"200","retailprice":"65000","loginpwd":"","userpassword":"","endtime":"2020-01-15 15:31:23","remainpayamount":"0","codestatus":"1","spreadcode":"001g","couponprice":"0","storeid":"1144","status":"1","brandname":"贵州茅台.华茅酒[得民精选]","mltotal":"200","ispwd":"1","usergrade":"","codearea":"无门店限制","phonenumber":"18652756881","codestatename":"使用完","buyeruserid":"52","registertime":"2017-06-21 15:26:24","payamount":"0","recomuserid":"3731","codeid":"13913","brandid":"174","storename":"扬州得民（门店）","begintime":"2020-01-15 15:01:23","userid":"52","consumepwd":"86b086adc8d4567c583772a412c5ba75","usersource":"0","type":"0"},{"extend2":"","codeno":"3707599","extend1":"","discouponprice":"0","lastlogintime":"","deductbalance":"15200","usercredits":"0","codestate":"3","wechatid":"oOL3g1fJUevH3A-IlWCae52IbRKk_demin","codefrom":"18134","row":"7","city":"1110","dispayamount":"0","disdeductbalance":"15200","mlget":"200","retailprice":"38000","loginpwd":"","userpassword":"","endtime":"2020-01-15 14:56:17","remainpayamount":"0","codestatus":"1","spreadcode":"001g","couponprice":"0","storeid":"1144","status":"1","brandname":"五粮液股份[纯粮陈窖]52°","mltotal":"200","ispwd":"1","usergrade":"","codearea":"无门店限制","phonenumber":"18652756881","codestatename":"使用完","buyeruserid":"52","registertime":"2017-06-21 15:26:24","payamount":"0","recomuserid":"3731","codeid":"13912","brandid":"112","storename":"扬州得民（门店）","begintime":"2020-01-15 14:26:17","userid":"52","consumepwd":"86b086adc8d4567c583772a412c5ba75","usersource":"0","type":"0"},{"extend2":"","codeno":"6546880","extend1":"","discouponprice":"0","lastlogintime":"","deductbalance":"15200","usercredits":"0","codestate":"3","wechatid":"oOL3g1fJUevH3A-IlWCae52IbRKk_demin","codefrom":"18133","row":"8","city":"1110","dispayamount":"0","disdeductbalance":"15200","mlget":"200","retailprice":"38000","loginpwd":"","userpassword":"","endtime":"2020-01-15 14:50:43","remainpayamount":"0","codestatus":"1","spreadcode":"001g","couponprice":"0","storeid":"1144","status":"1","brandname":"五粮液股份[纯粮陈窖]52°","mltotal":"200","ispwd":"1","usergrade":"","codearea":"无门店限制","phonenumber":"18652756881","codestatename":"使用完","buyeruserid":"52","registertime":"2017-06-21 15:26:24","payamount":"0","recomuserid":"3731","codeid":"13911","brandid":"112","storename":"扬州得民（门店）","begintime":"2020-01-15 14:20:43","userid":"52","consumepwd":"86b086adc8d4567c583772a412c5ba75","usersource":"0","type":"0"},{"extend2":"","codeno":"6252016","extend1":"","discouponprice":"0","lastlogintime":"","deductbalance":"6500","usercredits":"0","codestate":"3","wechatid":"oOL3g1YFOja6zjaY9qWwl-Y-L54E_demin","codefrom":"18129","row":"9","city":"1110","dispayamount":"0","disdeductbalance":"6500","mlget":"50","retailprice":"65000","loginpwd":"","userpassword":"","endtime":"2020-01-12 19:40:34","remainpayamount":"0","codestatus":"1","spreadcode":"0u5b","couponprice":"0","storeid":"2581","status":"0","brandname":"贵州茅台.华茅酒[得民精选]","mltotal":"50","ispwd":"","usergrade":"","codearea":"无门店限制","phonenumber":"17751366866","codestatename":"使用完","buyeruserid":"39071","registertime":"2019-10-11 12:20:18","payamount":"0","recomuserid":"22077","codeid":"13910","brandid":"174","storename":"楼上楼私房菜","begintime":"2020-01-12 19:10:34","userid":"39071","consumepwd":"","usersource":"0","type":"0"},{"extend2":"","codeno":"7742734","extend1":"","discouponprice":"0","lastlogintime":"","deductbalance":"1200","usercredits":"0","codestate":"3","wechatid":"oOL3g1fJUevH3A-IlWCae52IbRKk_demin","codefrom":"18096","row":"10","city":"1110","dispayamount":"0","disdeductbalance":"1200","mlget":"50","retailprice":"12000","loginpwd":"","userpassword":"","endtime":"2019-12-26 15:19:12","remainpayamount":"0","codestatus":"1","spreadcode":"001g","couponprice":"0","storeid":"1144","status":"1","brandname":"泸州老窖永盛烧坊[10]","mltotal":"50","ispwd":"1","usergrade":"","codearea":"无门店限制","phonenumber":"18652756881","codestatename":"使用完","buyeruserid":"52","registertime":"2017-06-21 15:26:24","payamount":"0","recomuserid":"3731","codeid":"13907","brandid":"116","storename":"扬州得民（门店）","begintime":"2019-12-26 14:49:12","userid":"52","consumepwd":"86b086adc8d4567c583772a412c5ba75","usersource":"0","type":"0"},{"extend2":"","codeno":"5410694","extend1":"","discouponprice":"0","lastlogintime":"","deductbalance":"0","usercredits":"0","codestate":"4","wechatid":"oOL3g1RliyV_JZzoKymxZ-aOukGc_demin","codefrom":"18095","row":"11","city":"2598","dispayamount":"0","disdeductbalance":"0","mlget":"0","retailprice":"36500","loginpwd":"","userpassword":"","endtime":"2019-12-26 12:07:46","remainpayamount":"3650","codestatus":"","spreadcode":"0kh0","couponprice":"0","storeid":"324","status":"1","brandname":"天香池[15年]","mltotal":"50","ispwd":"1","usergrade":"","codearea":"无门店限制","phonenumber":"13255127960","codestatename":"已失效","buyeruserid":"26532","registertime":"2019-04-19 09:36:45","payamount":"3650","recomuserid":"22077","codeid":"13906","brandid":"125","storename":"成都得民科技云酒柜","begintime":"2019-12-26 11:37:46","userid":"26532","consumepwd":"e10adc3949ba59abbe56e057f20f883e","usersource":"0","type":"0"},{"extend2":"","codeno":"4361345","extend1":"","discouponprice":"0","lastlogintime":"","deductbalance":"19500","usercredits":"0","codestate":"4","wechatid":"oOL3g1Wg1rC-06DfM4n4Jp24VN2w_demin","codefrom":"18080","row":"12","city":"2598","dispayamount":"0","disdeductbalance":"0","mlget":"0","retailprice":"65000","loginpwd":"","userpassword":"","endtime":"2019-12-20 09:39:40","remainpayamount":"0","codestatus":"","spreadcode":"0rh3","couponprice":"0","storeid":"2604","status":"1","brandname":"贵州茅台.华茅酒[得民精选]","mltotal":"150","ispwd":"","usergrade":"","codearea":"无门店限制","phonenumber":"13451989686","codestatename":"已失效","buyeruserid":"35607","registertime":"2019-08-28 10:14:17","payamount":"0","recomuserid":"22077","codeid":"13901","brandid":"174","storename":"苏州汇融广场假日酒店","begintime":"2019-12-20 09:09:40","userid":"35607","consumepwd":"","usersource":"0","type":"0"}],"res.page":[{"RecordsCount":12953,"hasNextPage":true,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12,"TotalPageCount":1080}],"res.size":"12953","single.recordsperpage":"-1","row":"1","single.row":"1","totalremainpayamount":"556798","single.totalremainpayamount":"556798","returnview":""}
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
    this.$store.dispatch("Breadecrumb",this.breadData)
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
