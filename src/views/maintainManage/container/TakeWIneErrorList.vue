<template>
  <div>
    <div class="flex-row filter-box flex-wrap">
      <div>
        <span>门店编号/名称：</span>
        <el-input v-model="requestParams.storeName" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>服务员卡：</span>
        <el-input v-model="requestParams.buyerUserId" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>会员手机：</span>
        <el-input v-model="requestParams.userPhone" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>上报时间：</span>
        <el-date-picker
          v-model="requestParams.reportTime"
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
        prop="reporttime"
        label="上报时间">
      </el-table-column>
      <el-table-column
        label="门店名称">
        <template slot-scope="scope">
          <span @click="dialogVisible=true" class="ft-link">{{scope.row.storename}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="终端"
        width="70">
        <template slot-scope="scope">
          <span @click="dialogVisible=true" class="ft-link">{{scope.row.devid}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="devoutno"
        label="出酒口"
        width="70">
      </el-table-column>
      <el-table-column
        prop="brandname"
        label="品牌">
      </el-table-column>
      <el-table-column
        prop="requestgetoutnumber"
        label="请求取酒(ml)"
        width="110">
      </el-table-column>
      <el-table-column
        prop="buyeruserid"
        label="服务员卡/会员手机">
      </el-table-column>
      <el-table-column
        prop="getouttypename"
        label="类型">
      </el-table-column>
      <el-table-column
        prop="getoutstatusname"
        label="取酒状态"
        width="80">
      </el-table-column>
      <el-table-column
        label="操作"
        width="60">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="dialogVisible=true">编辑</el-button>
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
        内容
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
  name: 'TakeWIneErrorList',
  components: {
    PageChange,
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        storeName: '',
        buyerUserId: '',
        userPhone: '',
        reportTime: '',
        pageNum: 1,
        pageSize: 10
      },
      dialogVisible: false,
      jsonName: {"jvcpagename":"ur_getouthistory","jvcoldpageName":"ur_getouthistory","cmd":"querybyusernew","returnvalue":"1","res.recordsperpage":"12","RecordsPerPage":"12","res":[{"retailprice":"65000","outwinetype":"2","surplus":"0","getouttype":"11","getoutstatus":"0","getoutstatusname":"未处理","waiterphone":"","getouttime":"2020-01-15 15:11:57","iswaiter":"0","sharingprofit":"0","amount":"0","brandid":"174","row":"1","barrelrfid":"300000042936","purchaseprice":"0","storename":"扬州得民（门店）","iswaitershow":"否","getoutnumber":"0","devoutno":"2","storeprofit":"0","buyeruserid":"","getouttypename":"天下有酒购买取酒","devid":"114401","requestgetoutnumber":"400","remark":"","storeid":"1144","reporttime":"2020-01-15 15:11:58","isticket":"0","getoutid":"3615147","temprfid":"300000042936","checkoutstatus":"0","codeid":"","getoutcode":"8344294","brandname":"贵州茅台.华茅酒[得民精选]"},{"retailprice":"65000","outwinetype":"","surplus":"0","getouttype":"3","getoutstatus":"0","getoutstatusname":"未处理","waiterphone":"","getouttime":"2019-11-28 16:23:40","iswaiter":"1","sharingprofit":"0","amount":"0","brandid":"121","row":"2","barrelrfid":"100000001003","purchaseprice":"0","storename":"成都得民科技云酒柜","iswaitershow":"是","getoutnumber":"0","devoutno":"1","storeprofit":"0","buyeruserid":"1000064932","getouttypename":"服务员卡","devid":"32401","requestgetoutnumber":"100","remark":"","storeid":"324","reporttime":"2019-11-28 16:23:41","isticket":"2","getoutid":"3614180","temprfid":"200000000603","checkoutstatus":"0","codeid":"","getoutcode":"","brandname":"沱牌生态[10年]酱香"},{"retailprice":"65000","outwinetype":"","surplus":"0","getouttype":"3","getoutstatus":"0","getoutstatusname":"未处理","waiterphone":"","getouttime":"2019-11-28 15:55:27","iswaiter":"1","sharingprofit":"0","amount":"0","brandid":"121","row":"3","barrelrfid":"100000001003","purchaseprice":"0","storename":"成都得民科技云酒柜","iswaitershow":"是","getoutnumber":"0","devoutno":"1","storeprofit":"0","buyeruserid":"1000064932","getouttypename":"服务员卡","devid":"32401","requestgetoutnumber":"50","remark":"","storeid":"324","reporttime":"2019-11-28 15:55:27","isticket":"2","getoutid":"3614177","temprfid":"200000000603","checkoutstatus":"0","codeid":"","getoutcode":"","brandname":"沱牌生态[10年]酱香"},{"retailprice":"65000","outwinetype":"","surplus":"0","getouttype":"3","getoutstatus":"0","getoutstatusname":"未处理","waiterphone":"","getouttime":"2019-11-28 15:53:41","iswaiter":"1","sharingprofit":"0","amount":"0","brandid":"121","row":"4","barrelrfid":"100000001003","purchaseprice":"0","storename":"成都得民科技云酒柜","iswaitershow":"是","getoutnumber":"0","devoutno":"1","storeprofit":"0","buyeruserid":"1000064932","getouttypename":"服务员卡","devid":"32401","requestgetoutnumber":"50","remark":"","storeid":"324","reporttime":"2019-11-28 15:53:42","isticket":"2","getoutid":"3614176","temprfid":"200000000603","checkoutstatus":"0","codeid":"","getoutcode":"","brandname":"沱牌生态[10年]酱香"},{"retailprice":"65000","outwinetype":"","surplus":"0","getouttype":"3","getoutstatus":"0","getoutstatusname":"未处理","waiterphone":"","getouttime":"2019-11-28 11:25:00","iswaiter":"1","sharingprofit":"0","amount":"0","brandid":"121","row":"5","barrelrfid":"100000001003","purchaseprice":"0","storename":"成都得民科技云酒柜","iswaitershow":"是","getoutnumber":"0","devoutno":"1","storeprofit":"0","buyeruserid":"1000064932","getouttypename":"服务员卡","devid":"32401","requestgetoutnumber":"50","remark":"","storeid":"324","reporttime":"2019-11-28 11:25:01","isticket":"2","getoutid":"3614175","temprfid":"200000000603","checkoutstatus":"0","codeid":"","getoutcode":"","brandname":"沱牌生态[10年]酱香"},{"retailprice":"18000","outwinetype":"","surplus":"0","getouttype":"3","getoutstatus":"0","getoutstatusname":"未处理","waiterphone":"","getouttime":"2019-09-26 18:09:26","iswaiter":"1","sharingprofit":"0","amount":"0","brandid":"118","row":"6","barrelrfid":"100000010479","purchaseprice":"0","storename":"河北涿州红杏生态园西区","iswaitershow":"是","getoutnumber":"0","devoutno":"5","storeprofit":"0","buyeruserid":"1000023508","getouttypename":"服务员卡","devid":"116201","requestgetoutnumber":"250","remark":"","storeid":"1162","reporttime":"2019-09-26 18:09:26","isticket":"2","getoutid":"3612998","temprfid":"200000012438","checkoutstatus":"0","codeid":"","getoutcode":"","brandname":"沱牌生态[6年]"},{"retailprice":"18000","outwinetype":"","surplus":"0","getouttype":"3","getoutstatus":"0","getoutstatusname":"未处理","waiterphone":"","getouttime":"2019-07-31 11:40:20","iswaiter":"1","sharingprofit":"0","amount":"0","brandid":"118","row":"7","barrelrfid":"100000010867","purchaseprice":"0","storename":"乐山金叶大酒店","iswaitershow":"是","getoutnumber":"0","devoutno":"4","storeprofit":"0","buyeruserid":"1000033207","getouttypename":"服务员卡","devid":"163001","requestgetoutnumber":"250","remark":"","storeid":"1630","reporttime":"2019-07-31 11:40:20","isticket":"2","getoutid":"3611830","temprfid":"200000012062","checkoutstatus":"0","codeid":"","getoutcode":"","brandname":"沱牌生态[6年]"},{"retailprice":"18000","outwinetype":"","surplus":"0","getouttype":"3","getoutstatus":"0","getoutstatusname":"未处理","waiterphone":"","getouttime":"2019-07-28 20:34:09","iswaiter":"1","sharingprofit":"0","amount":"0","brandid":"118","row":"8","barrelrfid":"100000010437","purchaseprice":"0","storename":"河北涿州红杏生态园西区","iswaitershow":"是","getoutnumber":"0","devoutno":"5","storeprofit":"0","buyeruserid":"1000023508","getouttypename":"服务员卡","devid":"116201","requestgetoutnumber":"100","remark":"","storeid":"1162","reporttime":"2019-07-28 20:34:10","isticket":"2","getoutid":"3611772","temprfid":"200000012895","checkoutstatus":"0","codeid":"","getoutcode":"","brandname":"沱牌生态[6年]"},{"retailprice":"38000","outwinetype":"","surplus":"0","getouttype":"3","getoutstatus":"0","getoutstatusname":"未处理","waiterphone":"","getouttime":"2019-07-23 20:42:13","iswaiter":"1","sharingprofit":"0","amount":"0","brandid":"112","row":"9","barrelrfid":"300000048029","purchaseprice":"0","storename":"赤峰翁牛特旗全宁酒店4楼","iswaitershow":"是","getoutnumber":"0","devoutno":"6","storeprofit":"0","buyeruserid":"1000022196","getouttypename":"服务员卡","devid":"107301","requestgetoutnumber":"250","remark":"","storeid":"1073","reporttime":"2019-07-23 20:42:14","isticket":"2","getoutid":"3611665","temprfid":"300000048029","checkoutstatus":"0","codeid":"","getoutcode":"","brandname":"五粮液股份[纯粮陈窖]52°"},{"retailprice":"18000","outwinetype":"","surplus":"0","getouttype":"3","getoutstatus":"0","getoutstatusname":"未处理","waiterphone":"","getouttime":"2019-07-18 18:50:47","iswaiter":"1","sharingprofit":"0","amount":"0","brandid":"118","row":"10","barrelrfid":"100000010624","purchaseprice":"0","storename":"山东青岛圆中方大酒店(平度)","iswaitershow":"是","getoutnumber":"0","devoutno":"5","storeprofit":"0","buyeruserid":"1000031551","getouttypename":"服务员卡","devid":"155901","requestgetoutnumber":"250","remark":"","storeid":"1559","reporttime":"2019-07-18 18:50:48","isticket":"2","getoutid":"3611611","temprfid":"200000011632","checkoutstatus":"0","codeid":"","getoutcode":"","brandname":"沱牌生态[6年]"},{"retailprice":"38000","outwinetype":"2","surplus":"0","getouttype":"12","getoutstatus":"0","getoutstatusname":"未处理","waiterphone":"","getouttime":"2019-06-20 12:33:29","iswaiter":"0","sharingprofit":"0","amount":"0","brandid":"112","row":"11","barrelrfid":"300000073072","purchaseprice":"0","storename":"九炉分座","iswaitershow":"否","getoutnumber":"0","devoutno":"1","storeprofit":"0","buyeruserid":"","getouttypename":"天下有酒活动取酒","devid":"240001","requestgetoutnumber":"150","remark":"","storeid":"2400","reporttime":"2019-06-20 12:33:30","isticket":"0","getoutid":"3611038","temprfid":"300000073072","checkoutstatus":"0","codeid":"","getoutcode":"1552837","brandname":"五粮液股份[纯粮陈窖]52°"},{"retailprice":"18000","outwinetype":"","surplus":"0","getouttype":"3","getoutstatus":"0","getoutstatusname":"未处理","waiterphone":"","getouttime":"2019-05-23 12:11:48","iswaiter":"1","sharingprofit":"0","amount":"0","brandid":"118","row":"12","barrelrfid":"100000010739","purchaseprice":"0","storename":"河北涿州红杏生态园西区","iswaitershow":"是","getoutnumber":"0","devoutno":"5","storeprofit":"0","buyeruserid":"1000023508","getouttypename":"服务员卡","devid":"116201","requestgetoutnumber":"300","remark":"","storeid":"1162","reporttime":"2019-05-23 12:11:48","isticket":"2","getoutid":"3610359","temprfid":"200000012928","checkoutstatus":"0","codeid":"","getoutcode":"","brandname":"沱牌生态[6年]"}],"res.page":[{"RecordsCount":2296,"hasNextPage":true,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12,"TotalPageCount":192}],"res.size":"2296","returnview":""},
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
