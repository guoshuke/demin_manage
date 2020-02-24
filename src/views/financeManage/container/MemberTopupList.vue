<template>
  <div>
    <div class="flex-row filter-box flex-wrap">
      <div>
        <span>手机号：</span>
        <el-input v-model="requestParams.phoneNumber" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>注册时间：</span>
        <el-date-picker
          v-model="requestParams.swapTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div>
        <span>区域：</span>
        <el-input v-model="requestParams.districtName" clearable placeholder="请输入内容"></el-input>
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
        prop="userid"
        label="账号"
        width="90">
      </el-table-column>
      <el-table-column
        prop="phonenumber"
        width="120"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop=""
        label="消费券"
        width="80">
      </el-table-column>
      <el-table-column
        prop=""
        label="赠送酒券"
        width="80">
      </el-table-column>
      <el-table-column
        prop=""
        label="现金池"
        width="80">
      </el-table-column>
      <el-table-column
        prop=""
        label="提成余额"
        width="80">
      </el-table-column>
      <el-table-column
        prop="wechatid"
        label="微信ID"
        width="200">
      </el-table-column>
      <el-table-column
        prop=""
        label="推荐人账号"
        width="110">
      </el-table-column>
      <el-table-column
        prop=""
        label="区域">
      </el-table-column>
      <el-table-column
        prop="registertime"
        label="注册时间"
        width="160">
      </el-table-column>
      <el-table-column
        label="手动充值"
        width="80">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="dialogVisible=true">充值</el-button>
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
  name: 'ChangeWineRecordList',
  components: {
    PageChange,
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        phoneNumber: '',
        districtName: '',
        swapTime: '',
        pageNum: 1,
        pageSize: 10
      },
      dialogVisible: false,
      jsonName: {"jvcpagename":"yjm_users","jvcoldpageName":"yjm_users","cmd":"query","returnvalue":"1","res.recordsperpage":"10","RecordsPerPage":"-1","res":[{"balance":"","districtname":"","userid":"46479","capitalpool":"","checkcode":"","commission":"","ispwd":"","userpassword":"","row":"1","consume":"","loginpwd":"","spreadcode":"","phonenumber":"","registertime":"2020-02-10 15:46:37","buyeruserid":"","lastlogintime":"","lasttime":"","extend2":"","status":"0","extend1":"","intergral":"0","city":"","recomuserid":"","usergrade":"","usersource":"","usercredits":"","wechatid":"oOL3g1YAB-HjaUps6sARKMba0MqU_demin","consumepwd":""},{"balance":"","districtname":"","userid":"46478","capitalpool":"","checkcode":"","commission":"","ispwd":"","userpassword":"","row":"2","consume":"","loginpwd":"","spreadcode":"","phonenumber":"","registertime":"2020-02-10 09:20:09","buyeruserid":"","lastlogintime":"","lasttime":"","extend2":"","status":"0","extend1":"","intergral":"0","city":"","recomuserid":"","usergrade":"","usersource":"","usercredits":"","wechatid":"oOL3g1ek0lmRUhiuIO_ujIFaGBCY_demin","consumepwd":""},{"balance":"","districtname":"","userid":"46477","capitalpool":"","checkcode":"","commission":"","ispwd":"","userpassword":"","row":"3","consume":"","loginpwd":"","spreadcode":"0zv1","phonenumber":"","registertime":"2020-02-10 08:07:47","buyeruserid":"","lastlogintime":"","lasttime":"","extend2":"","status":"0","extend1":"","intergral":"0","city":"","recomuserid":"","usergrade":"","usersource":"0","usercredits":"0","wechatid":"oOL3g1SKiTj4I7fHqHOKCbhRwDOY_demin","consumepwd":""},{"balance":"","districtname":"","userid":"46476","capitalpool":"","checkcode":"","commission":"","ispwd":"","userpassword":"","row":"4","consume":"","loginpwd":"","spreadcode":"","phonenumber":"","registertime":"2020-02-10 03:41:13","buyeruserid":"","lastlogintime":"","lasttime":"","extend2":"","status":"0","extend1":"","intergral":"0","city":"","recomuserid":"","usergrade":"","usersource":"","usercredits":"","wechatid":"oOL3g1feZtSEPS-mWLl9JqUr9vM8_demin","consumepwd":""},{"balance":"","districtname":"","userid":"46475","capitalpool":"","checkcode":"","commission":"","ispwd":"","userpassword":"","row":"5","consume":"","loginpwd":"","spreadcode":"","phonenumber":"","registertime":"2020-02-10 00:52:01","buyeruserid":"","lastlogintime":"","lasttime":"","extend2":"","status":"0","extend1":"","intergral":"0","city":"","recomuserid":"","usergrade":"","usersource":"","usercredits":"","wechatid":"oOL3g1Wvr14GMZ37IKnsutIBiUz8_demin","consumepwd":""},{"balance":"","districtname":"","userid":"46474","capitalpool":"","checkcode":"","commission":"","ispwd":"","userpassword":"","row":"6","consume":"","loginpwd":"","spreadcode":"","phonenumber":"","registertime":"2020-02-09 23:12:26","buyeruserid":"","lastlogintime":"","lasttime":"","extend2":"","status":"0","extend1":"","intergral":"0","city":"","recomuserid":"","usergrade":"","usersource":"","usercredits":"","wechatid":"oOL3g1Ud3v2xeAzbfwG9Tz561SAA_demin","consumepwd":""},{"balance":"","districtname":"","userid":"46473","capitalpool":"","checkcode":"","commission":"","ispwd":"","userpassword":"","row":"7","consume":"","loginpwd":"","spreadcode":"","phonenumber":"","registertime":"2020-02-09 22:56:48","buyeruserid":"","lastlogintime":"","lasttime":"","extend2":"","status":"0","extend1":"","intergral":"0","city":"","recomuserid":"","usergrade":"","usersource":"","usercredits":"","wechatid":"oOL3g1QtNJMCKV6Nl7wWJ3WvRAGA_demin","consumepwd":""},{"balance":"","districtname":"","userid":"46472","capitalpool":"","checkcode":"","commission":"","ispwd":"","userpassword":"","row":"8","consume":"","loginpwd":"","spreadcode":"","phonenumber":"","registertime":"2020-02-09 22:43:32","buyeruserid":"","lastlogintime":"","lasttime":"","extend2":"","status":"0","extend1":"","intergral":"0","city":"","recomuserid":"","usergrade":"","usersource":"","usercredits":"","wechatid":"oOL3g1fiaYxPMK_Gl15Ns_BPy5js_demin","consumepwd":""},{"balance":"","districtname":"","userid":"46471","capitalpool":"","checkcode":"","commission":"","ispwd":"","userpassword":"","row":"9","consume":"","loginpwd":"","spreadcode":"","phonenumber":"","registertime":"2020-02-09 22:04:23","buyeruserid":"","lastlogintime":"","lasttime":"","extend2":"","status":"0","extend1":"","intergral":"0","city":"","recomuserid":"","usergrade":"","usersource":"","usercredits":"","wechatid":"oOL3g1f_MQrm-Tdha1yXzwfx1n9M_demin","consumepwd":""},{"balance":"","districtname":"","userid":"46470","capitalpool":"","checkcode":"","commission":"","ispwd":"","userpassword":"","row":"10","consume":"","loginpwd":"","spreadcode":"","phonenumber":"","registertime":"2020-02-09 22:03:10","buyeruserid":"","lastlogintime":"","lasttime":"","extend2":"","status":"0","extend1":"","intergral":"0","city":"","recomuserid":"","usergrade":"","usersource":"","usercredits":"","wechatid":"oOL3g1WCJfNBMOSe7lc6O4jURHw8_demin","consumepwd":""}],"res.page":[{"RecordsCount":45954,"hasNextPage":true,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":10,"TotalPageCount":4596}],"res.size":"45954","single.recordsperpage":"-1","row":"1","single.row":"1","totalconsume":"3522051","single.totalconsume":"3522051","totalbalance":"15851726","single.totalbalance":"15851726","totalcapitalpool":"203398","single.totalcapitalpool":"203398","totalcommission":"575027","single.totalcommission":"575027","returnview":""}
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
