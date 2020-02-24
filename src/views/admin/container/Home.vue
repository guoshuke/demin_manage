<template>
  <div>
    <div class="flex-row filter-box">
      <div>
        <span>编号/名称：</span>
        <el-input v-model="requestParams.storeName" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>最后出酒时间大于：</span>
        <el-date-picker
          v-model="requestParams.datetime"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      <div>
        <span>是否可用：</span>
        <el-select v-model="requestParams.storeStatus" placeholder="请选择">
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
        prop="storeid"
        label="编号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="storename"
        width="120"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="storeperson"
        label="负责人"
        width="80">
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
        prop="location"
        label="所在地区"
        width="180">
      </el-table-column>
      <el-table-column
        prop="endtime"
        label="最后出酒时间"
        width="150">
      </el-table-column>
      <el-table-column
        prop="enabledname"
        label="是否可用"
        width="80">
      </el-table-column>
      <el-table-column
        prop="devlastouttime"
        label="酒机落地时间"
        width="120">
      </el-table-column>
      <el-table-column
        prop="helperStatus"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small">图片管理</el-button>
          <el-button type="text" size="small">添加提醒</el-button>
          <el-button type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-style">
      <PageChange :total="total" :pageSize="requestParams.pageSize" :pageNum="requestParams.pageNum" @getList="getListData"/>
    </div>
    <el-dialog
      title="标题"
      :visible.sync="dialogVisible"
      width="600px">
      <div style="max-height: 400px; overflow: auto">
        ererere
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
  name: 'home',
  components: {
    PageChange,
    Breadcrumb
  },
  data() {
    return {
      name: '',
      date: '',
      total: 1000,
      requestParams: {
        storeName: '',
        datetime: '',
        storeStatus: '',
        pageNum: 1,
        pageSize: 10
      },
      options: [{
        value: '0',
        label: '全部'
      }, {
        value: '1',
        label: '可用'
      }, {
        value: '2',
        label: '不可用'
      }],
      value: '',
      tableData: [],
      dialogVisible: false,
      jsonName: {"jvcpagename":"se_store","jvcoldpageName":"se_store","cmd":"query","returnvalue":"1","query.storeType":"3","res.recordsperpage":"12","RecordsPerPage":"12","res":[{"isp2p":"","storeversion":"201804","orgcode":"000100080001000200010416","isrecommend":"","isrecom":"0","storeperson":"汪伟","privinceid":"320000","hasdevice":"","stockprice":"","logowithtime":"http://139.196.151.129:8081/upload/store_small2944.jpg?time=20200207153740267","warninfo":"","usergetoutrate":"","privname":"扬州市","devcanbuymark":"","starttime":"","enabledname":"可用","webaddress":"","storetypefirst":"休闲娱乐","bigpicpath":"upload/store_big2944.jpg","permitpicpath":"","createtime":"2020-01-21 00:39:15","row":"1","storedesc":"1","location":"江苏省扬州市邗江区","smallpicpath":"upload/store_small2944.jpg","isalliance":"","havestorage":"0","storepreviou":"1111","devlastouttime":"","deposit":"0","takecaremanname":"","endtime":"","storelatitude":"32.3873615","storetype":"3","storelongitude":"119.403861","storelevel":"0","repairmanname":"","storeid":"2944","quname":"邗江区","storephone":"13665227522","wxid":"天下有酒","showphonetext":"0","cityid":"321000","scrolltitle":"","previouname":"江苏得民数联智能设备科技有限公司","devdebugstatus":"1","datutime":"upload/store_big2944.jpg?time=20200207153740267","licensepicpath":"","candelete":"false","devdebugstatusname":"已开启","childcount":"0","areaid":"321003","repairmanphone":"","takecaremanphone":"","sname":"江苏省","typename":"酒楼","activitypicpath":"","storename":"扬州思达乐户外","servicephone":"","foodstyle":"商超酒吧","pointlogowithtime":"http://139.196.151.129:8081/upload/store_small2944.jpg?time=20200207153740267","storelegalperson":"","balancerate":"0","storenote":"1","signnumber":"1","isenabled":"1","storeaddr":"江苏省扬州市邗江区邗江中路358号三盛国际广场903"},{"isp2p":"","storeversion":"201804","orgcode":"000100080001000200010415","isrecommend":"","isrecom":"0","storeperson":"陈霞","privinceid":"320000","hasdevice":"","stockprice":"","logowithtime":"http://139.196.151.129:8081/upload/store_small2943.jpg?time=20200207153740284","warninfo":"","usergetoutrate":"","privname":"扬州市","devcanbuymark":"","starttime":"","enabledname":"可用","webaddress":"","storetypefirst":"生活服务","bigpicpath":"upload/store_big2943.jpg","permitpicpath":"","createtime":"2020-01-15 17:45:46","row":"2","storedesc":"1","location":"江苏省扬州市邗江区","smallpicpath":"upload/store_small2943.jpg","isalliance":"","havestorage":"0","storepreviou":"1111","devlastouttime":"","deposit":"0","takecaremanname":"","endtime":"","storelatitude":"32.371992","storetype":"3","storelongitude":"119.423276","storelevel":"0","repairmanname":"","storeid":"2943","quname":"邗江区","storephone":"13032576868","wxid":"天下有酒","showphonetext":"0","cityid":"321000","scrolltitle":"","previouname":"江苏得民数联智能设备科技有限公司","devdebugstatus":"1","datutime":"upload/store_big2943.jpg?time=20200207153740284","licensepicpath":"","candelete":"false","devdebugstatusname":"已开启","childcount":"0","areaid":"321003","repairmanphone":"","takecaremanphone":"","sname":"江苏省","typename":"酒楼","activitypicpath":"","storename":"UCC国际洗衣（宝龙店）","servicephone":"","foodstyle":"干洗店","pointlogowithtime":"http://139.196.151.129:8081/upload/store_small2943.jpg?time=20200207153740284","storelegalperson":"","balancerate":"0","storenote":"1","signnumber":"1","isenabled":"1","storeaddr":"江苏省扬州市邗江区宝龙广场B区9号楼1F112-113（家和豆浆旁）"},{"isp2p":"","storeversion":"201804","orgcode":"000100080001000200010414","isrecommend":"","isrecom":"0","storeperson":"张新风","privinceid":"320000","hasdevice":"","stockprice":"","logowithtime":"http://139.196.151.129:8081/upload/store_small2942.jpg?time=20200207153740301","warninfo":"","usergetoutrate":"","privname":"扬州市","devcanbuymark":"","starttime":"","enabledname":"可用","webaddress":"","storetypefirst":"生活服务","bigpicpath":"upload/store_big2942.jpg","permitpicpath":"","createtime":"2020-01-15 17:42:47","row":"3","storedesc":"1","location":"江苏省扬州市邗江区","smallpicpath":"upload/store_small2942.jpg","isalliance":"","havestorage":"0","storepreviou":"1111","devlastouttime":"","deposit":"0","takecaremanname":"","endtime":"","storelatitude":"32.365575","storetype":"3","storelongitude":"119.403125","storelevel":"0","repairmanname":"","storeid":"2942","quname":"邗江区","storephone":"13338129933","wxid":"天下有酒","showphonetext":"0","cityid":"321000","scrolltitle":"","previouname":"江苏得民数联智能设备科技有限公司","devdebugstatus":"1","datutime":"upload/store_big2942.jpg?time=20200207153740301","licensepicpath":"","candelete":"false","devdebugstatusname":"已开启","childcount":"0","areaid":"321003","repairmanphone":"","takecaremanphone":"","sname":"江苏省","typename":"酒楼","activitypicpath":"","storename":"居易置业","servicephone":"","foodstyle":"房产服务","pointlogowithtime":"http://139.196.151.129:8081/upload/store_small2942.jpg?time=20200207153740301","storelegalperson":"","balancerate":"0","storenote":"1","signnumber":"1","isenabled":"1","storeaddr":"江苏省扬州市邗江区开发西路新港名兴花园41幢104"},{"isp2p":"","storeversion":"201804","orgcode":"000100080001000200010413","isrecommend":"","isrecom":"0","storeperson":"郭雷","privinceid":"320000","hasdevice":"","stockprice":"","logowithtime":"http://139.196.151.129:8081/upload/store_small2941.jpg?time=20200207153740321","warninfo":"","usergetoutrate":"","privname":"扬州市","devcanbuymark":"","starttime":"","enabledname":"可用","webaddress":"","storetypefirst":"精品美食","bigpicpath":"upload/store_big2941.jpg","permitpicpath":"","createtime":"2020-01-14 09:07:11","row":"4","storedesc":"1","location":"江苏省扬州市邗江区","smallpicpath":"upload/store_small2941.jpg","isalliance":"","havestorage":"0","storepreviou":"1111","devlastouttime":"","deposit":"0","takecaremanname":"","endtime":"","storelatitude":"32.374855","storetype":"3","storelongitude":"119.405089","storelevel":"0","repairmanname":"","storeid":"2941","quname":"邗江区","storephone":"15551511229","wxid":"天下有酒","showphonetext":"0","cityid":"321000","scrolltitle":"","previouname":"江苏得民数联智能设备科技有限公司","devdebugstatus":"1","datutime":"upload/store_big2941.jpg?time=20200207153740321","licensepicpath":"","candelete":"false","devdebugstatusname":"已开启","childcount":"0","areaid":"321003","repairmanphone":"","takecaremanphone":"","sname":"江苏省","typename":"酒楼","activitypicpath":"","storename":"筋牛座","servicephone":"","foodstyle":"中餐","pointlogowithtime":"http://139.196.151.129:8081/upload/store_small2941.jpg?time=20200207153740321","storelegalperson":"","balancerate":"0","storenote":"1","signnumber":"1","isenabled":"1","storeaddr":"江苏省扬州市邗江区邗江中路万达金街12幢109室"},{"isp2p":"","storeversion":"201804","orgcode":"000100080001000200010412","isrecommend":"","isrecom":"0","storeperson":"高骊荣","privinceid":"320000","hasdevice":"","stockprice":"","logowithtime":"http://139.196.151.129:8081/upload/store_small2940.jpg?time=20200207153740337","warninfo":"","usergetoutrate":"","privname":"扬州市","devcanbuymark":"","starttime":"","enabledname":"可用","webaddress":"","storetypefirst":"生活服务","bigpicpath":"upload/store_big2940.jpg","permitpicpath":"","createtime":"2020-01-09 14:27:27","row":"5","storedesc":"1","location":"江苏省扬州市邗江区","smallpicpath":"upload/store_small2940.jpg","isalliance":"","havestorage":"0","storepreviou":"1111","devlastouttime":"","deposit":"0","takecaremanname":"","endtime":"","storelatitude":"32.388244","storetype":"3","storelongitude":"119.413976","storelevel":"0","repairmanname":"","storeid":"2940","quname":"邗江区","storephone":"18252750658","wxid":"天下有酒","showphonetext":"0","cityid":"321000","scrolltitle":"","previouname":"江苏得民数联智能设备科技有限公司","devdebugstatus":"1","datutime":"upload/store_big2940.jpg?time=20200207153740337","licensepicpath":"","candelete":"false","devdebugstatusname":"已开启","childcount":"0","areaid":"321003","repairmanphone":"","takecaremanphone":"","sname":"江苏省","typename":"酒楼","activitypicpath":"","storename":"御景房产","servicephone":"","foodstyle":"房产服务","pointlogowithtime":"http://139.196.151.129:8081/upload/store_small2940.jpg?time=20200207153740337","storelegalperson":"","balancerate":"0","storenote":"1","signnumber":"1","isenabled":"1","storeaddr":"江苏省扬州市邗江区维扬路170号"},{"isp2p":"","storeversion":"201804","orgcode":"000100080001000200010411","isrecommend":"","isrecom":"0","storeperson":"姜彦辰","privinceid":"320000","hasdevice":"","stockprice":"","logowithtime":"http://139.196.151.129:8081/upload/store_small2939.jpg?time=20200207153740354","warninfo":"","usergetoutrate":"","privname":"扬州市","devcanbuymark":"","starttime":"","enabledname":"可用","webaddress":"","storetypefirst":"休闲娱乐","bigpicpath":"upload/store_big2939.jpg","permitpicpath":"","createtime":"2020-01-09 14:22:28","row":"6","storedesc":"1","location":"江苏省扬州市邗江区","smallpicpath":"upload/store_small2939.jpg","isalliance":"","havestorage":"0","storepreviou":"1111","devlastouttime":"","deposit":"0","takecaremanname":"","endtime":"","storelatitude":"32.377387","storetype":"3","storelongitude":"119.406233","storelevel":"0","repairmanname":"","storeid":"2939","quname":"邗江区","storephone":"18361822307","wxid":"天下有酒","showphonetext":"0","cityid":"321000","scrolltitle":"","previouname":"江苏得民数联智能设备科技有限公司","devdebugstatus":"1","datutime":"upload/store_big2939.jpg?time=20200207153740354","licensepicpath":"","candelete":"false","devdebugstatusname":"已开启","childcount":"0","areaid":"321003","repairmanphone":"","takecaremanphone":"","sname":"江苏省","typename":"酒楼","activitypicpath":"","storename":"欧派家纺生活馆","servicephone":"","foodstyle":"服饰鞋包","pointlogowithtime":"http://139.196.151.129:8081/upload/store_small2939.jpg?time=20200207153740354","storelegalperson":"","balancerate":"0","storenote":"1","signnumber":"1","isenabled":"1","storeaddr":"江苏省扬州市邗江区汉江中路力宝广场一楼1006"},{"isp2p":"","storeversion":"201804","orgcode":"000100080001000200010410","isrecommend":"","isrecom":"0","storeperson":"冯燕","privinceid":"320000","hasdevice":"","stockprice":"","logowithtime":"http://139.196.151.129:8081/upload/store_small2938.jpg?time=20200207153740370","warninfo":"","usergetoutrate":"","privname":"扬州市","devcanbuymark":"","starttime":"","enabledname":"可用","webaddress":"","storetypefirst":"休闲娱乐","bigpicpath":"upload/store_big2938.jpg","permitpicpath":"","createtime":"2020-01-09 14:11:20","row":"7","storedesc":"1","location":"江苏省扬州市邗江区","smallpicpath":"upload/store_small2938.jpg","isalliance":"","havestorage":"0","storepreviou":"1111","devlastouttime":"","deposit":"0","takecaremanname":"","endtime":"","storelatitude":"32.386743","storetype":"3","storelongitude":"119.412524","storelevel":"0","repairmanname":"","storeid":"2938","quname":"邗江区","storephone":"13912149679","wxid":"天下有酒","showphonetext":"0","cityid":"321000","scrolltitle":"","previouname":"江苏得民数联智能设备科技有限公司","devdebugstatus":"1","datutime":"upload/store_big2938.jpg?time=20200207153740370","licensepicpath":"","candelete":"false","devdebugstatusname":"已开启","childcount":"0","areaid":"321003","repairmanphone":"","takecaremanphone":"","sname":"江苏省","typename":"酒楼","activitypicpath":"","storename":"特百惠（兴城路店）","servicephone":"","foodstyle":"商超酒吧","pointlogowithtime":"http://139.196.151.129:8081/upload/store_small2938.jpg?time=20200207153740370","storelegalperson":"","balancerate":"0","storenote":"1","signnumber":"1","isenabled":"1","storeaddr":"江苏省扬州市邗江区兴城西路32号石油新村门面房南5-15"},{"isp2p":"","storeversion":"201804","orgcode":"000100080001000200010409","isrecommend":"","isrecom":"0","storeperson":"邱宇","privinceid":"320000","hasdevice":"","stockprice":"","logowithtime":"http://139.196.151.129:8081/upload/store_small2937.jpg?time=20200207153740390","warninfo":"","usergetoutrate":"","privname":"扬州市","devcanbuymark":"","starttime":"","enabledname":"可用","webaddress":"","storetypefirst":"休闲娱乐","bigpicpath":"upload/store_big2937.jpg","permitpicpath":"","createtime":"2020-01-08 14:11:07","row":"8","storedesc":"1","location":"江苏省扬州市邗江区","smallpicpath":"upload/store_small2937.jpg","isalliance":"","havestorage":"0","storepreviou":"1111","devlastouttime":"","deposit":"0","takecaremanname":"","endtime":"","storelatitude":"32.370691","storetype":"3","storelongitude":"119.422571","storelevel":"0","repairmanname":"","storeid":"2937","quname":"邗江区","storephone":"15152748103","wxid":"天下有酒","showphonetext":"0","cityid":"321000","scrolltitle":"","previouname":"江苏得民数联智能设备科技有限公司","devdebugstatus":"1","datutime":"upload/store_big2937.jpg?time=20200207153740391","licensepicpath":"","candelete":"false","devdebugstatusname":"已开启","childcount":"0","areaid":"321003","repairmanphone":"","takecaremanphone":"","sname":"江苏省","typename":"酒楼","activitypicpath":"","storename":"YOCO眼镜","servicephone":"","foodstyle":"医美医疗","pointlogowithtime":"http://139.196.151.129:8081/upload/store_small2937.jpg?time=20200207153740390","storelegalperson":"","balancerate":"0","storenote":"1","signnumber":"1","isenabled":"1","storeaddr":"江苏省扬州市邗江区扬子江中路宝龙广场2楼2F-055"},{"isp2p":"","storeversion":"201804","orgcode":"000100080001000200010408","isrecommend":"","isrecom":"0","storeperson":"林卫","privinceid":"320000","hasdevice":"","stockprice":"","logowithtime":"http://139.196.151.129:8081/upload/store_small2936.jpg?time=20200207153740409","warninfo":"","usergetoutrate":"","privname":"扬州市","devcanbuymark":"","starttime":"","enabledname":"可用","webaddress":"","storetypefirst":"生活服务","bigpicpath":"upload/store_big2936.jpg","permitpicpath":"","createtime":"2020-01-07 11:32:37","row":"9","storedesc":"1","location":"江苏省扬州市邗江区","smallpicpath":"upload/store_small2936.jpg","isalliance":"","havestorage":"0","storepreviou":"1111","devlastouttime":"","deposit":"0","takecaremanname":"","endtime":"","storelatitude":"32.36792","storetype":"3","storelongitude":"119.406551","storelevel":"0","repairmanname":"","storeid":"2936","quname":"邗江区","storephone":"18952722261","wxid":"天下有酒","showphonetext":"0","cityid":"321000","scrolltitle":"","previouname":"江苏得民数联智能设备科技有限公司","devdebugstatus":"1","datutime":"upload/store_big2936.jpg?time=20200207153740409","licensepicpath":"","candelete":"false","devdebugstatusname":"已开启","childcount":"0","areaid":"321003","repairmanphone":"","takecaremanphone":"","sname":"江苏省","typename":"酒楼","activitypicpath":"","storename":"中佰房产","servicephone":"","foodstyle":"房产服务","pointlogowithtime":"http://139.196.151.129:8081/upload/store_small2936.jpg?time=20200207153740409","storelegalperson":"","balancerate":"0","storenote":"1","signnumber":"1","isenabled":"1","storeaddr":"江苏省扬州市邗江区开发西路99号"},{"isp2p":"","storeversion":"201804","orgcode":"000100080001000200010407","isrecommend":"","isrecom":"0","storeperson":"金燕燕","privinceid":"320000","hasdevice":"","stockprice":"","logowithtime":"http://139.196.151.129:8081/upload/store_small2935.jpg?time=20200207153740426","warninfo":"","usergetoutrate":"","privname":"扬州市","devcanbuymark":"","starttime":"","enabledname":"可用","webaddress":"","storetypefirst":"休闲娱乐","bigpicpath":"upload/store_big2935.jpg","permitpicpath":"","createtime":"2020-01-07 11:30:09","row":"10","storedesc":"11","location":"江苏省扬州市邗江区","smallpicpath":"upload/store_small2935.jpg","isalliance":"","havestorage":"0","storepreviou":"1111","devlastouttime":"","deposit":"0","takecaremanname":"","endtime":"","storelatitude":"32.383249","storetype":"3","storelongitude":"119.394789","storelevel":"0","repairmanname":"","storeid":"2935","quname":"邗江区","storephone":"13665245113","wxid":"天下有酒","showphonetext":"0","cityid":"321000","scrolltitle":"","previouname":"江苏得民数联智能设备科技有限公司","devdebugstatus":"1","datutime":"upload/store_big2935.jpg?time=20200207153740426","licensepicpath":"","candelete":"false","devdebugstatusname":"已开启","childcount":"0","areaid":"321003","repairmanphone":"","takecaremanphone":"","sname":"江苏省","typename":"酒楼","activitypicpath":"","storename":"汪喵宠物生活馆","servicephone":"","foodstyle":"商超酒吧","pointlogowithtime":"http://139.196.151.129:8081/upload/store_small2935.jpg?time=20200207153740426","storelegalperson":"","balancerate":"0","storenote":"1","signnumber":"1","isenabled":"1","storeaddr":"江苏省扬州市邗江区文汇西路332号"},{"isp2p":"","storeversion":"201804","orgcode":"000100080001000200010406","isrecommend":"","isrecom":"0","storeperson":"周国荣","privinceid":"320000","hasdevice":"","stockprice":"","logowithtime":"http://139.196.151.129:8081/upload/store_small2934.jpg?time=20200207153740442","warninfo":"","usergetoutrate":"","privname":"扬州市","devcanbuymark":"","starttime":"","enabledname":"可用","webaddress":"","storetypefirst":"休闲娱乐","bigpicpath":"upload/store_big2934.jpg","permitpicpath":"","createtime":"2020-01-07 11:27:01","row":"11","storedesc":"1","location":"江苏省扬州市邗江区","smallpicpath":"upload/store_small2934.jpg","isalliance":"","havestorage":"0","storepreviou":"1111","devlastouttime":"","deposit":"0","takecaremanname":"","endtime":"","storelatitude":"32.376392","storetype":"3","storelongitude":"119.406602","storelevel":"0","repairmanname":"","storeid":"2934","quname":"邗江区","storephone":"15380306255","wxid":"天下有酒","showphonetext":"0","cityid":"321000","scrolltitle":"","previouname":"江苏得民数联智能设备科技有限公司","devdebugstatus":"1","datutime":"upload/store_big2934.jpg?time=20200207153740442","licensepicpath":"","candelete":"false","devdebugstatusname":"已开启","childcount":"0","areaid":"321003","repairmanphone":"","takecaremanphone":"","sname":"江苏省","typename":"酒楼","activitypicpath":"","storename":"依视诺","servicephone":"","foodstyle":"医美医疗","pointlogowithtime":"http://139.196.151.129:8081/upload/store_small2934.jpg?time=20200207153740442","storelegalperson":"","balancerate":"0","storenote":"1","signnumber":"1","isenabled":"1","storeaddr":"江苏省扬州市邗江区邗江中路金阳光二楼202"},{"isp2p":"","storeversion":"201804","orgcode":"000100080001000200010405","isrecommend":"","isrecom":"0","storeperson":"蒋梅","privinceid":"320000","hasdevice":"","stockprice":"","logowithtime":"http://139.196.151.129:8081/upload/store_small2933.jpg?time=20200207153740459","warninfo":"","usergetoutrate":"","privname":"扬州市","devcanbuymark":"","starttime":"","enabledname":"可用","webaddress":"","storetypefirst":"休闲娱乐","bigpicpath":"upload/store_big2933.jpg","permitpicpath":"","createtime":"2020-01-07 11:23:49","row":"12","storedesc":"1","location":"江苏省扬州市邗江区","smallpicpath":"upload/store_small2933.jpg","isalliance":"","havestorage":"0","storepreviou":"1111","devlastouttime":"","deposit":"0","takecaremanname":"","endtime":"","storelatitude":"32.360021","storetype":"3","storelongitude":"119.403789","storelevel":"0","repairmanname":"","storeid":"2933","quname":"邗江区","storephone":"15396762981","wxid":"天下有酒","showphonetext":"0","cityid":"321000","scrolltitle":"","previouname":"江苏得民数联智能设备科技有限公司","devdebugstatus":"1","datutime":"upload/store_big2933.jpg?time=20200207153740459","licensepicpath":"","candelete":"false","devdebugstatusname":"已开启","childcount":"0","areaid":"321003","repairmanphone":"","takecaremanphone":"","sname":"江苏省","typename":"酒楼","activitypicpath":"","storename":"fashion宝妈产后恢复中心","servicephone":"","foodstyle":"丽人/养生","pointlogowithtime":"http://139.196.151.129:8081/upload/store_small2933.jpg?time=20200207153740459","storelegalperson":"","balancerate":"0","storenote":"1","signnumber":"1","isenabled":"1","storeaddr":"江苏省扬州市邗江区顺达路顺达广场一楼138-25"}],"res.page":[{"RecordsCount":526,"hasNextPage":true,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12,"TotalPageCount":44}],"res.size":"526","returnview":"@json"}
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
</style>
