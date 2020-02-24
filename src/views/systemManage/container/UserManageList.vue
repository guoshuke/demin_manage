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
          v-model="requestParams.registerTimeBQ"
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
        width="80"
        label="账号">
      </el-table-column>
      <el-table-column
        prop="phonenumber"
        label="手机号"
        width="120">
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
        prop="recomuserid"
        label="推荐人账号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="districtname"
        label="区域">
      </el-table-column>
      <el-table-column
        prop="registertime"
        label="注册时间">
      </el-table-column>
      <el-table-column
        prop="helperStatus"
        label="操作"
        width="60">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="dialogVisible=true"><i class="el-icon-edit icon-size"></i></el-button>
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
  name: 'AppMenuList',
  components: {
    PageChange
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        phoneNumber:'',
        registerTimeBQ: '',
        registerTimeEQ: '',
        districtName: '',
        pageNum: 1,
        pageSize: 10
      },
      options: [{
        value: '0',
        label: '全部'
      }, {
        value: '1',
        label: '显示中'
      }, {
        value: '2',
        label: '已隐藏'
      }],
      dialogVisible: false,
      jsonName:{"jvcpagename":"yjm_users","jvcoldpageName":"yjm_users","cmd":"query","returnvalue":"1","res.recordsperpage":"10","RecordsPerPage":"-1","res":[{"balance":"","districtname":"","userid":"46453","capitalpool":"","checkcode":"","commission":"","ispwd":"","userpassword":"","row":"1","consume":"","loginpwd":"","spreadcode":"","phonenumber":"","registertime":"2020-02-09 16:53:03","buyeruserid":"","lastlogintime":"","lasttime":"","extend2":"","status":"0","extend1":"","intergral":"0","city":"","recomuserid":"","usergrade":"","usersource":"","usercredits":"","wechatid":"oOL3g1bpeu_GCPiAJSKKDwkZ4KLk_demin","consumepwd":""},{"balance":"","districtname":"","userid":"46452","capitalpool":"","checkcode":"","commission":"","ispwd":"","userpassword":"","row":"2","consume":"","loginpwd":"","spreadcode":"","phonenumber":"","registertime":"2020-02-09 16:50:23","buyeruserid":"","lastlogintime":"","lasttime":"","extend2":"","status":"0","extend1":"","intergral":"0","city":"","recomuserid":"","usergrade":"","usersource":"","usercredits":"","wechatid":"oOL3g1XRzEc-C0LEPPTDvGJuuWMQ_demin","consumepwd":""},{"balance":"","districtname":"","userid":"46451","capitalpool":"","checkcode":"","commission":"","ispwd":"","userpassword":"","row":"3","consume":"","loginpwd":"","spreadcode":"","phonenumber":"","registertime":"2020-02-09 16:47:22","buyeruserid":"","lastlogintime":"","lasttime":"","extend2":"","status":"0","extend1":"","intergral":"0","city":"","recomuserid":"","usergrade":"","usersource":"","usercredits":"","wechatid":"oOL3g1WImM1T_vu2C7y7cqA2KJvU_demin","consumepwd":""},{"balance":"","districtname":"","userid":"46450","capitalpool":"","checkcode":"","commission":"","ispwd":"","userpassword":"","row":"4","consume":"","loginpwd":"","spreadcode":"","phonenumber":"","registertime":"2020-02-09 16:46:14","buyeruserid":"","lastlogintime":"","lasttime":"","extend2":"","status":"0","extend1":"","intergral":"0","city":"","recomuserid":"","usergrade":"","usersource":"","usercredits":"","wechatid":"oOL3g1ZIU6WRCO2eyHrbed6VospY_demin","consumepwd":""},{"balance":"","districtname":"","userid":"46449","capitalpool":"","checkcode":"","commission":"","ispwd":"","userpassword":"","row":"5","consume":"","loginpwd":"","spreadcode":"","phonenumber":"","registertime":"2020-02-09 16:44:56","buyeruserid":"","lastlogintime":"","lasttime":"","extend2":"","status":"0","extend1":"","intergral":"0","city":"","recomuserid":"","usergrade":"","usersource":"","usercredits":"","wechatid":"oOL3g1VvXWJWCe2cJVpSbfsAUAoE_demin","consumepwd":""},{"balance":"","districtname":"","userid":"46448","capitalpool":"","checkcode":"","commission":"","ispwd":"","userpassword":"","row":"6","consume":"","loginpwd":"","spreadcode":"","phonenumber":"","registertime":"2020-02-09 16:44:00","buyeruserid":"","lastlogintime":"","lasttime":"","extend2":"","status":"0","extend1":"","intergral":"0","city":"","recomuserid":"","usergrade":"","usersource":"","usercredits":"","wechatid":"oOL3g1fHFybKvi3zSV7BrTW55W2M_demin","consumepwd":""},{"balance":"","districtname":"","userid":"46447","capitalpool":"","checkcode":"","commission":"","ispwd":"","userpassword":"","row":"7","consume":"","loginpwd":"","spreadcode":"","phonenumber":"","registertime":"2020-02-09 16:29:16","buyeruserid":"","lastlogintime":"","lasttime":"","extend2":"","status":"0","extend1":"","intergral":"0","city":"","recomuserid":"","usergrade":"","usersource":"","usercredits":"","wechatid":"oOL3g1YJG8O5e95Syw0jScOUi5tg_demin","consumepwd":""},{"balance":"","districtname":"","userid":"46446","capitalpool":"","checkcode":"","commission":"","ispwd":"","userpassword":"","row":"8","consume":"","loginpwd":"","spreadcode":"","phonenumber":"","registertime":"2020-02-09 16:06:03","buyeruserid":"","lastlogintime":"","lasttime":"","extend2":"","status":"0","extend1":"","intergral":"0","city":"","recomuserid":"","usergrade":"","usersource":"","usercredits":"","wechatid":"oOL3g1dxwpZ_4KunhVudGUaY6GVY_demin","consumepwd":""},{"balance":"","districtname":"","userid":"46445","capitalpool":"","checkcode":"","commission":"","ispwd":"","userpassword":"","row":"9","consume":"","loginpwd":"","spreadcode":"","phonenumber":"","registertime":"2020-02-09 15:35:24","buyeruserid":"","lastlogintime":"","lasttime":"","extend2":"","status":"0","extend1":"","intergral":"0","city":"","recomuserid":"","usergrade":"","usersource":"","usercredits":"","wechatid":"oOL3g1UoDyyJfoogla__LRyfsO3k_demin","consumepwd":""},{"balance":"","districtname":"","userid":"46444","capitalpool":"","checkcode":"","commission":"","ispwd":"","userpassword":"","row":"10","consume":"","loginpwd":"","spreadcode":"","phonenumber":"","registertime":"2020-02-09 14:53:01","buyeruserid":"","lastlogintime":"","lasttime":"","extend2":"","status":"0","extend1":"","intergral":"0","city":"","recomuserid":"","usergrade":"","usersource":"","usercredits":"","wechatid":"oOL3g1el7wk47CKllUAY1lqTOF9w_demin","consumepwd":""}],"res.page":[{"RecordsCount":45930,"hasNextPage":true,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":10,"TotalPageCount":4593}],"res.size":"45930","single.recordsperpage":"-1","row":"1","single.row":"1","totalconsume":"3522051","single.totalconsume":"3522051","totalbalance":"15851726","single.totalbalance":"15851726","totalcapitalpool":"203398","single.totalcapitalpool":"203398","totalcommission":"575027","single.totalcommission":"575027","returnview":""}
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
  .el-icon-edit {
    font-size: 16px;
  }
  .app-icon {
    width: 48px;
    height: 48px;
  }
</style>
