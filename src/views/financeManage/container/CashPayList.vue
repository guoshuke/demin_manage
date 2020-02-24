<template>
  <div>
    <div class="flex-row filter-box flex-wrap">
      <div>
        <span>门店/投资人id：</span>
        <el-input v-model="requestParams.orderId" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>批次号：</span>
        <el-input v-model="requestParams.batchNo" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>账户类型：</span>
        <el-select v-model="requestParams.amountType" placeholder="请选择">
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
        <el-button type="primary">重置</el-button>
        <el-button type="primary">批量付款</el-button>
      </div>
    </div>
    <el-table
      :data="jsonName.res"
      border
      style="width: 100%">
      <el-table-column
        type="selection"
        width="45">
      </el-table-column>
      <el-table-column
        prop="orderid"
        label="流水id">
      </el-table-column>
      <el-table-column
        label="金额(元)">
        <template slot-scope="scope">
          <span>{{scope.row.totalamount/100}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="idno"
        label="批次号">
      </el-table-column>
      <el-table-column
        prop="storename"
        label="投资人/门店">
      </el-table-column>
      <el-table-column
        prop="outorderid"
        label="订单号">
      </el-table-column>
      <el-table-column
        prop="holder"
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="provinceid"
        label="省">
      </el-table-column>
      <el-table-column
        prop="cityid"
        label="市">
      </el-table-column>
      <el-table-column
        prop="ordertime"
        label="生成时间">
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
  name: 'CashPayList',
  components: {
    PageChange,
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        storeId: '',
        batchNos: '',
        amountType: '',
        pageNum: 1,
        pageSize: 10
      },
      options: [{
        value: '',
        label: '全部'
      }, {
        value: '1',
        label: '个人'
      }, {
        value: '2',
        label: '对公账户'
      }],
      jsonName: {"jvcpagename":"yjf_payamount","jvcoldpageName":"yjf_payamount","cmd":"query","res.page":[{"TotalPageCount":2,"hasNextPage":true,"RecordsCount":18,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":15}],"res":[{"amounttype":"1","cardno":"6236681300001085897","withholdtype":"4","paymode":"1","provinceid":"","cityid":"","idtype":"","batchno":"20190722052907390262","phone":"","holder":"罗静茹","idno":"321102197405182822","orderid":"1429","paytime":"","bankcode":"CCB","prorateamountkey":"","totalamount":"15600","outorderid":"20180801000500953236","paystatus":"10","remark":"","storeid":"2488","cnaps":"","row":"1","ordertime":"2018-08-01 00:05:00"},{"amounttype":"1","cardno":"6228480444422783019","withholdtype":"3","paymode":"1","provinceid":"","cityid":"","idtype":"","batchno":"","phone":"17348387369","holder":"周小云","idno":"","orderid":"1529","paytime":"","bankcode":"ABC","prorateamountkey":"11639","totalamount":"9299","outorderid":"20180923114101209355","paystatus":"10","remark":"","storeid":"","cnaps":"","row":"2","ordertime":"2018-09-23 11:41:01"},{"amounttype":"1","cardno":"6216666100002473998","withholdtype":"4","paymode":"1","provinceid":"","cityid":"","idtype":"","batchno":"","phone":"","holder":"徐颖宏","idno":"321002196809170318","orderid":"1791","paytime":"","bankcode":"BOC","prorateamountkey":"","totalamount":"760","outorderid":"20190601000453645386","paystatus":"10","remark":"","storeid":"2581","cnaps":"","row":"3","ordertime":"2019-06-01 00:04:53"},{"amounttype":"1","cardno":"6236681330000021973","withholdtype":"1","paymode":"1","provinceid":"320000","cityid":"321000","idtype":"01","batchno":"","phone":"","holder":"扬州建行邗江支行","idno":"321002197512171226","orderid":"1814","paytime":"","bankcode":"CCB","prorateamountkey":"0","totalamount":"85000","outorderid":"20190918125307373977","paystatus":"10","remark":"","storeid":"2694","cnaps":"","row":"4","ordertime":"2019-09-18 12:53:07"},{"amounttype":"1","cardno":"6228270081494708476","withholdtype":"1","paymode":"1","provinceid":"320000","cityid":"321000","idtype":"01","batchno":"","phone":"","holder":"中国农业银行（广州太和支行）","idno":"44090319970215126X","orderid":"1816","paytime":"","bankcode":"ABC","prorateamountkey":"0","totalamount":"68000","outorderid":"20190923112025422530","paystatus":"10","remark":"","storeid":"2710","cnaps":"","row":"5","ordertime":"2019-09-23 11:20:25"},{"amounttype":"1","cardno":"6236681330000373572","withholdtype":"1","paymode":"1","provinceid":"320000","cityid":"321000","idtype":"01","batchno":"","phone":"","holder":"中国建设银行股份有限公司扬州开发区支行","idno":"321088199609090501","orderid":"1820","paytime":"","bankcode":"CCB","prorateamountkey":"0","totalamount":"172550","outorderid":"20191001164716338956","paystatus":"10","remark":"","storeid":"2698","cnaps":"","row":"6","ordertime":"2019-10-01 16:47:16"},{"amounttype":"1","cardno":"6228270440806535920","withholdtype":"1","paymode":"1","provinceid":"320000","cityid":"321000","idtype":"01","batchno":"","phone":"","holder":"农业银行邗江区美琪支行","idno":"34120219840224354X","orderid":"1824","paytime":"","bankcode":"ABC","prorateamountkey":"0","totalamount":"22185","outorderid":"20191102110209707739","paystatus":"10","remark":"","storeid":"2690","cnaps":"","row":"7","ordertime":"2019-11-02 11:02:09"},{"amounttype":"1","cardno":"4340611331965298","withholdtype":"1","paymode":"1","provinceid":"320000","cityid":"321000","idtype":"01","batchno":"","phone":"","holder":"岑其森","idno":"321002196502101211","orderid":"1826","paytime":"","bankcode":"CCB","prorateamountkey":"0","totalamount":"80750","outorderid":"20191115130334101640","paystatus":"10","remark":"","storeid":"1620","cnaps":"","row":"8","ordertime":"2019-11-15 13:03:34"},{"amounttype":"1","cardno":"6214855143505606","withholdtype":"1","paymode":"1","provinceid":"320000","cityid":"321000","idtype":"01","batchno":"","phone":"","holder":"招商银行扬州分行营业部","idno":"321084199502160025","orderid":"1829","paytime":"","bankcode":"CMB","prorateamountkey":"0","totalamount":"19550","outorderid":"20191127164257466824","paystatus":"10","remark":"","storeid":"2688","cnaps":"","row":"9","ordertime":"2019-11-27 16:42:57"},{"amounttype":"1","cardno":"34343535332","withholdtype":"4","paymode":"1","provinceid":"","cityid":"","idtype":"","batchno":"","phone":"","holder":"5343434","idno":"342221199610014156","orderid":"1832","paytime":"","bankcode":"ICBC","prorateamountkey":"","totalamount":"1950","outorderid":"20191201000458921306","paystatus":"10","remark":"","storeid":"324","cnaps":"","row":"10","ordertime":"2019-12-01 00:04:58"},{"amounttype":"1","cardno":"6228480445803413779","withholdtype":"1","paymode":"1","provinceid":"320000","cityid":"321000","idtype":"01","batchno":"","phone":"","holder":"农行京华城支行","idno":"","orderid":"1834","paytime":"","bankcode":"ABC","prorateamountkey":"0","totalamount":"2125","outorderid":"20191212163751406165","paystatus":"10","remark":"","storeid":"2819","cnaps":"","row":"11","ordertime":"2019-12-12 16:37:51"},{"amounttype":"1","cardno":"4340611331965298","withholdtype":"1","paymode":"1","provinceid":"320000","cityid":"321000","idtype":"01","batchno":"","phone":"","holder":"岑其森","idno":"321002196502101211","orderid":"1837","paytime":"","bankcode":"CCB","prorateamountkey":"0","totalamount":"79050","outorderid":"20191217131346148730","paystatus":"10","remark":"","storeid":"1620","cnaps":"","row":"12","ordertime":"2019-12-17 13:13:46"},{"amounttype":"1","cardno":"6228480405802449778","withholdtype":"1","paymode":"1","provinceid":"320000","cityid":"321000","idtype":"01","batchno":"","phone":"","holder":"农行常熟市梅李支行","idno":"","orderid":"1839","paytime":"","bankcode":"ABC","prorateamountkey":"0","totalamount":"5525","outorderid":"20191219103949246981","paystatus":"10","remark":"","storeid":"2813","cnaps":"","row":"13","ordertime":"2019-12-19 10:39:49"},{"amounttype":"1","cardno":"4340611331965298","withholdtype":"1","paymode":"1","provinceid":"320000","cityid":"321000","idtype":"01","batchno":"","phone":"","holder":"岑其森","idno":"321002196502101211","orderid":"1841","paytime":"","bankcode":"CCB","prorateamountkey":"0","totalamount":"92310","outorderid":"20191230114315161147","paystatus":"10","remark":"","storeid":"1620","cnaps":"","row":"14","ordertime":"2019-12-30 11:43:15"},{"amounttype":"1","cardno":"4340611331965298","withholdtype":"1","paymode":"1","provinceid":"320000","cityid":"321000","idtype":"01","batchno":"","phone":"","holder":"岑其森","idno":"321002196502101211","orderid":"1842","paytime":"","bankcode":"CCB","prorateamountkey":"0","totalamount":"59500","outorderid":"20200102121417776421","paystatus":"10","remark":"","storeid":"1620","cnaps":"","row":"15","ordertime":"2020-01-02 12:14:17"}],"returnview":"@json"},
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
