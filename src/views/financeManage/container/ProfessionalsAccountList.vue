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
        prop=""
        label="驻地专员状态">
      </el-table-column>
      <el-table-column
        prop=""
        label="驻地专员职位">
      </el-table-column>
      <el-table-column
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="dialogVisible=true">查看明细</el-button>
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
  name: 'ProfessionalsAccountList',
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
      jsonName: {"jvcpagename":"yjm_storeCommissionerAccount","jvcoldpageName":"yjm_storeCommissionerAccount","cmd":"query","returnvalue":"1","res.recordsperpage":"12","RecordsPerPage":"12","res":[{"isp2p":"","accountid":"14","isguarantee":"0","storeversion":"","orgcode":"","isrecommend":"","isrecom":"","storeperson":"","hasdevice":"","stockprice":"","warninfo":"","usergetoutrate":"","phone":"13914026305","isdimission":"0","devcanbuymark":"","starttime":"","webaddress":"","storetypefirst":"","bigpicpath":"","permitpicpath":"","createtime":"","row":"1","storedesc":"","smallpicpath":"","isalliance":"","remark":"","havestorage":"","devlastouttime":"","storepreviou":"","takecaremanname":"","deposit":"","endtime":"","storelatitude":"","departuretime":"","storetype":"","storelongitude":"","storelevel":"","repairmanname":"","storeid":"","storephone":"","wxid":"","showphonetext":"","scrolltitle":"","cashaccount":"0","devdebugstatus":"","licensepicpath":"","cashaccounted":"0","areaid":"","repairmanphone":"","takecaremanphone":"","activitypicpath":"","storename":"","servicephone":"","foodstyle":"","storelegalperson":"","balancerate":"","storenote":"","signnumber":"","isenabled":"","storeaddr":"","bindingtime":"2019-07-26 14:41:01"},{"isp2p":"","accountid":"13","isguarantee":"0","storeversion":"201804","orgcode":"000100080001000200010001","isrecommend":"","isrecom":"0","storeperson":"高总","hasdevice":"1","stockprice":"","warninfo":"","usergetoutrate":"","phone":"1327055699","isdimission":"0","devcanbuymark":"","starttime":"","webaddress":"","storetypefirst":"精品美食","bigpicpath":"upload/store_big1144.jpg","permitpicpath":"","createtime":"2015-12-08 15:06:29","row":"2","storedesc":"1","smallpicpath":"upload/store_small1144.jpg","isalliance":"","remark":"","havestorage":"0","devlastouttime":"2020-01-15 15:01:42","storepreviou":"1111","takecaremanname":"","deposit":"0","endtime":"","storelatitude":"32.38407","departuretime":"","storetype":"3","storelongitude":"119.402411","storelevel":"0","repairmanname":"","storeid":"1144","storephone":"18118203332","wxid":"天下有酒","showphonetext":"1","scrolltitle":"","cashaccount":"0","devdebugstatus":"1","licensepicpath":"upload/store_license1144.jpg","cashaccounted":"0","areaid":"321003","repairmanphone":"","takecaremanphone":"","activitypicpath":"","storename":"扬州得民（门店）","servicephone":"","foodstyle":"中餐","storelegalperson":"","balancerate":"0","storenote":"1","signnumber":"1","isenabled":"1","storeaddr":"江苏省扬州市邗江区文汇西路215号华远国际大厦650室","bindingtime":"2019-03-22 10:10:52"},{"isp2p":"","accountid":"12","isguarantee":"0","storeversion":"201812","orgcode":"000100080001000200010186","isrecommend":"","isrecom":"0","storeperson":"刘国军","hasdevice":"","stockprice":"","warninfo":"","usergetoutrate":"","phone":"15861345670","isdimission":"0","devcanbuymark":"","starttime":"10:00:00","webaddress":"","storetypefirst":"精品美食","bigpicpath":"upload/store_big2582.jpg","permitpicpath":"","createtime":"2018-07-20 09:38:58","row":"3","storedesc":"多喝咖啡和抵抗力顺丰速递开两盒分克里斯","smallpicpath":"upload/store_small2582.jpg","isalliance":"","remark":"","havestorage":"0","devlastouttime":"2019-05-02 12:11:07","storepreviou":"1111","takecaremanname":"","deposit":"0","endtime":"22:00:00","storelatitude":"32.424619","departuretime":"","storetype":"3","storelongitude":"119.402799","storelevel":"0","repairmanname":"","storeid":"2582","storephone":"15861345670","wxid":"","showphonetext":"1","scrolltitle":"","cashaccount":"1440","devdebugstatus":"0","licensepicpath":"upload/store_license0.png","cashaccounted":"0","areaid":"321003","repairmanphone":"","takecaremanphone":"","activitypicpath":"","storename":"老刘家火锅","servicephone":"","foodstyle":"火锅烧烤","storelegalperson":"","balancerate":"0","storenote":"1","signnumber":"1","isenabled":"0","storeaddr":"江苏省扬州市邗江区邗江北路润辉广场3F-06","bindingtime":"2019-02-28 16:21:39"},{"isp2p":"","accountid":"11","isguarantee":"0","storeversion":"201812","orgcode":"000100080001000200010185","isrecommend":"","isrecom":"0","storeperson":"王磊","hasdevice":"","stockprice":"","warninfo":"","usergetoutrate":"","phone":"18951058027","isdimission":"0","devcanbuymark":"","starttime":"","webaddress":"","storetypefirst":"精品美食","bigpicpath":"upload/store_big2581.jpg","permitpicpath":"","createtime":"2018-07-20 09:35:02","row":"4","storedesc":"昂库哈是开个会打款了","smallpicpath":"upload/store_small2581.jpg","isalliance":"","remark":"","havestorage":"0","devlastouttime":"2020-01-16 12:25:37","storepreviou":"1111","takecaremanname":"","deposit":"0","endtime":"","storelatitude":"32.403166999999996","departuretime":"","storetype":"3","storelongitude":"119.38951399999999","storelevel":"0","repairmanname":"","storeid":"2581","storephone":"17751366866","wxid":"","showphonetext":"1","scrolltitle":"","cashaccount":"940","devdebugstatus":"1","licensepicpath":"upload/store_license2581.jpg","cashaccounted":"0","areaid":"321003","repairmanphone":"","takecaremanphone":"","activitypicpath":"","storename":"楼上楼私房菜","servicephone":"","foodstyle":"中餐","storelegalperson":"","balancerate":"0","storenote":"1","signnumber":"1","isenabled":"1","storeaddr":"江苏省扬州市邗江区润扬北路8号","bindingtime":"2019-01-17 16:16:29"},{"isp2p":"","accountid":"10","isguarantee":"0","storeversion":"201812","orgcode":"000100080001000200010184","isrecommend":"","isrecom":"0","storeperson":"杨芳","hasdevice":"","stockprice":"","warninfo":"","usergetoutrate":"","phone":"13852516898","isdimission":"0","devcanbuymark":"","starttime":"10:30:00","webaddress":"","storetypefirst":"精品美食","bigpicpath":"upload/store_big2580.jpg","permitpicpath":"","createtime":"2018-07-20 09:18:58","row":"5","storedesc":"十几分很多警示开户费山东矿机发货是","smallpicpath":"upload/store_small2580.jpg","isalliance":"","remark":"","havestorage":"0","devlastouttime":"2019-11-07 13:24:16","storepreviou":"1111","takecaremanname":"","deposit":"0","endtime":"22:00:00","storelatitude":"32.3758","departuretime":"","storetype":"3","storelongitude":"119.40019","storelevel":"0","repairmanname":"","storeid":"2580","storephone":"13773567776","wxid":"","showphonetext":"1","scrolltitle":"","cashaccount":"3720","devdebugstatus":"1","licensepicpath":"upload/store_license2580.jpg","cashaccounted":"0","areaid":"321003","repairmanphone":"","takecaremanphone":"","activitypicpath":"","storename":"渝滋味霸王牛肉","servicephone":"0514-87171677","foodstyle":"火锅烧烤","storelegalperson":"","balancerate":"0","storenote":"1","signnumber":"1","isenabled":"1","storeaddr":"江苏省扬州市邗江区百祥路6号","bindingtime":"2019-01-17 13:55:55"},{"isp2p":"","accountid":"9","isguarantee":"0","storeversion":"201812","orgcode":"000100080001000200010132","isrecommend":"","isrecom":"0","storeperson":"何正旺","hasdevice":"","stockprice":"","warninfo":"","usergetoutrate":"","phone":"15881009184","isdimission":"0","devcanbuymark":"","starttime":"09:00:00","webaddress":"","storetypefirst":"精品美食","bigpicpath":"upload/store_big2444.jpg","permitpicpath":"","createtime":"2018-02-02 14:59:43","row":"6","storedesc":"放假号会计师反馈及时反馈煎熬鸿福路口货发了","smallpicpath":"upload/store_small2444.jpg","isalliance":"","remark":"","havestorage":"0","devlastouttime":"2018-09-12 11:09:43","storepreviou":"1111","takecaremanname":"","deposit":"0","endtime":"21:00:00","storelatitude":"32.398392","departuretime":"","storetype":"3","storelongitude":"119.49549","storelevel":"0","repairmanname":"","storeid":"2444","storephone":"13325916226","wxid":"","showphonetext":"1","scrolltitle":"","cashaccount":"0","devdebugstatus":"0","licensepicpath":"upload/store_license0.png","cashaccounted":"0","areaid":"321002","repairmanphone":"","takecaremanphone":"","activitypicpath":"","storename":"鱼品轩","servicephone":"","foodstyle":"中餐","storelegalperson":"","balancerate":"0","storenote":"1","signnumber":"1","isenabled":"0","storeaddr":"江苏省扬州市广陵区和昌运河尚郡正门对面","bindingtime":"2019-01-04 14:13:52"},{"isp2p":"","accountid":"8","isguarantee":"0","storeversion":"","orgcode":"000100080001000800030013","isrecommend":"","isrecom":"0","storeperson":"展示大厅","hasdevice":"","stockprice":"","warninfo":"","usergetoutrate":"","phone":"18248829440","isdimission":"0","devcanbuymark":"","starttime":"","webaddress":"","storetypefirst":"精品美食","bigpicpath":"","permitpicpath":"","createtime":"2018-12-06 09:32:16","row":"7","storedesc":"总部大厅展示","smallpicpath":"","isalliance":"","remark":"","havestorage":"0","devlastouttime":"2019-01-04 17:11:55","storepreviou":"2601","takecaremanname":"","deposit":"0","endtime":"","storelatitude":"31.377362","departuretime":"","storetype":"3","storelongitude":"120.534463","storelevel":"0","repairmanname":"","storeid":"2603","storephone":"18248829440","wxid":"无","showphonetext":"0","scrolltitle":"","cashaccount":"0","devdebugstatus":"1","licensepicpath":"upload/store_license0.png","cashaccounted":"0","areaid":"0","repairmanphone":"","takecaremanphone":"","activitypicpath":"","storename":"江苏总部展示机","servicephone":"","foodstyle":"中餐","storelegalperson":"","balancerate":"0","storenote":"总部大厅展示机器","signnumber":"1","isenabled":"1","storeaddr":"苏州汇融广场总部展示厅","bindingtime":"2019-01-04 11:12:00"},{"isp2p":"","accountid":"7","isguarantee":"0","storeversion":"","orgcode":"000100080001000800030013","isrecommend":"","isrecom":"0","storeperson":"展示大厅","hasdevice":"","stockprice":"","warninfo":"","usergetoutrate":"","phone":"17602586117","isdimission":"1","devcanbuymark":"","starttime":"","webaddress":"","storetypefirst":"精品美食","bigpicpath":"","permitpicpath":"","createtime":"2018-12-06 09:32:16","row":"8","storedesc":"总部大厅展示","smallpicpath":"","isalliance":"","remark":"","havestorage":"0","devlastouttime":"2019-01-04 17:11:55","storepreviou":"2601","takecaremanname":"","deposit":"0","endtime":"","storelatitude":"31.377362","departuretime":"2019-01-03 13:58:33","storetype":"3","storelongitude":"120.534463","storelevel":"0","repairmanname":"","storeid":"2603","storephone":"18248829440","wxid":"无","showphonetext":"0","scrolltitle":"","cashaccount":"0","devdebugstatus":"1","licensepicpath":"upload/store_license0.png","cashaccounted":"0","areaid":"0","repairmanphone":"","takecaremanphone":"","activitypicpath":"","storename":"江苏总部展示机","servicephone":"","foodstyle":"中餐","storelegalperson":"","balancerate":"0","storenote":"总部大厅展示机器","signnumber":"1","isenabled":"1","storeaddr":"苏州汇融广场总部展示厅","bindingtime":"2019-01-03 13:58:19"},{"isp2p":"","accountid":"6","isguarantee":"0","storeversion":"","orgcode":"000100080001000800030013","isrecommend":"","isrecom":"0","storeperson":"展示大厅","hasdevice":"","stockprice":"","warninfo":"","usergetoutrate":"","phone":"18248829940","isdimission":"1","devcanbuymark":"","starttime":"","webaddress":"","storetypefirst":"精品美食","bigpicpath":"","permitpicpath":"","createtime":"2018-12-06 09:32:16","row":"9","storedesc":"总部大厅展示","smallpicpath":"","isalliance":"","remark":"","havestorage":"0","devlastouttime":"2019-01-04 17:11:55","storepreviou":"2601","takecaremanname":"","deposit":"0","endtime":"","storelatitude":"31.377362","departuretime":"2019-01-04 11:11:45","storetype":"3","storelongitude":"120.534463","storelevel":"0","repairmanname":"","storeid":"2603","storephone":"18248829440","wxid":"无","showphonetext":"0","scrolltitle":"","cashaccount":"0","devdebugstatus":"1","licensepicpath":"upload/store_license0.png","cashaccounted":"0","areaid":"0","repairmanphone":"","takecaremanphone":"","activitypicpath":"","storename":"江苏总部展示机","servicephone":"","foodstyle":"中餐","storelegalperson":"","balancerate":"0","storenote":"总部大厅展示机器","signnumber":"1","isenabled":"1","storeaddr":"苏州汇融广场总部展示厅","bindingtime":"2019-01-03 13:55:08"}],"res.page":[{"RecordsCount":9,"hasNextPage":false,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12,"TotalPageCount":1}],"res.size":"9","returnview":""},
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
