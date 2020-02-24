<template>
  <div>
    <div class="flex-row filter-box flex-wrap">
      <div>
        <span>门店编号/名称：</span>
        <el-input v-model="requestParams.storeName" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>酒桶编号：</span>
        <el-input v-model="requestParams.barrelId" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>出酒口：</span>
        <el-select v-model="requestParams.devOutNo" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <span>剩余酒量：</span>
        <el-input v-model="requestParams.morethan" clearable placeholder="请输入内容"></el-input>到
        <el-input v-model="requestParams.lessthan" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>门店是否可用：</span>
        <el-select v-model="requestParams.storeStatus" placeholder="请选择">
          <el-option
            v-for="item in storeStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
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
        prop="row"
        label="门店编号"
        width="90">
      </el-table-column>
      <el-table-column
        prop="storename"
        label="门店名称">
      </el-table-column>
      <el-table-column
        prop="barrelid"
        label="酒桶编号"
        width="160">
      </el-table-column>
      <el-table-column
        prop="brandname"
        width="180"
        label="品牌">
      </el-table-column>
      <el-table-column
        prop="devid"
        label="终端"
        width="80">
      </el-table-column>
      <el-table-column
        prop="devoutno"
        width="70"
        label="出酒口">
      </el-table-column>
      <el-table-column
        prop="barrelremain"
        width="90"
        label="剩余酒量">
      </el-table-column>
      <el-table-column
        prop="barrelrfid"
        width="120"
        label="永久RFID">
      </el-table-column>
      <el-table-column
        prop="temprfid"
        width="120"
        label="封口RFID">
      </el-table-column>
      <el-table-column
        prop="isenablename"
        label="是否可用"
        width="80">
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
  name: 'BarrelInfromationList',
  components: {
    PageChange,
    Breadcrumb
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        storeName: '',
        barrelId: '',
        devOutNo: '',
        morethan: '',
        lessthan: '',
        storeStatus: '',
        pageNum: 1,
        pageSize: 10
      },
      options: [{
        value: '0',
        label: '全部'
      }, {
        value: '1',
        label: '第一个'
      }, {
        value: '2',
        label: '第二个'
      }, {
        value: '3',
        label: '第三个'
      }, {
        value: '4',
        label: '第四个'
      }, {
        value: '5',
        label: '第五个'
      }, {
        value: '6',
        label: '第六个'
      }],
      storeStatusOptions: [
        {
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '可用'
        }, {
          value: '2',
          label: '不可用'
        },
      ],
      value: '',
      tableData: [],
      dialogVisible: false,
      jsonName: {"jvcpagename":"pub_onboardbarrel","jvcoldpageName":"pub_onboardbarrel","cmd":"query","returnvalue":"1","res.recordsperpage":"12","RecordsPerPage":"12","res":[{"isp2p":"","storeversion":"","orgcode":"000100020002000200010003","isrecommend":"","isrecom":"0","storeperson":"卢斌","hasdevice":"1","stockprice":"0","devid":"32401","barrelrfid":"100000001003","devoutno":"1","barrelid":"DMT140825000470","warninfo":"测试","usergetoutrate":"","devcanbuymark":"0","starttime":"09:00:00","webaddress":"","storetypefirst":"精品美食","bigpicpath":"upload/store_big324.jpg","permitpicpath":"upload/store_permit324.png","createtime":"2014-12-08 14:30:00","row":"1","storedesc":"11","smallpicpath":"upload/store_small324.png","isalliance":"","havestorage":"0","devlastouttime":"2020-01-08 10:46:29","storepreviou":"1858","takecaremanname":"","deposit":"0","endtime":"10:00:00","storelatitude":"30.639443","storetype":"3","storelongitude":"104.060853","storelevel":"0","repairmanname":"","storeid":"324","brandname":"沱牌生态[10年]酱香","temprfid":"200000000603","storephone":"15982831930","wxid":"mjh5299","showphonetext":"1","scrolltitle":"得民公司内部门店木木木木木木木林","devdebugstatus":"1","licensepicpath":"../upload/store_license0.png","onboardid":"341","areaid":"510107","repairmanphone":"","takecaremanphone":"","brandid":"121","activitypicpath":"upload/store_active324.png","storename":"成都得民科技云酒柜","isenablename":"可用","servicephone":"4007189899","foodstyle":"甜点饮品","barrelremain":"1115","storelegalperson":"","balancerate":"0","storenote":"11","signnumber":"2","isenabled":"1","storeaddr":"四川省成都市武侯区一环路南三段49号华诚大厦4楼"},{"isp2p":"","storeversion":"","orgcode":"000100020002000200010003","isrecommend":"","isrecom":"0","storeperson":"卢斌","hasdevice":"1","stockprice":"0","devid":"32401","barrelrfid":"100000002196","devoutno":"2","barrelid":"DMT140825000689","warninfo":"测试","usergetoutrate":"","devcanbuymark":"0","starttime":"09:00:00","webaddress":"","storetypefirst":"精品美食","bigpicpath":"upload/store_big324.jpg","permitpicpath":"upload/store_permit324.png","createtime":"2014-12-08 14:30:00","row":"2","storedesc":"11","smallpicpath":"upload/store_small324.png","isalliance":"","havestorage":"0","devlastouttime":"2020-01-08 10:46:29","storepreviou":"1858","takecaremanname":"","deposit":"0","endtime":"10:00:00","storelatitude":"30.639443","storetype":"3","storelongitude":"104.060853","storelevel":"0","repairmanname":"","storeid":"324","brandname":"天香池[15年]","temprfid":"200000001213","storephone":"15982831930","wxid":"mjh5299","showphonetext":"1","scrolltitle":"得民公司内部门店木木木木木木木林","devdebugstatus":"1","licensepicpath":"../upload/store_license0.png","onboardid":"342","areaid":"510107","repairmanphone":"","takecaremanphone":"","brandid":"125","activitypicpath":"upload/store_active324.png","storename":"成都得民科技云酒柜","isenablename":"可用","servicephone":"4007189899","foodstyle":"甜点饮品","barrelremain":"7646","storelegalperson":"","balancerate":"0","storenote":"11","signnumber":"2","isenabled":"1","storeaddr":"四川省成都市武侯区一环路南三段49号华诚大厦4楼"},{"isp2p":"","storeversion":"","orgcode":"000100020002000200010003","isrecommend":"","isrecom":"0","storeperson":"卢斌","hasdevice":"1","stockprice":"0","devid":"32401","barrelrfid":"100000012580","devoutno":"4","barrelid":"DMT2016021905","warninfo":"测试","usergetoutrate":"","devcanbuymark":"0","starttime":"09:00:00","webaddress":"","storetypefirst":"精品美食","bigpicpath":"upload/store_big324.jpg","permitpicpath":"upload/store_permit324.png","createtime":"2014-12-08 14:30:00","row":"3","storedesc":"11","smallpicpath":"upload/store_small324.png","isalliance":"","havestorage":"0","devlastouttime":"2020-01-08 10:46:29","storepreviou":"1858","takecaremanname":"","deposit":"0","endtime":"10:00:00","storelatitude":"30.639443","storetype":"3","storelongitude":"104.060853","storelevel":"0","repairmanname":"","storeid":"324","brandname":"泸州老窖永盛烧坊[30]","temprfid":"200000002288","storephone":"15982831930","wxid":"mjh5299","showphonetext":"1","scrolltitle":"得民公司内部门店木木木木木木木林","devdebugstatus":"1","licensepicpath":"../upload/store_license0.png","onboardid":"357","areaid":"510107","repairmanphone":"","takecaremanphone":"","brandid":"117","activitypicpath":"upload/store_active324.png","storename":"成都得民科技云酒柜","isenablename":"可用","servicephone":"4007189899","foodstyle":"甜点饮品","barrelremain":"13799","storelegalperson":"","balancerate":"0","storenote":"11","signnumber":"2","isenabled":"1","storeaddr":"四川省成都市武侯区一环路南三段49号华诚大厦4楼"},{"isp2p":"","storeversion":"","orgcode":"00010003000100010010","isrecommend":"","isrecom":"","storeperson":"1","hasdevice":"","stockprice":"75","devid":"34401","barrelrfid":"100000005975","devoutno":"4","barrelid":"DMT140825000378","warninfo":"","usergetoutrate":"0","devcanbuymark":"0","starttime":"","webaddress":"","storetypefirst":"","bigpicpath":"../upload/store_big344.jpg","permitpicpath":"","createtime":"2014-12-08 14:30:00","row":"4","storedesc":"","smallpicpath":"../upload/store_small344.jpg","isalliance":"","havestorage":"0","devlastouttime":"2019-03-23 13:20:36","storepreviou":"300","takecaremanname":"","deposit":"0","endtime":"","storelatitude":"25.074975000000002","storetype":"3","storelongitude":"113.76350500000001","storelevel":"0","repairmanname":"","storeid":"344","brandname":"沱牌生态[10年]浓香","temprfid":"200000014391","storephone":"13380732032","wxid":"","showphonetext":"1","scrolltitle":"","devdebugstatus":"0","licensepicpath":"../upload/store_license0.png","onboardid":"386","areaid":"440224","repairmanphone":"","takecaremanphone":"","brandid":"120","activitypicpath":"","storename":"韶关市仁化县大自然山庄","isenablename":"可用","servicephone":"0751-8860638","foodstyle":"中餐","barrelremain":"4790","storelegalperson":"","balancerate":"0","storenote":"","signnumber":"1","isenabled":"1","storeaddr":"广东省韶关市仁化县丹霞大道井水湾"},{"isp2p":"","storeversion":"","orgcode":"000100080003000200080021","isrecommend":"","isrecom":"0","storeperson":"李总","hasdevice":"","stockprice":"","devid":"89401","barrelrfid":"300000043438","devoutno":"1","barrelid":"300000043438","warninfo":"","usergetoutrate":"","devcanbuymark":"","starttime":"","webaddress":"","storetypefirst":"精品美食","bigpicpath":"","permitpicpath":"","createtime":"2015-10-10 08:44:45","row":"5","storedesc":"1","smallpicpath":"upload/store_small894.png","isalliance":"","havestorage":"0","devlastouttime":"2016-08-11 16:53:08","storepreviou":"946","takecaremanname":"","deposit":"0","endtime":"","storelatitude":"36.113259","storetype":"3","storelongitude":"120.459444","storelevel":"0","repairmanname":"","storeid":"894","brandname":"五粮液股份[纯粮陈窖]52°","temprfid":"300000043438","storephone":"13969832760","wxid":"","showphonetext":"1","scrolltitle":"","devdebugstatus":"0","licensepicpath":"../upload/store_license0.png","onboardid":"1913","areaid":"370212","repairmanphone":"","takecaremanphone":"","brandid":"112","activitypicpath":"","storename":"山东得民物联科技有限公司","isenablename":"可用","servicephone":"0532-85879099","foodstyle":"中餐","barrelremain":"250","storelegalperson":"","balancerate":"0","storenote":"1","signnumber":"1","isenabled":"1","storeaddr":"山东省青岛市崂山区海尔路178-2号2号楼2506"},{"isp2p":"","storeversion":"","orgcode":"000100080003000200080021","isrecommend":"","isrecom":"0","storeperson":"李总","hasdevice":"","stockprice":"","devid":"89401","barrelrfid":"100000007427","devoutno":"2","barrelid":"DMT140925002032","warninfo":"","usergetoutrate":"","devcanbuymark":"","starttime":"","webaddress":"","storetypefirst":"精品美食","bigpicpath":"","permitpicpath":"","createtime":"2015-10-10 08:44:45","row":"6","storedesc":"1","smallpicpath":"upload/store_small894.png","isalliance":"","havestorage":"0","devlastouttime":"2016-08-11 16:53:08","storepreviou":"946","takecaremanname":"","deposit":"0","endtime":"","storelatitude":"36.113259","storetype":"3","storelongitude":"120.459444","storelevel":"0","repairmanname":"","storeid":"894","brandname":"泸州老窖永盛烧坊[10]","temprfid":"200000035386","storephone":"13969832760","wxid":"","showphonetext":"1","scrolltitle":"","devdebugstatus":"0","licensepicpath":"../upload/store_license0.png","onboardid":"1914","areaid":"370212","repairmanphone":"","takecaremanphone":"","brandid":"116","activitypicpath":"","storename":"山东得民物联科技有限公司","isenablename":"可用","servicephone":"0532-85879099","foodstyle":"中餐","barrelremain":"1360","storelegalperson":"","balancerate":"0","storenote":"1","signnumber":"1","isenabled":"1","storeaddr":"山东省青岛市崂山区海尔路178-2号2号楼2506"},{"isp2p":"","storeversion":"","orgcode":"000100080003000200080021","isrecommend":"","isrecom":"0","storeperson":"李总","hasdevice":"","stockprice":"","devid":"89401","barrelrfid":"100000002986","devoutno":"3","barrelid":"DMT140825004780","warninfo":"","usergetoutrate":"","devcanbuymark":"","starttime":"","webaddress":"","storetypefirst":"精品美食","bigpicpath":"","permitpicpath":"","createtime":"2015-10-10 08:44:45","row":"7","storedesc":"1","smallpicpath":"upload/store_small894.png","isalliance":"","havestorage":"0","devlastouttime":"2016-08-11 16:53:08","storepreviou":"946","takecaremanname":"","deposit":"0","endtime":"","storelatitude":"36.113259","storetype":"3","storelongitude":"120.459444","storelevel":"0","repairmanname":"","storeid":"894","brandname":"泸州老窖永盛烧坊[20]","temprfid":"200000007402","storephone":"13969832760","wxid":"","showphonetext":"1","scrolltitle":"","devdebugstatus":"0","licensepicpath":"../upload/store_license0.png","onboardid":"1915","areaid":"370212","repairmanphone":"","takecaremanphone":"","brandid":"115","activitypicpath":"","storename":"山东得民物联科技有限公司","isenablename":"可用","servicephone":"0532-85879099","foodstyle":"中餐","barrelremain":"859","storelegalperson":"","balancerate":"0","storenote":"1","signnumber":"1","isenabled":"1","storeaddr":"山东省青岛市崂山区海尔路178-2号2号楼2506"},{"isp2p":"","storeversion":"","orgcode":"000100080003000200080021","isrecommend":"","isrecom":"0","storeperson":"李总","hasdevice":"","stockprice":"","devid":"89401","barrelrfid":"100000009389","devoutno":"4","barrelid":"DMT140825009991","warninfo":"","usergetoutrate":"","devcanbuymark":"","starttime":"","webaddress":"","storetypefirst":"精品美食","bigpicpath":"","permitpicpath":"","createtime":"2015-10-10 08:44:45","row":"8","storedesc":"1","smallpicpath":"upload/store_small894.png","isalliance":"","havestorage":"0","devlastouttime":"2016-08-11 16:53:08","storepreviou":"946","takecaremanname":"","deposit":"0","endtime":"","storelatitude":"36.113259","storetype":"3","storelongitude":"120.459444","storelevel":"0","repairmanname":"","storeid":"894","brandname":"沱牌生态[10年]浓香","temprfid":"200000010716","storephone":"13969832760","wxid":"","showphonetext":"1","scrolltitle":"","devdebugstatus":"0","licensepicpath":"../upload/store_license0.png","onboardid":"1916","areaid":"370212","repairmanphone":"","takecaremanphone":"","brandid":"120","activitypicpath":"","storename":"山东得民物联科技有限公司","isenablename":"可用","servicephone":"0532-85879099","foodstyle":"中餐","barrelremain":"370","storelegalperson":"","balancerate":"0","storenote":"1","signnumber":"1","isenabled":"1","storeaddr":"山东省青岛市崂山区海尔路178-2号2号楼2506"},{"isp2p":"","storeversion":"","orgcode":"000100080003000200080021","isrecommend":"","isrecom":"0","storeperson":"李总","hasdevice":"","stockprice":"","devid":"89401","barrelrfid":"100000006407","devoutno":"5","barrelid":"DMT140825009426","warninfo":"","usergetoutrate":"","devcanbuymark":"","starttime":"","webaddress":"","storetypefirst":"精品美食","bigpicpath":"","permitpicpath":"","createtime":"2015-10-10 08:44:45","row":"9","storedesc":"1","smallpicpath":"upload/store_small894.png","isalliance":"","havestorage":"0","devlastouttime":"2016-08-11 16:53:08","storepreviou":"946","takecaremanname":"","deposit":"0","endtime":"","storelatitude":"36.113259","storetype":"3","storelongitude":"120.459444","storelevel":"0","repairmanname":"","storeid":"894","brandname":"天香池[15年]","temprfid":"200000014741","storephone":"13969832760","wxid":"","showphonetext":"1","scrolltitle":"","devdebugstatus":"0","licensepicpath":"../upload/store_license0.png","onboardid":"1917","areaid":"370212","repairmanphone":"","takecaremanphone":"","brandid":"125","activitypicpath":"","storename":"山东得民物联科技有限公司","isenablename":"可用","servicephone":"0532-85879099","foodstyle":"中餐","barrelremain":"545","storelegalperson":"","balancerate":"0","storenote":"1","signnumber":"1","isenabled":"1","storeaddr":"山东省青岛市崂山区海尔路178-2号2号楼2506"},{"isp2p":"","storeversion":"","orgcode":"000100080003000200080021","isrecommend":"","isrecom":"0","storeperson":"李总","hasdevice":"","stockprice":"","devid":"89401","barrelrfid":"300000038926","devoutno":"6","barrelid":"300000038926","warninfo":"","usergetoutrate":"","devcanbuymark":"","starttime":"","webaddress":"","storetypefirst":"精品美食","bigpicpath":"","permitpicpath":"","createtime":"2015-10-10 08:44:45","row":"10","storedesc":"1","smallpicpath":"upload/store_small894.png","isalliance":"","havestorage":"0","devlastouttime":"2016-08-11 16:53:08","storepreviou":"946","takecaremanname":"","deposit":"0","endtime":"","storelatitude":"36.113259","storetype":"3","storelongitude":"120.459444","storelevel":"0","repairmanname":"","storeid":"894","brandname":"贵州茅台.华茅酒[得民精选]","temprfid":"300000038926","storephone":"13969832760","wxid":"","showphonetext":"1","scrolltitle":"","devdebugstatus":"0","licensepicpath":"../upload/store_license0.png","onboardid":"1921","areaid":"370212","repairmanphone":"","takecaremanphone":"","brandid":"174","activitypicpath":"","storename":"山东得民物联科技有限公司","isenablename":"可用","servicephone":"0532-85879099","foodstyle":"中餐","barrelremain":"50","storelegalperson":"","balancerate":"0","storenote":"1","signnumber":"1","isenabled":"1","storeaddr":"山东省青岛市崂山区海尔路178-2号2号楼2506"},{"isp2p":"","storeversion":"201804","orgcode":"000100070003000200020026","isrecommend":"","isrecom":"0","storeperson":"董月琴","hasdevice":"","stockprice":"","devid":"65201","barrelrfid":"100000004357","devoutno":"2","barrelid":"DMT140825003581","warninfo":"","usergetoutrate":"","devcanbuymark":"","starttime":"","webaddress":"","storetypefirst":"精品美食","bigpicpath":"../upload/store_big652.jpg","permitpicpath":"","createtime":"2015-04-01 14:31:32","row":"11","storedesc":"1","smallpicpath":"../upload/store_small652.jpg","isalliance":"","havestorage":"0","devlastouttime":"2019-05-21 12:40:54","storepreviou":"1695","takecaremanname":"","deposit":"0","endtime":"","storelatitude":"34.572868","storetype":"3","storelongitude":"112.454851","storelevel":"0","repairmanname":"","storeid":"652","brandname":"泸州老窖永盛烧坊[20]","temprfid":"200000006298","storephone":"13703795681","wxid":"","showphonetext":"1","scrolltitle":"","devdebugstatus":"1","licensepicpath":"../upload/store_license0.png","onboardid":"2218","areaid":"410307","repairmanphone":"","takecaremanphone":"","brandid":"115","activitypicpath":"","storename":"洛阳梦桃源温泉度假村","isenablename":"可用","servicephone":"0379-65789999","foodstyle":"中餐","barrelremain":"3599","storelegalperson":"","balancerate":"0","storenote":"1","signnumber":"1","isenabled":"1","storeaddr":"河南省洛阳市洛龙区王城大道南端"},{"isp2p":"","storeversion":"201804","orgcode":"000100070003000200020026","isrecommend":"","isrecom":"0","storeperson":"董月琴","hasdevice":"","stockprice":"","devid":"65201","barrelrfid":"100000006351","devoutno":"6","barrelid":"DMT140825007132","warninfo":"","usergetoutrate":"","devcanbuymark":"","starttime":"","webaddress":"","storetypefirst":"精品美食","bigpicpath":"../upload/store_big652.jpg","permitpicpath":"","createtime":"2015-04-01 14:31:32","row":"12","storedesc":"1","smallpicpath":"../upload/store_small652.jpg","isalliance":"","havestorage":"0","devlastouttime":"2019-05-21 12:40:54","storepreviou":"1695","takecaremanname":"","deposit":"0","endtime":"","storelatitude":"34.572868","storetype":"3","storelongitude":"112.454851","storelevel":"0","repairmanname":"","storeid":"652","brandname":"沱牌生态[6年]","temprfid":"200000011861","storephone":"13703795681","wxid":"","showphonetext":"1","scrolltitle":"","devdebugstatus":"1","licensepicpath":"../upload/store_license0.png","onboardid":"2219","areaid":"410307","repairmanphone":"","takecaremanphone":"","brandid":"118","activitypicpath":"","storename":"洛阳梦桃源温泉度假村","isenablename":"可用","servicephone":"0379-65789999","foodstyle":"中餐","barrelremain":"7130","storelegalperson":"","balancerate":"0","storenote":"1","signnumber":"1","isenabled":"1","storeaddr":"河南省洛阳市洛龙区王城大道南端"}],"res.page":[{"RecordsCount":621,"hasNextPage":true,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12,"TotalPageCount":52}],"res.size":"621","returnview":"@json"}
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
  .app-icon {
    width: 46px;
    height: 46px;
  }
</style>
