<template>
  <div>
    <div class="flex-row filter-box flex-wrap">
      <div>
        <span>物理卡号：</span>
        <el-input v-model="requestParams.cardId" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>体验卡号：</span>
        <el-input v-model="requestParams.codeNo" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>批次：</span>
        <el-input v-model="requestParams.batchNo" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>酒品：</span>
        <el-input v-model="requestParams.brandName" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>生成时间：</span>
        <el-date-picker
          v-model="requestParams.createTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div>
        <span>状态：</span>
        <el-select v-model="requestParams.barrelStatus" placeholder="请选择" style="width: 100px">
          <el-option
            v-for="item in cardStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <el-button type="primary">查询</el-button>
        <el-button type="primary">增加</el-button>
        <el-button type="primary">导入</el-button>
        <el-button type="primary">导出</el-button>
        <el-button type="primary">全部激活</el-button>
        <el-button type="primary">批量激活</el-button>
        <el-button type="primary">批量作废</el-button>
      </div>
    </div>
    <el-table
      :data="jsonName.res"
      border
      style="width: 100%">
      <el-table-column
        type="selection"
        width="40">
      </el-table-column>
      <el-table-column
        prop="batchno"
        label="批次">
      </el-table-column>
      <el-table-column
        prop="cardid"
        label="物理卡号">
      </el-table-column>
      <el-table-column
        prop="codeno"
        label="体验码">
      </el-table-column>
      <el-table-column
        prop="brandname"
        label="品牌">
      </el-table-column>
      <el-table-column
        prop="maxamount"
        label="酒量">
      </el-table-column>
      <el-table-column
        prop="storename"
        label="使用区域">
      </el-table-column>
      <el-table-column
        prop="codeefftime"
        label="有效时间">
      </el-table-column>
      <el-table-column
        prop="codeexptime"
        label="失效时间">
      </el-table-column>
      <el-table-column
        prop="usedamount"
        label="使用酒量"
        width="80">
      </el-table-column>
      <el-table-column
        prop="codestatusname"
        label="状态"
        width="60">
      </el-table-column>
      <el-table-column
        prop="createstr"
        label="生成">
      </el-table-column>
      <el-table-column
        prop="activestr"
        label="激活">
      </el-table-column>
      <el-table-column
        prop="usetime"
        label="使用时间">
      </el-table-column>
      <el-table-column
        prop="devid"
        label="使用终端">
      </el-table-column>
      <el-table-column
        label="操作"
        width="60">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="dialogVisible=true">作废</el-button>
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
  name: 'ExperienceCardList',
  components: {
    PageChange,
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        cardId: '',
        codeNo: '',
        brandName: '',
        createTime: '',
        cardStatus: '',
        pageNum: 1,
        pageSize: 10
      },
      cardStatusOptions: [{
        value: '',
        label: '全部'
      }, {
        value: '1',
        label: '未激活'
      }, {
        value: '2',
        label: '已激活'
      }, {
        value: '3',
        label: '已充值'
      }, {
        value: '4',
        label: '作废'
      }, {
        value: '5',
        label: '已过期'
      }],
      dialogVisible: false,
      jsonName: {"jvcpagename":"ur_tastecode","jvcoldpageName":"ur_tastecode","cmd":"query","returnvalue":"1","res.recordsperpage":"12","RecordsPerPage":"12","res":[{"createuser":"demin","createstr":"demin/<br>2019-11-25 16:56:14","codeexptime":"2019-11-26 00:00:00","usetime":"2019-11-25 17:01:26","codeefftime":"2019-11-25 00:00:00","activeuser":"demin","lockstatus":"0","row":"1","brandid":"121","storename":"成都得民科技云酒柜","createtime":"2019-11-25 16:56:14","codeno":"0657928440","activestr":"demin/<br>2019-11-25 16:58:24","usedamount":"500","batchno":"20191125","maxamount":"500","codestatus":"2","buyeruserid":"35607demin","activetime":"2019-11-25 16:58:24","devid":"32401","codestatusname":"已使用","storeid":"324","cardid":"2019112500002","userphone":"13451989686","codeid":"426923","brandname":"沱牌生态[10年]酱香"},{"createuser":"demin","createstr":"demin/<br>2019-11-25 13:27:00","codeexptime":"2019-11-26 00:00:00","usetime":"2019-11-25 13:31:16","codeefftime":"2019-11-25 00:00:00","activeuser":"demin","lockstatus":"0","row":"2","brandid":"121","storename":"成都得民科技云酒柜","createtime":"2019-11-25 13:27:00","codeno":"6688681186","activestr":"demin/<br>2019-11-25 13:28:30","usedamount":"500","batchno":"20191125","maxamount":"5000","codestatus":"2","buyeruserid":"50119","activetime":"2019-11-25 13:28:30","devid":"32401","codestatusname":"已使用","storeid":"324","cardid":"2019112500001","userphone":"","codeid":"426922","brandname":"沱牌生态[10年]酱香"},{"createuser":"39485","createstr":"39485/<br>2019-04-02 06:00:00","codeexptime":"2019-05-02 23:59:59","usetime":"","codeefftime":"2019-04-02 00:00:00","activeuser":"39485","lockstatus":"0","row":"3","brandid":"112","storename":"甘肃得民电子商务有限公司","createtime":"2019-04-02 06:00:00","codeno":"8432472346","activestr":"39485/<br>2019-04-02 06:00:02","usedamount":"","batchno":"2016112300","maxamount":"250","codestatus":"1","buyeruserid":"39485","activetime":"2019-04-02 06:00:02","devid":"","codestatusname":"已过期","storeid":"1514","cardid":"2019040200001","userphone":"","codeid":"426921","brandname":"五粮液股份[纯粮陈窖]52°"},{"createuser":"45755","createstr":"45755/<br>2019-03-20 06:00:00","codeexptime":"2019-04-19 23:59:59","usetime":"","codeefftime":"2019-03-20 00:00:00","activeuser":"45755","lockstatus":"0","row":"4","brandid":"112","storename":"甘肃得民电子商务有限公司","createtime":"2019-03-20 06:00:00","codeno":"4755271299","activestr":"45755/<br>2019-03-20 06:00:02","usedamount":"","batchno":"2016112300","maxamount":"100","codestatus":"1","buyeruserid":"45755","activetime":"2019-03-20 06:00:02","devid":"","codestatusname":"已过期","storeid":"1514","cardid":"2019032000001","userphone":"","codeid":"426920","brandname":"五粮液股份[纯粮陈窖]52°"},{"createuser":"31134","createstr":"31134/<br>2019-03-09 06:00:00","codeexptime":"2019-04-08 23:59:59","usetime":"","codeefftime":"2019-03-09 00:00:00","activeuser":"31134","lockstatus":"0","row":"5","brandid":"112","storename":"甘肃得民电子商务有限公司","createtime":"2019-03-09 06:00:00","codeno":"6675533226","activestr":"31134/<br>2019-03-09 06:00:02","usedamount":"","batchno":"2016112300","maxamount":"100","codestatus":"1","buyeruserid":"31134","activetime":"2019-03-09 06:00:02","devid":"","codestatusname":"已过期","storeid":"1514","cardid":"2019030900001","userphone":"","codeid":"426919","brandname":"五粮液股份[纯粮陈窖]52°"},{"createuser":"49554","createstr":"49554/<br>2019-02-28 06:00:00","codeexptime":"2019-03-30 23:59:59","usetime":"","codeefftime":"2019-02-28 00:00:00","activeuser":"49554","lockstatus":"0","row":"6","brandid":"112","storename":"甘肃得民电子商务有限公司","createtime":"2019-02-28 06:00:00","codeno":"1697571653","activestr":"49554/<br>2019-02-28 06:00:02","usedamount":"","batchno":"2016112300","maxamount":"50","codestatus":"1","buyeruserid":"49554","activetime":"2019-02-28 06:00:02","devid":"","codestatusname":"已过期","storeid":"1514","cardid":"2019022800001","userphone":"","codeid":"426918","brandname":"五粮液股份[纯粮陈窖]52°"},{"createuser":"32721","createstr":"32721/<br>2019-02-25 06:00:00","codeexptime":"2019-03-27 23:59:59","usetime":"","codeefftime":"2019-02-25 00:00:00","activeuser":"32721","lockstatus":"0","row":"7","brandid":"174","storename":"甘肃得民电子商务有限公司","createtime":"2019-02-25 06:00:00","codeno":"9569532812","activestr":"32721/<br>2019-02-25 06:00:02","usedamount":"","batchno":"2016112300","maxamount":"50","codestatus":"1","buyeruserid":"32721","activetime":"2019-02-25 06:00:02","devid":"","codestatusname":"已过期","storeid":"1514","cardid":"2019022500001","userphone":"","codeid":"426917","brandname":"贵州茅台.华茅酒[得民精选]"},{"createuser":"44119","createstr":"44119/<br>2019-02-16 06:00:00","codeexptime":"2019-03-18 23:59:59","usetime":"","codeefftime":"2019-02-16 00:00:00","activeuser":"44119","lockstatus":"0","row":"8","brandid":"174","storename":"甘肃得民电子商务有限公司","createtime":"2019-02-16 06:00:00","codeno":"0527978884","activestr":"44119/<br>2019-02-16 06:00:02","usedamount":"","batchno":"2016112300","maxamount":"100","codestatus":"1","buyeruserid":"44119","activetime":"2019-02-16 06:00:02","devid":"","codestatusname":"已过期","storeid":"1514","cardid":"2019021600001","userphone":"","codeid":"426916","brandname":"贵州茅台.华茅酒[得民精选]"},{"createuser":"50503","createstr":"50503/<br>2019-01-30 06:00:00","codeexptime":"2019-03-01 23:59:59","usetime":"","codeefftime":"2019-01-30 00:00:00","activeuser":"50503","lockstatus":"0","row":"9","brandid":"174","storename":"甘肃得民电子商务有限公司","createtime":"2019-01-30 06:00:00","codeno":"9180082484","activestr":"50503/<br>2019-01-30 06:00:02","usedamount":"","batchno":"2016112300","maxamount":"100","codestatus":"1","buyeruserid":"50503","activetime":"2019-01-30 06:00:02","devid":"","codestatusname":"已过期","storeid":"1514","cardid":"2019013000001","userphone":"","codeid":"426915","brandname":"贵州茅台.华茅酒[得民精选]"},{"createuser":"32721","createstr":"32721/<br>2019-01-19 06:00:00","codeexptime":"2019-02-18 23:59:59","usetime":"","codeefftime":"2019-01-19 00:00:00","activeuser":"32721","lockstatus":"0","row":"10","brandid":"174","storename":"甘肃得民电子商务有限公司","createtime":"2019-01-19 06:00:00","codeno":"0394366563","activestr":"32721/<br>2019-01-19 06:00:01","usedamount":"","batchno":"2016112300","maxamount":"100","codestatus":"1","buyeruserid":"32721","activetime":"2019-01-19 06:00:01","devid":"","codestatusname":"已过期","storeid":"1514","cardid":"2019011900001","userphone":"","codeid":"426914","brandname":"贵州茅台.华茅酒[得民精选]"},{"createuser":"31081","createstr":"31081/<br>2019-01-17 06:00:00","codeexptime":"2019-02-16 23:59:59","usetime":"","codeefftime":"2019-01-17 00:00:00","activeuser":"31081","lockstatus":"0","row":"11","brandid":"112","storename":"甘肃得民电子商务有限公司","createtime":"2019-01-17 06:00:00","codeno":"5802990901","activestr":"31081/<br>2019-01-17 06:00:01","usedamount":"","batchno":"2016112300","maxamount":"50","codestatus":"1","buyeruserid":"31081","activetime":"2019-01-17 06:00:01","devid":"","codestatusname":"已过期","storeid":"1514","cardid":"2019011700001","userphone":"","codeid":"426913","brandname":"五粮液股份[纯粮陈窖]52°"},{"createuser":"44119","createstr":"44119/<br>2019-01-07 06:00:00","codeexptime":"2019-02-06 23:59:59","usetime":"","codeefftime":"2019-01-07 00:00:00","activeuser":"44119","lockstatus":"0","row":"12","brandid":"116","storename":"甘肃得民电子商务有限公司","createtime":"2019-01-07 06:00:00","codeno":"6178734522","activestr":"44119/<br>2019-01-07 06:00:02","usedamount":"","batchno":"2016112300","maxamount":"250","codestatus":"1","buyeruserid":"44119","activetime":"2019-01-07 06:00:02","devid":"","codestatusname":"已过期","storeid":"1514","cardid":"2019010700001","userphone":"","codeid":"426912","brandname":"泸州老窖永盛烧坊[10]"}],"res.page":[{"RecordsCount":415199,"hasNextPage":true,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12,"TotalPageCount":34600}],"res.size":"415199","returnview":"@json"},
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
