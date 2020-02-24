<template>
  <div>
    <div class="flex-row filter-box flex-wrap">
      <div>
        <span>姓名：</span>
        <el-input v-model="requestParams.name" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>电话：</span>
        <el-input v-model="requestParams.phone" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>身份证：</span>
        <el-input v-model="requestParams.idCard" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>签约时间：</span>
        <el-date-picker
          v-model="requestParams.startDate"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div>
        <span>到期时间：</span>
        <el-date-picker
          v-model="requestParams.endDate"
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
    <div class="operation-box">
      <el-button type="success" size="small" @click="dialogVisible=true">新增</el-button>
    </div>
    <el-table
      :data="jsonName.res"
      border
      style="width: 100%">
      <el-table-column
        prop="row"
        label="编号"
        width="50">
      </el-table-column>
      <el-table-column
        prop="storename"
        width="110"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="storephone"
        label="电话"
        width="110">
      </el-table-column>
      <el-table-column
        prop="storeaddr"
        label="地址">
      </el-table-column>
      <el-table-column
        prop="enabledname"
        label="是否可用"
        width="80">
      </el-table-column>
      <el-table-column
        prop=""
        label="签约时间"
        width="170">
      </el-table-column>
      <el-table-column
        prop=""
        label="到期时间"
        width="170">
      </el-table-column>
      <el-table-column
        prop="openname"
        label="是否授权人人推广"
        width="90">
      </el-table-column>
      <el-table-column
        label="操作"
        width="80">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="dialogVisible=true"><i class="el-icon-edit icon-size"></i></el-button>
          <el-button type="text" size="small"><i class="el-icon-delete ft-color-red icon-size"></i></el-button>
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
import Breadcrumb from '@/components/Breadcrumb.vue'

