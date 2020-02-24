<template>
  <div>
    <div class="flex-row filter-box flex-wrap">
      <div>
        <span>编号：</span>
        <el-input v-model="requestParams.creatorId" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>姓名：</span>
        <el-input v-model="requestParams.creatorName" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>手机号：</span>
        <el-input v-model="requestParams.phone" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>身份证号：</span>
        <el-input v-model="requestParams.cardId" clearable placeholder="请输入内容"></el-input>
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
        prop="phone"
        label="会员手机号">
      </el-table-column>
      <el-table-column
        prop="creatorname"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="cardid"
        label="身份证号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="storename"
        label="对应门店">
      </el-table-column>
      <el-table-column
        label="运营分成费(元)">
        <template slot-scope="scope">
          <span>{{scope.row.profitamount/100}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="运营分成费(元)">
        <template slot-scope="scope">
          <span>{{scope.row.disprofitamount/100}}</span>
        </template>
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
  name: 'MakerAccountList',
  components: {
    PageChange,
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        creatorId: '',
        cardId: '',
        creatorName: '',
        phone: '',
        pageNum: 1,
        pageSize: 10
      },
      jsonName: {"jvcpagename":"yjm_creator","jvcoldpageName":"yjm_creator","cmd":"queryAccount","returnvalue":"1","res.recordsperpage":"12","RecordsPerPage":"-1","res":[{"province":"","bankcardno":"34343535332","phone":"13914026305","row":"1","starttime":"2019-08-19 14:19:49","banktype":"1","storename":"成都得民科技云酒柜","alipayid":"","bankcardname":"ICBC","creatorid":"77","storepreviou":"1858","disprofitamount":"24349","city":"","creatorname":"傅涵","alipayname":"","profitamount":"0","cardid":"342221199610014156","openname":"5343434"},{"province":"320000","bankcardno":"10157401040029853","phone":"13813147225","row":"2","starttime":"2018-03-09 00:00:00","banktype":"2","storename":"富春酒楼 （来鹤台店)","alipayid":"","bankcardname":"ABC","creatorid":"22","storepreviou":"1111","disprofitamount":"324835","city":"321000","creatorname":"祁总","alipayname":"","profitamount":"0","cardid":"32108819891125631X","openname":"扬州来鹤台富春餐饮有限公司"},{"province":"","bankcardno":"6217876100007757803","phone":"15366905148","row":"3","starttime":"2018-01-09 00:00:00","banktype":"1","storename":"老街饭庄 （文汇西路店）","alipayid":"","bankcardname":"BOC","creatorid":"8","storepreviou":"1111","disprofitamount":"74380","city":"","creatorname":"金国","alipayname":"","profitamount":"0","cardid":"32101119710427031X","openname":"金国"},{"province":"","bankcardno":"6222082003000113679","phone":"13502981105","row":"4","starttime":"2019-01-09 14:49:25","banktype":"1","storename":"扬州富春花园茶社","alipayid":"","bankcardname":"ICBC","creatorid":"72","storepreviou":"1111","disprofitamount":"0","city":"","creatorname":"杨广军","alipayname":"","profitamount":"0","cardid":"341222197601106557","openname":"杨广军"},{"province":"","bankcardno":"6228480448736180978","phone":"19905147777","row":"5","starttime":"2018-01-19 00:00:00","banktype":"1","storename":"扬州菜根香饭店","alipayid":"","bankcardname":"ABC","creatorid":"16","storepreviou":"1111","disprofitamount":"76709","city":"","creatorname":"夏葆","alipayname":"","profitamount":"0","cardid":"321002198010222112","openname":"夏葆"},{"province":"","bankcardno":"6214835140242445","phone":"13813198212","row":"6","starttime":"2018-01-10 00:00:00","banktype":"1","storename":"广陵区紫气东来大酒店","alipayid":"","bankcardname":"CMB","creatorid":"9","storepreviou":"1111","disprofitamount":"3800","city":"","creatorname":"董巍","alipayname":"","profitamount":"0","cardid":"321002198203100349","openname":"董巍"},{"province":"320000","bankcardno":"320899991010003203044","phone":"17705191199","row":"7","starttime":"2018-01-11 00:00:00","banktype":"2","storename":"老扬州","alipayid":"","bankcardname":"COMM","creatorid":"11","storepreviou":"1111","disprofitamount":"3800","city":"320100","creatorname":"王继发","alipayname":"","profitamount":"0","cardid":"320000000000000000","openname":"南京三兄弟投资管理有限公司"},{"province":"","bankcardno":"","phone":"15079555666","row":"8","starttime":"2018-04-02 10:35:40","banktype":"","storename":"江西宜春得民酒业","alipayid":"15079555666","bankcardname":"","creatorid":"37","storepreviou":"1137","disprofitamount":"0","city":"","creatorname":"邓颖","alipayname":"邓颖","profitamount":"13480","cardid":"362229198308310026","openname":""},{"province":"","bankcardno":"6222620160000090775","phone":"13615245712","row":"9","starttime":"2018-01-10 00:00:00","banktype":"1","storename":"小菜坊","alipayid":"","bankcardname":"COMM","creatorid":"10","storepreviou":"1111","disprofitamount":"5700","city":"","creatorname":"许建强","alipayname":"","profitamount":"0","cardid":"321083197309303711","openname":"许建强"},{"province":"","bankcardno":"6227001311640165414","phone":"18861068790","row":"10","starttime":"2018-01-22 00:00:00","banktype":"1","storename":"得民创客加盟店（兴化市星海路店）","alipayid":"","bankcardname":"CCB","creatorid":"15","storepreviou":"1111","disprofitamount":"168240","city":"","creatorname":"陈爱荣","alipayname":"","profitamount":"0","cardid":"321083197205283736","openname":"陈爱荣"},{"province":"320000","bankcardno":"1104010309000078357","phone":"13805283169","row":"11","starttime":"","banktype":"2","storename":"宴春酒楼（金山店）","alipayid":"","bankcardname":"ICBC","creatorid":"17","storepreviou":"1111","disprofitamount":"0","city":"321100","creatorname":"吴荣生","alipayname":"","profitamount":"0","cardid":"321102195412051936","openname":"镇江宴春酒楼有限公司大市口店"},{"province":"","bankcardno":"6228480441693819514","phone":"13196693077","row":"12","starttime":"2018-03-13 00:00:00","banktype":"1","storename":"枫乐居","alipayid":"","bankcardname":"ABC","creatorid":"26","storepreviou":"1111","disprofitamount":"360","city":"","creatorname":"胡云飞","alipayname":"","profitamount":"0","cardid":"321081196506234236","openname":"胡云飞"}],"res.page":[{"RecordsCount":49,"hasNextPage":true,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12,"TotalPageCount":5}],"res.size":"49","single.recordsperpage":"-1","row":"1","single.row":"1","sumprofitamount":"13720","single.sumprofitamount":"13720","sumdisprofitamount":"960157","single.sumdisprofitamount":"960157","returnview":""},
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
