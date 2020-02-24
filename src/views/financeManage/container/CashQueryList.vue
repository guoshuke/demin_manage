<template>
  <div>
    <div class="flex-row filter-box flex-wrap">
      <div>
        <span>门店编号/名称：</span>
        <el-input v-model="requestParams.storeName" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>银行流水ID：</span>
        <el-input v-model="requestParams.orderId" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>批次号：</span>
        <el-input v-model="requestParams.batchNo" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>订单时间：</span>
        <el-date-picker
          v-model="requestParams.appendTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
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
      </div>
    </div>
    <el-table
      :data="jsonName.res"
      border
      style="width: 100%">
      <el-table-column
        prop="orderid"
        label="银行流水ID"
        width="100">
      </el-table-column>
      <el-table-column
        prop="batchno"
        label="批次号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="storename"
        label="投资人/门店">
      </el-table-column>
      <el-table-column
        label="金额(元)"
        width="80">
        <template slot-scope="scope">
          <span>{{scope.row.totalamount/100}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号"
        width="110">
      </el-table-column>
      <el-table-column
        prop="paystatusname"
        label="第三方支付状态">
      </el-table-column>
      <el-table-column
        prop="paymodename"
        label="账户类型"
        width="80">
      </el-table-column>
      <el-table-column
        prop="ordertime"
        label="订单时间">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注">
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
  name: 'CashQueryList',
  components: {
    PageChange,
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        storeName: '',
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
      jsonName: {"jvcpagename":"ls_thirdpayinfo","jvcoldpageName":"ls_thirdpayinfo","cmd":"query","returnvalue":"1","res.recordsperpage":"12","RecordsPerPage":"-1","res":[{"ordertime":"2019-04-03 18:37:12","detailtype":"0","orderid":"1768","withholdtype":"1","detailid":"708385","paystatus":"3","storename":"富春酒楼 （来鹤台店)","batchno":"20190422015454887681","paymode":"1","remark":"门店财务人员:15862880232进行提现操作，提现金额：520.0元","paymodename":"银行账户","phone":"","paystatusname":"付款成功","storeid":"1609","totalamount":"113171","row":"1"},{"ordertime":"2019-03-18 12:21:56","detailtype":"0","orderid":"1763","withholdtype":"1","detailid":"708346","paystatus":"3","storename":"扬州菜根香饭店","batchno":"20190422015218747744","paymode":"1","remark":"门店财务人员:18752711515进行提现操作，提现金额：0.0元","paymodename":"银行账户","phone":"","paystatusname":"付款成功","storeid":"1642","totalamount":"4560","row":"2"},{"ordertime":"2019-04-03 18:37:12","detailtype":"1","orderid":"1768","withholdtype":"1","detailid":"708331","paystatus":"3","storename":"富春酒楼 （来鹤台店)","batchno":"20190422015454887681","paymode":"1","remark":"门店:1609进行运营利润分成，取酒码9388156现金支付：96.0提成金额：28.8元,提成比例：30","paymodename":"银行账户","phone":"","paystatusname":"付款成功","storeid":"1609","totalamount":"113171","row":"3"},{"ordertime":"2019-03-10 14:00:40","detailtype":"0","orderid":"1762","withholdtype":"1","detailid":"708326","paystatus":"3","storename":"刘家小院","batchno":"20190313021608789828","paymode":"1","remark":"门店财务人员:18694965888进行提现操作，提现金额：0.0元","paymodename":"银行账户","phone":"","paystatusname":"付款成功","storeid":"2569","totalamount":"50760","row":"4"},{"ordertime":"2019-03-10 14:00:40","detailtype":"1","orderid":"1762","withholdtype":"1","detailid":"708324","paystatus":"3","storename":"刘家小院","batchno":"20190313021608789828","paymode":"1","remark":"门店:2569进行运营利润分成，取酒码8472062现金支付：120.0提成金额：36.0元,提成比例：30","paymodename":"银行账户","phone":"","paystatusname":"付款成功","storeid":"2569","totalamount":"50760","row":"5"},{"ordertime":"2019-03-10 14:00:40","detailtype":"1","orderid":"1762","withholdtype":"1","detailid":"708321","paystatus":"3","storename":"刘家小院","batchno":"20190313021608789828","paymode":"1","remark":"门店:2569进行运营利润分成，取酒码4016295现金支付：120.0提成金额：36.0元,提成比例：30","paymodename":"银行账户","phone":"","paystatusname":"付款成功","storeid":"2569","totalamount":"50760","row":"6"},{"ordertime":"2019-02-14 15:51:03","detailtype":"0","orderid":"1754","withholdtype":"1","detailid":"708237","paystatus":"3","storename":"扬州极乐港","batchno":"2019021511075012136","paymode":"1","remark":"门店财务人员:13665218237进行提现操作，提现金额：48元","paymodename":"银行账户","phone":"","paystatusname":"付款成功","storeid":"2310","totalamount":"4800","row":"7"},{"ordertime":"2019-02-13 10:40:13","detailtype":"0","orderid":"1753","withholdtype":"1","detailid":"708231","paystatus":"3","storename":"老街饭庄 （文汇西路店）","batchno":"","paymode":"1","remark":"门店财务人员:18652595799进行提现操作，提现金额：1296元","paymodename":"银行账户","phone":"","paystatusname":"付款成功","storeid":"1623","totalamount":"129600","row":"8"},{"ordertime":"2019-04-03 18:37:12","detailtype":"1","orderid":"1768","withholdtype":"1","detailid":"708216","paystatus":"3","storename":"富春酒楼 （来鹤台店)","batchno":"20190422015454887681","paymode":"1","remark":"门店:1609进行运营利润分成，取酒码3859775现金支付：0.72提成金额：0.216元,提成比例：30","paymodename":"银行账户","phone":"","paystatusname":"付款成功","storeid":"1609","totalamount":"113171","row":"9"},{"ordertime":"2019-04-03 18:37:12","detailtype":"1","orderid":"1768","withholdtype":"1","detailid":"708213","paystatus":"3","storename":"富春酒楼 （来鹤台店)","batchno":"20190422015454887681","paymode":"1","remark":"门店:1609进行运营利润分成，取酒码3175258现金支付：66.96提成金额：20.088元,提成比例：30","paymodename":"银行账户","phone":"","paystatusname":"付款成功","storeid":"1609","totalamount":"113171","row":"10"},{"ordertime":"2019-04-03 18:37:12","detailtype":"1","orderid":"1768","withholdtype":"1","detailid":"708210","paystatus":"3","storename":"富春酒楼 （来鹤台店)","batchno":"20190422015454887681","paymode":"1","remark":"门店:1609进行运营利润分成，取酒码9596188现金支付：72.0提成金额：21.6元,提成比例：30","paymodename":"银行账户","phone":"","paystatusname":"付款成功","storeid":"1609","totalamount":"113171","row":"11"},{"ordertime":"2019-04-03 18:37:12","detailtype":"1","orderid":"1768","withholdtype":"1","detailid":"708198","paystatus":"3","storename":"富春酒楼 （来鹤台店)","batchno":"20190422015454887681","paymode":"1","remark":"门店:1609进行运营利润分成，取酒码7985721现金支付：14.4提成金额：4.32元,提成比例：30","paymodename":"银行账户","phone":"","paystatusname":"付款成功","storeid":"1609","totalamount":"113171","row":"12"}],"res.page":[{"RecordsCount":1670,"hasNextPage":true,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12,"TotalPageCount":140}],"res.size":"1670","single.recordsperpage":"-1","row":"1","single.row":"1","allamount":"57818914","single.allamount":"57818914","returnview":""},
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