export default {
  name: 'InvestorList',
  components: {
    PageChange,
    Breadcrumb
  },
  data() {
    return {
      breadData: [
        {name: '专题活动', path: '/activityHome'},
        {name: '活动列表', path: '/projectActivity'},
        {name: '活动详情', path: ''}
      ],
      total: 1000,
      requestParams: {
        no: '',
        name: '',
        phone: '',
        idCard: '',
        startDate: '',
        endDate: '',
        pageNum: 1,
        pageSize: 10
      },
      dialogVisible: false,
      jsonName: {
        "jvcpagename":"se_store","jvcoldpageName":"se_store","cmd":"queryinvestorDetail","returnvalue":"1","query.a-storeType":"4","res.recordsperpage":"12","RecordsPerPage":"12","res":[{"isp2p":"1","storeversion":"","orgcode":"00010008000100020001","houseregisterpicpath":"","isrecommend":"","isrecom":"","storeperson":"陈军","hasdevice":"","stockprice":"","licensecode":"","taxregisterpicpath":"","warninfo":"","usergetoutrate":"","signdate":"","devcanbuymark":"","starttime":"","enabledname":"可用","webaddress":"","storetypefirst":"","bigpicpath":"","permitpicpath":"","createtime":"2015-12-08 13:50:31","row":"1","storedesc":"","bankserialpicpath":"","smallpicpath":"","isalliance":"","havestorage":"1","idcardpicpath":"","storepreviou":"1110","devlastouttime":"","deposit":"0","takecaremanname":"","contractdate":"","endtime":"","storelatitude":"0.0","investortype":"","storetype":"4","storelongitude":"0.0","storelevel":"1","organizationpicpath":"","repairmanname":"","storeid":"1111","storephone":"13773569888","wxid":"","showphonetext":"0","scrolltitle":"","previouname":"扬州市","detailid":"","devdebugstatus":"0","licensepicpath":"../upload/store_license0.png","childcount":"357","areaid":"0","repairmanphone":"","takecaremanphone":"","typename":"投资商","activitypicpath":"","storename":"江苏得民数联智能设备科技有限公司","servicephone":"","foodstyle":"","storelegalperson":"","organizationcode":"","balancerate":"0","storenote":"","signnumber":"0","isenabled":"1","storeaddr":"江苏省扬州市文汇西路215号华远国际大厦7楼728","idcard":""},{"isp2p":"","storeversion":"","orgcode":"00010007000100010001","houseregisterpicpath":"","isrecommend":"","isrecom":"","storeperson":"陈建达","hasdevice":"","stockprice":"","licensecode":"","taxregisterpicpath":"","warninfo":"","usergetoutrate":"","signdate":"","devcanbuymark":"","starttime":"","enabledname":"可用","webaddress":"","storetypefirst":"","bigpicpath":"","permitpicpath":"","createtime":"2015-12-08 13:59:39","row":"2","storedesc":"","bankserialpicpath":"","smallpicpath":"","isalliance":"","havestorage":"1","idcardpicpath":"","storepreviou":"1120","devlastouttime":"","deposit":"0","takecaremanname":"","contractdate":"","endtime":"","storelatitude":"0.0","investortype":"","storetype":"4","storelongitude":"0.0","storelevel":"1","organizationpicpath":"","repairmanname":"","storeid":"1121","storephone":"13879569558","wxid":"","showphonetext":"0","scrolltitle":"","previouname":"宜春市","detailid":"","devdebugstatus":"0","licensepicpath":"../upload/store_license1121.jpg","childcount":"5","areaid":"0","repairmanphone":"","takecaremanphone":"","typename":"投资商","activitypicpath":"","storename":"宜春市得民酒业有限公司","servicephone":"","foodstyle":"","storelegalperson":"","organizationcode":"","balancerate":"0","storenote":"","signnumber":"0","isenabled":"1","storeaddr":"江西省宜春市文体路188号","idcard":""},{"isp2p":"","storeversion":"","orgcode":"000100070001000200010001","houseregisterpicpath":"","isrecommend":"","isrecom":"","storeperson":"","hasdevice":"","stockprice":"","licensecode":"","taxregisterpicpath":"","warninfo":"","usergetoutrate":"","signdate":"","devcanbuymark":"","starttime":"","enabledname":"可用","webaddress":"","storetypefirst":"","bigpicpath":"","permitpicpath":"","createtime":"2015-12-28 13:23:38","row":"3","storedesc":"","bankserialpicpath":"","smallpicpath":"","isalliance":"","havestorage":"1","idcardpicpath":"","storepreviou":"1451","devlastouttime":"","deposit":"0","takecaremanname":"","contractdate":"","endtime":"","storelatitude":"0.0","investortype":"","storetype":"4","storelongitude":"0.0","storelevel":"1","organizationpicpath":"","repairmanname":"","storeid":"1484","storephone":"13907967072","wxid":"","showphonetext":"0","scrolltitle":"","previouname":"徐静","detailid":"","devdebugstatus":"0","licensepicpath":"../upload/store_license0.jpg","childcount":"1","areaid":"0","repairmanphone":"","takecaremanphone":"","typename":"投资商","activitypicpath":"","storename":"江西赣州徐静","servicephone":"","foodstyle":"","storelegalperson":"","organizationcode":"","balancerate":"0","storenote":"","signnumber":"0","isenabled":"1","storeaddr":"","idcard":""},{"isp2p":"1","storeversion":"","orgcode":"00010004000200010001","houseregisterpicpath":"","isrecommend":"","isrecom":"","storeperson":"郑益康","hasdevice":"","stockprice":"","licensecode":"","taxregisterpicpath":"","warninfo":"","usergetoutrate":"","signdate":"","devcanbuymark":"","starttime":"","enabledname":"可用","webaddress":"","storetypefirst":"","bigpicpath":"","permitpicpath":"","createtime":"2015-12-29 17:04:59","row":"4","storedesc":"","bankserialpicpath":"","smallpicpath":"","isalliance":"","havestorage":"1","idcardpicpath":"","storepreviou":"1513","devlastouttime":"","deposit":"0","takecaremanname":"","contractdate":"","endtime":"","storelatitude":"0.0","investortype":"","storetype":"4","storelongitude":"0.0","storelevel":"1","organizationpicpath":"","repairmanname":"","storeid":"1514","storephone":"18919069188","wxid":"","showphonetext":"0","scrolltitle":"","previouname":"兰州市","detailid":"","devdebugstatus":"0","licensepicpath":"../upload/store_license0.jpg","childcount":"22","areaid":"0","repairmanphone":"","takecaremanphone":"","typename":"投资商","activitypicpath":"","storename":"甘肃得民电子商务有限公司","servicephone":"","foodstyle":"","storelegalperson":"","organizationcode":"","balancerate":"0","storenote":"","signnumber":"0","isenabled":"1","storeaddr":"甘肃省兰州市城关区天水北路222号万达中心2002","idcard":""},{"isp2p":"0","storeversion":"","orgcode":"00010002000200020001","houseregisterpicpath":"","isrecommend":"","isrecom":"","storeperson":"","hasdevice":"","stockprice":"","licensecode":"","taxregisterpicpath":"","warninfo":"","usergetoutrate":"","signdate":"","devcanbuymark":"","starttime":"","enabledname":"可用","webaddress":"","storetypefirst":"","bigpicpath":"","permitpicpath":"","createtime":"2016-01-31 15:40:25","row":"5","storedesc":"","bankserialpicpath":"","smallpicpath":"","isalliance":"","havestorage":"1","idcardpicpath":"","storepreviou":"277","devlastouttime":"","deposit":"0","takecaremanname":"","contractdate":"","endtime":"","storelatitude":"0.0","investortype":"","storetype":"4","storelongitude":"0.0","storelevel":"1","organizationpicpath":"","repairmanname":"","storeid":"1858","storephone":"13518130371","wxid":"","showphonetext":"0","scrolltitle":"","previouname":"成都市","detailid":"","devdebugstatus":"0","licensepicpath":"","childcount":"11","areaid":"0","repairmanphone":"","takecaremanphone":"","typename":"投资商","activitypicpath":"","storename":"小民公司","servicephone":"","foodstyle":"","storelegalperson":"","organizationcode":"","balancerate":"0","storenote":"","signnumber":"0","isenabled":"1","storeaddr":"","idcard":""},{"isp2p":"0","storeversion":"","orgcode":"00010007000300010001","houseregisterpicpath":"","isrecommend":"","isrecom":"","storeperson":"丁玲","hasdevice":"","stockprice":"","licensecode":"","taxregisterpicpath":"","warninfo":"","usergetoutrate":"","signdate":"","devcanbuymark":"","starttime":"","enabledname":"可用","webaddress":"","storetypefirst":"","bigpicpath":"","permitpicpath":"","createtime":"2016-04-12 11:53:48","row":"6","storedesc":"","bankserialpicpath":"","smallpicpath":"","isalliance":"","havestorage":"1","idcardpicpath":"","storepreviou":"2018","devlastouttime":"","deposit":"0","takecaremanname":"","contractdate":"","endtime":"","storelatitude":"0.0","investortype":"","storetype":"4","storelongitude":"0.0","storelevel":"1","organizationpicpath":"","repairmanname":"","storeid":"2023","storephone":"13939171777","wxid":"","showphonetext":"0","scrolltitle":"","previouname":"郑州市","detailid":"","devdebugstatus":"0","licensepicpath":"../upload/store_license0.jpg","childcount":"3","areaid":"2018","repairmanphone":"","takecaremanphone":"","typename":"投资商","activitypicpath":"","storename":"河南得民数联科技智能有限公司","servicephone":"","foodstyle":"","storelegalperson":"","organizationcode":"","balancerate":"0","storenote":"","signnumber":"0","isenabled":"1","storeaddr":"","idcard":""},{"isp2p":"0","storeversion":"","orgcode":"00010008000100060001","houseregisterpicpath":"","isrecommend":"","isrecom":"","storeperson":"","hasdevice":"","stockprice":"","licensecode":"","taxregisterpicpath":"","warninfo":"","usergetoutrate":"","signdate":"","devcanbuymark":"","starttime":"","enabledname":"可用","webaddress":"","storetypefirst":"","bigpicpath":"","permitpicpath":"","createtime":"2018-01-24 14:06:12","row":"7","storedesc":"","bankserialpicpath":"","smallpicpath":"","isalliance":"","havestorage":"1","idcardpicpath":"","storepreviou":"2406","devlastouttime":"","deposit":"0","takecaremanname":"","contractdate":"","endtime":"","storelatitude":"0.0","investortype":"","storetype":"4","storelongitude":"0.0","storelevel":"1","organizationpicpath":"","repairmanname":"","storeid":"2407","storephone":"15805281688","wxid":"","showphonetext":"0","scrolltitle":"","previouname":"镇江市","detailid":"","devdebugstatus":"0","licensepicpath":"","childcount":"43","areaid":"0","repairmanphone":"","takecaremanphone":"","typename":"投资商","activitypicpath":"","storename":"镇江得民数联智能设备科技有限责任公司","servicephone":"","foodstyle":"","storelegalperson":"","organizationcode":"","balancerate":"0","storenote":"","signnumber":"0","isenabled":"1","storeaddr":"","idcard":""},{"isp2p":"0","storeversion":"","orgcode":"00010008000100070001","houseregisterpicpath":"","isrecommend":"","isrecom":"","storeperson":"","hasdevice":"","stockprice":"","licensecode":"","taxregisterpicpath":"","warninfo":"","usergetoutrate":"","signdate":"","devcanbuymark":"","starttime":"","enabledname":"可用","webaddress":"","storetypefirst":"","bigpicpath":"","permitpicpath":"","createtime":"2018-03-27 14:18:51","row":"8","storedesc":"","bankserialpicpath":"","smallpicpath":"","isalliance":"","havestorage":"1","idcardpicpath":"","storepreviou":"2509","devlastouttime":"","deposit":"0","takecaremanname":"","contractdate":"","endtime":"","storelatitude":"0.0","investortype":"","storetype":"4","storelongitude":"0.0","storelevel":"1","organizationpicpath":"","repairmanname":"","storeid":"2510","storephone":"13182568829","wxid":"","showphonetext":"0","scrolltitle":"","previouname":"常州市","detailid":"","devdebugstatus":"0","licensepicpath":"upload/store_license0.png","childcount":"28","areaid":"0","repairmanphone":"","takecaremanphone":"","typename":"投资商","activitypicpath":"","storename":"常州得民数联智能设备科技有限公司","servicephone":"","foodstyle":"","storelegalperson":"","organizationcode":"","balancerate":"0","storenote":"","signnumber":"0","isenabled":"1","storeaddr":"","idcard":""},{"isp2p":"0","storeversion":"","orgcode":"00010008000100080003","houseregisterpicpath":"","isrecommend":"","isrecom":"","storeperson":"陆燕","hasdevice":"","stockprice":"","licensecode":"","taxregisterpicpath":"","warninfo":"","usergetoutrate":"","signdate":"","devcanbuymark":"","starttime":"","enabledname":"可用","webaddress":"","storetypefirst":"","bigpicpath":"","permitpicpath":"","createtime":"2018-11-15 17:50:57","row":"9","storedesc":"","bankserialpicpath":"","smallpicpath":"","isalliance":"","havestorage":"1","idcardpicpath":"","storepreviou":"2598","devlastouttime":"","deposit":"0","takecaremanname":"","contractdate":"","endtime":"","storelatitude":"0.0","investortype":"","storetype":"4","storelongitude":"0.0","storelevel":"1","organizationpicpath":"","repairmanname":"","storeid":"2601","storephone":"18016273236","wxid":"","showphonetext":"0","scrolltitle":"","previouname":"苏州市","detailid":"","devdebugstatus":"0","licensepicpath":"upload/store_license0.jpg","childcount":"40","areaid":"0","repairmanphone":"","takecaremanphone":"","typename":"投资商","activitypicpath":"","storename":"苏州得民","servicephone":"","foodstyle":"","storelegalperson":"","organizationcode":"","balancerate":"0","storenote":"","signnumber":"0","isenabled":"1","storeaddr":"","idcard":""},{"isp2p":"0","storeversion":"","orgcode":"00010008000300040001","houseregisterpicpath":"","isrecommend":"","isrecom":"","storeperson":"龚骋","hasdevice":"","stockprice":"","licensecode":"","taxregisterpicpath":"","warninfo":"","usergetoutrate":"","signdate":"","devcanbuymark":"","starttime":"","enabledname":"可用","webaddress":"","storetypefirst":"","bigpicpath":"","permitpicpath":"","createtime":"2019-10-17 10:43:53","row":"10","storedesc":"","bankserialpicpath":"","smallpicpath":"","isalliance":"","havestorage":"1","idcardpicpath":"","storepreviou":"2722","devlastouttime":"","deposit":"0","takecaremanname":"","contractdate":"","endtime":"","storelatitude":"0.0","investortype":"","storetype":"4","storelongitude":"0.0","storelevel":"1","organizationpicpath":"","repairmanname":"","storeid":"2720","storephone":"13245802738","wxid":"","showphonetext":"0","scrolltitle":"","previouname":"淄博市","detailid":"","devdebugstatus":"0","licensepicpath":"upload/store_license0.jpg","childcount":"1","areaid":"0","repairmanphone":"","takecaremanphone":"","typename":"投资商","activitypicpath":"","storename":"苏州天下有酒智能设备科技有限公司","servicephone":"","foodstyle":"","storelegalperson":"","organizationcode":"","balancerate":"0","storenote":"","signnumber":"0","isenabled":"1","storeaddr":"苏州新区汇融广场16-17层","idcard":""},{"isp2p":"","storeversion":"","orgcode":"0001000800030002","houseregisterpicpath":"","isrecommend":"","isrecom":"","storeperson":"","hasdevice":"","stockprice":"","licensecode":"","taxregisterpicpath":"","warninfo":"","usergetoutrate":"","signdate":"","devcanbuymark":"","starttime":"","enabledname":"可用","webaddress":"","storetypefirst":"","bigpicpath":"","permitpicpath":"","createtime":"2015-10-10 08:36:16","row":"11","storedesc":"","bankserialpicpath":"","smallpicpath":"","isalliance":"","havestorage":"1","idcardpicpath":"","storepreviou":"781","devlastouttime":"","deposit":"0","takecaremanname":"","contractdate":"","endtime":"","storelatitude":"0.0","investortype":"","storetype":"4","storelongitude":"0.0","storelevel":"1","organizationpicpath":"","repairmanname":"","storeid":"887","storephone":"15253212578","wxid":"","showphonetext":"0","scrolltitle":"","previouname":"山东省","detailid":"","devdebugstatus":"0","licensepicpath":"upload/store_license887.JPG","childcount":"1","areaid":"0","repairmanphone":"","takecaremanphone":"","typename":"投资商","activitypicpath":"","storename":"山东得民良诚商贸有限公司","servicephone":"","foodstyle":"中餐","storelegalperson":"","organizationcode":"","balancerate":"0","storenote":"","signnumber":"0","isenabled":"1","storeaddr":"","idcard":""}],"res.page":[{"RecordsCount":11,"hasNextPage":false,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12,"TotalPageCount":1}],"res.size":"11","returnview":""
      }
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
