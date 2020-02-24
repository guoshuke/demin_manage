<template>
  <div>
    <div class="flex-row filter-box">
      <div>
        <span>名称：</span>
        <el-input v-model="requestParams.name" clearable placeholder="请输入内容"></el-input>
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
        prop="storeid"
        label="编号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="storename"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="previouname"
        label="上级分组">
      </el-table-column>
      <el-table-column
        prop="wxid"
        label="微信公众号"
        width="180">
      </el-table-column>
      <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="dialogVisible=true">图片管理</el-button>
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
  name: 'GroupList',
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
        name: '',
        pageNum: 1,
        pageSize: 10
      },
      dialogVisible: false,
      jsonName: {"jvcpagename":"se_store","jvcoldpageName":"se_store","cmd":"query","returnvalue":"1","query.storeType":"2","res.recordsperpage":"12","RecordsPerPage":"12","res":[{"isp2p":"","storeversion":"","orgcode":"00010002","isrecommend":"","isrecom":"","storeperson":"","hasdevice":"","stockprice":"","logowithtime":"/images/emptyPic.jpg","warninfo":"","usergetoutrate":"","devcanbuymark":"0","starttime":"","enabledname":"","webaddress":"","storetypefirst":"","bigpicpath":"","permitpicpath":"","createtime":"2014-12-08 14:30:00","row":"1","storedesc":"","location":"","smallpicpath":"","isalliance":"","havestorage":"","storepreviou":"1","devlastouttime":"","deposit":"","takecaremanname":"","endtime":"","storelatitude":"","storetype":"2","storelongitude":"","storelevel":"","repairmanname":"","storeid":"257","storephone":"","wxid":"mjh5299","showphonetext":"","scrolltitle":"","previouname":"成都得民","devdebugstatus":"","datutime":"/images/emptyPic.jpg","licensepicpath":"","candelete":"true","devdebugstatusname":"","childcount":"1","areaid":"0","repairmanphone":"","takecaremanphone":"","typename":"虚拟","activitypicpath":"","storename":"西南地区","servicephone":"","foodstyle":"中餐","pointlogowithtime":"/images/emptyPic.jpg","storelegalperson":"","balancerate":"","storenote":"","signnumber":"","isenabled":"","storeaddr":""},{"isp2p":"","storeversion":"","orgcode":"000100020002","isrecommend":"","isrecom":"","storeperson":"","hasdevice":"","stockprice":"","logowithtime":"/images/emptyPic.jpg","warninfo":"","usergetoutrate":"","devcanbuymark":"0","starttime":"","enabledname":"","webaddress":"","storetypefirst":"","bigpicpath":"","permitpicpath":"","createtime":"2014-12-08 14:30:00","row":"2","storedesc":"","location":"","smallpicpath":"","isalliance":"","havestorage":"","storepreviou":"257","devlastouttime":"","deposit":"","takecaremanname":"","endtime":"","storelatitude":"","storetype":"2","storelongitude":"","storelevel":"","repairmanname":"","storeid":"263","storephone":"","wxid":"mjh5299","showphonetext":"","scrolltitle":"","previouname":"西南地区","devdebugstatus":"","datutime":"/images/emptyPic.jpg","licensepicpath":"","candelete":"true","devdebugstatusname":"","childcount":"1","areaid":"0","repairmanphone":"","takecaremanphone":"","typename":"虚拟","activitypicpath":"","storename":"四川省","servicephone":"","foodstyle":"中餐","pointlogowithtime":"/images/emptyPic.jpg","storelegalperson":"","balancerate":"","storenote":"","signnumber":"","isenabled":"","storeaddr":""},{"isp2p":"","storeversion":"","orgcode":"0001000200020002","isrecommend":"","isrecom":"","storeperson":"","hasdevice":"","stockprice":"","logowithtime":"/images/emptyPic.jpg","warninfo":"","usergetoutrate":"","devcanbuymark":"0","starttime":"","enabledname":"","webaddress":"","storetypefirst":"","bigpicpath":"","permitpicpath":"","createtime":"2014-12-08 14:30:00","row":"3","storedesc":"","location":"","smallpicpath":"","isalliance":"","havestorage":"","storepreviou":"263","devlastouttime":"","deposit":"","takecaremanname":"","endtime":"","storelatitude":"","storetype":"2","storelongitude":"","storelevel":"","repairmanname":"","storeid":"277","storephone":"","wxid":"mjh5299","showphonetext":"","scrolltitle":"","previouname":"四川省","devdebugstatus":"","datutime":"/images/emptyPic.jpg","licensepicpath":"","candelete":"true","devdebugstatusname":"","childcount":"1","areaid":"0","repairmanphone":"","takecaremanphone":"","typename":"虚拟","activitypicpath":"","storename":"成都市","servicephone":"","foodstyle":"中餐","pointlogowithtime":"/images/emptyPic.jpg","storelegalperson":"","balancerate":"","storenote":"","signnumber":"","isenabled":"","storeaddr":""},{"isp2p":"","storeversion":"","orgcode":"0001","isrecommend":"","isrecom":"","storeperson":"","hasdevice":"","stockprice":"","logowithtime":"/images/emptyPic.jpg","warninfo":"","usergetoutrate":"","devcanbuymark":"0","starttime":"","enabledname":"可用","webaddress":"","storetypefirst":"","bigpicpath":"","permitpicpath":"","createtime":"2014-11-07 16:06:18","row":"4","storedesc":"","location":"","smallpicpath":"","isalliance":"","havestorage":"","storepreviou":"","devlastouttime":"","deposit":"","takecaremanname":"","endtime":"","storelatitude":"","storetype":"2","storelongitude":"","storelevel":"","repairmanname":"","storeid":"1","storephone":"","wxid":"mjh5299","showphonetext":"","scrolltitle":"","devdebugstatus":"","datutime":"/images/emptyPic.jpg","licensepicpath":"","candelete":"false","devdebugstatusname":"","childcount":"4","areaid":"0","repairmanphone":"","takecaremanphone":"","typename":"虚拟","activitypicpath":"","storename":"成都得民","servicephone":"","foodstyle":"中餐","pointlogowithtime":"/images/emptyPic.jpg","storelegalperson":"","balancerate":"","storenote":"","signnumber":"","isenabled":"1","storeaddr":"成都市新都仓库"},{"isp2p":"","storeversion":"","orgcode":"00010004","isrecommend":"","isrecom":"","storeperson":"","hasdevice":"","stockprice":"","logowithtime":"/images/emptyPic.jpg","warninfo":"","usergetoutrate":"","devcanbuymark":"0","starttime":"","enabledname":"","webaddress":"","storetypefirst":"","bigpicpath":"","permitpicpath":"","createtime":"","row":"5","storedesc":"","location":"","smallpicpath":"","isalliance":"","havestorage":"","storepreviou":"1","devlastouttime":"","deposit":"","takecaremanname":"","endtime":"","storelatitude":"","storetype":"2","storelongitude":"","storelevel":"","repairmanname":"","storeid":"366","storephone":"","wxid":"","showphonetext":"","scrolltitle":"","previouname":"成都得民","devdebugstatus":"","datutime":"/images/emptyPic.jpg","licensepicpath":"","candelete":"true","devdebugstatusname":"","childcount":"1","areaid":"0","repairmanphone":"","takecaremanphone":"","typename":"虚拟","activitypicpath":"","storename":"西北地区","servicephone":"","foodstyle":"中餐","pointlogowithtime":"/images/emptyPic.jpg","storelegalperson":"","balancerate":"","storenote":"","signnumber":"","isenabled":"","storeaddr":""},{"isp2p":"","storeversion":"","orgcode":"000100040002","isrecommend":"","isrecom":"","storeperson":"","hasdevice":"","stockprice":"","logowithtime":"/images/emptyPic.jpg","warninfo":"","usergetoutrate":"","devcanbuymark":"0","starttime":"","enabledname":"","webaddress":"","storetypefirst":"","bigpicpath":"","permitpicpath":"","createtime":"","row":"6","storedesc":"","location":"","smallpicpath":"","isalliance":"","havestorage":"","storepreviou":"366","devlastouttime":"","deposit":"","takecaremanname":"","endtime":"","storelatitude":"","storetype":"2","storelongitude":"","storelevel":"","repairmanname":"","storeid":"367","storephone":"","wxid":"","showphonetext":"","scrolltitle":"","previouname":"西北地区","devdebugstatus":"","datutime":"/images/emptyPic.jpg","licensepicpath":"","candelete":"true","devdebugstatusname":"","childcount":"1","areaid":"0","repairmanphone":"","takecaremanphone":"","typename":"虚拟","activitypicpath":"","storename":"甘肃省","servicephone":"","foodstyle":"中餐","pointlogowithtime":"/images/emptyPic.jpg","storelegalperson":"","balancerate":"","storenote":"","signnumber":"","isenabled":"","storeaddr":""},{"isp2p":"","storeversion":"","orgcode":"00010007","isrecommend":"","isrecom":"","storeperson":"","hasdevice":"","stockprice":"","logowithtime":"/images/emptyPic.jpg","warninfo":"","usergetoutrate":"","devcanbuymark":"","starttime":"","enabledname":"","webaddress":"","storetypefirst":"","bigpicpath":"","permitpicpath":"","createtime":"","row":"7","storedesc":"","location":"","smallpicpath":"","isalliance":"","havestorage":"","storepreviou":"1","devlastouttime":"","deposit":"","takecaremanname":"","endtime":"","storelatitude":"","storetype":"2","storelongitude":"","storelevel":"","repairmanname":"","storeid":"464","storephone":"","wxid":"","showphonetext":"","scrolltitle":"","previouname":"成都得民","devdebugstatus":"","datutime":"/images/emptyPic.jpg","licensepicpath":"","candelete":"true","devdebugstatusname":"","childcount":"2","areaid":"0","repairmanphone":"","takecaremanphone":"","typename":"虚拟","activitypicpath":"","storename":"华中地区","servicephone":"","foodstyle":"中餐","pointlogowithtime":"/images/emptyPic.jpg","storelegalperson":"","balancerate":"","storenote":"","signnumber":"","isenabled":"","storeaddr":""},{"isp2p":"","storeversion":"","orgcode":"000100070003","isrecommend":"","isrecom":"","storeperson":"","hasdevice":"","stockprice":"","logowithtime":"/images/emptyPic.jpg","warninfo":"","usergetoutrate":"","devcanbuymark":"","starttime":"","enabledname":"","webaddress":"","storetypefirst":"","bigpicpath":"","permitpicpath":"","createtime":"","row":"8","storedesc":"","location":"","smallpicpath":"","isalliance":"","havestorage":"","storepreviou":"464","devlastouttime":"","deposit":"","takecaremanname":"","endtime":"","storelatitude":"","storetype":"2","storelongitude":"","storelevel":"","repairmanname":"","storeid":"467","storephone":"","wxid":"","showphonetext":"","scrolltitle":"","previouname":"华中地区","devdebugstatus":"","datutime":"/images/emptyPic.jpg","licensepicpath":"","candelete":"true","devdebugstatusname":"","childcount":"1","areaid":"0","repairmanphone":"","takecaremanphone":"","typename":"虚拟","activitypicpath":"","storename":"河南省","servicephone":"","foodstyle":"中餐","pointlogowithtime":"/images/emptyPic.jpg","storelegalperson":"","balancerate":"","storenote":"","signnumber":"","isenabled":"","storeaddr":""},{"isp2p":"","storeversion":"","orgcode":"00010008","isrecommend":"","isrecom":"","storeperson":"","hasdevice":"","stockprice":"","logowithtime":"/images/emptyPic.jpg","warninfo":"","usergetoutrate":"","devcanbuymark":"","starttime":"","enabledname":"","webaddress":"","storetypefirst":"精品美食","bigpicpath":"","permitpicpath":"","createtime":"","row":"9","storedesc":"","location":"","smallpicpath":"","isalliance":"","havestorage":"","storepreviou":"1","devlastouttime":"","deposit":"","takecaremanname":"","endtime":"","storelatitude":"","storetype":"2","storelongitude":"","storelevel":"","repairmanname":"","storeid":"779","storephone":"","wxid":"","showphonetext":"","scrolltitle":"","previouname":"成都得民","devdebugstatus":"","datutime":"/images/emptyPic.jpg","licensepicpath":"","candelete":"true","devdebugstatusname":"","childcount":"2","areaid":"0","repairmanphone":"","takecaremanphone":"","typename":"虚拟","activitypicpath":"","storename":"华东地区","servicephone":"","foodstyle":"中餐","pointlogowithtime":"/images/emptyPic.jpg","storelegalperson":"","balancerate":"","storenote":"","signnumber":"","isenabled":"","storeaddr":""},{"isp2p":"","storeversion":"","orgcode":"000100080003","isrecommend":"","isrecom":"","storeperson":"","privinceid":"370000","hasdevice":"","stockprice":"","logowithtime":"/images/emptyPic.jpg","warninfo":"","usergetoutrate":"","privname":"淄博市","devcanbuymark":"","starttime":"","enabledname":"","webaddress":"","storetypefirst":"","bigpicpath":"","permitpicpath":"","createtime":"","row":"10","storedesc":"","location":"山东省淄博市临淄区","smallpicpath":"","isalliance":"","havestorage":"","storepreviou":"779","devlastouttime":"","deposit":"","takecaremanname":"","endtime":"","storelatitude":"","storetype":"2","storelongitude":"","storelevel":"","repairmanname":"","storeid":"781","quname":"临淄区","storephone":"","wxid":"天下有酒","showphonetext":"","cityid":"370300","scrolltitle":"","previouname":"华东地区","devdebugstatus":"","datutime":"/images/emptyPic.jpg","licensepicpath":"","candelete":"true","devdebugstatusname":"","childcount":"2","areaid":"370305","repairmanphone":"","takecaremanphone":"","sname":"山东省","typename":"虚拟","activitypicpath":"","storename":"山东省","servicephone":"","foodstyle":"中餐","pointlogowithtime":"/images/emptyPic.jpg","storelegalperson":"","balancerate":"","storenote":"","signnumber":"","isenabled":"","storeaddr":""},{"isp2p":"","storeversion":"","orgcode":"00010008000300020008","isrecommend":"","isrecom":"","storeperson":"","hasdevice":"","stockprice":"","logowithtime":"/images/emptyPic.jpg","warninfo":"","usergetoutrate":"","devcanbuymark":"","starttime":"","enabledname":"","webaddress":"","storetypefirst":"","bigpicpath":"","permitpicpath":"","createtime":"","row":"11","storedesc":"","location":"","smallpicpath":"","isalliance":"","havestorage":"","storepreviou":"887","devlastouttime":"","deposit":"","takecaremanname":"","endtime":"","storelatitude":"","storetype":"2","storelongitude":"","storelevel":"","repairmanname":"","storeid":"946","storephone":"","wxid":"","showphonetext":"","scrolltitle":"","previouname":"山东得民良诚商贸有限公司","devdebugstatus":"","datutime":"/images/emptyPic.jpg","licensepicpath":"","candelete":"true","devdebugstatusname":"","childcount":"1","areaid":"0","repairmanphone":"","takecaremanphone":"","typename":"虚拟","activitypicpath":"","storename":"青岛市","servicephone":"","foodstyle":"","pointlogowithtime":"/images/emptyPic.jpg","storelegalperson":"","balancerate":"","storenote":"","signnumber":"","isenabled":"","storeaddr":""},{"isp2p":"","storeversion":"","orgcode":"000100080001","isrecommend":"","isrecom":"","storeperson":"","hasdevice":"","stockprice":"","logowithtime":"/images/emptyPic.jpg","warninfo":"","usergetoutrate":"","devcanbuymark":"","starttime":"","enabledname":"","webaddress":"","storetypefirst":"","bigpicpath":"","permitpicpath":"","createtime":"","row":"12","storedesc":"","location":"","smallpicpath":"","isalliance":"","havestorage":"","storepreviou":"779","devlastouttime":"","deposit":"","takecaremanname":"","endtime":"","storelatitude":"","storetype":"2","storelongitude":"","storelevel":"","repairmanname":"","storeid":"1000","storephone":"","wxid":"","showphonetext":"","scrolltitle":"","previouname":"华东地区","devdebugstatus":"","datutime":"/images/emptyPic.jpg","licensepicpath":"","candelete":"true","devdebugstatusname":"","childcount":"4","areaid":"0","repairmanphone":"","takecaremanphone":"","typename":"虚拟","activitypicpath":"","storename":"江苏省","servicephone":"","foodstyle":"","pointlogowithtime":"/images/emptyPic.jpg","storelegalperson":"","balancerate":"","storenote":"","signnumber":"","isenabled":"","storeaddr":""}],"res.page":[{"RecordsCount":24,"hasNextPage":true,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12,"TotalPageCount":2}],"res.size":"24","returnview":"@json"},
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
    width: 180px;
  }
  .el-icon-edit {
    font-size: 16px;
  }
</style>
