<template>
  <div>
    <div class="flex-row filter-box flex-wrap">
      <div>
        <span>订单号：</span>
        <el-input v-model="requestParams.orderId" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>会员手机：</span>
        <el-input v-model="requestParams.userPhone" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>订单状态：</span>
        <el-select v-model="requestParams.orderStatus" placeholder="请选择" style="width: 100px">
          <el-option
            v-for="item in orderStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <span>订单来源：</span>
        <el-select v-model="requestParams.orderFrom" placeholder="请选择" style="width: 100px">
          <el-option
            v-for="item in orderFromOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <span>支付方式：</span>
        <el-select v-model="requestParams.payModel" placeholder="请选择" style="width: 100px">
          <el-option
            v-for="item in payModelOptions"
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
        width="70">
      </el-table-column>
      <el-table-column
        prop="addvolumeuser"
        label="账号"
        width="60">
      </el-table-column>
      <el-table-column
        prop="userphone"
        label="会员手机">
      </el-table-column>
      <el-table-column
        prop="ordertime"
        label="订单时间">
      </el-table-column>
      <el-table-column
        prop="brandname"
        label="品牌">
      </el-table-column>
      <el-table-column
        prop="unitpricestr"
        label="单价"
        width="60">
      </el-table-column>
      <el-table-column
        prop="buynumber"
        label="购买数量"
        width="80">
      </el-table-column>
      <el-table-column
        label="支付金额"
        width="80">
        <template slot-scope="scope">
          <span>{{scope.row.payamount/100}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="paymodelname"
        label="支付方式"
        width="80">
      </el-table-column>
      <el-table-column
        prop="thirdpartyorder"
        label="第三方订单号">
      </el-table-column>
      <el-table-column
        prop="orderstatusname"
        label="订单状态"
        width="80">
      </el-table-column>
      <el-table-column
        prop="orderfromname"
        label="订单来源"
        width="70">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注">
      </el-table-column>
      <el-table-column
        label="操作"
        width="50">
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
  name: 'PayErrorList',
  components: {
    PageChange,
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        orderId: '',
        userPhone: '',
        orderStatus: '',
        orderFrom: '',
        payModel: '',
        orderTime: '',
        pageNum: 1,
        pageSize: 10
      },
      orderStatusOptions: [{
        value: '',
        label: '全部'
      }, {
        value: '0',
        label: '未付款'
      }, {
        value: '1',
        label: '已付款'
      }, {
        value: '2',
        label: '付款失败'
      }],
      orderFromOptions: [{
        value: '',
        label: '全部'
      }, {
        value: '1',
        label: 'PC'
      }, {
        value: '2',
        label: 'android'
      }, {
        value: '3',
        label: 'ios'
      }, {
        value: '4',
        label: 'client'
      }],
      payModelOptions: [{
        value: '',
        label: '全部'
      }, {
        value: '1',
        label: '服务员代买'
      }, {
        value: '2',
        label: '银联'
      }, {
        value: '3',
        label: '支付宝'
      }, {
        value: '4',
        label: '钱包支付'
      }, {
        value: '6',
        label: '微信支付'
      }],
      dialogVisible: false,
      jsonName: {"jvcpagename":"ur_orderinfo","jvcoldpageName":"ur_orderinfo","cmd":"queryanduser","returnvalue":"1","res.recordsperpage":"12","RecordsPerPage":"-1","res":[{"userbirthday":"","apparea":"","charactersign":"","paycase":"1","paytime":"","paymodelname":"钱包支付","paypwd":"","transid":"","devid":"","lastlogintime":"2019-05-05 13:29:46","identitytype":"","userphone":"","buynumber":"50","usercredits":"0","unitprice":"12000","ordertime":"2019-08-30 14:20:15","usersex":"","addvolumeuser":"50643","identitycode":"","wechatid":"oxi19uGpVV7fYHQSJXpMkvNwK-hU_mjh5299","paycount":"0","orderdate":"","bankaccount":"","lastlogintype":"11","row":"1","registermodel":"11","usertype":"","remark":"","secureemail":"","userparentid":"","useremail":"","thirdpartyorder":"20190830142018_16311","userpassword":"","balance":"","maxamount":"0","orderfromname":"","payamountstr":"12","paymodel":"4","unitpricestr":"120","orderstatus":"0","orderip":"10.25.23.96","surplus":"0","brandname":"泸州老窖永盛烧坊[10]","leveltime":"","unitid":"","username":"","orderfrom":"5","orderid":"16311","buyeruserid":"50643","registertime":"2019-05-05 13:29:46","lastloginaddr":"","orderstatusname":"未付款","payamount":"1200","baiduid":"","recomuserid":"","levelid":"","useraddr":"","areaid":"","waiterauth":"0","brandid":"116","bankaddr":"","userphonewx":"","likedrink":"","alipayid":"","userage":"","alipayname":"","buycredits":"","clientid":"","chargelevelid":""},{"userbirthday":"","apparea":"","charactersign":"","paycase":"1","paytime":"","paymodelname":"微信支付","paypwd":"","transid":"","devid":"","lastlogintime":"2019-05-05 13:29:46","identitytype":"","userphone":"","buynumber":"50","usercredits":"0","unitprice":"12000","ordertime":"2019-08-30 14:20:09","usersex":"","addvolumeuser":"50643","identitycode":"","wechatid":"oxi19uGpVV7fYHQSJXpMkvNwK-hU_mjh5299","paycount":"0","orderdate":"","bankaccount":"","lastlogintype":"11","row":"2","registermodel":"11","usertype":"","remark":"","secureemail":"","userparentid":"","useremail":"","thirdpartyorder":"20190830142010_16310","userpassword":"","balance":"","maxamount":"0","orderfromname":"","payamountstr":"12","paymodel":"6","unitpricestr":"120","orderstatus":"0","orderip":"10.25.23.96","surplus":"0","brandname":"泸州老窖永盛烧坊[10]","leveltime":"","unitid":"","username":"","orderfrom":"5","orderid":"16310","buyeruserid":"50643","registertime":"2019-05-05 13:29:46","lastloginaddr":"","orderstatusname":"未付款","payamount":"1200","baiduid":"","recomuserid":"","levelid":"","useraddr":"","areaid":"","waiterauth":"0","brandid":"116","bankaddr":"","userphonewx":"","likedrink":"","alipayid":"","userage":"","alipayname":"","buycredits":"","clientid":"","chargelevelid":""},{"userbirthday":"","apparea":"","charactersign":"","paycase":"1","paytime":"2019-08-29 21:36:18","paymodelname":"微信支付","paypwd":"","transid":"","devid":"","lastlogintime":"2018-07-06 16:06:10","identitytype":"","userphone":"","buynumber":"50","usercredits":"0","unitprice":"65000","ordertime":"2019-08-29 21:36:09","usersex":"","addvolumeuser":"50119","identitycode":"","wechatid":"oxi19uLmeNi2ZDf1OhUZKHEwUct4_mjh5299","paycount":"0","orderdate":"","bankaccount":"","lastlogintype":"11","row":"3","registermodel":"11","usertype":"","remark":"1","secureemail":"","userparentid":"","useremail":"","thirdpartyorder":"20190829213609_16309","userpassword":"","balance":"","maxamount":"0","orderfromname":"","payamountstr":"65","paymodel":"6","unitpricestr":"650","orderstatus":"1","orderip":"10.25.23.96","surplus":"50","brandname":"沱牌生态[10年]酱香","leveltime":"","unitid":"","username":"","orderfrom":"5","orderid":"16309","buyeruserid":"50119","registertime":"2018-07-06 16:06:10","lastloginaddr":"","orderstatusname":"已付款","payamount":"6500","baiduid":"","recomuserid":"","levelid":"","useraddr":"","areaid":"","waiterauth":"0","brandid":"121","bankaddr":"","userphonewx":"13261555581","likedrink":"","alipayid":"","userage":"","alipayname":"","buycredits":"","clientid":"","chargelevelid":""},{"userbirthday":"","apparea":"","charactersign":"","paycase":"1","paytime":"","paymodelname":"微信支付","paypwd":"","transid":"","devid":"","lastlogintime":"2018-07-06 16:06:10","identitytype":"","userphone":"","buynumber":"50","usercredits":"0","unitprice":"36500","ordertime":"2019-08-29 17:00:14","usersex":"","addvolumeuser":"50119","identitycode":"","wechatid":"oxi19uLmeNi2ZDf1OhUZKHEwUct4_mjh5299","paycount":"0","orderdate":"","bankaccount":"","lastlogintype":"11","row":"4","registermodel":"11","usertype":"","remark":"","secureemail":"","userparentid":"","useremail":"","thirdpartyorder":"20190829170014_16308","userpassword":"","balance":"","maxamount":"0","orderfromname":"","payamountstr":"36.5","paymodel":"6","unitpricestr":"365","orderstatus":"0","orderip":"10.25.23.96","surplus":"0","brandname":"天香池[15年]","leveltime":"","unitid":"","username":"","orderfrom":"5","orderid":"16308","buyeruserid":"50119","registertime":"2018-07-06 16:06:10","lastloginaddr":"","orderstatusname":"未付款","payamount":"3650","baiduid":"","recomuserid":"","levelid":"","useraddr":"","areaid":"","waiterauth":"0","brandid":"125","bankaddr":"","userphonewx":"13261555581","likedrink":"","alipayid":"","userage":"","alipayname":"","buycredits":"","clientid":"","chargelevelid":""},{"userbirthday":"","apparea":"","charactersign":"","paycase":"1","paytime":"","paymodelname":"钱包支付","paypwd":"","transid":"","devid":"","lastlogintime":"2018-07-06 16:06:10","identitytype":"","userphone":"","buynumber":"50","usercredits":"0","unitprice":"31000","ordertime":"2019-08-29 16:52:04","usersex":"","addvolumeuser":"50119","identitycode":"","wechatid":"oxi19uLmeNi2ZDf1OhUZKHEwUct4_mjh5299","paycount":"0","orderdate":"","bankaccount":"","lastlogintype":"11","row":"5","registermodel":"11","usertype":"","remark":"","secureemail":"","userparentid":"","useremail":"","thirdpartyorder":"20190829165210_16307","userpassword":"","balance":"","maxamount":"0","orderfromname":"","payamountstr":"31","paymodel":"4","unitpricestr":"310","orderstatus":"0","orderip":"10.25.23.96","surplus":"0","brandname":"沱牌生态[10年]浓香","leveltime":"","unitid":"","username":"","orderfrom":"5","orderid":"16307","buyeruserid":"50119","registertime":"2018-07-06 16:06:10","lastloginaddr":"","orderstatusname":"未付款","payamount":"3100","baiduid":"","recomuserid":"","levelid":"","useraddr":"","areaid":"","waiterauth":"0","brandid":"120","bankaddr":"","userphonewx":"13261555581","likedrink":"","alipayid":"","userage":"","alipayname":"","buycredits":"","clientid":"","chargelevelid":""},{"userbirthday":"","apparea":"","charactersign":"","paycase":"1","paytime":"","paymodelname":"微信支付","paypwd":"","transid":"","devid":"","lastlogintime":"2018-07-06 16:06:10","identitytype":"","userphone":"","buynumber":"50","usercredits":"0","unitprice":"31000","ordertime":"2019-08-29 16:51:46","usersex":"","addvolumeuser":"50119","identitycode":"","wechatid":"oxi19uLmeNi2ZDf1OhUZKHEwUct4_mjh5299","paycount":"0","orderdate":"","bankaccount":"","lastlogintype":"11","row":"6","registermodel":"11","usertype":"","remark":"","secureemail":"","userparentid":"","useremail":"","thirdpartyorder":"20190829165146_16306","userpassword":"","balance":"","maxamount":"0","orderfromname":"","payamountstr":"31","paymodel":"6","unitpricestr":"310","orderstatus":"0","orderip":"10.25.23.96","surplus":"0","brandname":"沱牌生态[10年]浓香","leveltime":"","unitid":"","username":"","orderfrom":"5","orderid":"16306","buyeruserid":"50119","registertime":"2018-07-06 16:06:10","lastloginaddr":"","orderstatusname":"未付款","payamount":"3100","baiduid":"","recomuserid":"","levelid":"","useraddr":"","areaid":"","waiterauth":"0","brandid":"120","bankaddr":"","userphonewx":"13261555581","likedrink":"","alipayid":"","userage":"","alipayname":"","buycredits":"","clientid":"","chargelevelid":""},{"userbirthday":"","apparea":"","charactersign":"","paycase":"1","paytime":"","paymodelname":"支付宝","paypwd":"","transid":"","devid":"","lastlogintime":"2019-08-26 09:13:08","identitytype":"0","userphone":"13910226464","buynumber":"100","usercredits":"0","unitprice":"18000","ordertime":"2019-08-03 12:42:10","usersex":"","addvolumeuser":"50691","identitycode":"","wechatid":"","paycount":"0","orderdate":"","bankaccount":"","lastlogintype":"1","row":"7","registermodel":"2","usertype":"","remark":"","secureemail":"","userparentid":"","useremail":"ServerB Runing","thirdpartyorder":"20190803124215_16301","userpassword":"c2315f239da746fe8bd6f580c96c2d19","balance":"","maxamount":"0","orderfromname":"android","payamountstr":"36","paymodel":"3","unitpricestr":"180","orderstatus":"0","orderip":"223.104.15.85","surplus":"0","brandname":"沱牌生态[6年]","leveltime":"","unitid":"","username":"","orderfrom":"2","orderid":"16301","buyeruserid":"50691","registertime":"2019-08-03 12:39:37","lastloginaddr":"ServerB Runing","orderstatusname":"未付款","payamount":"3600","baiduid":"","recomuserid":"","levelid":"3","useraddr":"","areaid":"","waiterauth":"0","brandid":"118","bankaddr":"","userphonewx":"","likedrink":"","alipayid":"","userage":"","alipayname":"","buycredits":"","clientid":"","chargelevelid":""},{"userbirthday":"","apparea":"","charactersign":"","paycase":"1","paytime":"","paymodelname":"","paypwd":"","transid":"","devid":"","lastlogintime":"2019-04-24 15:22:06","identitytype":"0","userphone":"18251884427","buynumber":"1000","usercredits":"0","unitprice":"9000","ordertime":"2019-05-28 10:37:43","usersex":"","addvolumeuser":"50626","identitycode":"","wechatid":"","paycount":"0","orderdate":"","bankaccount":"","lastlogintype":"3","row":"8","registermodel":"3","usertype":"","remark":"","secureemail":"","userparentid":"","useremail":"ServerB Runing","thirdpartyorder":"","userpassword":"4b9368e2af891669a292f3617c5f7da2","balance":"","maxamount":"0","orderfromname":"ios","payamountstr":"180","paymodel":"","unitpricestr":"90","orderstatus":"0","orderip":"10.25.23.96","surplus":"0","brandname":"曼珠沙华","leveltime":"","unitid":"","username":"","orderfrom":"3","orderid":"16297","buyeruserid":"50626","registertime":"2019-04-24 15:22:04","lastloginaddr":"ServerB Runing","orderstatusname":"未付款","payamount":"18000","baiduid":"d43f10655ec6c79edbc1e613b652df64c2f9a5b053861078190cf18e9aedc874","recomuserid":"","levelid":"3","useraddr":"","areaid":"","waiterauth":"0","brandid":"238","bankaddr":"","userphonewx":"","likedrink":"","alipayid":"","userage":"","alipayname":"","buycredits":"","clientid":"","chargelevelid":""},{"userbirthday":"","apparea":"","charactersign":"","paycase":"1","paytime":"","paymodelname":"微信支付","paypwd":"","transid":"","devid":"","lastlogintime":"2019-05-06 07:44:20","identitytype":"","userphone":"","buynumber":"50","usercredits":"0","unitprice":"65000","ordertime":"2019-05-06 07:46:08","usersex":"","addvolumeuser":"50646","identitycode":"","wechatid":"oxi19uE3NPtE0b0Mv7ZiYxeArsLI_mjh5299","paycount":"0","orderdate":"","bankaccount":"","lastlogintype":"11","row":"9","registermodel":"11","usertype":"","remark":"","secureemail":"","userparentid":"","useremail":"","thirdpartyorder":"20190506074609_16296","userpassword":"","balance":"","maxamount":"0","orderfromname":"","payamountstr":"65","paymodel":"6","unitpricestr":"650","orderstatus":"0","orderip":"10.25.23.96","surplus":"0","brandname":"贵州茅台.华茅酒[得民精选]","leveltime":"","unitid":"","username":"","orderfrom":"5","orderid":"16296","buyeruserid":"50646","registertime":"2019-05-06 07:44:20","lastloginaddr":"","orderstatusname":"未付款","payamount":"6500","baiduid":"","recomuserid":"","levelid":"","useraddr":"","areaid":"","waiterauth":"0","brandid":"174","bankaddr":"","userphonewx":"","likedrink":"","alipayid":"","userage":"","alipayname":"","buycredits":"","clientid":"","chargelevelid":""},{"userbirthday":"","apparea":"","charactersign":"","paycase":"1","paytime":"2019-04-01 17:46:16","paymodelname":"微信支付","paypwd":"e12c6698ce130a8c92e6953298ba7a55","transid":"","devid":"","lastlogintime":"2016-12-25 19:49:26","identitytype":"","userphone":"","buynumber":"500","usercredits":"0","unitprice":"38000","ordertime":"2019-04-01 17:46:02","usersex":"","addvolumeuser":"39485","identitycode":"","wechatid":"oxi19uJTMbV4TgEf4bzF6fCgiU_A_mjh5299","paycount":"0","orderdate":"","bankaccount":"","lastlogintype":"11","row":"10","registermodel":"11","usertype":"","remark":"1","secureemail":"","userparentid":"","useremail":"","thirdpartyorder":"20190401174602_16295","userpassword":"","balance":"","maxamount":"0","orderfromname":"","payamountstr":"380","paymodel":"6","unitpricestr":"380","orderstatus":"1","orderip":"10.25.23.96","surplus":"500","brandname":"五粮液股份[纯粮陈窖]52°","leveltime":"","unitid":"","username":"王小梅","orderfrom":"5","orderid":"16295","buyeruserid":"39485","registertime":"2016-12-25 19:49:26","lastloginaddr":"","orderstatusname":"已付款","payamount":"38000","baiduid":"","recomuserid":"","levelid":"","useraddr":"","areaid":"","waiterauth":"1","brandid":"112","bankaddr":"","userphonewx":"13893203760","likedrink":"","alipayid":"","userage":"","alipayname":"","buycredits":"","clientid":"","chargelevelid":""},{"userbirthday":"","apparea":"","charactersign":"","paycase":"1","paytime":"","paymodelname":"微信支付","paypwd":"e12c6698ce130a8c92e6953298ba7a55","transid":"","devid":"","lastlogintime":"2016-12-25 19:49:26","identitytype":"","userphone":"","buynumber":"50","usercredits":"0","unitprice":"38000","ordertime":"2019-04-01 17:41:13","usersex":"","addvolumeuser":"39485","identitycode":"","wechatid":"oxi19uJTMbV4TgEf4bzF6fCgiU_A_mjh5299","paycount":"0","orderdate":"","bankaccount":"","lastlogintype":"11","row":"11","registermodel":"11","usertype":"","remark":"","secureemail":"","userparentid":"","useremail":"","thirdpartyorder":"20190401174113_16294","userpassword":"","balance":"","maxamount":"0","orderfromname":"","payamountstr":"38","paymodel":"6","unitpricestr":"380","orderstatus":"0","orderip":"10.25.23.96","surplus":"0","brandname":"五粮液股份[纯粮陈窖]52°","leveltime":"","unitid":"","username":"王小梅","orderfrom":"5","orderid":"16294","buyeruserid":"39485","registertime":"2016-12-25 19:49:26","lastloginaddr":"","orderstatusname":"未付款","payamount":"3800","baiduid":"","recomuserid":"","levelid":"","useraddr":"","areaid":"","waiterauth":"1","brandid":"112","bankaddr":"","userphonewx":"13893203760","likedrink":"","alipayid":"","userage":"","alipayname":"","buycredits":"","clientid":"","chargelevelid":""},{"userbirthday":"","apparea":"","charactersign":"","paycase":"1","paytime":"2019-03-19 18:30:07","paymodelname":"微信支付","paypwd":"","transid":"","devid":"","lastlogintime":"2017-05-20 18:35:58","identitytype":"","userphone":"","buynumber":"250","usercredits":"0","unitprice":"38000","ordertime":"2019-03-19 18:30:01","usersex":"","addvolumeuser":"45755","identitycode":"","wechatid":"oxi19uG9ZaFgHLzaQIS8MgajVOfM_mjh5299","paycount":"0","orderdate":"","bankaccount":"","lastlogintype":"11","row":"12","registermodel":"11","usertype":"","remark":"1","secureemail":"","userparentid":"","useremail":"","thirdpartyorder":"20190319183001_16293","userpassword":"","balance":"","maxamount":"0","orderfromname":"","payamountstr":"190","paymodel":"6","unitpricestr":"380","orderstatus":"1","orderip":"10.25.23.96","surplus":"250","brandname":"五粮液股份[纯粮陈窖]52°","leveltime":"","unitid":"","username":"","orderfrom":"5","orderid":"16293","buyeruserid":"45755","registertime":"2017-05-20 18:35:58","lastloginaddr":"","orderstatusname":"已付款","payamount":"19000","baiduid":"","recomuserid":"","levelid":"","useraddr":"","areaid":"","waiterauth":"1","brandid":"112","bankaddr":"","userphonewx":"","likedrink":"","alipayid":"","userage":"","alipayname":"","buycredits":"","clientid":"","chargelevelid":""}],"res.page":[{"RecordsCount":14658,"hasNextPage":true,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12,"TotalPageCount":1222}],"res.size":"14658","single.recordsperpage":"-1","row":"1","single.row":"1","payamount":"285772785","single.payamount":"285772785","returnview":"@json"},
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
