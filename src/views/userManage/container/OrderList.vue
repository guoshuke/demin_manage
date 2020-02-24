<template>
  <div>
    <div class="flex-row filter-box flex-wrap">
      <div>
        <span>订单号：</span>
        <el-input v-model="requestParams.orderId" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>门店名称：</span>
        <el-input v-model="requestParams.storeName" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>会员手机：</span>
        <el-input v-model="requestParams.phoneNumber" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>支付方式：</span>
        <el-select v-model="requestParams.payModel" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <span>订单类型：</span>
        <el-select v-model="requestParams.oderType" placeholder="请选择">
          <el-option
            v-for="item in orderTypeOptions"
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
        <span>销账时间：</span>
        <el-date-picker
          v-model="requestParams.cancelTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div>
        <el-button type="primary">查询</el-button>
        <el-button type="primary">导出</el-button>
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
        prop="buyeruserid"
        label="账户"
        width="80">
      </el-table-column>
      <el-table-column
        prop="phonenumber"
        label="会员手机"
        width="120">
      </el-table-column>
      <el-table-column
        prop="checktime"
        width="120"
        label="订单时间">
      </el-table-column>
      <el-table-column
        prop="odertypename"
        label="订单类型"
        width="80">
      </el-table-column>
      <el-table-column
        prop="ordername"
        width="120"
        label="订单名称">
      </el-table-column>
      <el-table-column
        prop="storename"
        label="门店名称">
      </el-table-column>
      <el-table-column
        prop=""
        width="120"
        label="餐券余额">
      </el-table-column>
      <el-table-column
        prop=""
        width="100"
        label="现金金额">
      </el-table-column>
      <el-table-column
        prop=""
        label="补现金额"
        width="100">
      </el-table-column>
      <el-table-column
        prop=""
        label="优惠券金额"
        width="100">
      </el-table-column>
      <el-table-column
        prop=""
        label="支付金额"
        width="100">
      </el-table-column>
      <el-table-column
        prop=""
        label="代收金额"
        width="100">
        <template slot-scope="scope">
          <span>{{scope.row.storeamount/100}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="paymodelname"
        label="支付方式"
        width="80">
      </el-table-column>
      <el-table-column
        prop="orderstatusname"
        label="订单状态"
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

export default {
  name: 'BarrelInfromationList',
  components: {
    PageChange
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        orderId: '',
        storeName: '',
        phoneNumber: '',
        payModel: '',
        oderType: '',
        orderTime: '',
        cancelTime: '',
        pageNum: 1,
        pageSize: 10
      },
      options: [{
        value: '0',
        label: '全部'
      }, {
        value: '1',
        label: '微信支付'
      }, {
        value: '2',
        label: '消费券'
      }, {
        value: '3',
        label: '支付宝'
      }, {
        value: '4',
        label: '组合支付'
      }, {
        value: '5',
        label: '酒券支付'
      }],
      orderOptions: [
        {
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '充值'
        }, {
          value: '2',
          label: '买餐'
        }, {
          value: '3',
          label: '买酒'
        },
      ],
      orderTypeOptions: [
        {
          value: '',
          label: '全部'
        }, {
          value: '0',
          label: '未付款'
        }, {
          value: '1',
          label: '已付款'
        }, {
          value: '11',
          label: '补现已支款'
        },{
          value: '2',
          label: '付款失败'
        },{
          value: '5',
          label: '已销账'
        },
      ],
      value: '',
      tableData: [],
      dialogVisible: false,
      jsonName: {"jvcpagename":"yjm_order","jvcoldpageName":"yjm_order","cmd":"query","returnvalue":"1","res.recordsperpage":"12","RecordsPerPage":"-1","res":[{"userpassword":"","commodityname":"","userid":"","buyeruserid":"-1","paymodel":"4","orderstatus":"2","brandid":"112","paymodelname":"组合支付","spreadcode":"","cashcreator":"20","consumption":"1","orderfrom":"","ordertime":"2020-01-24 19:04:02","deductbalance":"0","consumepwd":"","couponprice":"0","recomuserid":"","strrandom":"","storeamount":"0.0","ordername":"五粮液股份[纯粮陈窖]52°","status":"","tablenum":"","freecreator":"10","usersource":"","id":"7","loginpwd":"","canceltime":"","odertypename":"买酒","phonenumber":"","remark":"","packageid":"","extend2":"","extend1":"","devid":"160901","usercredits":"","unitprice":"38","percentagestatus":"","registertime":"","orderip":"","pictureaddress":"http://139.196.151.129:8081/upload/brand_small112201972618114.png","payamount":"3800","consumenum":"287","creatorid":"22","orderid":"18148","storename":"富春酒楼 （来鹤台店)","deductmoney":"0","percentageremark":"","usebalance":"1","checktime":"","wechatid":"","divideproportion":"0","cooperation":"1","avgconsume":"100","brandname":"五粮液股份[纯粮陈窖]52°","waiterproportion":"3","endtime":"2020-01-24 19:19:01","row":"1","odertype":"3","invoicestatus":"1","lastlogintime":"","capitalpool":"0","invoiceid":"","orderendtime":"","divide":"85","city":"","storeid":"1609","ispwd":"","paytime":"","thirdpayinfoid":"","buynumber":"50","discount":"100","orderstatusname":"付款失败","totalmoney":"3800","thirdpartyorder":"","usergrade":"","deductcurrency":"0"},{"userpassword":"","commodityname":"","userid":"2319","buyeruserid":"2319","paymodel":"2","orderstatus":"5","brandid":"","paymodelname":"消费券","spreadcode":"01sf","cashcreator":"20","consumption":"1","orderfrom":"","ordertime":"2020-01-23 14:11:31","deductbalance":"0","consumepwd":"69839bfaa25884daf03da56c46666abb","couponprice":"0","recomuserid":"","strrandom":"","storeamount":"14450.0","ordername":"奇布宠物","status":"0","tablenum":"","freecreator":"10","usersource":"0","id":"389","loginpwd":"","canceltime":"2020-01-30 18:38:33","odertypename":"买餐","phonenumber":"13813191978","remark":"","packageid":"","extend2":"","extend1":"","devid":"","usercredits":"0","unitprice":"17000","percentagestatus":"","registertime":"2017-08-07 20:54:22","orderip":"","pictureaddress":"http://139.196.151.129:8081/upload/store_small2795.jpg","payamount":"0","consumenum":"16","creatorid":"","orderid":"18147","storename":"奇布宠物","deductmoney":"17000","percentageremark":"","usebalance":"0","checktime":"2020-01-23 14:11:37","wechatid":"oOL3g1XPsH2xgx_QXX1eZU3ITvV4_demin","divideproportion":"0","cooperation":"1","avgconsume":"80","brandname":"","waiterproportion":"5","endtime":"2020-01-23 14:26:31","row":"2","odertype":"2","invoicestatus":"1","lastlogintime":"","capitalpool":"0","invoiceid":"","orderendtime":"","divide":"85","city":"1110","storeid":"2795","ispwd":"1","paytime":"2020-01-23 14:11:31","thirdpayinfoid":"","buynumber":"","discount":"100","orderstatusname":"已销账","totalmoney":"17000","thirdpartyorder":"2020012314113043911_18147","usergrade":"","deductcurrency":"17000"},{"userpassword":"","commodityname":"","userid":"2319","buyeruserid":"2319","paymodel":"2","orderstatus":"5","brandid":"","paymodelname":"消费券","spreadcode":"01sf","cashcreator":"20","consumption":"1","orderfrom":"","ordertime":"2020-01-23 11:53:48","deductbalance":"0","consumepwd":"69839bfaa25884daf03da56c46666abb","couponprice":"0","recomuserid":"","strrandom":"","storeamount":"8500.0","ordername":"奇布宠物","status":"0","tablenum":"","freecreator":"10","usersource":"0","id":"389","loginpwd":"","canceltime":"2020-01-30 18:38:33","odertypename":"买餐","phonenumber":"13813191978","remark":"","packageid":"","extend2":"","extend1":"","devid":"","usercredits":"0","unitprice":"10000","percentagestatus":"","registertime":"2017-08-07 20:54:22","orderip":"","pictureaddress":"http://139.196.151.129:8081/upload/store_small2795.jpg","payamount":"0","consumenum":"16","creatorid":"","orderid":"18146","storename":"奇布宠物","deductmoney":"10000","percentageremark":"","usebalance":"0","checktime":"2020-01-23 14:03:08","wechatid":"oOL3g1XPsH2xgx_QXX1eZU3ITvV4_demin","divideproportion":"0","cooperation":"1","avgconsume":"80","brandname":"","waiterproportion":"5","endtime":"2020-01-23 12:08:48","row":"3","odertype":"2","invoicestatus":"1","lastlogintime":"","capitalpool":"0","invoiceid":"","orderendtime":"","divide":"85","city":"1110","storeid":"2795","ispwd":"1","paytime":"2020-01-23 11:53:48","thirdpayinfoid":"","buynumber":"","discount":"100","orderstatusname":"已销账","totalmoney":"10000","thirdpartyorder":"2020012311534723920_18146","usergrade":"","deductcurrency":"10000"},{"userpassword":"","commodityname":"","userid":"","buyeruserid":"-1","paymodel":"4","orderstatus":"1","brandid":"273","paymodelname":"组合支付","spreadcode":"","cashcreator":"20","consumption":"0","orderfrom":"","ordertime":"2020-01-18 11:57:48","deductbalance":"0","consumepwd":"","couponprice":"0","recomuserid":"","strrandom":"","storeamount":"0.0","ordername":"五粮液股份[纯粮陈窖]42°","status":"","tablenum":"","freecreator":"10","usersource":"","id":"319","loginpwd":"","canceltime":"","odertypename":"买酒","phonenumber":"","remark":"","packageid":"","extend2":"","extend1":"","devid":"240101","usercredits":"","unitprice":"32","percentagestatus":"","registertime":"","orderip":"","pictureaddress":"http://139.196.151.129:8081/upload/brand_small2732019729173755.png","payamount":"16000","consumenum":"68","creatorid":"","orderid":"18145","storename":"顾家厨房","deductmoney":"0","percentageremark":"","usebalance":"1","checktime":"","wechatid":"","divideproportion":"99","cooperation":"0","avgconsume":"85","brandname":"五粮液股份[纯粮陈窖]42°","waiterproportion":"5","endtime":"2020-01-18 12:12:47","row":"4","odertype":"3","invoicestatus":"1","lastlogintime":"","capitalpool":"0","invoiceid":"","orderendtime":"","divide":"0","city":"","storeid":"2401","ispwd":"","paytime":"2020-01-18 11:58:02","thirdpayinfoid":"","buynumber":"250","discount":"100","orderstatusname":"已付款","totalmoney":"16000","thirdpartyorder":"","usergrade":"","deductcurrency":"0"},{"userpassword":"","commodityname":"","userid":"","buyeruserid":"-1","paymodel":"4","orderstatus":"1","brandid":"112","paymodelname":"组合支付","spreadcode":"","cashcreator":"20","consumption":"0","orderfrom":"","ordertime":"2020-01-17 18:41:10","deductbalance":"0","consumepwd":"","couponprice":"0","recomuserid":"","strrandom":"","storeamount":"0.0","ordername":"五粮液股份[纯粮陈窖]52°","status":"","tablenum":"","freecreator":"10","usersource":"","id":"319","loginpwd":"","canceltime":"","odertypename":"买酒","phonenumber":"","remark":"","packageid":"","extend2":"","extend1":"","devid":"240101","usercredits":"","unitprice":"38","percentagestatus":"","registertime":"","orderip":"","pictureaddress":"http://139.196.151.129:8081/upload/brand_small112201972618114.png","payamount":"19000","consumenum":"68","creatorid":"","orderid":"18144","storename":"顾家厨房","deductmoney":"0","percentageremark":"","usebalance":"1","checktime":"","wechatid":"","divideproportion":"99","cooperation":"0","avgconsume":"85","brandname":"五粮液股份[纯粮陈窖]52°","waiterproportion":"5","endtime":"2020-01-17 18:56:10","row":"5","odertype":"3","invoicestatus":"1","lastlogintime":"","capitalpool":"0","invoiceid":"","orderendtime":"","divide":"0","city":"","storeid":"2401","ispwd":"","paytime":"2020-01-17 18:42:01","thirdpayinfoid":"","buynumber":"250","discount":"100","orderstatusname":"已付款","totalmoney":"19000","thirdpartyorder":"","usergrade":"","deductcurrency":"0"},{"userpassword":"","commodityname":"","userid":"44539","buyeruserid":"44539","paymodel":"1","orderstatus":"2","brandid":"","paymodelname":"微信支付","spreadcode":"0yd7","cashcreator":"20","consumption":"1","orderfrom":"","ordertime":"2020-01-16 13:59:21","deductbalance":"0","consumepwd":"","couponprice":"0","recomuserid":"22077","strrandom":"","storeamount":"8.0","ordername":"啪啪乐","status":"0","tablenum":"","freecreator":"10","usersource":"0","id":"498","loginpwd":"","canceltime":"","odertypename":"买餐","phonenumber":"17312830217","remark":"","packageid":"","extend2":"","extend1":"","devid":"","usercredits":"0","unitprice":"10","percentagestatus":"","registertime":"2019-12-16 17:10:46","orderip":"","pictureaddress":"http://139.196.151.129:8081/upload/store_small0.jpg","payamount":"10","consumenum":"1032","creatorid":"","orderid":"18143","storename":"啪啪乐","deductmoney":"0","percentageremark":"","usebalance":"1","checktime":"","wechatid":"oOL3g1Rfe7kGhR4_IpUQzz9WNxYs_demin","divideproportion":"30","cooperation":"1","avgconsume":"500","brandname":"","waiterproportion":"5","endtime":"2020-01-16 14:14:21","row":"6","odertype":"2","invoicestatus":"1","lastlogintime":"","capitalpool":"0","invoiceid":"","orderendtime":"","divide":"80","city":"1110","storeid":"2920","ispwd":"","paytime":"","thirdpayinfoid":"","buynumber":"","discount":"100","orderstatusname":"付款失败","totalmoney":"10","thirdpartyorder":"20200116135920962_18143","usergrade":"","deductcurrency":"0"},{"userpassword":"","commodityname":"","userid":"","buyeruserid":"-1","paymodel":"4","orderstatus":"2","brandid":"174","paymodelname":"组合支付","spreadcode":"","cashcreator":"20","consumption":"0","orderfrom":"","ordertime":"2020-01-16 12:30:59","deductbalance":"0","consumepwd":"","couponprice":"0","recomuserid":"","strrandom":"","storeamount":"0.0","ordername":"贵州茅台.华茅酒[得民精选]","status":"","tablenum":"","freecreator":"10","usersource":"","id":"265","loginpwd":"","canceltime":"","odertypename":"买酒","phonenumber":"","remark":"","packageid":"","extend2":"","extend1":"","devid":"258101","usercredits":"","unitprice":"65","percentagestatus":"","registertime":"","orderip":"","pictureaddress":"http://139.196.151.129:8081/upload/brand_small1742019729171912.png","payamount":"6500","consumenum":"0","creatorid":"75","orderid":"18142","storename":"楼上楼私房菜","deductmoney":"0","percentageremark":"","usebalance":"1","checktime":"","wechatid":"","divideproportion":"15","cooperation":"0","avgconsume":"70","brandname":"贵州茅台.华茅酒[得民精选]","waiterproportion":"5","endtime":"2020-01-16 12:45:59","row":"7","odertype":"3","invoicestatus":"1","lastlogintime":"","capitalpool":"0","invoiceid":"","orderendtime":"","divide":"80","city":"","storeid":"2581","ispwd":"","paytime":"","thirdpayinfoid":"","buynumber":"50","discount":"0","orderstatusname":"付款失败","totalmoney":"6500","thirdpartyorder":"","usergrade":"","deductcurrency":"0"},{"userpassword":"","commodityname":"","userid":"39071","buyeruserid":"39071","paymodel":"","orderstatus":"1","brandid":"","paymodelname":"","spreadcode":"0u5b","cashcreator":"20","consumption":"0","orderfrom":"","ordertime":"2020-01-16 12:25:15","deductbalance":"39000","consumepwd":"","couponprice":"0","recomuserid":"22077","strrandom":"","storeamount":"0.0","ordername":"贵州茅台.华茅酒[得民精选]","status":"0","tablenum":"","freecreator":"10","usersource":"0","id":"265","loginpwd":"","canceltime":"","odertypename":"买酒","phonenumber":"17751366866","remark":"","packageid":"","extend2":"","extend1":"","devid":"","usercredits":"0","unitprice":"","percentagestatus":"","registertime":"2019-10-11 12:20:18","orderip":"","pictureaddress":"http://139.196.151.129:8081/upload/brand_small1742019729171912.png","payamount":"0","consumenum":"0","creatorid":"75","orderid":"18141","storename":"楼上楼私房菜","deductmoney":"39000","percentageremark":"","usebalance":"1","checktime":"","wechatid":"oOL3g1YFOja6zjaY9qWwl-Y-L54E_demin","divideproportion":"15","cooperation":"0","avgconsume":"70","brandname":"贵州茅台.华茅酒[得民精选]","waiterproportion":"5","endtime":"2020-01-16 12:40:15","row":"8","odertype":"3","invoicestatus":"1","lastlogintime":"","capitalpool":"0","invoiceid":"","orderendtime":"","divide":"80","city":"1110","storeid":"2581","ispwd":"","paytime":"2020-01-16 12:25:15","thirdpayinfoid":"","buynumber":"","discount":"0","orderstatusname":"已付款","totalmoney":"39000","thirdpartyorder":"","usergrade":"","deductcurrency":"0"},{"userpassword":"","commodityname":"","userid":"39071","buyeruserid":"39071","paymodel":"","orderstatus":"1","brandid":"","paymodelname":"","spreadcode":"0u5b","cashcreator":"20","consumption":"0","orderfrom":"","ordertime":"2020-01-16 12:22:29","deductbalance":"52000","consumepwd":"","couponprice":"0","recomuserid":"22077","strrandom":"","storeamount":"0.0","ordername":"贵州茅台.华茅酒[得民精选]","status":"0","tablenum":"","freecreator":"10","usersource":"0","id":"265","loginpwd":"","canceltime":"","odertypename":"买酒","phonenumber":"17751366866","remark":"","packageid":"","extend2":"","extend1":"","devid":"","usercredits":"0","unitprice":"","percentagestatus":"","registertime":"2019-10-11 12:20:18","orderip":"","pictureaddress":"http://139.196.151.129:8081/upload/brand_small1742019729171912.png","payamount":"0","consumenum":"0","creatorid":"75","orderid":"18140","storename":"楼上楼私房菜","deductmoney":"52000","percentageremark":"","usebalance":"1","checktime":"","wechatid":"oOL3g1YFOja6zjaY9qWwl-Y-L54E_demin","divideproportion":"15","cooperation":"0","avgconsume":"70","brandname":"贵州茅台.华茅酒[得民精选]","waiterproportion":"5","endtime":"2020-01-16 12:37:28","row":"9","odertype":"3","invoicestatus":"1","lastlogintime":"","capitalpool":"0","invoiceid":"","orderendtime":"","divide":"80","city":"1110","storeid":"2581","ispwd":"","paytime":"2020-01-16 12:22:29","thirdpayinfoid":"","buynumber":"","discount":"0","orderstatusname":"已付款","totalmoney":"52000","thirdpartyorder":"","usergrade":"","deductcurrency":"0"},{"userpassword":"","commodityname":"","userid":"","buyeruserid":"-1","paymodel":"5","orderstatus":"2","brandid":"112","paymodelname":"酒券支付","spreadcode":"","cashcreator":"","consumption":"","orderfrom":"","ordertime":"2020-01-16 12:21:11","deductbalance":"0","consumepwd":"","couponprice":"0","recomuserid":"","strrandom":"","storeamount":"0.0","ordername":"五粮液股份[纯粮陈窖]52°","status":"","tablenum":"","freecreator":"","usersource":"","id":"","loginpwd":"","canceltime":"","odertypename":"买酒","phonenumber":"","remark":"","packageid":"","extend2":"","extend1":"","devid":"260001","usercredits":"","unitprice":"38","percentagestatus":"","registertime":"","orderip":"","pictureaddress":"http://139.196.151.129:8081/upload/brand_small112201972618114.png","payamount":"38000","consumenum":"","creatorid":"","orderid":"18139","storename":"苏州得民展示机2","deductmoney":"0","percentageremark":"","usebalance":"","checktime":"","wechatid":"","divideproportion":"","cooperation":"","avgconsume":"","brandname":"五粮液股份[纯粮陈窖]52°","waiterproportion":"","endtime":"2020-01-16 12:36:10","row":"10","odertype":"3","invoicestatus":"1","lastlogintime":"","capitalpool":"0","invoiceid":"","orderendtime":"","divide":"","city":"","storeid":"","ispwd":"","paytime":"","thirdpayinfoid":"","buynumber":"500","discount":"","orderstatusname":"付款失败","totalmoney":"38000","thirdpartyorder":"","usergrade":"","deductcurrency":"0"},{"userpassword":"","commodityname":"","userid":"39071","buyeruserid":"39071","paymodel":"","orderstatus":"1","brandid":"","paymodelname":"","spreadcode":"0u5b","cashcreator":"20","consumption":"0","orderfrom":"","ordertime":"2020-01-16 12:19:51","deductbalance":"52000","consumepwd":"","couponprice":"0","recomuserid":"22077","strrandom":"","storeamount":"0.0","ordername":"贵州茅台.华茅酒[得民精选]","status":"0","tablenum":"","freecreator":"10","usersource":"0","id":"265","loginpwd":"","canceltime":"","odertypename":"买酒","phonenumber":"17751366866","remark":"","packageid":"","extend2":"","extend1":"","devid":"","usercredits":"0","unitprice":"","percentagestatus":"","registertime":"2019-10-11 12:20:18","orderip":"","pictureaddress":"http://139.196.151.129:8081/upload/brand_small1742019729171912.png","payamount":"0","consumenum":"0","creatorid":"75","orderid":"18138","storename":"楼上楼私房菜","deductmoney":"52000","percentageremark":"","usebalance":"1","checktime":"","wechatid":"oOL3g1YFOja6zjaY9qWwl-Y-L54E_demin","divideproportion":"15","cooperation":"0","avgconsume":"70","brandname":"贵州茅台.华茅酒[得民精选]","waiterproportion":"5","endtime":"2020-01-16 12:34:50","row":"11","odertype":"3","invoicestatus":"1","lastlogintime":"","capitalpool":"0","invoiceid":"","orderendtime":"","divide":"80","city":"1110","storeid":"2581","ispwd":"","paytime":"2020-01-16 12:19:51","thirdpayinfoid":"","buynumber":"","discount":"0","orderstatusname":"已付款","totalmoney":"52000","thirdpartyorder":"","usergrade":"","deductcurrency":"0"},{"userpassword":"","commodityname":"","userid":"39071","buyeruserid":"39071","paymodel":"","orderstatus":"1","brandid":"","paymodelname":"","spreadcode":"0u5b","cashcreator":"20","consumption":"0","orderfrom":"","ordertime":"2020-01-16 12:16:58","deductbalance":"52000","consumepwd":"","couponprice":"0","recomuserid":"22077","strrandom":"","storeamount":"0.0","ordername":"贵州茅台.华茅酒[得民精选]","status":"0","tablenum":"","freecreator":"10","usersource":"0","id":"265","loginpwd":"","canceltime":"","odertypename":"买酒","phonenumber":"17751366866","remark":"","packageid":"","extend2":"","extend1":"","devid":"","usercredits":"0","unitprice":"","percentagestatus":"","registertime":"2019-10-11 12:20:18","orderip":"","pictureaddress":"http://139.196.151.129:8081/upload/brand_small1742019729171912.png","payamount":"0","consumenum":"0","creatorid":"75","orderid":"18137","storename":"楼上楼私房菜","deductmoney":"52000","percentageremark":"","usebalance":"1","checktime":"","wechatid":"oOL3g1YFOja6zjaY9qWwl-Y-L54E_demin","divideproportion":"15","cooperation":"0","avgconsume":"70","brandname":"贵州茅台.华茅酒[得民精选]","waiterproportion":"5","endtime":"2020-01-16 12:31:58","row":"12","odertype":"3","invoicestatus":"1","lastlogintime":"","capitalpool":"0","invoiceid":"","orderendtime":"","divide":"80","city":"1110","storeid":"2581","ispwd":"","paytime":"2020-01-16 12:16:58","thirdpayinfoid":"","buynumber":"","discount":"0","orderstatusname":"已付款","totalmoney":"52000","thirdpartyorder":"","usergrade":"","deductcurrency":"0"}],"res.page":[{"RecordsCount":7551,"hasNextPage":true,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12,"TotalPageCount":630}],"res.size":"7551","single.recordsperpage":"-1","row":"1","single.row":"1","totaildeduct":"47880851","single.totaildeduct":"47880851","totailpayamount":"106685301","single.totailpayamount":"106685301","pool":"389152","single.pool":"389152","totailcouponprice":"5404","single.totailcouponprice":"5404","totailpaymoney":"154960708","single.totailpaymoney":"154960708","totalstoreamount":"49394718","single.totalstoreamount":"49394718","returnview":"@json"}
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
    // this.$store.dispatch("Breadecrumb",this.breadData)
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
