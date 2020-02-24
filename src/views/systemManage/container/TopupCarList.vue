<template>
  <div>
    <div class="flex-row filter-box flex-wrap">
      <div>
        <span>账号：</span>
        <el-input v-model="requestParams.buyerUserId" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>会员手机：</span>
        <el-input v-model="requestParams.userPhone" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>充酒时间：</span>
        <el-date-picker
          v-model="requestParams.appendTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div>
        <span>充酒状态：</span>
        <el-select v-model="requestParams.appendStatus" placeholder="请选择">
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
      </div>
    </div>
    <el-table
      :data="jsonName.res"
      border
      style="width: 100%">
      <el-table-column
        prop="buyeruserid"
        label="账号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="userphone"
        width="120"
        label="会员手机">
      </el-table-column>
      <el-table-column
        prop="brandname"
        label="品牌">
      </el-table-column>
      <el-table-column
        prop="appendnumber"
        label="充酒数"
        width="90">
      </el-table-column>
      <el-table-column
        prop="appendfromname"
        label="充值来源"
        width="180">
      </el-table-column>
      <el-table-column
        prop="appendtime"
        width="200"
        label="充酒时间">
      </el-table-column>
      <el-table-column
        prop="appendstatusname"
        width="90"
        label="充酒状态">
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
  name: 'TopupCarList',
  components: {
    PageChange,
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        buyerUserId: '',
        userPhone: '',
        appendTime: '',
        appendStatus: '',
        pageNum: 1,
        pageSize: 10
      },
      options: [{
        value: '0',
        label: '全部'
      }, {
        value: '1',
        label: '失败'
      }, {
        value: '2',
        label: '成功'
      }, {
        value: '3',
        label: '成功+短信通知'
      }],
      value: '',
      tableData: [],
      dialogVisible: false,
      jsonName: {"jvcpagename":"ur_appenddrinkinfo","jvcoldpageName":"ur_appenddrinkinfo","cmd":"query","returnvalue":"1","res.recordsperpage":"12","RecordsPerPage":"12","res":[{"userbirthday":"","apparea":"","charactersign":"","paypwd":"","appendtime":"2016-06-16 08:14:58","lastlogintime":"2016-12-31 11:55:27","identitytype":"0","appendfromname":"android","userphone":"13880806335","usercredits":"558","usersex":"","identitycode":"","wechatid":"","paycount":"0","appendnumber":"5000","appendtype":"","bankaccount":"","lastlogintype":"1","row":"1","registermodel":"2","usertype":"","secureemail":"","userparentid":"","useremail":"","userpassword":"a86e86aaab92237562a9178b03e22850","maxamount":"0","balance":"","appendstatusname":"成功","surplus":"0","appendfrom":"2","brandname":"天香池[15年]","leveltime":"","unitid":"","username":"","buyeruserid":"12973","registertime":"2015-03-28 09:08:12","lastloginaddr":"","recomuserid":"","baiduid":"","levelid":"3","useraddr":"","areaid":"","infoid":"3104","waiterauth":"0","brandid":"125","bankaddr":"","userphonewx":"","likedrink":"","alipayid":"","userage":"","alipayname":"","appendstatus":"2","clientid":"","chargelevelid":""},{"userbirthday":"","apparea":"","charactersign":"","paypwd":"","appendtime":"2016-04-12 13:37:19","lastlogintime":"2015-09-28 18:01:06","identitytype":"0","appendfromname":"IOS","userphone":"13688125615","usercredits":"0","usersex":"","identitycode":"","wechatid":"","paycount":"0","appendnumber":"5000","appendtype":"","bankaccount":"","lastlogintype":"3","row":"2","registermodel":"3","usertype":"","secureemail":"","userparentid":"","useremail":"","userpassword":"323e3e220ab403be382187264a73a593","maxamount":"0","balance":"","appendstatusname":"成功","surplus":"0","appendfrom":"3","brandname":"天香池[15年]","leveltime":"","unitid":"","username":"","buyeruserid":"17100","registertime":"2015-09-09 14:28:57","lastloginaddr":"","recomuserid":"","baiduid":"d5110590efa6280e57965f86bb729a757b5b5455c1d064f5fb07d84f75507122","levelid":"3","useraddr":"","areaid":"","infoid":"3102","waiterauth":"0","brandid":"125","bankaddr":"","userphonewx":"","likedrink":"","alipayid":"","userage":"","alipayname":"","appendstatus":"2","clientid":"","chargelevelid":""},{"userbirthday":"","apparea":"","charactersign":"","paypwd":"","appendtime":"2016-04-12 13:36:17","lastlogintime":"2016-04-28 10:32:39","identitytype":"0","appendfromname":"android","userphone":"15982801535","usercredits":"558","usersex":"","identitycode":"","wechatid":"","paycount":"0","appendnumber":"5000","appendtype":"","bankaccount":"","lastlogintype":"1","row":"3","registermodel":"2","usertype":"","secureemail":"","userparentid":"","useremail":"","userpassword":"f5f9b832542a725813700f1259b20311","maxamount":"0","balance":"","appendstatusname":"成功","surplus":"0","appendfrom":"2","brandname":"天香池[15年]","leveltime":"","unitid":"","username":"","buyeruserid":"14227","registertime":"2015-05-03 10:22:55","lastloginaddr":"","recomuserid":"","baiduid":"","levelid":"3","useraddr":"","areaid":"","infoid":"3101","waiterauth":"0","brandid":"125","bankaddr":"","userphonewx":"","likedrink":"","alipayid":"","userage":"","alipayname":"","appendstatus":"2","clientid":"","chargelevelid":""},{"userbirthday":"","apparea":"","charactersign":"","paypwd":"","appendtime":"2016-04-12 13:35:56","lastlogintime":"2016-05-17 17:43:57","identitytype":"0","appendfromname":"IOS","userphone":"13980540214","usercredits":"0","usersex":"1","identitycode":"","wechatid":"","paycount":"0","appendnumber":"5000","appendtype":"","bankaccount":"","lastlogintype":"3","row":"4","registermodel":"3","usertype":"","secureemail":"","userparentid":"","useremail":"","userpassword":"27a748f0719a13fd7b06e3b9e9091044","maxamount":"0","balance":"","appendstatusname":"成功","surplus":"0","appendfrom":"3","brandname":"天香池[15年]","leveltime":"","unitid":"","username":"","buyeruserid":"28859","registertime":"2016-03-26 09:36:13","lastloginaddr":"","recomuserid":"","baiduid":"687a4072d444ee5f9b94b579f0299cffd6ec4a0f91e74f9226231781e4aaf0c7","levelid":"3","useraddr":"","areaid":"","infoid":"3100","waiterauth":"0","brandid":"125","bankaddr":"","userphonewx":"","likedrink":"","alipayid":"","userage":"","alipayname":"","appendstatus":"2","clientid":"","chargelevelid":""},{"userbirthday":"","apparea":"","charactersign":"","paypwd":"","appendtime":"2016-04-12 13:31:54","lastlogintime":"2016-10-11 17:03:22","identitytype":"0","appendfromname":"android","userphone":"15308217529","usercredits":"558","usersex":"","identitycode":"","wechatid":"","paycount":"0","appendnumber":"5000","appendtype":"","bankaccount":"","lastlogintype":"1","row":"5","registermodel":"2","usertype":"","secureemail":"","userparentid":"","useremail":"","userpassword":"f5f9b832542a725813700f1259b20311","maxamount":"0","balance":"","appendstatusname":"成功","surplus":"0","appendfrom":"2","brandname":"沱牌生态[10年]酱香","leveltime":"","unitid":"","username":"","buyeruserid":"13022","registertime":"2015-03-28 21:53:26","lastloginaddr":"","recomuserid":"","baiduid":"","levelid":"3","useraddr":"","areaid":"","infoid":"3099","waiterauth":"0","brandid":"121","bankaddr":"","userphonewx":"","likedrink":"","alipayid":"","userage":"","alipayname":"","appendstatus":"2","clientid":"","chargelevelid":""},{"userbirthday":"","apparea":"","charactersign":"","paypwd":"","appendtime":"2016-04-12 13:25:53","lastlogintime":"2016-10-11 17:15:03","identitytype":"0","appendfromname":"android","userphone":"15328014260","usercredits":"558","usersex":"","identitycode":"","wechatid":"","paycount":"0","appendnumber":"5000","appendtype":"","bankaccount":"","lastlogintype":"3","row":"6","registermodel":"2","usertype":"","secureemail":"","userparentid":"","useremail":"","userpassword":"f5f9b832542a725813700f1259b20311","maxamount":"0","balance":"","appendstatusname":"成功","surplus":"0","appendfrom":"2","brandname":"五粮液股份[纯粮陈窖]52°","leveltime":"","unitid":"","username":"","buyeruserid":"13020","registertime":"2015-03-28 21:48:35","lastloginaddr":"","recomuserid":"","baiduid":"","levelid":"3","useraddr":"","areaid":"","infoid":"3098","waiterauth":"0","brandid":"112","bankaddr":"","userphonewx":"","likedrink":"","alipayid":"","userage":"","alipayname":"","appendstatus":"2","clientid":"","chargelevelid":""},{"userbirthday":"","apparea":"","charactersign":"介绍","paypwd":"","appendtime":"2016-04-12 13:12:42","lastlogintime":"2017-07-08 21:08:14","identitytype":"0","appendfromname":"android","userphone":"18982234747","usercredits":"558","usersex":"1","identitycode":"","wechatid":"oxi19uI2ZL0YZJff4_h_TQTyarNo","paycount":"0","appendnumber":"5000","appendtype":"","bankaccount":"","lastlogintype":"1","row":"7","registermodel":"2","usertype":"","secureemail":"","userparentid":"","useremail":"","userpassword":"4ffa268c4fc3072716ff0ff16c5d016b","maxamount":"0","balance":"","appendstatusname":"成功","surplus":"0","appendfrom":"2","brandname":"天香池[15年]","leveltime":"","unitid":"","username":"","buyeruserid":"12971","registertime":"2015-03-28 03:21:56","lastloginaddr":"","recomuserid":"","baiduid":"376ad8302c60d47e98d23807afa09c941dffdd7f6977877117c36188bbc811d2","levelid":"3","useraddr":"","areaid":"","infoid":"3097","waiterauth":"0","brandid":"125","bankaddr":"","userphonewx":"","likedrink":"","alipayid":"","userage":"","alipayname":"","appendstatus":"2","clientid":"","chargelevelid":""},{"userbirthday":"","apparea":"","charactersign":"","paypwd":"","appendtime":"2016-04-11 09:45:24","lastlogintime":"2018-08-03 16:21:37","identitytype":"0","appendfromname":"IOS","userphone":"13880236993","usercredits":"1217","usersex":"","identitycode":"","wechatid":"","paycount":"0","appendnumber":"5000","appendtype":"","bankaccount":"","lastlogintype":"3","row":"8","registermodel":"3","usertype":"","secureemail":"","userparentid":"","useremail":"","userpassword":"4277820d6200d2ee6aa120e97d62a33b","maxamount":"0","balance":"","appendstatusname":"成功","surplus":"350","appendfrom":"3","brandname":"天香池[15年]","leveltime":"","unitid":"","username":"","buyeruserid":"11111","registertime":"2015-01-14 11:43:18","lastloginaddr":"","recomuserid":"","baiduid":"fd0b8fd1af94c937bb22c2686bfff12f7684e923ac7ef55622da8752228e6890","levelid":"3","useraddr":"","areaid":"","infoid":"3096","waiterauth":"0","brandid":"125","bankaddr":"","userphonewx":"","likedrink":"","alipayid":"","userage":"","alipayname":"","appendstatus":"2","clientid":"","chargelevelid":""},{"userbirthday":"","apparea":"四川省成都市武侯区","charactersign":"介绍","paypwd":"","appendtime":"2016-01-31 23:29:54","lastlogintime":"2016-04-21 17:38:22","identitytype":"1","appendfromname":"IOS","userphone":"13730845676","usercredits":"2220","usersex":"1","identitycode":"","wechatid":"oRhoFt5Hw4KObNur1A9ziv6wYTEw","paycount":"0","appendnumber":"50","appendtype":"","bankaccount":"","lastlogintype":"1","row":"9","registermodel":"3","usertype":"","secureemail":"","userparentid":"","useremail":"","userpassword":"e10adc3949ba59abbe56e057f20f883e","maxamount":"0","balance":"","appendstatusname":"成功","surplus":"353","appendfrom":"3","brandname":"天香池[15年]","leveltime":"","unitid":"","username":"","buyeruserid":"10841","registertime":"2014-12-22 10:18:40","lastloginaddr":"","recomuserid":"","baiduid":"4796f8836fec57a7c43de5e18860d3b4ac960899944e97bcecbf59c76943334b","levelid":"3","useraddr":"","areaid":"","infoid":"3095","waiterauth":"0","brandid":"125","bankaddr":"","userphonewx":"","likedrink":"","alipayid":"","userage":"","alipayname":"","appendstatus":"2","clientid":"","chargelevelid":"2"},{"userbirthday":"","apparea":"四川省成都市武侯区","charactersign":"介绍","paypwd":"","appendtime":"2016-01-31 23:23:50","lastlogintime":"2016-04-21 17:38:22","identitytype":"1","appendfromname":"IOS","userphone":"13730845676","usercredits":"2220","usersex":"1","identitycode":"","wechatid":"oRhoFt5Hw4KObNur1A9ziv6wYTEw","paycount":"0","appendnumber":"50","appendtype":"","bankaccount":"","lastlogintype":"1","row":"10","registermodel":"3","usertype":"","secureemail":"","userparentid":"","useremail":"","userpassword":"e10adc3949ba59abbe56e057f20f883e","maxamount":"0","balance":"","appendstatusname":"成功","surplus":"353","appendfrom":"3","brandname":"天香池[15年]","leveltime":"","unitid":"","username":"","buyeruserid":"10841","registertime":"2014-12-22 10:18:40","lastloginaddr":"","recomuserid":"","baiduid":"4796f8836fec57a7c43de5e18860d3b4ac960899944e97bcecbf59c76943334b","levelid":"3","useraddr":"","areaid":"","infoid":"3094","waiterauth":"0","brandid":"125","bankaddr":"","userphonewx":"","likedrink":"","alipayid":"","userage":"","alipayname":"","appendstatus":"2","clientid":"","chargelevelid":"2"},{"userbirthday":"","apparea":"","charactersign":"","paypwd":"","appendtime":"2016-01-28 11:01:41","lastlogintime":"2016-10-19 09:48:16","identitytype":"1","appendfromname":"android","userphone":"15680611385","usercredits":"0","usersex":"","identitycode":"","wechatid":"","paycount":"0","appendnumber":"300","appendtype":"","bankaccount":"","lastlogintype":"1","row":"11","registermodel":"2","usertype":"","secureemail":"","userparentid":"","useremail":"","userpassword":"e10adc3949ba59abbe56e057f20f883e","maxamount":"0","balance":"","appendstatusname":"成功","surplus":"300","appendfrom":"2","brandname":"五粮液股份[纯粮醇品]53°","leveltime":"","unitid":"","username":"","buyeruserid":"25035","registertime":"2015-12-08 18:27:12","lastloginaddr":"","recomuserid":"","baiduid":"","levelid":"3","useraddr":"","areaid":"","infoid":"3092","waiterauth":"0","brandid":"113","bankaddr":"","userphonewx":"","likedrink":"","alipayid":"","userage":"","alipayname":"","appendstatus":"2","clientid":"","chargelevelid":"0"},{"userbirthday":"","apparea":"","charactersign":"","paypwd":"","appendtime":"2015-09-30 16:11:20","lastlogintime":"2015-12-31 09:51:54","identitytype":"0","appendfromname":"android","userphone":"15984458440","usercredits":"0","usersex":"","identitycode":"","wechatid":"","paycount":"0","appendnumber":"1000","appendtype":"","bankaccount":"","lastlogintype":"3","row":"12","registermodel":"2","usertype":"","secureemail":"","userparentid":"","useremail":"","userpassword":"60c2ce8f2c04510630ddace8530a5c1c","maxamount":"0","balance":"","appendstatusname":"成功","surplus":"0","appendfrom":"2","brandname":"天香池[15年]","leveltime":"","unitid":"","username":"","buyeruserid":"17247","registertime":"2015-09-30 16:10:38","lastloginaddr":"","recomuserid":"","baiduid":"d058b9be0166c17cad85b5e036adcc90a663fcc35585bef79213c3388ef6e1d6","levelid":"3","useraddr":"","areaid":"","infoid":"3090","waiterauth":"0","brandid":"125","bankaddr":"","userphonewx":"","likedrink":"","alipayid":"","userage":"","alipayname":"","appendstatus":"2","clientid":"","chargelevelid":""}],"res.page":[{"RecordsCount":2899,"hasNextPage":true,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12,"TotalPageCount":242}],"res.size":"2899","returnview":"@json"}
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
