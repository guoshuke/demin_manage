<template>
  <div>
    <div class="flex-row filter-box flex-wrap">
      <div>
        <span>订单状态：</span>
        <el-select v-model="requestParams.orderStatus" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <span>订单时间：</span>
        <el-date-picker
          v-model="requestParams.orderTime"
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
        prop="orderid"
        label="订单号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="thirdpartyorder"
        label="商户订单">
      </el-table-column>
      <el-table-column
        prop="ordertime"
        label="订单时间"
        width="160">
      </el-table-column>
      <el-table-column
        prop="odertypename"
        label="订单类型"
        width="80">
      </el-table-column>
      <el-table-column
        prop="storename"
        label="门店名称">
      </el-table-column>
      <el-table-column
        prop=""
        label="支付金额"
        width="100">
      </el-table-column>
      <el-table-column
        prop="orderstatusname"
        label="订单状态"
        width="80">
      </el-table-column>
      <el-table-column
        label="操作"
        width="80">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="dialogVisible=true">确认</el-button>
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

export default {
  name: 'TakeWineCodeList',
  components: {
    PageChange
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        orderStatus: '',
        orderTime: '',
        pageNum: 1,
        pageSize: 10
      },
      dialogVisible: false,
      options: [{
        value: '0',
        label: '全部'
      }, {
        value: '1',
        label: '已付款'
      }, {
        value: '4',
        label: '已确认'
      }, {
        value: '5',
        label: '已销账'
      }],
      jsonName: {"jvcpagename":"yjm_order","jvcoldpageName":"yjm_order","cmd":"querysure","returnvalue":"1","query.orderStatus.in":"1","res.recordsperpage":"12","RecordsPerPage":"12","res":[{"extend2":"","extend1":"","thirdpayinfoid":"","paytime":"2020-01-02 16:57:53","devid":"","canceltime":"","buynumber":"","deductbalance":"0","totalmoney":"1000","unitprice":"1000","ordertime":"2020-01-02 16:57:53","checktime":"","deductmoney":"1000","row":"1","remark":"","thirdpartyorder":"2020010216575278684_18109","endtime":"2020-01-02 17:12:53","packageid":"","percentageremark":"","paymodel":"2","deductcurrency":"1000","couponprice":"0","orderstatus":"1","orderip":"","storeid":"324","brandname":"","ordername":"成都得民科技云酒柜","orderfrom":"","orderid":"18109","buyeruserid":"21101","percentagestatus":"","orderstatusname":"已付款","tablenum":"","payamount":"0","orderendtime":"","invoicestatus":"1","brandid":"","invoiceid":"","storename":"成都得民科技云酒柜","odertypename":"买餐","odertype":"2","commodityname":"","strrandom":"","capitalpool":"0","pictureaddress":"http://139.196.151.129:8081/upload/store_small324.png","storeamount":"0.0"},{"extend2":"","extend1":"","thirdpayinfoid":"","paytime":"2019-11-29 18:05:35","devid":"","canceltime":"","buynumber":"","deductbalance":"0","totalmoney":"100","unitprice":"100","ordertime":"2019-11-29 18:05:30","checktime":"","deductmoney":"0","row":"2","remark":"","thirdpartyorder":"20191129180530552_17965","endtime":"2019-11-29 18:20:30","packageid":"","percentageremark":"","paymodel":"1","deductcurrency":"0","couponprice":"0","orderstatus":"1","orderip":"","storeid":"324","brandname":"","ordername":"成都得民科技云酒柜","orderfrom":"","orderid":"17965","buyeruserid":"35607","percentagestatus":"","orderstatusname":"已付款","tablenum":"","payamount":"100","orderendtime":"","invoicestatus":"1","brandid":"","invoiceid":"","storename":"成都得民科技云酒柜","odertypename":"买餐","odertype":"2","commodityname":"","strrandom":"","capitalpool":"0","pictureaddress":"http://139.196.151.129:8081/upload/store_small324.png","storeamount":"0.0"},{"extend2":"","extend1":"","thirdpayinfoid":"","paytime":"2019-11-18 20:03:12","devid":"","canceltime":"","buynumber":"","deductbalance":"0","totalmoney":"100","unitprice":"100","ordertime":"2019-11-18 20:03:06","checktime":"","deductmoney":"0","row":"3","remark":"","thirdpartyorder":"20191118200305827_17910","endtime":"2019-11-18 20:18:06","packageid":"","percentageremark":"","paymodel":"1","deductcurrency":"0","couponprice":"0","orderstatus":"1","orderip":"","storeid":"2739","brandname":"","ordername":"英伦玫瑰","orderfrom":"","orderid":"17910","buyeruserid":"38921","percentagestatus":"","orderstatusname":"已付款","tablenum":"","payamount":"100","orderendtime":"","invoicestatus":"1","brandid":"","invoiceid":"","storename":"英伦玫瑰","odertypename":"买餐","odertype":"2","commodityname":"","strrandom":"","capitalpool":"0","pictureaddress":"undefined","storeamount":"0.0"},{"extend2":"","extend1":"","thirdpayinfoid":"","paytime":"2019-11-17 12:15:17","devid":"","canceltime":"","buynumber":"","deductbalance":"0","totalmoney":"100","unitprice":"100","ordertime":"2019-11-17 12:15:11","checktime":"","deductmoney":"0","row":"4","remark":"","thirdpartyorder":"20191117121510826_17894","endtime":"2019-11-17 12:30:11","packageid":"","percentageremark":"","paymodel":"1","deductcurrency":"0","couponprice":"0","orderstatus":"1","orderip":"","storeid":"324","brandname":"","ordername":"成都得民科技云酒柜","orderfrom":"","orderid":"17894","buyeruserid":"35607","percentagestatus":"","orderstatusname":"已付款","tablenum":"测试","payamount":"100","orderendtime":"","invoicestatus":"1","brandid":"","invoiceid":"","storename":"成都得民科技云酒柜","odertypename":"买餐","odertype":"2","commodityname":"","strrandom":"","capitalpool":"0","pictureaddress":"http://139.196.151.129:8081/upload/store_small324.png","storeamount":"0.0"},{"extend2":"","extend1":"","thirdpayinfoid":"","paytime":"2019-11-17 12:10:39","devid":"","canceltime":"","buynumber":"","deductbalance":"0","totalmoney":"100","unitprice":"100","ordertime":"2019-11-17 12:10:33","checktime":"","deductmoney":"0","row":"5","remark":"","thirdpartyorder":"20191117121033347_17893","endtime":"2019-11-17 12:25:33","packageid":"","percentageremark":"","paymodel":"1","deductcurrency":"0","couponprice":"0","orderstatus":"1","orderip":"","storeid":"324","brandname":"","ordername":"成都得民科技云酒柜","orderfrom":"","orderid":"17893","buyeruserid":"35607","percentagestatus":"","orderstatusname":"已付款","tablenum":"","payamount":"100","orderendtime":"","invoicestatus":"1","brandid":"","invoiceid":"","storename":"成都得民科技云酒柜","odertypename":"买餐","odertype":"2","commodityname":"","strrandom":"","capitalpool":"0","pictureaddress":"http://139.196.151.129:8081/upload/store_small324.png","storeamount":"0.0"},{"extend2":"","extend1":"","thirdpayinfoid":"","paytime":"2019-11-17 10:22:25","devid":"","canceltime":"","buynumber":"","deductbalance":"0","totalmoney":"100","unitprice":"100","ordertime":"2019-11-17 10:22:19","checktime":"","deductmoney":"0","row":"6","remark":"","thirdpartyorder":"20191117102219571_17892","endtime":"2019-11-17 10:37:19","packageid":"","percentageremark":"","paymodel":"1","deductcurrency":"0","couponprice":"0","orderstatus":"1","orderip":"","storeid":"324","brandname":"","ordername":"成都得民科技云酒柜","orderfrom":"","orderid":"17892","buyeruserid":"35607","percentagestatus":"","orderstatusname":"已付款","tablenum":"","payamount":"100","orderendtime":"","invoicestatus":"1","brandid":"","invoiceid":"","storename":"成都得民科技云酒柜","odertypename":"买餐","odertype":"2","commodityname":"","strrandom":"","capitalpool":"0","pictureaddress":"http://139.196.151.129:8081/upload/store_small324.png","storeamount":"0.0"},{"extend2":"","extend1":"","thirdpayinfoid":"","paytime":"2019-11-17 10:01:16","devid":"","canceltime":"","buynumber":"","deductbalance":"0","totalmoney":"100","unitprice":"100","ordertime":"2019-11-17 10:01:11","checktime":"","deductmoney":"0","row":"7","remark":"","thirdpartyorder":"20191117100110771_17891","endtime":"2019-11-17 10:16:11","packageid":"","percentageremark":"","paymodel":"1","deductcurrency":"0","couponprice":"0","orderstatus":"1","orderip":"","storeid":"324","brandname":"","ordername":"成都得民科技云酒柜","orderfrom":"","orderid":"17891","buyeruserid":"35607","percentagestatus":"","orderstatusname":"已付款","tablenum":"","payamount":"100","orderendtime":"","invoicestatus":"1","brandid":"","invoiceid":"","storename":"成都得民科技云酒柜","odertypename":"买餐","odertype":"2","commodityname":"","strrandom":"","capitalpool":"0","pictureaddress":"http://139.196.151.129:8081/upload/store_small324.png","storeamount":"0.0"},{"extend2":"","extend1":"","thirdpayinfoid":"","paytime":"2019-10-18 17:37:43","devid":"","canceltime":"","buynumber":"","deductbalance":"0","totalmoney":"100","unitprice":"100","ordertime":"2019-10-18 17:37:38","checktime":"","deductmoney":"0","row":"8","remark":"","thirdpartyorder":"20191018173738549_17815","endtime":"2019-10-18 17:52:38","packageid":"","percentageremark":"","paymodel":"1","deductcurrency":"0","couponprice":"0","orderstatus":"1","orderip":"","storeid":"324","brandname":"","ordername":"成都得民科技云酒柜","orderfrom":"","orderid":"17815","buyeruserid":"35607","percentagestatus":"","orderstatusname":"已付款","tablenum":"","payamount":"100","orderendtime":"","invoicestatus":"1","brandid":"","invoiceid":"","storename":"成都得民科技云酒柜","odertypename":"买餐","odertype":"2","commodityname":"","strrandom":"","capitalpool":"0","pictureaddress":"http://139.196.151.129:8081/upload/store_small324.png","storeamount":"0.0"},{"extend2":"","extend1":"","thirdpayinfoid":"","paytime":"2019-10-17 11:34:03","devid":"","canceltime":"","buynumber":"","deductbalance":"0","totalmoney":"100","unitprice":"100","ordertime":"2019-10-17 11:33:58","checktime":"","deductmoney":"0","row":"9","remark":"","thirdpartyorder":"20191017113358312_17803","endtime":"2019-10-17 11:48:58","packageid":"","percentageremark":"","paymodel":"1","deductcurrency":"0","couponprice":"0","orderstatus":"1","orderip":"","storeid":"324","brandname":"","ordername":"成都得民科技云酒柜","orderfrom":"","orderid":"17803","buyeruserid":"35607","percentagestatus":"","orderstatusname":"已付款","tablenum":"","payamount":"100","orderendtime":"","invoicestatus":"1","brandid":"","invoiceid":"","storename":"成都得民科技云酒柜","odertypename":"买餐","odertype":"2","commodityname":"","strrandom":"","capitalpool":"0","pictureaddress":"http://139.196.151.129:8081/upload/store_small324.png","storeamount":"0.0"},{"extend2":"","extend1":"","thirdpayinfoid":"","paytime":"2019-10-17 11:28:44","devid":"","canceltime":"","buynumber":"","deductbalance":"0","totalmoney":"100","unitprice":"100","ordertime":"2019-10-17 11:28:40","checktime":"","deductmoney":"0","row":"10","remark":"","thirdpartyorder":"20191017112840366_17799","endtime":"2019-10-17 11:43:40","packageid":"","percentageremark":"","paymodel":"1","deductcurrency":"0","couponprice":"0","orderstatus":"1","orderip":"","storeid":"324","brandname":"","ordername":"成都得民科技云酒柜","orderfrom":"","orderid":"17799","buyeruserid":"35607","percentagestatus":"","orderstatusname":"已付款","tablenum":"邓凯测试","payamount":"100","orderendtime":"","invoicestatus":"1","brandid":"","invoiceid":"","storename":"成都得民科技云酒柜","odertypename":"买餐","odertype":"2","commodityname":"","strrandom":"","capitalpool":"0","pictureaddress":"http://139.196.151.129:8081/upload/store_small324.png","storeamount":"0.0"},{"extend2":"","extend1":"","thirdpayinfoid":"","paytime":"2019-10-17 11:25:50","devid":"","canceltime":"","buynumber":"","deductbalance":"0","totalmoney":"100","unitprice":"100","ordertime":"2019-10-17 11:25:45","checktime":"","deductmoney":"0","row":"11","remark":"","thirdpartyorder":"20191017112545362_17796","endtime":"2019-10-17 11:40:45","packageid":"","percentageremark":"","paymodel":"1","deductcurrency":"0","couponprice":"0","orderstatus":"1","orderip":"","storeid":"324","brandname":"","ordername":"成都得民科技云酒柜","orderfrom":"","orderid":"17796","buyeruserid":"35607","percentagestatus":"","orderstatusname":"已付款","tablenum":"邓凯测试i","payamount":"100","orderendtime":"","invoicestatus":"1","brandid":"","invoiceid":"","storename":"成都得民科技云酒柜","odertypename":"买餐","odertype":"2","commodityname":"","strrandom":"","capitalpool":"0","pictureaddress":"http://139.196.151.129:8081/upload/store_small324.png","storeamount":"0.0"},{"extend2":"","extend1":"","thirdpayinfoid":"","paytime":"2019-10-17 11:18:05","devid":"","canceltime":"","buynumber":"","deductbalance":"0","totalmoney":"100","unitprice":"100","ordertime":"2019-10-17 11:18:01","checktime":"","deductmoney":"0","row":"12","remark":"","thirdpartyorder":"20191017111801359_17793","endtime":"2019-10-17 11:33:01","packageid":"","percentageremark":"","paymodel":"1","deductcurrency":"0","couponprice":"0","orderstatus":"1","orderip":"","storeid":"324","brandname":"","ordername":"成都得民科技云酒柜","orderfrom":"","orderid":"17793","buyeruserid":"35607","percentagestatus":"","orderstatusname":"已付款","tablenum":"邓凯测试","payamount":"100","orderendtime":"","invoicestatus":"1","brandid":"","invoiceid":"","storename":"成都得民科技云酒柜","odertypename":"买餐","odertype":"2","commodityname":"","strrandom":"","capitalpool":"0","pictureaddress":"http://139.196.151.129:8081/upload/store_small324.png","storeamount":"0.0"}],"res.page":[{"RecordsCount":104,"hasNextPage":true,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12,"TotalPageCount":9}],"res.size":"104","returnview":"@json"},
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
    width: 180px;
  }
  .el-icon-edit {
    font-size: 16px;
  }
</style>
