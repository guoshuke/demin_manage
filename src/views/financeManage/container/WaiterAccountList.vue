<template>
  <div>
    <div class="flex-row filter-box flex-wrap">
      <div>
        <span>编号/名称：</span>
        <el-input v-model="requestParams.storeName" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>会员手机号：</span>
        <el-input v-model="requestParams.phone" clearable placeholder="请输入内容"></el-input>
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
        prop="phone"
        label="会员手机号">
      </el-table-column>
      <el-table-column
        prop="storeid"
        label="门店编号">
      </el-table-column>
      <el-table-column
        prop="storename"
        label="门店名称">
      </el-table-column>
      <el-table-column
        label="提成金额(元)">
        <template slot-scope="scope">
          <span>{{scope.row.cashaccount/100}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop=""
        label="已提现金额(元)">
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
  </div>
</template>

<script>
// @ is an alias to /src
import Api from "../util/api";
import PageChange from '../../../components/PageChange.vue'

export default {
  name: 'WaiterAccountList',
  components: {
    PageChange,
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        storeName: '',
        phone: '',
        pageNum: 1,
        pageSize: 10
      },
      jsonName: {"jvcpagename":"yjm_waiteraccount","jvcoldpageName":"yjm_waiteraccount","cmd":"query","returnvalue":"1","res.recordsperpage":"12","RecordsPerPage":"12","res":[{"isp2p":"","accountid":"208","storeversion":"","orgcode":"000100070001000100010003","isrecommend":"","isrecom":"0","storeperson":"邓颖","hasdevice":"","stockprice":"","warninfo":"","usergetoutrate":"","phone":"18986521803","devcanbuymark":"","starttime":"10:00:00","webaddress":"","storetypefirst":"精品美食","bigpicpath":"","permitpicpath":"","createtime":"2015-12-08 14:16:19","row":"1","storedesc":"1","smallpicpath":"../upload/store_small1136.jpg","isalliance":"","havestorage":"0","devlastouttime":"2018-04-23 10:58:08","storepreviou":"1121","deposit":"0","takecaremanname":"","endtime":"18:00:00","storelatitude":"27.816344","storetype":"3","storelongitude":"114.420841","storelevel":"0","repairmanname":"","storeid":"1136","storephone":"18162220222","wxid":"","showphonetext":"1","scrolltitle":"","cashaccount":"273","devdebugstatus":"1","licensepicpath":"../upload/store_license0.jpg","cashaccounted":"0","areaid":"360902","repairmanphone":"","takecaremanphone":"","activitypicpath":"","storename":"宜春得民酒业翡翠城店","servicephone":"","foodstyle":"中餐","storelegalperson":"","balancerate":"0","storenote":"1","signnumber":"1","isenabled":"1","storeaddr":"江西宜春市袁州区高安路翡翠城55栋"},{"isp2p":"","accountid":"209","storeversion":"","orgcode":"000100070001000100010003","isrecommend":"","isrecom":"0","storeperson":"邓颖","hasdevice":"","stockprice":"","warninfo":"","usergetoutrate":"","phone":"18162220222","devcanbuymark":"","starttime":"10:00:00","webaddress":"","storetypefirst":"精品美食","bigpicpath":"","permitpicpath":"","createtime":"2015-12-08 14:16:19","row":"2","storedesc":"1","smallpicpath":"../upload/store_small1136.jpg","isalliance":"","havestorage":"0","devlastouttime":"2018-04-23 10:58:08","storepreviou":"1121","deposit":"0","takecaremanname":"","endtime":"18:00:00","storelatitude":"27.816344","storetype":"3","storelongitude":"114.420841","storelevel":"0","repairmanname":"","storeid":"1136","storephone":"18162220222","wxid":"","showphonetext":"1","scrolltitle":"","cashaccount":"327","devdebugstatus":"1","licensepicpath":"../upload/store_license0.jpg","cashaccounted":"0","areaid":"360902","repairmanphone":"","takecaremanphone":"","activitypicpath":"","storename":"宜春得民酒业翡翠城店","servicephone":"","foodstyle":"中餐","storelegalperson":"","balancerate":"0","storenote":"1","signnumber":"1","isenabled":"1","storeaddr":"江西宜春市袁州区高安路翡翠城55栋"},{"isp2p":"","accountid":"251","storeversion":"","orgcode":"000100070001000100010007","isrecommend":"","isrecom":"0","storeperson":"李朝阳","hasdevice":"","stockprice":"","warninfo":"","usergetoutrate":"","phone":"13907059668","devcanbuymark":"","starttime":"11:30:00","webaddress":"","storetypefirst":"精品美食","bigpicpath":"upload/store_big1140.jpg","permitpicpath":"","createtime":"2015-12-08 14:21:22","row":"3","storedesc":"奥斯卡更厉害的进口国和对抗赛拉回公司考虑到供货商看到了更好地困死了","smallpicpath":"upload/store_small1140.jpg","isalliance":"","havestorage":"0","devlastouttime":"2019-01-09 12:08:12","storepreviou":"1121","deposit":"0","takecaremanname":"","endtime":"22:00:00","storelatitude":"27.69591","storetype":"3","storelongitude":"114.29925499999999","storelevel":"0","repairmanname":"","storeid":"1140","storephone":"13767557968","wxid":"","showphonetext":"1","scrolltitle":"","cashaccount":"546","devdebugstatus":"1","licensepicpath":"../upload/store_license0.jpg","cashaccounted":"0","areaid":"360902","repairmanphone":"","takecaremanphone":"","activitypicpath":"","storename":"宜春商泉酒家","servicephone":"0795-3518068","foodstyle":"中餐","storelegalperson":"","balancerate":"0","storenote":"1","signnumber":"1","isenabled":"1","storeaddr":"江西省宜春市袁州区温汤镇温泉路151号"},{"isp2p":"","accountid":"18","storeversion":"201804","orgcode":"000100080001000200010001","isrecommend":"","isrecom":"0","storeperson":"高总","hasdevice":"1","stockprice":"","warninfo":"","usergetoutrate":"","phone":"15896418939","devcanbuymark":"","starttime":"","webaddress":"","storetypefirst":"精品美食","bigpicpath":"upload/store_big1144.jpg","permitpicpath":"","createtime":"2015-12-08 15:06:29","row":"4","storedesc":"1","smallpicpath":"upload/store_small1144.jpg","isalliance":"","havestorage":"0","devlastouttime":"2020-01-15 15:01:42","storepreviou":"1111","deposit":"0","takecaremanname":"","endtime":"","storelatitude":"32.38407","storetype":"3","storelongitude":"119.402411","storelevel":"0","repairmanname":"","storeid":"1144","storephone":"18118203332","wxid":"天下有酒","showphonetext":"1","scrolltitle":"","cashaccount":"289","devdebugstatus":"1","licensepicpath":"upload/store_license1144.jpg","cashaccounted":"0","areaid":"321003","repairmanphone":"","takecaremanphone":"","activitypicpath":"","storename":"扬州得民（门店）","servicephone":"","foodstyle":"中餐","storelegalperson":"","balancerate":"0","storenote":"1","signnumber":"1","isenabled":"1","storeaddr":"江苏省扬州市邗江区文汇西路215号华远国际大厦650室"},{"isp2p":"","accountid":"581","storeversion":"201804","orgcode":"000100080001000200010001","isrecommend":"","isrecom":"0","storeperson":"高总","hasdevice":"1","stockprice":"","warninfo":"","usergetoutrate":"","phone":"null","devcanbuymark":"","starttime":"","webaddress":"","storetypefirst":"精品美食","bigpicpath":"upload/store_big1144.jpg","permitpicpath":"","createtime":"2015-12-08 15:06:29","row":"5","storedesc":"1","smallpicpath":"upload/store_small1144.jpg","isalliance":"","havestorage":"0","devlastouttime":"2020-01-15 15:01:42","storepreviou":"1111","deposit":"0","takecaremanname":"","endtime":"","storelatitude":"32.38407","storetype":"3","storelongitude":"119.402411","storelevel":"0","repairmanname":"","storeid":"1144","storephone":"18118203332","wxid":"天下有酒","showphonetext":"1","scrolltitle":"","cashaccount":"29746","devdebugstatus":"1","licensepicpath":"upload/store_license1144.jpg","cashaccounted":"0","areaid":"321003","repairmanphone":"","takecaremanphone":"","activitypicpath":"","storename":"扬州得民（门店）","servicephone":"","foodstyle":"中餐","storelegalperson":"","balancerate":"0","storenote":"1","signnumber":"1","isenabled":"1","storeaddr":"江苏省扬州市邗江区文汇西路215号华远国际大厦650室"},{"isp2p":"","accountid":"13","storeversion":"201804","orgcode":"000100080001000200010002","isrecommend":"","isrecom":"1","storeperson":"方艺锦","hasdevice":"1","stockprice":"","warninfo":"","usergetoutrate":"","phone":"13776994925","devcanbuymark":"","starttime":"","webaddress":"","storetypefirst":"精品美食","bigpicpath":"upload/store_big1145.jpg","permitpicpath":"","createtime":"2015-12-08 15:09:09","row":"6","storedesc":"1","smallpicpath":"upload/store_small1145.jpg","isalliance":"","havestorage":"0","devlastouttime":"2017-11-21 16:48:09","storepreviou":"1111","deposit":"0","takecaremanname":"","endtime":"","storelatitude":"32.401982000000004","storetype":"3","storelongitude":"119.395285","storelevel":"0","repairmanname":"","storeid":"1145","storephone":"13813191978","wxid":"","showphonetext":"1","scrolltitle":"","cashaccount":"1706","devdebugstatus":"1","licensepicpath":"../upload/store_license0.png","cashaccounted":"0","areaid":"321003","repairmanphone":"","takecaremanphone":"","activitypicpath":"","storename":"扬州塞纳左岸咖啡","servicephone":"","foodstyle":"西餐","storelegalperson":"","balancerate":"0","storenote":"1","signnumber":"1","isenabled":"0","storeaddr":"江苏省扬州市邗江区百祥路166号（民防局对面）"},{"isp2p":"","accountid":"29","storeversion":"201804","orgcode":"000100080001000200010002","isrecommend":"","isrecom":"1","storeperson":"方艺锦","hasdevice":"1","stockprice":"","warninfo":"","usergetoutrate":"","phone":"13813189443","devcanbuymark":"","starttime":"","webaddress":"","storetypefirst":"精品美食","bigpicpath":"upload/store_big1145.jpg","permitpicpath":"","createtime":"2015-12-08 15:09:09","row":"7","storedesc":"1","smallpicpath":"upload/store_small1145.jpg","isalliance":"","havestorage":"0","devlastouttime":"2017-11-21 16:48:09","storepreviou":"1111","deposit":"0","takecaremanname":"","endtime":"","storelatitude":"32.401982000000004","storetype":"3","storelongitude":"119.395285","storelevel":"0","repairmanname":"","storeid":"1145","storephone":"13813191978","wxid":"","showphonetext":"1","scrolltitle":"","cashaccount":"8249","devdebugstatus":"1","licensepicpath":"../upload/store_license0.png","cashaccounted":"0","areaid":"321003","repairmanphone":"","takecaremanphone":"","activitypicpath":"","storename":"扬州塞纳左岸咖啡","servicephone":"","foodstyle":"西餐","storelegalperson":"","balancerate":"0","storenote":"1","signnumber":"1","isenabled":"0","storeaddr":"江苏省扬州市邗江区百祥路166号（民防局对面）"},{"isp2p":"","accountid":"37","storeversion":"201804","orgcode":"000100080001000200010002","isrecommend":"","isrecom":"1","storeperson":"方艺锦","hasdevice":"1","stockprice":"","warninfo":"","usergetoutrate":"","phone":"13056301175","devcanbuymark":"","starttime":"","webaddress":"","storetypefirst":"精品美食","bigpicpath":"upload/store_big1145.jpg","permitpicpath":"","createtime":"2015-12-08 15:09:09","row":"8","storedesc":"1","smallpicpath":"upload/store_small1145.jpg","isalliance":"","havestorage":"0","devlastouttime":"2017-11-21 16:48:09","storepreviou":"1111","deposit":"0","takecaremanname":"","endtime":"","storelatitude":"32.401982000000004","storetype":"3","storelongitude":"119.395285","storelevel":"0","repairmanname":"","storeid":"1145","storephone":"13813191978","wxid":"","showphonetext":"1","scrolltitle":"","cashaccount":"998","devdebugstatus":"1","licensepicpath":"../upload/store_license0.png","cashaccounted":"0","areaid":"321003","repairmanphone":"","takecaremanphone":"","activitypicpath":"","storename":"扬州塞纳左岸咖啡","servicephone":"","foodstyle":"西餐","storelegalperson":"","balancerate":"0","storenote":"1","signnumber":"1","isenabled":"0","storeaddr":"江苏省扬州市邗江区百祥路166号（民防局对面）"},{"isp2p":"","accountid":"53","storeversion":"","orgcode":"000100080001000200010004","isrecommend":"","isrecom":"0","storeperson":"吴青青","hasdevice":"","stockprice":"","warninfo":"","usergetoutrate":"","phone":"18751478384","devcanbuymark":"","starttime":"","webaddress":"","storetypefirst":"精品美食","bigpicpath":"upload/store_big1148.jpg","permitpicpath":"","createtime":"2015-12-08 15:21:44","row":"9","storedesc":"1","smallpicpath":"upload/store_small1148.jpg","isalliance":"","havestorage":"0","devlastouttime":"2018-01-11 18:23:46","storepreviou":"1111","deposit":"0","takecaremanname":"","endtime":"","storelatitude":"32.39175","storetype":"3","storelongitude":"119.38148699999999","storelevel":"0","repairmanname":"","storeid":"1148","storephone":"18757361088","wxid":"","showphonetext":"1","scrolltitle":"","cashaccount":"636","devdebugstatus":"1","licensepicpath":"../upload/store_license0.png","cashaccounted":"0","areaid":"321003","repairmanphone":"","takecaremanphone":"","activitypicpath":"","storename":"蒸达人海鲜馆（已撤）","servicephone":"0514-82851977","foodstyle":"海鲜","storelegalperson":"","balancerate":"0","storenote":"1","signnumber":"1","isenabled":"0","storeaddr":"江苏省扬州市邗江区京华城三楼"},{"isp2p":"","accountid":"26","storeversion":"201804","orgcode":"000100080001000200010157","isrecommend":"1","isrecom":"0","storeperson":"潘学怀","hasdevice":"1","stockprice":"","warninfo":"","usergetoutrate":"","phone":"13405555133","devcanbuymark":"","starttime":"","webaddress":"","storetypefirst":"精品美食","bigpicpath":"upload/store_big1609.jpg","permitpicpath":"","createtime":"2016-01-08 15:50:07","row":"10","storedesc":"1","smallpicpath":"upload/store_small1609.jpg","isalliance":"","havestorage":"0","devlastouttime":"2019-10-10 07:26:21","storepreviou":"1111","deposit":"0","takecaremanname":"","endtime":"","storelatitude":"32.399757","storetype":"3","storelongitude":"119.400656","storelevel":"0","repairmanname":"","storeid":"1609","storephone":"13952566889","wxid":"","showphonetext":"1","scrolltitle":"","cashaccount":"58405","devdebugstatus":"1","licensepicpath":"upload/store_license1609.jpg","cashaccounted":"0","areaid":"321002","repairmanphone":"","takecaremanphone":"","activitypicpath":"","storename":"富春酒楼 （来鹤台店)","servicephone":"0514—87781777","foodstyle":"中餐","storelegalperson":"","balancerate":"0","storenote":"1","signnumber":"1","isenabled":"1","storeaddr":"江苏省扬州市广陵区文昌西路316号（来鹤台广场西侧）"},{"isp2p":"","accountid":"27","storeversion":"201804","orgcode":"000100080001000200010157","isrecommend":"1","isrecom":"0","storeperson":"潘学怀","hasdevice":"1","stockprice":"","warninfo":"","usergetoutrate":"","phone":"15862880232","devcanbuymark":"","starttime":"","webaddress":"","storetypefirst":"精品美食","bigpicpath":"upload/store_big1609.jpg","permitpicpath":"","createtime":"2016-01-08 15:50:07","row":"11","storedesc":"1","smallpicpath":"upload/store_small1609.jpg","isalliance":"","havestorage":"0","devlastouttime":"2019-10-10 07:26:21","storepreviou":"1111","deposit":"0","takecaremanname":"","endtime":"","storelatitude":"32.399757","storetype":"3","storelongitude":"119.400656","storelevel":"0","repairmanname":"","storeid":"1609","storephone":"13952566889","wxid":"","showphonetext":"1","scrolltitle":"","cashaccount":"5058","devdebugstatus":"1","licensepicpath":"upload/store_license1609.jpg","cashaccounted":"0","areaid":"321002","repairmanphone":"","takecaremanphone":"","activitypicpath":"","storename":"富春酒楼 （来鹤台店)","servicephone":"0514—87781777","foodstyle":"中餐","storelegalperson":"","balancerate":"0","storenote":"1","signnumber":"1","isenabled":"1","storeaddr":"江苏省扬州市广陵区文昌西路316号（来鹤台广场西侧）"},{"isp2p":"","accountid":"28","storeversion":"201804","orgcode":"000100080001000200010157","isrecommend":"1","isrecom":"0","storeperson":"潘学怀","hasdevice":"1","stockprice":"","warninfo":"","usergetoutrate":"","phone":"13862880232","devcanbuymark":"","starttime":"","webaddress":"","storetypefirst":"精品美食","bigpicpath":"upload/store_big1609.jpg","permitpicpath":"","createtime":"2016-01-08 15:50:07","row":"12","storedesc":"1","smallpicpath":"upload/store_small1609.jpg","isalliance":"","havestorage":"0","devlastouttime":"2019-10-10 07:26:21","storepreviou":"1111","deposit":"0","takecaremanname":"","endtime":"","storelatitude":"32.399757","storetype":"3","storelongitude":"119.400656","storelevel":"0","repairmanname":"","storeid":"1609","storephone":"13952566889","wxid":"","showphonetext":"1","scrolltitle":"","cashaccount":"890","devdebugstatus":"1","licensepicpath":"upload/store_license1609.jpg","cashaccounted":"0","areaid":"321002","repairmanphone":"","takecaremanphone":"","activitypicpath":"","storename":"富春酒楼 （来鹤台店)","servicephone":"0514—87781777","foodstyle":"中餐","storelegalperson":"","balancerate":"0","storenote":"1","signnumber":"1","isenabled":"1","storeaddr":"江苏省扬州市广陵区文昌西路316号（来鹤台广场西侧）"}],"res.page":[{"RecordsCount":586,"hasNextPage":true,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12,"TotalPageCount":49}],"res.size":"586","returnview":""},
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
