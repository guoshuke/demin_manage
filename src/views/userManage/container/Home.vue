<template>
  <div>
    <div class="flex-row filter-box">
      <div>
        <span>用户ID：</span>
        <el-input v-model="requestParams.phone" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <el-button type="primary">查询</el-button>
        <el-button type="primary">赠送分享礼包</el-button>
      </div>
    </div>
    <el-table
      :data="jsonName.res"
      border
      style="width: 100%">
      <el-table-column
        prop="userid"
        label="用户ID"
        width="80">
      </el-table-column>
      <el-table-column
        prop="phonenumber"
        label="用户手机">
      </el-table-column>
      <el-table-column
        prop="registertime"
        label="注册时间">
      </el-table-column>
      <el-table-column
        prop="spreadcode"
        label="推广码">
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
  name: 'home',
  components: {
    PageChange
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        phone: '',
        pageNum: 1,
        pageSize: 10
      },
      options: [{
        value: '0',
        label: '全部'
      }, {
        value: '1',
        label: '可用'
      }, {
        value: '2',
        label: '不可用'
      }],
      value: '',
      tableData: [],
      dialogVisible: false,
      jsonName: {"jvcpagename":"se_store","jvcoldpageName":"se_store","cmd":"querySendGiftList","returnvalue":"1","res.recordsperpage":"12","RecordsPerPage":"12","res":[{"userid":"2","ispwd":"2","userpassword":"","row":"1","loginpwd":"96e79218965eb72c92a549dd5a330112","spreadcode":"0001","phonenumber":"13880912212","registertime":"2017-06-20 17:54:13","lastlogintime":"","extend2":"","status":"0","extend1":"","city":"277","recomuserid":"1785","usergrade":"","usersource":"0","usercredits":"0","wechatid":"oOL3g1ZAGC_HG-e9GzV5tbV_MYxY_demin","consumepwd":"e10adc3949ba59abbe56e057f20f883e"},{"userid":"5","ispwd":"","userpassword":"","row":"2","loginpwd":"","spreadcode":"","phonenumber":"15882459298","registertime":"2019-10-11 10:57:40","lastlogintime":"","extend2":"","status":"0","extend1":"","city":"277","recomuserid":"","usergrade":"","usersource":"0","usercredits":"","wechatid":"oSnf3v67M1SW2B1XN6LuC8gbmwqU_demin","consumepwd":""},{"userid":"6","ispwd":"","userpassword":"","row":"3","loginpwd":"","spreadcode":"","phonenumber":"13952622285","registertime":"2019-10-11 10:57:41","lastlogintime":"","extend2":"","status":"1","extend1":"","city":"277","recomuserid":"","usergrade":"","usersource":"0","usercredits":"","wechatid":"oSnf3vy2FYG1TkvFYMEv_mQTvyCU_demin","consumepwd":""},{"userid":"7","ispwd":"","userpassword":"","row":"4","loginpwd":"","spreadcode":"","phonenumber":"13852626083","registertime":"2019-10-11 10:57:44","lastlogintime":"","extend2":"","status":"1","extend1":"","city":"277","recomuserid":"","usergrade":"","usersource":"0","usercredits":"","wechatid":"oSnf3v1jMULG5mwh8wIk_l8cdCQE_demin","consumepwd":""},{"userid":"9","ispwd":"","userpassword":"","row":"5","loginpwd":"","spreadcode":"","phonenumber":"18361033129","registertime":"2019-10-11 10:57:45","lastlogintime":"","extend2":"","status":"0","extend1":"","city":"277","recomuserid":"","usergrade":"","usersource":"0","usercredits":"","wechatid":"oSnf3v2cr5I80-krZJ4gpKTtMD9o_demin","consumepwd":""},{"userid":"10","ispwd":"","userpassword":"","row":"6","loginpwd":"","spreadcode":"","phonenumber":"15952906552","registertime":"2019-10-11 10:57:40","lastlogintime":"","extend2":"","status":"1","extend1":"","city":"277","recomuserid":"","usergrade":"","usersource":"0","usercredits":"","wechatid":"oSnf3v05fZ7-sGsunb_b77UyoCN4_demin","consumepwd":""},{"userid":"11","ispwd":"","userpassword":"","row":"7","loginpwd":"","spreadcode":"","phonenumber":"13909280809","registertime":"2019-10-11 10:57:48","lastlogintime":"","extend2":"","status":"1","extend1":"","city":"277","recomuserid":"","usergrade":"","usersource":"0","usercredits":"","wechatid":"oSnf3v7m0t16JWGEWNMyQQjHObtc_demin","consumepwd":""},{"userid":"13","ispwd":"","userpassword":"","row":"8","loginpwd":"","spreadcode":"","phonenumber":"13179477760","registertime":"2019-10-11 10:57:40","lastlogintime":"","extend2":"","status":"0","extend1":"","city":"277","recomuserid":"","usergrade":"","usersource":"0","usercredits":"","wechatid":"oSnf3vy5dkju7ShrytguYbXWk6yc_demin","consumepwd":""},{"userid":"14","ispwd":"","userpassword":"","row":"9","loginpwd":"","spreadcode":"","phonenumber":"15252928625","registertime":"2019-10-11 10:57:40","lastlogintime":"","extend2":"","status":"1","extend1":"","city":"277","recomuserid":"","usergrade":"","usersource":"0","usercredits":"","wechatid":"oSnf3v8ntUAkptAoOl9L9o9HDZ2Q_demin","consumepwd":""},{"userid":"16","ispwd":"","userpassword":"","row":"10","loginpwd":"","spreadcode":"","phonenumber":"","registertime":"2017-06-21 06:44:06","lastlogintime":"","extend2":"","status":"1","extend1":"","city":"277","recomuserid":"","usergrade":"","usersource":"0","usercredits":"","wechatid":"oSnf3vyavrQo5Fy5rMBmhX6t9DPI_demin","consumepwd":""},{"userid":"17","ispwd":"","userpassword":"","row":"11","loginpwd":"","spreadcode":"","phonenumber":"","registertime":"2017-06-21 07:07:22","lastlogintime":"","extend2":"","status":"1","extend1":"","city":"277","recomuserid":"","usergrade":"","usersource":"0","usercredits":"","wechatid":"oSnf3v0ohX5fvCtNHZcesizoXQtk_demin","consumepwd":""},{"userid":"20","ispwd":"","userpassword":"","row":"12","loginpwd":"","spreadcode":"","phonenumber":"15982426320","registertime":"2017-06-21 10:37:09","lastlogintime":"","extend2":"","status":"0","extend1":"","city":"277","recomuserid":"","usergrade":"","usersource":"0","usercredits":"","wechatid":"oSnf3v98FNxa-75HIdTdCRgSir1I_demin","consumepwd":""}],"res.page":[{"RecordsCount":34689,"hasNextPage":true,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12,"TotalPageCount":2891}],"res.size":"34689","returnview":"@json"}
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
    this.$store.dispatch("Breadecrumb",this.breadData)
  }
}
</script>
<style scoped>

  .el-input {
    width: 150px;
  }
</style>
