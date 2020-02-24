<template>
  <div>
    <div class="flex-row filter-box flex-wrap">
      <div>
        <span>订单编号：</span>
        <el-input v-model="requestParams.orderNo" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>状态：</span>
        <el-select v-model="requestParams.subStatus" placeholder="请选择" style="width: 100px">
          <el-option
            v-for="item in subStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <span>下单帐号：</span>
        <el-input v-model="requestParams.userId" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>下单方：</span>
        <el-input v-model="requestParams.storeName" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>下单方类型：</span>
        <el-select v-model="requestParams.storeType" placeholder="请选择" style="width: 100px">
          <el-option
            v-for="item in storeTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <span>分类：</span>
        <el-select v-model="requestParams.orderType" placeholder="请选择" style="width: 100px">
          <el-option
            v-for="item in orderTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <span>下单时间：</span>
        <el-date-picker
          v-model="requestParams.subTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
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
        prop="orderno"
        label="订单编号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="storename"
        label="下单方">
      </el-table-column>
      <el-table-column
        prop="userid"
        label="下单账号">
      </el-table-column>
      <el-table-column
        prop="subtime"
        label="下单时间">
      </el-table-column>
      <el-table-column
        prop="storepreviouname"
        label="供应方">
      </el-table-column>
      <el-table-column
        prop="substatusname"
        label="预定状态"
        width="80">
      </el-table-column>
      <el-table-column
        prop=""
        label="金额"
        width="80">
      </el-table-column>
      <el-table-column
        prop="ordertype1"
        label="分类"
        width="110">
      </el-table-column>
      <el-table-column
        prop="audituserid"
        label="审核人">
      </el-table-column>
      <el-table-column
        label="操作"
        width="60">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="dialogVisible=true">订货单</el-button>
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
  name: 'OrderList',
  components: {
    PageChange,
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        orderNo: '',
        subStatus: '',
        userId: '',
        storeName: '',
        storeType: '',
        orderType: '',
        subTime: '',
        pageNum: 1,
        pageSize: 10
      },
      subStatusOptions: [{
        value: '',
        label: '全部'
      }, {
        value: '1',
        label: '预定中'
      }, {
        value: '2',
        label: '审核通过'
      }, {
        value: '3',
        label: '审核拒绝'
      }, {
        value: '4',
        label: '配送中'
      }, {
        value: '5',
        label: '已送达'
      }, {
        value: '6',
        label: '已取消'
      }],
      storeTypeOptions: [{
        value: '',
        label: '全部'
      }, {
        value: '3',
        label: '门店'
      }, {
        value: '4',
        label: '投资人'
      }],
      orderTypeOptions: [{
        value: '',
        label: '全部'
      }, {
        value: '0',
        label: '自定义调拨'
      }, {
        value: '1',
        label: '购买订单'
      }, {
        value: '2',
        label: '退货订单'
      }, {
        value: '3',
        label: '补货订单'
      }, {
        value: '5',
        label: '酒桶平迁'
      }],
      dialogVisible: false,
      jsonName: {"jvcpagename":"ls_order","jvcoldpageName":"ls_order","cmd":"queryprocess","returnvalue":"1","res.recordsperpage":"12","RecordsPerPage":"12","res":[{"ordertype1":"自定义调拨","userid":"demin","checkstrquery":"<a href=\"javascript:orderprocess('7681');\" title=\"订货单\">订货单</a>","orderoutnumber":"1","subamount":"","audituserid":"demin","cancelorderstr1":"","numberaccount":"1","ordertype":"","row":"1","deminorder":"<a href=\"javascript:jvc.window.open({url:'deminorder_detail.jsp?orderNo=7681&storeId=2304&cmd=demin&storePreviou=2030',id:'processDeatil',title:'订单详情',width:900,height:350,cancel:true,ok:false});\" title=\"订货单\">已入库</a>","orderouttime":"2020-01-19 13:13:58","storename":"山西运城1","storepreviouname":"山西鑫恒达隆物贸有限公司","substatusname":"已送达","substatus":"5","portalorderout":"<a href=\"javascript:protalOrderOut('7681','already')\" title=\"订货单\">订货单</a>","edit":"<a href=\"javascript:jvc.window.open({url:'deminorder_detail.jsp?orderNo=7681&storeId=2304&cmd=demin',id:'processDeatil',title:'订单详情',width:900,height:350});\" title=\"订货单\">订货单</a>","storepreviou":"2030","lasttime":"","orderno":"7681","subtime":"2020-01-19 13:09:56","storeid":"2304","checkstr":"<a href=\"javascript:orderprocess('7681','already');\" title=\"订货单\">订货单</a>","orderremark":"山西订单","audittime":"2020-01-19 13:12:53","auditremark":"","cancelorderstr":""},{"ordertype1":"自定义调拨","userid":"13773569888","checkstrquery":"<a href=\"javascript:orderprocess('7680');\" title=\"订货单\">订货单</a>","orderoutnumber":"1","subamount":"","audituserid":"13773569888","cancelorderstr1":"","numberaccount":"1","ordertype":"","row":"2","deminorder":"<a href=\"javascript:jvc.window.open({url:'deminorder_detail.jsp?orderNo=7680&storeId=1144&cmd=demin&storePreviou=1111',id:'processDeatil',title:'订单详情',width:900,height:350,cancel:true,ok:false});\" title=\"订货单\">已入库</a>","orderouttime":"2020-01-18 10:13:26","storename":"扬州得民（门店）","storepreviouname":"江苏得民数联智能设备科技有限公司","substatusname":"已送达","substatus":"5","portalorderout":"<a href=\"javascript:protalOrderOut('7680','already')\" title=\"订货单\">订货单</a>","edit":"<a href=\"javascript:jvc.window.open({url:'deminorder_detail.jsp?orderNo=7680&storeId=1144&cmd=demin',id:'processDeatil',title:'订单详情',width:900,height:350});\" title=\"订货单\">订货单</a>","storepreviou":"1111","lasttime":"","orderno":"7680","subtime":"2020-01-18 10:06:15","storeid":"1144","checkstr":"<a href=\"javascript:orderprocess('7680','already');\" title=\"订货单\">订货单</a>","orderremark":"客户整桶买酒（高总）","audittime":"2020-01-18 10:08:11","auditremark":"","cancelorderstr":""},{"ordertype1":"自定义调拨","userid":"15161858405","checkstrquery":"<a href=\"javascript:orderprocess('7679');\" title=\"订货单\">订货单</a>","orderoutnumber":"3","subamount":"","audituserid":"15161858405","cancelorderstr1":"","numberaccount":"3","ordertype":"","row":"3","deminorder":"<a href=\"javascript:jvc.window.open({url:'deminorder_detail.jsp?orderNo=7679&storeId=1144&cmd=demin&storePreviou=1111',id:'processDeatil',title:'订单详情',width:900,height:350,cancel:true,ok:false});\" title=\"订货单\">已入库</a>","orderouttime":"2020-01-14 15:21:04","storename":"扬州得民（门店）","storepreviouname":"江苏得民数联智能设备科技有限公司","substatusname":"已送达","substatus":"5","portalorderout":"<a href=\"javascript:protalOrderOut('7679','already')\" title=\"订货单\">订货单</a>","edit":"<a href=\"javascript:jvc.window.open({url:'deminorder_detail.jsp?orderNo=7679&storeId=1144&cmd=demin',id:'processDeatil',title:'订单详情',width:900,height:350});\" title=\"订货单\">订货单</a>","storepreviou":"1111","lasttime":"","orderno":"7679","subtime":"2020-01-14 14:59:53","storeid":"1144","checkstr":"<a href=\"javascript:orderprocess('7679','already');\" title=\"订货单\">订货单</a>","orderremark":"客户整桶买酒（高总）","audittime":"2020-01-14 15:01:38","auditremark":"","cancelorderstr":""},{"ordertype1":"自定义调拨","userid":"15161858405","checkstrquery":"<a href=\"javascript:orderprocess('7678');\" title=\"订货单\">订货单</a>","orderoutnumber":"3","subamount":"","audituserid":"15161858405","cancelorderstr1":"","numberaccount":"3","ordertype":"","row":"4","deminorder":"<a href=\"javascript:jvc.window.open({url:'deminorder_detail.jsp?orderNo=7678&storeId=1111&cmd=demin&storePreviou=2785',id:'processDeatil',title:'订单详情',width:900,height:350,cancel:true,ok:false});\" title=\"订货单\">已入库</a>","orderouttime":"2020-01-14 15:04:28","storename":"江苏得民数联智能设备科技有限公司","storepreviouname":"苏州得民智能科技股份有限公司","substatusname":"已送达","substatus":"5","portalorderout":"<a href=\"javascript:protalOrderOut('7678','already')\" title=\"订货单\">订货单</a>","edit":"<a href=\"javascript:jvc.window.open({url:'deminorder_detail.jsp?orderNo=7678&storeId=1111&cmd=demin',id:'processDeatil',title:'订单详情',width:900,height:350});\" title=\"订货单\">订货单</a>","storepreviou":"2785","lasttime":"","orderno":"7678","subtime":"2020-01-14 14:59:04","storeid":"1111","checkstr":"<a href=\"javascript:orderprocess('7678','already');\" title=\"订货单\">订货单</a>","orderremark":"客户整桶买酒（高总）","audittime":"2020-01-14 15:01:34","auditremark":"","cancelorderstr":""},{"ordertype1":"自定义调拨","userid":"15161858405","checkstrquery":"<a href=\"javascript:orderprocess('7677');\" title=\"订货单\">订货单</a>","orderoutnumber":"3","subamount":"","audituserid":"15161858405","cancelorderstr1":"","numberaccount":"3","ordertype":"","row":"5","deminorder":"<a href=\"javascript:jvc.window.open({url:'deminorder_detail.jsp?orderNo=7677&storeId=2785&cmd=demin&storePreviou=2563',id:'processDeatil',title:'订单详情',width:900,height:350,cancel:true,ok:false});\" title=\"订货单\">已入库</a>","orderouttime":"2020-01-14 15:02:44","storename":"苏州得民智能科技股份有限公司","storepreviouname":"刘岗","substatusname":"已送达","substatus":"5","portalorderout":"<a href=\"javascript:protalOrderOut('7677','already')\" title=\"订货单\">订货单</a>","edit":"<a href=\"javascript:jvc.window.open({url:'deminorder_detail.jsp?orderNo=7677&storeId=2785&cmd=demin',id:'processDeatil',title:'订单详情',width:900,height:350});\" title=\"订货单\">订货单</a>","storepreviou":"2563","lasttime":"","orderno":"7677","subtime":"2020-01-14 14:58:02","storeid":"2785","checkstr":"<a href=\"javascript:orderprocess('7677','already');\" title=\"订货单\">订货单</a>","orderremark":"客户整桶买酒（高总）","audittime":"2020-01-14 15:01:30","auditremark":"","cancelorderstr":""},{"ordertype1":"自定义调拨","userid":"13773569888","checkstrquery":"<a href=\"javascript:orderprocess('7676');\" title=\"订货单\">订货单</a>","orderoutnumber":"","subamount":"","audituserid":"13773569888","cancelorderstr1":"","numberaccount":"9","ordertype":"","row":"6","deminorder":"<a href=\"javascript:jvc.window.open({url:'deminorder_detail.jsp?orderNo=7676&storeId=1144&storePreviou=1111',id:'processDeatil',title:'订单详情',width:900,height:350});\" title=\"订货单\">订货单</a>","orderouttime":"","storename":"扬州得民（门店）","storepreviouname":"江苏得民数联智能设备科技有限公司","substatusname":"审核通过","substatus":"2","portalorderout":"<a href=\"javascript:protalOrderOut('7676','')\" title=\"订货单\">订货单</a>","edit":"<a href=\"javascript:jvc.window.open({url:'deminorder_detail.jsp?orderNo=7676&storeId=1144&cmd=demin',id:'processDeatil',title:'订单详情',width:900,height:350});\" title=\"订货单\">订货单</a>","storepreviou":"1111","lasttime":"","orderno":"7676","subtime":"2020-01-14 14:28:43","storeid":"1144","checkstr":"<a href=\"javascript:orderprocess('7676','already');\" title=\"订货单\">订货单</a>","orderremark":"客户整桶买酒（高总）","audittime":"2020-01-14 14:29:33","auditremark":"","cancelorderstr":""},{"ordertype1":"自定义调拨","userid":"13773569888","checkstrquery":"<a href=\"javascript:orderprocess('7675');\" title=\"订货单\">订货单</a>","orderoutnumber":"","subamount":"","audituserid":"","cancelorderstr1":"","numberaccount":"9","ordertype":"","row":"7","deminorder":"<a href=\"javascript:jvc.window.open({url:'deminorder_detail.jsp?orderNo=7675&storeId=1144&storePreviou=1111',id:'processDeatil',title:'订单详情',width:900,height:350});\" title=\"订货单\">订货单</a>","orderouttime":"","storename":"扬州得民（门店）","storepreviouname":"江苏得民数联智能设备科技有限公司","substatusname":"预定中","substatus":"1","portalorderout":"<a href=\"javascript:protalOrderOut('7675','already')\" title=\"订货单\">订货单</a>","edit":"<a href=\"javascript:jvc.window.open({url:'deminorder_detail.jsp?orderNo=7675&storeId=1144&storePreviou=1111',id:'processDeatil',title:'订单详情',width:900,height:350});\" title=\"订货单\">订货单</a> | <a href=\"javascript:checkrefuse('7675')\">取消订单</a>","storepreviou":"1111","lasttime":"","orderno":"7675","subtime":"2020-01-14 14:26:31","storeid":"1144","checkstr":"<a href=\"javascript:checkRefuse('7675');\" title=\"审核\">审核</a>","orderremark":"客户整桶买酒（高总）","audittime":"","auditremark":"","cancelorderstr":"<a href=\"javascript:jvc.window.open({url:'orderCancel.jsp?orderNo=7675&storeId=1144',id:'cancelOrder',title:'取消订单',width:400,height:200,cancel:true,ok:function(){this.frame.save(this,function(){parent.main(true);});return false;}});\" title=\"取消订单\">取消订单</a>"},{"ordertype1":"自定义调拨","userid":"15161858405","checkstrquery":"<a href=\"javascript:orderprocess('7674');\" title=\"订货单\">订货单</a>","orderoutnumber":"1","subamount":"","audituserid":"15161858405","cancelorderstr1":"","numberaccount":"1","ordertype":"","row":"8","deminorder":"<a href=\"javascript:jvc.window.open({url:'deminorder_detail.jsp?orderNo=7674&storeId=1111&cmd=demin&storePreviou=2785',id:'processDeatil',title:'订单详情',width:900,height:350,cancel:true,ok:false});\" title=\"订货单\">已入库</a>","orderouttime":"2020-01-13 10:51:04","storename":"江苏得民数联智能设备科技有限公司","storepreviouname":"苏州得民智能科技股份有限公司","substatusname":"已送达","substatus":"5","portalorderout":"<a href=\"javascript:protalOrderOut('7674','already')\" title=\"订货单\">订货单</a>","edit":"<a href=\"javascript:jvc.window.open({url:'deminorder_detail.jsp?orderNo=7674&storeId=1111&cmd=demin',id:'processDeatil',title:'订单详情',width:900,height:350});\" title=\"订货单\">订货单</a>","storepreviou":"2785","lasttime":"","orderno":"7674","subtime":"2020-01-13 10:42:30","storeid":"1111","checkstr":"<a href=\"javascript:orderprocess('7674','already');\" title=\"订货单\">订货单</a>","orderremark":"客户整桶买酒（高总）","audittime":"2020-01-13 10:48:21","auditremark":"","cancelorderstr":""},{"ordertype1":"自定义调拨","userid":"15161858405","checkstrquery":"<a href=\"javascript:orderprocess('7673');\" title=\"订货单\">订货单</a>","orderoutnumber":"1","subamount":"","audituserid":"15161858405","cancelorderstr1":"","numberaccount":"1","ordertype":"","row":"9","deminorder":"<a href=\"javascript:jvc.window.open({url:'deminorder_detail.jsp?orderNo=7673&storeId=2785&cmd=demin&storePreviou=2563',id:'processDeatil',title:'订单详情',width:900,height:350,cancel:true,ok:false});\" title=\"订货单\">已入库</a>","orderouttime":"2020-01-13 10:49:57","storename":"苏州得民智能科技股份有限公司","storepreviouname":"刘岗","substatusname":"已送达","substatus":"5","portalorderout":"<a href=\"javascript:protalOrderOut('7673','already')\" title=\"订货单\">订货单</a>","edit":"<a href=\"javascript:jvc.window.open({url:'deminorder_detail.jsp?orderNo=7673&storeId=2785&cmd=demin',id:'processDeatil',title:'订单详情',width:900,height:350});\" title=\"订货单\">订货单</a>","storepreviou":"2563","lasttime":"","orderno":"7673","subtime":"2020-01-13 10:29:28","storeid":"2785","checkstr":"<a href=\"javascript:orderprocess('7673','already');\" title=\"订货单\">订货单</a>","orderremark":"客户整桶买酒（高总）","audittime":"2020-01-13 10:31:55","auditremark":"","cancelorderstr":""},{"ordertype1":"自定义调拨","userid":"13773569888","checkstrquery":"<a href=\"javascript:orderprocess('7672');\" title=\"订货单\">订货单</a>","orderoutnumber":"2","subamount":"","audituserid":"13773569888","cancelorderstr1":"","numberaccount":"2","ordertype":"","row":"10","deminorder":"<a href=\"javascript:jvc.window.open({url:'deminorder_detail.jsp?orderNo=7672&storeId=1144&cmd=demin&storePreviou=1111',id:'processDeatil',title:'订单详情',width:900,height:350,cancel:true,ok:false});\" title=\"订货单\">已入库</a>","orderouttime":"2020-01-13 10:53:00","storename":"扬州得民（门店）","storepreviouname":"江苏得民数联智能设备科技有限公司","substatusname":"已送达","substatus":"5","portalorderout":"<a href=\"javascript:protalOrderOut('7672','already')\" title=\"订货单\">订货单</a>","edit":"<a href=\"javascript:jvc.window.open({url:'deminorder_detail.jsp?orderNo=7672&storeId=1144&cmd=demin',id:'processDeatil',title:'订单详情',width:900,height:350});\" title=\"订货单\">订货单</a>","storepreviou":"1111","lasttime":"","orderno":"7672","subtime":"2020-01-13 09:29:37","storeid":"1144","checkstr":"<a href=\"javascript:orderprocess('7672','already');\" title=\"订货单\">订货单</a>","orderremark":"客户整桶买酒（高总）","audittime":"2020-01-13 09:38:58","auditremark":"","cancelorderstr":""},{"ordertype1":"自定义调拨","userid":"13990629456","checkstrquery":"<a href=\"javascript:orderprocess('7671');\" title=\"订货单\">订货单</a>","orderoutnumber":"2","subamount":"","audituserid":"13990629456","cancelorderstr1":"","numberaccount":"2","ordertype":"","row":"11","deminorder":"<a href=\"javascript:jvc.window.open({url:'deminorder_detail.jsp?orderNo=7671&storeId=1292&cmd=demin&storePreviou=1308',id:'processDeatil',title:'订单详情',width:900,height:350,cancel:true,ok:false});\" title=\"订货单\">已入库</a>","orderouttime":"2020-01-03 12:12:21","storename":"乐山红船渔楼","storepreviouname":"曾俊霞","substatusname":"已送达","substatus":"5","portalorderout":"<a href=\"javascript:protalOrderOut('7671','already')\" title=\"订货单\">订货单</a>","edit":"<a href=\"javascript:jvc.window.open({url:'deminorder_detail.jsp?orderNo=7671&storeId=1292&cmd=demin',id:'processDeatil',title:'订单详情',width:900,height:350});\" title=\"订货单\">订货单</a>","storepreviou":"1308","lasttime":"","orderno":"7671","subtime":"2020-01-03 12:09:45","storeid":"1292","checkstr":"<a href=\"javascript:orderprocess('7671','already');\" title=\"订货单\">订货单</a>","orderremark":"换酒","audittime":"2020-01-03 12:11:30","auditremark":"","cancelorderstr":""},{"ordertype1":"自定义调拨","userid":"13990629456","checkstrquery":"<a href=\"javascript:orderprocess('7670');\" title=\"订货单\">订货单</a>","orderoutnumber":"1","subamount":"","audituserid":"13990629456","cancelorderstr1":"","numberaccount":"1","ordertype":"","row":"12","deminorder":"<a href=\"javascript:jvc.window.open({url:'deminorder_detail.jsp?orderNo=7670&storeId=1291&cmd=demin&storePreviou=1308',id:'processDeatil',title:'订单详情',width:900,height:350,cancel:true,ok:false});\" title=\"订货单\">已入库</a>","orderouttime":"2020-01-03 12:00:16","storename":"乐山王浩儿渔港","storepreviouname":"曾俊霞","substatusname":"已送达","substatus":"5","portalorderout":"<a href=\"javascript:protalOrderOut('7670','already')\" title=\"订货单\">订货单</a>","edit":"<a href=\"javascript:jvc.window.open({url:'deminorder_detail.jsp?orderNo=7670&storeId=1291&cmd=demin',id:'processDeatil',title:'订单详情',width:900,height:350});\" title=\"订货单\">订货单</a>","storepreviou":"1308","lasttime":"","orderno":"7670","subtime":"2020-01-02 19:01:07","storeid":"1291","checkstr":"<a href=\"javascript:orderprocess('7670','already');\" title=\"订货单\">订货单</a>","orderremark":"换酒","audittime":"2020-01-02 19:03:13","auditremark":"","cancelorderstr":""}],"res.page":[{"RecordsCount":6907,"hasNextPage":true,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12,"TotalPageCount":576}],"res.size":"6907","returnview":"@json"},
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
