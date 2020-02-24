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
        <el-select v-model="requestParams.devOutNo" placeholder="请选择" style="width: 90px">
          <el-option
            v-for="item in devOutNoOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <span>剩余酒量：</span>
        <el-input v-model="requestParams.morethan" clearable placeholder="请输入内容"></el-input>至
        <el-input v-model="requestParams.lessthan" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>门店是否可用：</span>
        <el-select v-model="requestParams.storeStatus" placeholder="请选择" style="width: 100px">
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
        prop="storeid"
        label="门店编号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="storename"
        label="门店名称">
      </el-table-column>
      <el-table-column
        prop="barrelid"
        label="酒桶编号">
      </el-table-column>
      <el-table-column
        prop="brandname"
        label="品牌">
      </el-table-column>
      <el-table-column
        prop="devid"
        label="终端"
        width="60">
      </el-table-column>
      <el-table-column
        prop="devoutno"
        label="出酒口"
        width="70">
      </el-table-column>
      <el-table-column
        prop="barrelremain"
        label="剩余酒量"
        width="90">
      </el-table-column>
      <el-table-column
        prop="barrelrfid"
        label="永久RFID">
      </el-table-column>
      <el-table-column
        prop="temprfid"
        label="封口RFID">
      </el-table-column>
      <el-table-column
        prop="isenablename"
        label="是否可用"
        width="80">
      </el-table-column>
      <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="dialogVisible=true">红冲</el-button>
          <el-button type="text" size="small" @click="dialogVisible=true">编辑</el-button>
          <el-button type="text" size="small" @click="dialogVisible=true">删除</el-button>
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

