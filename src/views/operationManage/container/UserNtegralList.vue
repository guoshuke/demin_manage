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
          v-model="requestParams.registerTime"
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
        label="编号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="phonenumber"
        width="120"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="brandname"
        label="地区">
      </el-table-column>
      <el-table-column
        prop="registertime"
        label="注册时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="intergral"
        label="积分"
        width="100">
      </el-table-column>
      <el-table-column
        prop="helperStatus"
        label="操作"
        width="90">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="dialogVisible=true">增减积分</el-button>
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
  name: 'UserntegralList',
  components: {
    PageChange,
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        phoneNumber: '',
        registerTime: '',
        districtName: '',
        pageNum: 1,
        pageSize: 10
      },
      dialogVisible: false,
      jsonName: {"jvcpagename":"yjm_users","jvcoldpageName":"yjm_users","cmd":"query","returnvalue":"1","res.recordsperpage":"10","RecordsPerPage":"-1","res":[{"balance":"","districtname":"","userid":"46541","capitalpool":"","checkcode":"","commission":"","ispwd":"","userpassword":"","row":"1","consume":"","loginpwd":"","spreadcode":"0zwt","phonenumber":"","registertime":"2020-02-13 19:01:41","buyeruserid":"","lastlogintime":"","lasttime":"","extend2":"","status":"0","extend1":"","intergral":"0","city":"","recomuserid":"","usergrade":"","usersource":"0","usercredits":"0","wechatid":"oOL3g1SPiPsSb_-LGeNtbCZes4dg_demin","consumepwd":""},{"balance":"","districtname":"","userid":"46540","capitalpool":"","checkcode":"","commission":"","ispwd":"","userpassword":"","row":"2","consume":"","loginpwd":"","spreadcode":"","phonenumber":"","registertime":"2020-02-13 12:18:15","buyeruserid":"","lastlogintime":"","lasttime":"","extend2":"","status":"0","extend1":"","intergral":"0","city":"","recomuserid":"","usergrade":"","usersource":"","usercredits":"","wechatid":"oOL3g1ZspV32hF_CxqO1tUER3Whg_demin","consumepwd":""},{"balance":"","districtname":"","userid":"46539","capitalpool":"","checkcode":"","commission":"","ispwd":"","userpassword":"","row":"3","consume":"","loginpwd":"","spreadcode":"","phonenumber":"","registertime":"2020-02-13 12:04:30","buyeruserid":"","lastlogintime":"","lasttime":"","extend2":"","status":"0","extend1":"","intergral":"0","city":"","recomuserid":"","usergrade":"","usersource":"","usercredits":"","wechatid":"oOL3g1YLqsZBavsQzGxZYTnH37v4_demin","consumepwd":""},{"balance":"","districtname":"","userid":"46538","capitalpool":"","checkcode":"","commission":"","ispwd":"","userpassword":"","row":"4","consume":"","loginpwd":"","spreadcode":"0zwq","phonenumber":"","registertime":"2020-02-13 00:24:00","buyeruserid":"","lastlogintime":"","lasttime":"","extend2":"","status":"0","extend1":"","intergral":"0","city":"","recomuserid":"","usergrade":"","usersource":"0","usercredits":"0","wechatid":"oOL3g1d05eLgw5BnWqhyCGvgoBzQ_demin","consumepwd":""},{"balance":"","districtname":"","userid":"46537","capitalpool":"","checkcode":"","commission":"","ispwd":"","userpassword":"","row":"5","consume":"","loginpwd":"","spreadcode":"0zwp","phonenumber":"","registertime":"2020-02-12 23:18:51","buyeruserid":"","lastlogintime":"","lasttime":"","extend2":"","status":"0","extend1":"","intergral":"0","city":"","recomuserid":"","usergrade":"","usersource":"0","usercredits":"0","wechatid":"oOL3g1UUNmWS9N115SBveyh7OSqE_demin","consumepwd":""},{"balance":"","districtname":"","userid":"46536","capitalpool":"","checkcode":"","commission":"","ispwd":"","userpassword":"","row":"6","consume":"","loginpwd":"","spreadcode":"0zwo","phonenumber":"","registertime":"2020-02-12 22:09:54","buyeruserid":"","lastlogintime":"","lasttime":"","extend2":"","status":"1","extend1":"","intergral":"0","city":"","recomuserid":"","usergrade":"","usersource":"0","usercredits":"0","wechatid":"oOL3g1TqyskkygfZLJM1DbIkwiNY_demin","consumepwd":""},{"balance":"","districtname":"","userid":"46535","capitalpool":"","checkcode":"","commission":"","ispwd":"","userpassword":"","row":"7","consume":"","loginpwd":"","spreadcode":"","phonenumber":"","registertime":"2020-02-12 21:21:57","buyeruserid":"","lastlogintime":"","lasttime":"","extend2":"","status":"0","extend1":"","intergral":"0","city":"","recomuserid":"","usergrade":"","usersource":"","usercredits":"","wechatid":"oOL3g1fJxuxlp4LjuOE5k2Cvy0Zc_demin","consumepwd":""},{"balance":"","districtname":"","userid":"46534","capitalpool":"","checkcode":"","commission":"","ispwd":"","userpassword":"","row":"8","consume":"","loginpwd":"","spreadcode":"","phonenumber":"","registertime":"2020-02-12 19:44:34","buyeruserid":"","lastlogintime":"","lasttime":"","extend2":"","status":"0","extend1":"","intergral":"0","city":"","recomuserid":"","usergrade":"","usersource":"","usercredits":"","wechatid":"oOL3g1TTmkmWWHTx1fIXeY4oFlKs_demin","consumepwd":""},{"balance":"","districtname":"","userid":"46533","capitalpool":"","checkcode":"","commission":"","ispwd":"","userpassword":"","row":"9","consume":"","loginpwd":"","spreadcode":"0zwl","phonenumber":"","registertime":"2020-02-12 18:13:25","buyeruserid":"","lastlogintime":"","lasttime":"","extend2":"","status":"1","extend1":"","intergral":"0","city":"","recomuserid":"","usergrade":"","usersource":"0","usercredits":"0","wechatid":"oOL3g1XeRhZy3U25jwu862BpiMS0_demin","consumepwd":""},{"balance":"","districtname":"","userid":"46532","capitalpool":"","checkcode":"","commission":"","ispwd":"","userpassword":"","row":"10","consume":"","loginpwd":"","spreadcode":"","phonenumber":"","registertime":"2020-02-12 10:54:53","buyeruserid":"","lastlogintime":"","lasttime":"","extend2":"","status":"0","extend1":"","intergral":"0","city":"","recomuserid":"","usergrade":"","usersource":"","usercredits":"","wechatid":"oOL3g1Xuigb5DQZkowpttURq8LxA_demin","consumepwd":""}],"res.page":[{"RecordsCount":46016,"hasNextPage":true,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":10,"TotalPageCount":4602}],"res.size":"46016","single.recordsperpage":"-1","row":"1","single.row":"1","totalconsume":"3522051","single.totalconsume":"3522051","totalbalance":"15851726","single.totalbalance":"15851726","totalcapitalpool":"203398","single.totalcapitalpool":"203398","totalcommission":"575027","single.totalcommission":"575027","returnview":""}
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
