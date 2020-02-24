<template>
  <div>
    <div class="flex-row filter-box flex-wrap">
      <div>
        <span>酒厂：</span>
        <el-input v-model="requestParams.storeName" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>预定状态：</span>
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
        <span>下单人：</span>
        <el-input v-model="requestParams.userId" clearable placeholder="请输入内容"></el-input>
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
        <el-button type="primary">新增订单</el-button>
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
        label="下单人">
      </el-table-column>
      <el-table-column
        prop="subtime"
        label="下单时间">
      </el-table-column>
      <el-table-column
        prop="numberaccount"
        label="数量"
        width="80">
      </el-table-column>
      <el-table-column
        prop="storepreviouname"
        label="酒厂">
      </el-table-column>
      <el-table-column
        prop="substatusname"
        label="预定状态"
        width="100">
      </el-table-column>
      <el-table-column
        label="操作"
        width="80">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="dialogVisible=true">查看订单</el-button>
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
  name: 'WineryOrderList',
  components: {
    PageChange,
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        storeName: '',
        subStatus: '',
        userId: '',
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
        value: '4',
        label: '配送中'
      }, {
        value: '5',
        label: '已送达'
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
      jsonName: {"jvcpagename":"ls_order","jvcoldpageName":"ls_order","cmd":"querydeminorder","returnvalue":"1","res.recordsperpage":"12","RecordsPerPage":"12","res":[{"userid":"demin","checkstrquery":"<a href=\"javascript:orderprocess('7649');\" title=\"订货单\">订货单</a>","orderoutnumber":"","subamount":"","audituserid":"","cancelorderstr1":"","numberaccount":"1","ordertype":"自定义调拨","row":"1","deminorder":"<a href=\"javascript:jvc.window.open({url:'deminorder_detail.jsp?orderNo=7649&storeId=1&storePreviou=606',id:'processDeatil',title:'订单详情',width:900,height:350});\" title=\"订货单\">订货单</a>","orderouttime":"","storename":"成都得民","storepreviouname":"茅台","substatusname":"审核通过","substatus":"2","portalorderout":"<a href=\"javascript:protalOrderOut('7649','')\" title=\"订货单\">订货单</a>","edit":"<a href=\"javascript:jvc.window.open({url:'deminorder_detail.jsp?orderNo=7649&storeId=1&cmd=demin',id:'processDeatil',title:'订单详情',width:900,height:350});\" title=\"订货单\">订货单</a>","storepreviou":"606","lasttime":"","orderno":"7649","subtime":"2019-12-18 10:50:13","storeid":"1","checkstr":"<a href=\"javascript:orderprocess('7649','already');\" title=\"订货单\">订货单</a>","orderremark":"测试","audittime":"","auditremark":"","cancelorderstr":""},{"userid":"demin","checkstrquery":"<a href=\"javascript:orderprocess('7648');\" title=\"订货单\">订货单</a>","orderoutnumber":"1","subamount":"","audituserid":"","cancelorderstr1":"","numberaccount":"1","ordertype":"自定义调拨","row":"2","deminorder":"<a href=\"javascript:jvc.window.open({url:'deminorder_detail.jsp?orderNo=7648&storeId=1&cmd=demin&storePreviou=606',id:'processDeatil',title:'订单详情',width:900,height:350,cancel:true,ok:false});\" title=\"订货单\">已入库</a>","orderouttime":"2019-12-17 17:40:35","storename":"成都得民","storepreviouname":"茅台","substatusname":"已送达","substatus":"5","portalorderout":"<a href=\"javascript:protalOrderOut('7648','already')\" title=\"订货单\">订货单</a>","edit":"<a href=\"javascript:jvc.window.open({url:'deminorder_detail.jsp?orderNo=7648&storeId=1&cmd=demin',id:'processDeatil',title:'订单详情',width:900,height:350});\" title=\"订货单\">订货单</a>","storepreviou":"606","lasttime":"","orderno":"7648","subtime":"2019-12-17 17:36:30","storeid":"1","checkstr":"<a href=\"javascript:orderprocess('7648','already');\" title=\"订货单\">订货单</a>","orderremark":"测试","audittime":"","auditremark":"","cancelorderstr":""},{"userid":"demin","checkstrquery":"<a href=\"javascript:orderprocess('7647');\" title=\"订货单\">订货单</a>","orderoutnumber":"1","subamount":"","audituserid":"","cancelorderstr1":"","numberaccount":"1","ordertype":"自定义调拨","row":"3","deminorder":"<a href=\"javascript:jvc.window.open({url:'deminorder_detail.jsp?orderNo=7647&storeId=1&cmd=demin&storePreviou=606',id:'processDeatil',title:'订单详情',width:900,height:350,cancel:true,ok:false});\" title=\"订货单\">已入库</a>","orderouttime":"2019-12-17 17:28:09","storename":"成都得民","storepreviouname":"茅台","substatusname":"已送达","substatus":"5","portalorderout":"<a href=\"javascript:protalOrderOut('7647','already')\" title=\"订货单\">订货单</a>","edit":"<a href=\"javascript:jvc.window.open({url:'deminorder_detail.jsp?orderNo=7647&storeId=1&cmd=demin',id:'processDeatil',title:'订单详情',width:900,height:350});\" title=\"订货单\">订货单</a>","storepreviou":"606","lasttime":"","orderno":"7647","subtime":"2019-12-17 16:51:14","storeid":"1","checkstr":"<a href=\"javascript:orderprocess('7647','already');\" title=\"订货单\">订货单</a>","orderremark":"测试","audittime":"","auditremark":"","cancelorderstr":""},{"userid":"demin","checkstrquery":"<a href=\"javascript:orderprocess('7633');\" title=\"订货单\">订货单</a>","orderoutnumber":"","subamount":"","audituserid":"","cancelorderstr1":"","numberaccount":"100","ordertype":"自定义调拨","row":"4","deminorder":"<a href=\"javascript:jvc.window.open({url:'deminorder_detail.jsp?orderNo=7633&storeId=1&storePreviou=606',id:'processDeatil',title:'订单详情',width:900,height:350});\" title=\"订货单\">订货单</a>","orderouttime":"","storename":"成都得民","storepreviouname":"茅台","substatusname":"审核通过","substatus":"2","portalorderout":"<a href=\"javascript:protalOrderOut('7633','')\" title=\"订货单\">订货单</a>","edit":"<a href=\"javascript:jvc.window.open({url:'deminorder_detail.jsp?orderNo=7633&storeId=1&cmd=demin',id:'processDeatil',title:'订单详情',width:900,height:350});\" title=\"订货单\">订货单</a>","storepreviou":"606","lasttime":"","orderno":"7633","subtime":"2019-12-02 11:45:22","storeid":"1","checkstr":"<a href=\"javascript:orderprocess('7633','already');\" title=\"订货单\">订货单</a>","orderremark":"v测试","audittime":"","auditremark":"","cancelorderstr":""},{"userid":"demin","checkstrquery":"<a href=\"javascript:orderprocess('7576');\" title=\"订货单\">订货单</a>","orderoutnumber":"","subamount":"","audituserid":"","cancelorderstr1":"","numberaccount":"1","ordertype":"自定义调拨","row":"5","deminorder":"<a href=\"javascript:jvc.window.open({url:'deminorder_detail.jsp?orderNo=7576&storeId=1&storePreviou=229',id:'processDeatil',title:'订单详情',width:900,height:350});\" title=\"订货单\">订货单</a>","orderouttime":"","storename":"成都得民","storepreviouname":"五粮液","substatusname":"审核通过","substatus":"2","portalorderout":"<a href=\"javascript:protalOrderOut('7576','')\" title=\"订货单\">订货单</a>","edit":"<a href=\"javascript:jvc.window.open({url:'deminorder_detail.jsp?orderNo=7576&storeId=1&cmd=demin',id:'processDeatil',title:'订单详情',width:900,height:350});\" title=\"订货单\">订货单</a>","storepreviou":"229","lasttime":"","orderno":"7576","subtime":"2019-09-06 09:58:48","storeid":"1","checkstr":"<a href=\"javascript:orderprocess('7576','already');\" title=\"订货单\">订货单</a>","orderremark":"订单测试无需理会","audittime":"","auditremark":"","cancelorderstr":""},{"userid":"wangyiming","checkstrquery":"<a href=\"javascript:orderprocess('7406');\" title=\"订货单\">订货单</a>","orderoutnumber":"1","subamount":"","audituserid":"","cancelorderstr1":"","numberaccount":"1","ordertype":"自定义调拨","row":"6","deminorder":"<a href=\"javascript:jvc.window.open({url:'deminorder_detail.jsp?orderNo=7406&storeId=1&cmd=demin&storePreviou=233',id:'processDeatil',title:'订单详情',width:900,height:350,cancel:true,ok:false});\" title=\"订货单\">已入库</a>","orderouttime":"2019-02-20 15:07:18","storename":"成都得民","storepreviouname":"金窖醇","substatusname":"已送达","substatus":"5","portalorderout":"<a href=\"javascript:protalOrderOut('7406','already')\" title=\"订货单\">订货单</a>","edit":"<a href=\"javascript:jvc.window.open({url:'deminorder_detail.jsp?orderNo=7406&storeId=1&cmd=demin',id:'processDeatil',title:'订单详情',width:900,height:350});\" title=\"订货单\">订货单</a>","storepreviou":"233","lasttime":"","orderno":"7406","subtime":"2019-02-20 15:06:27","storeid":"1","checkstr":"<a href=\"javascript:orderprocess('7406','already');\" title=\"订货单\">订货单</a>","orderremark":"测试","audittime":"","auditremark":"","cancelorderstr":""},{"userid":"wangyiming","checkstrquery":"<a href=\"javascript:orderprocess('7223');\" title=\"订货单\">订货单</a>","orderoutnumber":"1","subamount":"","audituserid":"","cancelorderstr1":"","numberaccount":"1","ordertype":"自定义调拨","row":"7","deminorder":"<a href=\"javascript:jvc.window.open({url:'deminorder_detail.jsp?orderNo=7223&storeId=1&cmd=demin&storePreviou=1863',id:'processDeatil',title:'订单详情',width:900,height:350,cancel:true,ok:false});\" title=\"订货单\">已入库</a>","orderouttime":"2018-12-21 13:35:11","storename":"成都得民","storepreviouname":"五粮液","substatusname":"已送达","substatus":"5","portalorderout":"<a href=\"javascript:protalOrderOut('7223','already')\" title=\"订货单\">订货单</a>","edit":"<a href=\"javascript:jvc.window.open({url:'deminorder_detail.jsp?orderNo=7223&storeId=1&cmd=demin',id:'processDeatil',title:'订单详情',width:900,height:350});\" title=\"订货单\">订货单</a>","storepreviou":"1863","lasttime":"","orderno":"7223","subtime":"2018-12-21 13:32:20","storeid":"1","checkstr":"<a href=\"javascript:orderprocess('7223','already');\" title=\"订货单\">订货单</a>","orderremark":"","audittime":"","auditremark":"","cancelorderstr":""},{"userid":"wangyiming","checkstrquery":"<a href=\"javascript:orderprocess('7222');\" title=\"订货单\">订货单</a>","orderoutnumber":"1","subamount":"","audituserid":"","cancelorderstr1":"","numberaccount":"1","ordertype":"自定义调拨","row":"8","deminorder":"<a href=\"javascript:jvc.window.open({url:'deminorder_detail.jsp?orderNo=7222&storeId=1&cmd=demin&storePreviou=1863',id:'processDeatil',title:'订单详情',width:900,height:350,cancel:true,ok:false});\" title=\"订货单\">已入库</a>","orderouttime":"2018-12-21 13:25:03","storename":"成都得民","storepreviouname":"五粮液","substatusname":"已送达","substatus":"5","portalorderout":"<a href=\"javascript:protalOrderOut('7222','already')\" title=\"订货单\">订货单</a>","edit":"<a href=\"javascript:jvc.window.open({url:'deminorder_detail.jsp?orderNo=7222&storeId=1&cmd=demin',id:'processDeatil',title:'订单详情',width:900,height:350});\" title=\"订货单\">订货单</a>","storepreviou":"1863","lasttime":"","orderno":"7222","subtime":"2018-12-21 13:24:26","storeid":"1","checkstr":"<a href=\"javascript:orderprocess('7222','already');\" title=\"订货单\">订货单</a>","orderremark":"","audittime":"","auditremark":"","cancelorderstr":""},{"userid":"wangyiming","checkstrquery":"<a href=\"javascript:orderprocess('7200');\" title=\"订货单\">订货单</a>","orderoutnumber":"3","subamount":"","audituserid":"","cancelorderstr1":"","numberaccount":"3","ordertype":"自定义调拨","row":"9","deminorder":"<a href=\"javascript:jvc.window.open({url:'deminorder_detail.jsp?orderNo=7200&storeId=1&cmd=demin&storePreviou=606',id:'processDeatil',title:'订单详情',width:900,height:350,cancel:true,ok:false});\" title=\"订货单\">已入库</a>","orderouttime":"2018-12-08 11:20:52","storename":"成都得民","storepreviouname":"茅台","substatusname":"已送达","substatus":"5","portalorderout":"<a href=\"javascript:protalOrderOut('7200','already')\" title=\"订货单\">订货单</a>","edit":"<a href=\"javascript:jvc.window.open({url:'deminorder_detail.jsp?orderNo=7200&storeId=1&cmd=demin',id:'processDeatil',title:'订单详情',width:900,height:350});\" title=\"订货单\">订货单</a>","storepreviou":"606","lasttime":"","orderno":"7200","subtime":"2018-12-08 11:09:00","storeid":"1","checkstr":"<a href=\"javascript:orderprocess('7200','already');\" title=\"订货单\">订货单</a>","orderremark":"测试   1208","audittime":"","auditremark":"","cancelorderstr":""},{"userid":"wangyiming","checkstrquery":"<a href=\"javascript:orderprocess('7199');\" title=\"订货单\">订货单</a>","orderoutnumber":"3","subamount":"","audituserid":"","cancelorderstr1":"","numberaccount":"3","ordertype":"自定义调拨","row":"10","deminorder":"<a href=\"javascript:jvc.window.open({url:'deminorder_detail.jsp?orderNo=7199&storeId=1&cmd=demin&storePreviou=229',id:'processDeatil',title:'订单详情',width:900,height:350,cancel:true,ok:false});\" title=\"订货单\">已入库</a>","orderouttime":"2018-12-08 11:14:51","storename":"成都得民","storepreviouname":"五粮液","substatusname":"已送达","substatus":"5","portalorderout":"<a href=\"javascript:protalOrderOut('7199','already')\" title=\"订货单\">订货单</a>","edit":"<a href=\"javascript:jvc.window.open({url:'deminorder_detail.jsp?orderNo=7199&storeId=1&cmd=demin',id:'processDeatil',title:'订单详情',width:900,height:350});\" title=\"订货单\">订货单</a>","storepreviou":"229","lasttime":"","orderno":"7199","subtime":"2018-12-08 11:08:41","storeid":"1","checkstr":"<a href=\"javascript:orderprocess('7199','already');\" title=\"订货单\">订货单</a>","orderremark":"测试  1208","audittime":"","auditremark":"","cancelorderstr":""},{"userid":"wangyiming","checkstrquery":"<a href=\"javascript:orderprocess('7197');\" title=\"订货单\">订货单</a>","orderoutnumber":"1","subamount":"","audituserid":"","cancelorderstr1":"","numberaccount":"1","ordertype":"自定义调拨","row":"11","deminorder":"<a href=\"javascript:jvc.window.open({url:'deminorder_detail.jsp?orderNo=7197&storeId=1&cmd=demin&storePreviou=233',id:'processDeatil',title:'订单详情',width:900,height:350,cancel:true,ok:false});\" title=\"订货单\">已入库</a>","orderouttime":"2018-12-07 15:13:18","storename":"成都得民","storepreviouname":"金窖醇","substatusname":"已送达","substatus":"5","portalorderout":"<a href=\"javascript:protalOrderOut('7197','already')\" title=\"订货单\">订货单</a>","edit":"<a href=\"javascript:jvc.window.open({url:'deminorder_detail.jsp?orderNo=7197&storeId=1&cmd=demin',id:'processDeatil',title:'订单详情',width:900,height:350});\" title=\"订货单\">订货单</a>","storepreviou":"233","lasttime":"","orderno":"7197","subtime":"2018-12-07 15:12:49","storeid":"1","checkstr":"<a href=\"javascript:orderprocess('7197','already');\" title=\"订货单\">订货单</a>","orderremark":"","audittime":"","auditremark":"","cancelorderstr":""},{"userid":"wangyiming","checkstrquery":"<a href=\"javascript:orderprocess('7195');\" title=\"订货单\">订货单</a>","orderoutnumber":"1","subamount":"","audituserid":"","cancelorderstr1":"","numberaccount":"1","ordertype":"自定义调拨","row":"12","deminorder":"<a href=\"javascript:jvc.window.open({url:'deminorder_detail.jsp?orderNo=7195&storeId=1&cmd=demin&storePreviou=233',id:'processDeatil',title:'订单详情',width:900,height:350,cancel:true,ok:false});\" title=\"订货单\">已入库</a>","orderouttime":"2018-12-07 15:01:16","storename":"成都得民","storepreviouname":"金窖醇","substatusname":"已送达","substatus":"5","portalorderout":"<a href=\"javascript:protalOrderOut('7195','already')\" title=\"订货单\">订货单</a>","edit":"<a href=\"javascript:jvc.window.open({url:'deminorder_detail.jsp?orderNo=7195&storeId=1&cmd=demin',id:'processDeatil',title:'订单详情',width:900,height:350});\" title=\"订货单\">订货单</a>","storepreviou":"233","lasttime":"","orderno":"7195","subtime":"2018-12-07 15:00:47","storeid":"1","checkstr":"<a href=\"javascript:orderprocess('7195','already');\" title=\"订货单\">订货单</a>","orderremark":"","audittime":"","auditremark":"","cancelorderstr":""}],"res.page":[{"RecordsCount":479,"hasNextPage":true,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12,"TotalPageCount":40}],"res.size":"479","returnview":"@json"},
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