export default {
  name: 'BarrelOnlineList',
  components: {
    PageChange,
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        storeName: '',
        barrelId: '',
        devOutNo: '',
        storeStatus: '',
        morethan: '',
        lessthan: '',
        pageNum: 1,
        pageSize: 10
      },
      dialogVisible: false,
      devOutNoOptions: [{
        value: '',
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
      storeStatusOptions: [{
        value: '',
        label: '全部'
      }, {
        value: '1',
        label: '可用'
      }, {
        value: '0',
        label: '不可用'
      }],
      jsonName: {"jvcpagename":"pub_onboardbarrel","jvcoldpageName":"pub_onboardbarrel","cmd":"query","returnvalue":"1","res.recordsperpage":"12","RecordsPerPage":"12","res":[{"devrunstatus":"0","storelevel":"0","takecaremanname":"杨朝芬","storenote":"成都庄子村川菜酒楼","smallpicpath":"../upload/store_small248.jpg","repairmanphone":"","starttime":"","devoutno":"3","directorphone":"","brandid":"120","usergetoutrate":"","storephone":"13981741805","devlanip":"","storeperson":"植良琴","havestorage":"0","devgetoutnum":"28365","factoryid":"5","takecaremanphone":"13880958590","createtime":"2014-09-28 17:34:28","temprfid":"200000010637","onboardid":"108","storelongitude":"104.0715375","devtype":"2","barrelremain":"11850","storelegalperson":"","storedesc":"<p class=\"MsoNormal\">\n\t<span style=\"line-height:1.5;\">&nbsp; &nbsp; &nbsp;</span><span style=\"font-size:14px;\"> 庄子村川菜酒楼在成都有四家店，我公司成立于2008年，规模1500平方，在成都拥有四家分店。</span>\n</p>\n<p class=\"MsoNormal\">\n\t<span style=\"font-size:14px;\">&nbsp; &nbsp; &nbsp;&nbsp;公司位于人民南路四段倪家桥路2号，公司装修古朴典雅拥有20个贵宾包间&nbsp;大厅可容纳300人同时进餐，方便停车。</span>\n</p>\n<p class=\"MsoNormal\">\n\t<span style=\"font-size:14px;\">&nbsp; &nbsp; &nbsp; 酒楼以民俗风味的大众川菜为特色，传统川菜，同时经营的庄子村烤炉鱼，烤法独特，味浓味香，有各种味型，各类干锅，卤菜，是您聚会，用餐的理想选择。</span>\n</p>\n<p>\n\t<span style=\"font-size:14px;\">&nbsp; &nbsp; &nbsp; 公司拥有一支高素质的管理团队，和训练有数的员工队伍，以标准化的管理，&nbsp;特色的菜品，亲情化的服务让客人满意，全体员工恭候您的光临！</span>&nbsp;\n</p>\n<p style=\"text-align:center;\">\n\t<strong style=\"line-height:1.5;\">&nbsp;</strong>\n</p>","balancerate":"0","activitypicpath":"","showphonetext":"1","devmodel":"V1.0","licensepicpath":"../upload/store_license0.jpg","devlastouttime":"2018-05-12 18:45:35","barrelid":"DMT140825002581","makedate":"2014-12-20","signnumber":"1","bigpicpath":"../upload/store_big248.jpg","devcustomid":"J1021062231213T11013","deposit":"0","opennum":"","storepreviou":"2067","remark":"","devlastoutnumber":"250","devid":"24801","storetype":"3","devclearnum":"","storeaddr":"倪家桥路2号附44号","period":"1","storename":"成都庄子村川菜酒楼","areaid":"510107","devinstalltime":"","devimpalenum":"","devdebugstatus":"1","isrecom":"1","storelatitude":"30.633576","isenablename":"可用","barrelrfid":"100000009361","brandname":"沱牌生态[10年]浓香","endtime":"","servicephone":"028-85579595","wxid":"","row":"1","permitpicpath":"","devlastreport":"2018-05-16 10:15:53","devbarcode":"86e512ebebaede7a","repairmanname":"","scrolltitle":"","storeid":"248","storetypefirst":"","orgcode":"0001000200020002000100020014","foodstyle":"中餐","directorname":"","devcanbuymark":"0","storeversion":"","webaddress":"","isenabled":"1","stockprice":"","isp2p":""},{"devrunstatus":"0","storelevel":"0","takecaremanname":"杨朝芬","storenote":"成都庄子村川菜酒楼","smallpicpath":"../upload/store_small248.jpg","repairmanphone":"","starttime":"","devoutno":"2","directorphone":"","brandid":"117","usergetoutrate":"","storephone":"13981741805","devlanip":"","storeperson":"植良琴","havestorage":"0","devgetoutnum":"28365","factoryid":"5","takecaremanphone":"13880958590","createtime":"2014-09-28 17:34:28","temprfid":"200000008133","onboardid":"109","storelongitude":"104.0715375","devtype":"2","barrelremain":"13600","storelegalperson":"","storedesc":"<p class=\"MsoNormal\">\n\t<span style=\"line-height:1.5;\">&nbsp; &nbsp; &nbsp;</span><span style=\"font-size:14px;\"> 庄子村川菜酒楼在成都有四家店，我公司成立于2008年，规模1500平方，在成都拥有四家分店。</span>\n</p>\n<p class=\"MsoNormal\">\n\t<span style=\"font-size:14px;\">&nbsp; &nbsp; &nbsp;&nbsp;公司位于人民南路四段倪家桥路2号，公司装修古朴典雅拥有20个贵宾包间&nbsp;大厅可容纳300人同时进餐，方便停车。</span>\n</p>\n<p class=\"MsoNormal\">\n\t<span style=\"font-size:14px;\">&nbsp; &nbsp; &nbsp; 酒楼以民俗风味的大众川菜为特色，传统川菜，同时经营的庄子村烤炉鱼，烤法独特，味浓味香，有各种味型，各类干锅，卤菜，是您聚会，用餐的理想选择。</span>\n</p>\n<p>\n\t<span style=\"font-size:14px;\">&nbsp; &nbsp; &nbsp; 公司拥有一支高素质的管理团队，和训练有数的员工队伍，以标准化的管理，&nbsp;特色的菜品，亲情化的服务让客人满意，全体员工恭候您的光临！</span>&nbsp;\n</p>\n<p style=\"text-align:center;\">\n\t<strong style=\"line-height:1.5;\">&nbsp;</strong>\n</p>","balancerate":"0","activitypicpath":"","showphonetext":"1","devmodel":"V1.0","licensepicpath":"../upload/store_license0.jpg","devlastouttime":"2018-05-12 18:45:35","barrelid":"DMT140925003996","makedate":"2014-12-20","signnumber":"1","bigpicpath":"../upload/store_big248.jpg","devcustomid":"J1021062231213T11013","deposit":"0","opennum":"","storepreviou":"2067","remark":"","devlastoutnumber":"250","devid":"24801","storetype":"3","devclearnum":"","storeaddr":"倪家桥路2号附44号","period":"1","storename":"成都庄子村川菜酒楼","areaid":"510107","devinstalltime":"","devimpalenum":"","devdebugstatus":"1","isrecom":"1","storelatitude":"30.633576","isenablename":"可用","barrelrfid":"100000012533","brandname":"泸州老窖永盛烧坊[30]","endtime":"","servicephone":"028-85579595","wxid":"","row":"2","permitpicpath":"","devlastreport":"2018-05-16 10:15:53","devbarcode":"86e512ebebaede7a","repairmanname":"","scrolltitle":"","storeid":"248","storetypefirst":"","orgcode":"0001000200020002000100020014","foodstyle":"中餐","directorname":"","devcanbuymark":"0","storeversion":"","webaddress":"","isenabled":"1","stockprice":"","isp2p":""},{"devrunstatus":"0","storelevel":"0","takecaremanname":"杨朝芬","storenote":"成都庄子村川菜酒楼","smallpicpath":"../upload/store_small248.jpg","repairmanphone":"","starttime":"","devoutno":"4","directorphone":"","brandid":"123","usergetoutrate":"","storephone":"13981741805","devlanip":"","storeperson":"植良琴","havestorage":"0","devgetoutnum":"28365","factoryid":"5","takecaremanphone":"13880958590","createtime":"2014-09-28 17:34:28","temprfid":"300000065191","onboardid":"110","storelongitude":"104.0715375","devtype":"2","barrelremain":"7200","storelegalperson":"","storedesc":"<p class=\"MsoNormal\">\n\t<span style=\"line-height:1.5;\">&nbsp; &nbsp; &nbsp;</span><span style=\"font-size:14px;\"> 庄子村川菜酒楼在成都有四家店，我公司成立于2008年，规模1500平方，在成都拥有四家分店。</span>\n</p>\n<p class=\"MsoNormal\">\n\t<span style=\"font-size:14px;\">&nbsp; &nbsp; &nbsp;&nbsp;公司位于人民南路四段倪家桥路2号，公司装修古朴典雅拥有20个贵宾包间&nbsp;大厅可容纳300人同时进餐，方便停车。</span>\n</p>\n<p class=\"MsoNormal\">\n\t<span style=\"font-size:14px;\">&nbsp; &nbsp; &nbsp; 酒楼以民俗风味的大众川菜为特色，传统川菜，同时经营的庄子村烤炉鱼，烤法独特，味浓味香，有各种味型，各类干锅，卤菜，是您聚会，用餐的理想选择。</span>\n</p>\n<p>\n\t<span style=\"font-size:14px;\">&nbsp; &nbsp; &nbsp; 公司拥有一支高素质的管理团队，和训练有数的员工队伍，以标准化的管理，&nbsp;特色的菜品，亲情化的服务让客人满意，全体员工恭候您的光临！</span>&nbsp;\n</p>\n<p style=\"text-align:center;\">\n\t<strong style=\"line-height:1.5;\">&nbsp;</strong>\n</p>","balancerate":"0","activitypicpath":"","showphonetext":"1","devmodel":"V1.0","licensepicpath":"../upload/store_license0.jpg","devlastouttime":"2018-05-12 18:45:35","barrelid":"300000065191","makedate":"2014-12-20","signnumber":"1","bigpicpath":"../upload/store_big248.jpg","devcustomid":"J1021062231213T11013","deposit":"0","opennum":"","storepreviou":"2067","remark":"","devlastoutnumber":"250","devid":"24801","storetype":"3","devclearnum":"","storeaddr":"倪家桥路2号附44号","period":"1","storename":"成都庄子村川菜酒楼","areaid":"510107","devinstalltime":"","devimpalenum":"","devdebugstatus":"1","isrecom":"1","storelatitude":"30.633576","isenablename":"可用","barrelrfid":"300000065191","brandname":"沱牌生态[15年]","endtime":"","servicephone":"028-85579595","wxid":"","row":"3","permitpicpath":"","devlastreport":"2018-05-16 10:15:53","devbarcode":"86e512ebebaede7a","repairmanname":"","scrolltitle":"","storeid":"248","storetypefirst":"","orgcode":"0001000200020002000100020014","foodstyle":"中餐","directorname":"","devcanbuymark":"0","storeversion":"","webaddress":"","isenabled":"1","stockprice":"","isp2p":""},{"devrunstatus":"0","storelevel":"0","takecaremanname":"杨朝芬","storenote":"成都庄子村川菜酒楼","smallpicpath":"../upload/store_small248.jpg","repairmanphone":"","starttime":"","devoutno":"5","directorphone":"","brandid":"112","usergetoutrate":"","storephone":"13981741805","devlanip":"","storeperson":"植良琴","havestorage":"0","devgetoutnum":"28365","factoryid":"5","takecaremanphone":"13880958590","createtime":"2014-09-28 17:34:28","temprfid":"300000065196","onboardid":"111","storelongitude":"104.0715375","devtype":"2","barrelremain":"2700","storelegalperson":"","storedesc":"<p class=\"MsoNormal\">\n\t<span style=\"line-height:1.5;\">&nbsp; &nbsp; &nbsp;</span><span style=\"font-size:14px;\"> 庄子村川菜酒楼在成都有四家店，我公司成立于2008年，规模1500平方，在成都拥有四家分店。</span>\n</p>\n<p class=\"MsoNormal\">\n\t<span style=\"font-size:14px;\">&nbsp; &nbsp; &nbsp;&nbsp;公司位于人民南路四段倪家桥路2号，公司装修古朴典雅拥有20个贵宾包间&nbsp;大厅可容纳300人同时进餐，方便停车。</span>\n</p>\n<p class=\"MsoNormal\">\n\t<span style=\"font-size:14px;\">&nbsp; &nbsp; &nbsp; 酒楼以民俗风味的大众川菜为特色，传统川菜，同时经营的庄子村烤炉鱼，烤法独特，味浓味香，有各种味型，各类干锅，卤菜，是您聚会，用餐的理想选择。</span>\n</p>\n<p>\n\t<span style=\"font-size:14px;\">&nbsp; &nbsp; &nbsp; 公司拥有一支高素质的管理团队，和训练有数的员工队伍，以标准化的管理，&nbsp;特色的菜品，亲情化的服务让客人满意，全体员工恭候您的光临！</span>&nbsp;\n</p>\n<p style=\"text-align:center;\">\n\t<strong style=\"line-height:1.5;\">&nbsp;</strong>\n</p>","balancerate":"0","activitypicpath":"","showphonetext":"1","devmodel":"V1.0","licensepicpath":"../upload/store_license0.jpg","devlastouttime":"2018-05-12 18:45:35","barrelid":"300000065196","makedate":"2014-12-20","signnumber":"1","bigpicpath":"../upload/store_big248.jpg","devcustomid":"J1021062231213T11013","deposit":"0","opennum":"","storepreviou":"2067","remark":"","devlastoutnumber":"250","devid":"24801","storetype":"3","devclearnum":"","storeaddr":"倪家桥路2号附44号","period":"1","storename":"成都庄子村川菜酒楼","areaid":"510107","devinstalltime":"","devimpalenum":"","devdebugstatus":"1","isrecom":"1","storelatitude":"30.633576","isenablename":"可用","barrelrfid":"300000065196","brandname":"五粮液股份[纯粮陈窖]52°","endtime":"","servicephone":"028-85579595","wxid":"","row":"4","permitpicpath":"","devlastreport":"2018-05-16 10:15:53","devbarcode":"86e512ebebaede7a","repairmanname":"","scrolltitle":"","storeid":"248","storetypefirst":"","orgcode":"0001000200020002000100020014","foodstyle":"中餐","directorname":"","devcanbuymark":"0","storeversion":"","webaddress":"","isenabled":"1","stockprice":"","isp2p":""},{"devrunstatus":"0","storelevel":"0","takecaremanname":"杨朝芬","storenote":"成都庄子村川菜酒楼","smallpicpath":"../upload/store_small248.jpg","repairmanphone":"","starttime":"","devoutno":"6","directorphone":"","brandid":"125","usergetoutrate":"","storephone":"13981741805","devlanip":"","storeperson":"植良琴","havestorage":"0","devgetoutnum":"28365","factoryid":"5","takecaremanphone":"13880958590","createtime":"2014-09-28 17:34:28","temprfid":"200000051423","onboardid":"112","storelongitude":"104.0715375","devtype":"2","barrelremain":"10190","storelegalperson":"","storedesc":"<p class=\"MsoNormal\">\n\t<span style=\"line-height:1.5;\">&nbsp; &nbsp; &nbsp;</span><span style=\"font-size:14px;\"> 庄子村川菜酒楼在成都有四家店，我公司成立于2008年，规模1500平方，在成都拥有四家分店。</span>\n</p>\n<p class=\"MsoNormal\">\n\t<span style=\"font-size:14px;\">&nbsp; &nbsp; &nbsp;&nbsp;公司位于人民南路四段倪家桥路2号，公司装修古朴典雅拥有20个贵宾包间&nbsp;大厅可容纳300人同时进餐，方便停车。</span>\n</p>\n<p class=\"MsoNormal\">\n\t<span style=\"font-size:14px;\">&nbsp; &nbsp; &nbsp; 酒楼以民俗风味的大众川菜为特色，传统川菜，同时经营的庄子村烤炉鱼，烤法独特，味浓味香，有各种味型，各类干锅，卤菜，是您聚会，用餐的理想选择。</span>\n</p>\n<p>\n\t<span style=\"font-size:14px;\">&nbsp; &nbsp; &nbsp; 公司拥有一支高素质的管理团队，和训练有数的员工队伍，以标准化的管理，&nbsp;特色的菜品，亲情化的服务让客人满意，全体员工恭候您的光临！</span>&nbsp;\n</p>\n<p style=\"text-align:center;\">\n\t<strong style=\"line-height:1.5;\">&nbsp;</strong>\n</p>","balancerate":"0","activitypicpath":"","showphonetext":"1","devmodel":"V1.0","licensepicpath":"../upload/store_license0.jpg","devlastouttime":"2018-05-12 18:45:35","barrelid":"DMR140925003754","makedate":"2014-12-20","signnumber":"1","bigpicpath":"../upload/store_big248.jpg","devcustomid":"J1021062231213T11013","deposit":"0","opennum":"","storepreviou":"2067","remark":"","devlastoutnumber":"250","devid":"24801","storetype":"3","devclearnum":"","storeaddr":"倪家桥路2号附44号","period":"1","storename":"成都庄子村川菜酒楼","areaid":"510107","devinstalltime":"","devimpalenum":"","devdebugstatus":"1","isrecom":"1","storelatitude":"30.633576","isenablename":"可用","barrelrfid":"100000012588","brandname":"天香池[15年]","endtime":"","servicephone":"028-85579595","wxid":"","row":"5","permitpicpath":"","devlastreport":"2018-05-16 10:15:53","devbarcode":"86e512ebebaede7a","repairmanname":"","scrolltitle":"","storeid":"248","storetypefirst":"","orgcode":"0001000200020002000100020014","foodstyle":"中餐","directorname":"","devcanbuymark":"0","storeversion":"","webaddress":"","isenabled":"1","stockprice":"","isp2p":""},{"devrunstatus":"0","storelevel":"0","takecaremanname":"","storenote":"见道","smallpicpath":"../upload/store_small281.jpg","repairmanphone":"","starttime":"","devoutno":"2","directorphone":"","brandid":"118","usergetoutrate":"","storephone":"13008148488","devlanip":"","storeperson":"邓薇薇","havestorage":"0","devgetoutnum":"28289","factoryid":"1","takecaremanphone":"","createtime":"2014-10-22 16:57:52","temprfid":"200000005723","onboardid":"153","storelongitude":"104.06","devtype":"2","barrelremain":"14550","storelegalperson":"","storedesc":"11","balancerate":"0","activitypicpath":"","showphonetext":"1","devmodel":"V1.0","licensepicpath":"../upload/store_license0.jpg","devlastouttime":"2014-12-28 00:00:51","barrelid":"DMT140925000281","makedate":"2014-11-08","signnumber":"1","bigpicpath":"../upload/store_big281.jpg","devcustomid":"0101110000097","deposit":"0","opennum":"","storepreviou":"278","remark":"","devlastoutnumber":"100","devid":"28101","storetype":"3","devclearnum":"","storeaddr":"四川省成都市青羊区泡桐树14号附9号(86127744)","period":"1","storename":"成都见道","areaid":"510105","devinstalltime":"","devimpalenum":"","devdebugstatus":"1","isrecom":"0","storelatitude":"30.67","isenablename":"不可用","barrelrfid":"100000002883","brandname":"沱牌生态[6年]","endtime":"","servicephone":"13980807414","wxid":"","row":"6","permitpicpath":"","devlastreport":"2015-01-24 15:08:50","devbarcode":"104247dc563b98e6","repairmanname":"","scrolltitle":"","storeid":"281","storetypefirst":"","orgcode":"000100020002000200050111","foodstyle":"中餐","directorname":"","devcanbuymark":"0","storeversion":"","webaddress":"","isenabled":"0","stockprice":"0","isp2p":""},{"devrunstatus":"0","storelevel":"0","takecaremanname":"","storenote":"见道","smallpicpath":"../upload/store_small281.jpg","repairmanphone":"","starttime":"","devoutno":"4","directorphone":"","brandid":"121","usergetoutrate":"","storephone":"13008148488","devlanip":"","storeperson":"邓薇薇","havestorage":"0","devgetoutnum":"28289","factoryid":"1","takecaremanphone":"","createtime":"2014-10-22 16:57:52","temprfid":"200000005722","onboardid":"154","storelongitude":"104.06","devtype":"2","barrelremain":"14450","storelegalperson":"","storedesc":"11","balancerate":"0","activitypicpath":"","showphonetext":"1","devmodel":"V1.0","licensepicpath":"../upload/store_license0.jpg","devlastouttime":"2014-12-28 00:00:51","barrelid":"DMT140925000401","makedate":"2014-11-08","signnumber":"1","bigpicpath":"../upload/store_big281.jpg","devcustomid":"0101110000097","deposit":"0","opennum":"","storepreviou":"278","remark":"","devlastoutnumber":"100","devid":"28101","storetype":"3","devclearnum":"","storeaddr":"四川省成都市青羊区泡桐树14号附9号(86127744)","period":"1","storename":"成都见道","areaid":"510105","devinstalltime":"","devimpalenum":"","devdebugstatus":"1","isrecom":"0","storelatitude":"30.67","isenablename":"不可用","barrelrfid":"100000002882","brandname":"沱牌生态[10年]酱香","endtime":"","servicephone":"13980807414","wxid":"","row":"7","permitpicpath":"","devlastreport":"2015-01-24 15:08:50","devbarcode":"104247dc563b98e6","repairmanname":"","scrolltitle":"","storeid":"281","storetypefirst":"","orgcode":"000100020002000200050111","foodstyle":"中餐","directorname":"","devcanbuymark":"0","storeversion":"","webaddress":"","isenabled":"0","stockprice":"0","isp2p":""},{"devrunstatus":"0","storelevel":"0","takecaremanname":"","storenote":"见道","smallpicpath":"../upload/store_small281.jpg","repairmanphone":"","starttime":"","devoutno":"3","directorphone":"","brandid":"120","usergetoutrate":"","storephone":"13008148488","devlanip":"","storeperson":"邓薇薇","havestorage":"0","devgetoutnum":"28289","factoryid":"1","takecaremanphone":"","createtime":"2014-10-22 16:57:52","temprfid":"200000005724","onboardid":"155","storelongitude":"104.06","devtype":"2","barrelremain":"13750","storelegalperson":"","storedesc":"11","balancerate":"0","activitypicpath":"","showphonetext":"1","devmodel":"V1.0","licensepicpath":"../upload/store_license0.jpg","devlastouttime":"2014-12-28 00:00:51","barrelid":"DMT140925000348","makedate":"2014-11-08","signnumber":"1","bigpicpath":"../upload/store_big281.jpg","devcustomid":"0101110000097","deposit":"0","opennum":"","storepreviou":"278","remark":"","devlastoutnumber":"100","devid":"28101","storetype":"3","devclearnum":"","storeaddr":"四川省成都市青羊区泡桐树14号附9号(86127744)","period":"1","storename":"成都见道","areaid":"510105","devinstalltime":"","devimpalenum":"","devdebugstatus":"1","isrecom":"0","storelatitude":"30.67","isenablename":"不可用","barrelrfid":"100000002884","brandname":"沱牌生态[10年]浓香","endtime":"","servicephone":"13980807414","wxid":"","row":"8","permitpicpath":"","devlastreport":"2015-01-24 15:08:50","devbarcode":"104247dc563b98e6","repairmanname":"","scrolltitle":"","storeid":"281","storetypefirst":"","orgcode":"000100020002000200050111","foodstyle":"中餐","directorname":"","devcanbuymark":"0","storeversion":"","webaddress":"","isenabled":"0","stockprice":"0","isp2p":""},{"devrunstatus":"0","storelevel":"0","takecaremanname":"","storenote":"海棠轩石斑鱼","smallpicpath":"../upload/store_small279.jpg","repairmanphone":"","starttime":"","devoutno":"3","directorphone":"","brandid":"120","usergetoutrate":"","storephone":"13699097058","devlanip":"","storeperson":"陶总","havestorage":"0","devgetoutnum":"27470","factoryid":"1","takecaremanphone":"","createtime":"2014-10-22 16:09:15","temprfid":"200000005726","onboardid":"156","storelongitude":"104.031065","devtype":"2","barrelremain":"8242","storelegalperson":"","storedesc":"<p>\n\t&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;海棠轩酒楼是一家主营粤菜的海鲜大酒楼，公司现已发展成为集餐饮、休闲为一体的综合机构。\n</p>\n<p>\n\t专业的服务素质、温欣的笑容、华丽的装饰，把顾客的满意作为公司发展的方向，给顾客带来愉快的心灵体验与高品味享受。\n</p>\n<p>\n\t&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong> 本酒店菜品四大特色：</strong> \n</p>\n<p>\n\t&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1. 讲究时令时鲜\n</p>\n<p>\n\t&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2. 讲究选料做工，饮食以“生活鲜嫩”、“宁缺不代”为选料原则\n</p>\n<p>\n\t&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 3. 讲究色香味形。色泽美、香味美、味道美、造型美四者融为和一体\n</p>\n<p>\n\t&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4. 讲究花色品种。\n</p>\n<p>\n\t&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>联系电话</strong>：028-89994988\n</p>\n<p>\n\t<span style=\"font-size:16px;color:#E53333;\"><strong>推荐菜品</strong></span> \n</p>\n<p style=\"text-align:center;\">\n\t<span style=\"font-size:16px;color:#E53333;\"><strong>白江团<br />\n</strong></span> \n</p>\n<p style=\"text-align:center;\">\n\t<img src=\"http://119.254.95.109:8083/f?f=/portal/upload/1cfcd0b5-416a-4dcc-9f6e-cfaec72b6530.jpg\" alt=\"\" /> \n</p>\n<p style=\"text-align:center;\">\n\t<span style=\"font-size:16px;color:#E53333;\"><strong>湛江白切鸡</strong></span> \n</p>\n<p style=\"text-align:center;\">\n\t<img src=\"http://119.254.95.109:8083/f?f=/portal/upload/e52a0c73-56ed-4ea3-9c20-d10312b5d28c.JPG\" alt=\"\" /> \n</p>\n<p style=\"text-align:center;\">\n\t<br />\n</p>\n<p style=\"text-align:center;\">\n\t<br />\n</p>\n<p style=\"text-align:center;\">\n\t<br />\n</p>","balancerate":"0","activitypicpath":"","showphonetext":"1","devmodel":"V1.0","licensepicpath":"../upload/store_license0.jpg","devlastouttime":"2015-01-04 17:30:23","barrelid":"DMT141825000379","makedate":"2014-11-08","signnumber":"1","bigpicpath":"../upload/store_big279.jpg","devcustomid":"0101110000001","deposit":"0","opennum":"","storepreviou":"278","remark":"","devlastoutnumber":"50","devid":"27901","storetype":"3","devclearnum":"","storeaddr":"四川省成都市一品天下大街181号3楼","period":"1","storename":"成都海棠轩石斑鱼","areaid":"510101","devinstalltime":"","devimpalenum":"","devdebugstatus":"0","isrecom":"0","storelatitude":"30.698792","isenablename":"不可用","barrelrfid":"100000002889","brandname":"沱牌生态[10年]浓香","endtime":"","servicephone":"028-89994988","wxid":"","row":"9","permitpicpath":"","devlastreport":"2015-10-27 12:46:33","devbarcode":"cea49d12a0a45379","repairmanname":"","scrolltitle":"","storeid":"279","storetypefirst":"","orgcode":"000100020002000200050110","foodstyle":"中餐","directorname":"","devcanbuymark":"0","storeversion":"","webaddress":"","isenabled":"0","stockprice":"0","isp2p":""},{"devrunstatus":"0","storelevel":"0","takecaremanname":"","storenote":"见道","smallpicpath":"../upload/store_small281.jpg","repairmanphone":"","starttime":"","devoutno":"6","directorphone":"","brandid":"125","usergetoutrate":"","storephone":"13008148488","devlanip":"","storeperson":"邓薇薇","havestorage":"0","devgetoutnum":"28289","factoryid":"1","takecaremanphone":"","createtime":"2014-10-22 16:57:52","temprfid":"200000005721","onboardid":"157","storelongitude":"104.06","devtype":"2","barrelremain":"14317","storelegalperson":"","storedesc":"11","balancerate":"0","activitypicpath":"","showphonetext":"1","devmodel":"V1.0","licensepicpath":"../upload/store_license0.jpg","devlastouttime":"2014-12-28 00:00:51","barrelid":"DMT140925000580","makedate":"2014-11-08","signnumber":"1","bigpicpath":"../upload/store_big281.jpg","devcustomid":"0101110000097","deposit":"0","opennum":"","storepreviou":"278","remark":"","devlastoutnumber":"100","devid":"28101","storetype":"3","devclearnum":"","storeaddr":"四川省成都市青羊区泡桐树14号附9号(86127744)","period":"1","storename":"成都见道","areaid":"510105","devinstalltime":"","devimpalenum":"","devdebugstatus":"1","isrecom":"0","storelatitude":"30.67","isenablename":"不可用","barrelrfid":"100000002881","brandname":"天香池[15年]","endtime":"","servicephone":"13980807414","wxid":"","row":"10","permitpicpath":"","devlastreport":"2015-01-24 15:08:50","devbarcode":"104247dc563b98e6","repairmanname":"","scrolltitle":"","storeid":"281","storetypefirst":"","orgcode":"000100020002000200050111","foodstyle":"中餐","directorname":"","devcanbuymark":"0","storeversion":"","webaddress":"","isenabled":"0","stockprice":"0","isp2p":""},{"devrunstatus":"0","storelevel":"0","takecaremanname":"","storenote":"见道","smallpicpath":"../upload/store_small281.jpg","repairmanphone":"","starttime":"","devoutno":"5","directorphone":"","brandid":"124","usergetoutrate":"","storephone":"13008148488","devlanip":"","storeperson":"邓薇薇","havestorage":"0","devgetoutnum":"28289","factoryid":"1","takecaremanphone":"","createtime":"2014-10-22 16:57:52","temprfid":"200000005720","onboardid":"158","storelongitude":"104.06","devtype":"2","barrelremain":"14400","storelegalperson":"","storedesc":"11","balancerate":"0","activitypicpath":"","showphonetext":"1","devmodel":"V1.0","licensepicpath":"../upload/store_license0.jpg","devlastouttime":"2014-12-28 00:00:51","barrelid":"DMT140925000740","makedate":"2014-11-08","signnumber":"1","bigpicpath":"../upload/store_big281.jpg","devcustomid":"0101110000097","deposit":"0","opennum":"","storepreviou":"278","remark":"","devlastoutnumber":"100","devid":"28101","storetype":"3","devclearnum":"","storeaddr":"四川省成都市青羊区泡桐树14号附9号(86127744)","period":"1","storename":"成都见道","areaid":"510105","devinstalltime":"","devimpalenum":"","devdebugstatus":"1","isrecom":"0","storelatitude":"30.67","isenablename":"不可用","barrelrfid":"100000002880","brandname":"天香池[10年]","endtime":"","servicephone":"13980807414","wxid":"","row":"11","permitpicpath":"","devlastreport":"2015-01-24 15:08:50","devbarcode":"104247dc563b98e6","repairmanname":"","scrolltitle":"","storeid":"281","storetypefirst":"","orgcode":"000100020002000200050111","foodstyle":"中餐","directorname":"","devcanbuymark":"0","storeversion":"","webaddress":"","isenabled":"0","stockprice":"0","isp2p":""},{"devrunstatus":"0","storelevel":"0","takecaremanname":"","storenote":"见道","smallpicpath":"../upload/store_small281.jpg","repairmanphone":"","starttime":"","devoutno":"1","directorphone":"","brandid":"116","usergetoutrate":"","storephone":"13008148488","devlanip":"","storeperson":"邓薇薇","havestorage":"0","devgetoutnum":"28289","factoryid":"1","takecaremanphone":"","createtime":"2014-10-22 16:57:52","temprfid":"200000005725","onboardid":"159","storelongitude":"104.06","devtype":"2","barrelremain":"13500","storelegalperson":"","storedesc":"11","balancerate":"0","activitypicpath":"","showphonetext":"1","devmodel":"V1.0","licensepicpath":"../upload/store_license0.jpg","devlastouttime":"2014-12-28 00:00:51","barrelid":"DMT140925000535","makedate":"2014-11-08","signnumber":"1","bigpicpath":"../upload/store_big281.jpg","devcustomid":"0101110000097","deposit":"0","opennum":"","storepreviou":"278","remark":"","devlastoutnumber":"100","devid":"28101","storetype":"3","devclearnum":"","storeaddr":"四川省成都市青羊区泡桐树14号附9号(86127744)","period":"1","storename":"成都见道","areaid":"510105","devinstalltime":"","devimpalenum":"","devdebugstatus":"1","isrecom":"0","storelatitude":"30.67","isenablename":"不可用","barrelrfid":"100000002878","brandname":"泸州老窖永盛烧坊[10]","endtime":"","servicephone":"13980807414","wxid":"","row":"12","permitpicpath":"","devlastreport":"2015-01-24 15:08:50","devbarcode":"104247dc563b98e6","repairmanname":"","scrolltitle":"","storeid":"281","storetypefirst":"","orgcode":"000100020002000200050111","foodstyle":"中餐","directorname":"","devcanbuymark":"0","storeversion":"","webaddress":"","isenabled":"0","stockprice":"0","isp2p":""}],"res.page":[{"RecordsCount":4823,"hasNextPage":true,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12,"TotalPageCount":402}],"res.size":"4823","returnview":"@json"},
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
</style>
