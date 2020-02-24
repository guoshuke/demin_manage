<template>
  <div>
    <div class="flex-row filter-box flex-wrap">
      <div>
        <span>手机号：</span>
        <el-input v-model="requestParams.userPhone" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>批次：</span>
        <el-input v-model="requestParams.batchNo" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>卡号：</span>
        <el-input v-model="requestParams.cardNo" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>生成时间：</span>
        <el-date-picker
          v-model="requestParams.createTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div>
        <span>状态：</span>
        <el-select v-model="requestParams.barrelStatus" placeholder="请选择" style="width: 100px">
          <el-option
            v-for="item in cardStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <el-button type="primary">查询</el-button>
        <el-button type="primary">增加</el-button>
        <el-button type="primary">导出</el-button>
        <el-button type="primary">全部激活</el-button>
        <el-button type="primary">批量激活</el-button>
        <el-button type="primary">批量作废</el-button>
      </div>
    </div>
    <el-table
      :data="jsonName.res"
      border
      style="width: 100%">
      <el-table-column
        type="selection"
        width="40">
      </el-table-column>
      <el-table-column
        prop="batchno"
        label="批次">
      </el-table-column>
      <el-table-column
        prop="cardno"
        label="卡号">
      </el-table-column>
      <el-table-column
        label="金额"
        width="70">
        <template slot-scope="scope">
          <span>{{scope.row.amount/100}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="efftime"
        label="有效日期">
      </el-table-column>
      <el-table-column
        prop="exptime"
        label="失效日期">
      </el-table-column>
      <el-table-column
        prop="cardstatusname"
        label="状态"
        width="80">
      </el-table-column>
      <el-table-column
        prop="createuserid"
        label="经手人">
      </el-table-column>
      <el-table-column
        prop="createtime"
        label="生成时间">
      </el-table-column>
      <el-table-column
        prop="activateuserid"
        label="激活人"
        width="80">
      </el-table-column>
      <el-table-column
        prop="activatetime"
        label="激活时间">
      </el-table-column>
      <el-table-column
        prop="userphone"
        label="手机号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="appendtime"
        label="使用时间">
      </el-table-column>
      <el-table-column
        label="操作"
        width="85">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="dialogVisible=true">激活</el-button>
          <el-button type="text" size="small" @click="dialogVisible=true">作废</el-button>
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
  name: 'RefillCardList',
  components: {
    PageChange,
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        batchNo: '',
        cardNo: '',
        userPhone: '',
        createTime: '',
        cardStatus: '',
        pageNum: 1,
        pageSize: 10
      },
      cardStatusOptions: [{
        value: '',
        label: '全部'
      }, {
        value: '1',
        label: '未激活'
      }, {
        value: '2',
        label: '已激活'
      }, {
        value: '3',
        label: '已充值'
      }, {
        value: '4',
        label: '作废'
      }, {
        value: '5',
        label: '已过期'
      }],
      dialogVisible: false,
      jsonName: {"jvcpagename":"ur_appendmoneycard","jvcoldpageName":"ur_appendmoneycard","cmd":"query","returnvalue":"1","res.recordsperpage":"12","RecordsPerPage":"12","res":[{"userbirthday":"","apparea":"","charactersign":"","paypwd":"e10adc3949ba59abbe56e057f20f883e","batchno":"20160505","appendtime":"2016-05-05 15:52:24","amount":"50000","lastlogintime":"2015-10-15 23:21:02","identitytype":"","userphone":"","usercredits":"0","usersex":"","identitycode":"","wechatid":"oxi19uMStisPpuIuvukA38No3WRE_mjh5299","paycount":"0","bankaccount":"","lastlogintype":"3","createtime":"2016-05-05 12:28:09","row":"1","registermodel":"3","usertype":"","exptime":"2016-05-06 00:00:00","secureemail":"","userparentid":"","cardpsw":"073589","useremail":"","userpassword":"","balance":"","cardid":"12630","maxamount":"0","activateuserid":"liaojing","leveltime":"","createuserid":"JiangPeili","unitid":"","cardstatus":"3","username":"","cardstatusname":"已充值","buyeruserid":"17448","registertime":"2015-10-15 23:21:02","cardno":"0662828316688335","lastloginaddr":"","baiduid":"","recomuserid":"","levelid":"","useraddr":"","areaid":"","waiterauth":"1","bankaddr":"","efftime":"2016-05-04 00:00:00","activatetime":"2016-05-05 15:43:30","userphonewx":"15881009184","likedrink":"","alipayid":"","userage":"","alipayname":"","clientid":"","chargelevelid":""},{"userbirthday":"","apparea":"","charactersign":"","paypwd":"","batchno":"20160505","appendtime":"2016-05-05 15:50:43","amount":"50000","lastlogintime":"2015-10-15 23:21:47","identitytype":"","userphone":"","usercredits":"0","usersex":"","identitycode":"","wechatid":"oxi19uItZackMyf2fNcqvpb24CoQ_mjh5299","paycount":"0","bankaccount":"","lastlogintype":"3","createtime":"2016-05-05 12:28:09","row":"2","registermodel":"3","usertype":"","exptime":"2016-05-06 00:00:00","secureemail":"","userparentid":"","cardpsw":"318401","useremail":"","userpassword":"","balance":"","cardid":"12631","maxamount":"0","activateuserid":"liaojing","leveltime":"","createuserid":"JiangPeili","unitid":"","cardstatus":"3","username":"","cardstatusname":"已充值","buyeruserid":"17567","registertime":"2015-10-15 23:21:47","cardno":"6216611640370735","lastloginaddr":"","baiduid":"","recomuserid":"","levelid":"","useraddr":"","areaid":"","waiterauth":"0","bankaddr":"","efftime":"2016-05-04 00:00:00","activatetime":"2016-05-05 15:43:30","userphonewx":"","likedrink":"","alipayid":"","userage":"","alipayname":"","clientid":"","chargelevelid":""},{"userbirthday":"","apparea":"","charactersign":"","paypwd":"","batchno":"20160505","appendtime":"2016-05-05 15:52:29","amount":"50000","lastlogintime":"2015-11-25 10:33:31","identitytype":"","userphone":"","usercredits":"0","usersex":"","identitycode":"","wechatid":"oxi19uPh5oOYIIrL9h_j_QFLzpNM_mjh5299","paycount":"0","bankaccount":"","lastlogintype":"11","createtime":"2016-05-05 12:28:09","row":"3","registermodel":"11","usertype":"","exptime":"2016-05-06 00:00:00","secureemail":"","userparentid":"","cardpsw":"815965","useremail":"","userpassword":"","balance":"","cardid":"12632","maxamount":"0","activateuserid":"liaojing","leveltime":"","createuserid":"JiangPeili","unitid":"","cardstatus":"3","username":"杨丹","cardstatusname":"已充值","buyeruserid":"24479","registertime":"2015-11-25 10:33:31","cardno":"9014607890354750","lastloginaddr":"","baiduid":"","recomuserid":"","levelid":"","useraddr":"成都市李家沱平安正街41号","areaid":"","waiterauth":"1","bankaddr":"","efftime":"2016-05-04 00:00:00","activatetime":"2016-05-05 15:43:30","userphonewx":"13550183352","likedrink":"","alipayid":"13550183352","userage":"","alipayname":"杨丹","clientid":"","chargelevelid":""},{"userbirthday":"","apparea":"","charactersign":"","paypwd":"56953e82acb75a171fc47b0c2205ff39","batchno":"20160505","appendtime":"2016-05-05 15:51:02","amount":"50000","lastlogintime":"2015-12-03 15:41:51","identitytype":"","userphone":"","usercredits":"0","usersex":"","identitycode":"","wechatid":"oxi19uGbGAdBSHcTVKWNx8ueNMrE_mjh5299","paycount":"0","bankaccount":"","lastlogintype":"11","createtime":"2016-05-05 12:28:09","row":"4","registermodel":"11","usertype":"","exptime":"2016-05-06 00:00:00","secureemail":"","userparentid":"","cardpsw":"188021","useremail":"","userpassword":"","balance":"","cardid":"12633","maxamount":"0","activateuserid":"liaojing","leveltime":"","createuserid":"JiangPeili","unitid":"","cardstatus":"3","username":"","cardstatusname":"已充值","buyeruserid":"24835","registertime":"2015-12-03 15:41:51","cardno":"2832172326378859","lastloginaddr":"","baiduid":"","recomuserid":"","levelid":"","useraddr":"","areaid":"","waiterauth":"1","bankaddr":"","efftime":"2016-05-04 00:00:00","activatetime":"2016-05-05 15:43:30","userphonewx":"15982331475","likedrink":"","alipayid":"","userage":"","alipayname":"","clientid":"","chargelevelid":""},{"userbirthday":"","apparea":"","charactersign":"","paypwd":"","batchno":"20160428","appendtime":"2016-04-28 12:37:51","amount":"200000","lastlogintime":"2018-02-12 15:36:53","identitytype":"0","userphone":"15881009184","usercredits":"0","usersex":"","identitycode":"","wechatid":"","paycount":"0","bankaccount":"","lastlogintype":"3","createtime":"2016-04-28 12:29:23","row":"5","registermodel":"3","usertype":"","exptime":"2016-04-30 00:00:00","secureemail":"","userparentid":"","cardpsw":"260486","useremail":"","userpassword":"229287fa3ae68ddc48cfa07ee0fb8b78","balance":"","cardid":"12628","maxamount":"0","activateuserid":"liaojing","leveltime":"","createuserid":"JiangPeili","unitid":"","cardstatus":"3","username":"","cardstatusname":"已充值","buyeruserid":"30193","registertime":"2016-04-28 12:35:47","cardno":"8463609625812024","lastloginaddr":"","baiduid":"","recomuserid":"","levelid":"3","useraddr":"","areaid":"","waiterauth":"0","bankaddr":"","efftime":"2016-04-27 00:00:00","activatetime":"2016-04-28 12:31:54","userphonewx":"","likedrink":"","alipayid":"","userage":"","alipayname":"","clientid":"","chargelevelid":""},{"userbirthday":"","apparea":"","charactersign":"","paypwd":"","batchno":"20160413","appendtime":"2016-04-13 17:23:14","amount":"120000","lastlogintime":"2016-10-17 16:58:24","identitytype":"0","userphone":"13440102360","usercredits":"17","usersex":"","identitycode":"","wechatid":"oxi19uMStisPpuIuvukA38No3WRE","paycount":"0","bankaccount":"","lastlogintype":"3","createtime":"2016-04-13 17:17:41","row":"6","registermodel":"2","usertype":"","exptime":"2016-04-15 00:00:00","secureemail":"","userparentid":"","cardpsw":"804946","useremail":"","userpassword":"229287fa3ae68ddc48cfa07ee0fb8b78","balance":"","cardid":"12626","maxamount":"0","activateuserid":"liaojing","leveltime":"","createuserid":"JiangPeili","unitid":"","cardstatus":"3","username":"","cardstatusname":"已充值","buyeruserid":"13099","registertime":"2015-03-31 10:18:22","cardno":"5670791546060893","lastloginaddr":"","baiduid":"606909354864073037","recomuserid":"","levelid":"3","useraddr":"","areaid":"","waiterauth":"0","bankaddr":"","efftime":"2016-04-13 00:00:00","activatetime":"2016-04-13 17:20:12","userphonewx":"","likedrink":"","alipayid":"","userage":"","alipayname":"","clientid":"","chargelevelid":""},{"userbirthday":"","apparea":"","charactersign":"","paypwd":"","batchno":"20160315","appendtime":"2016-03-15 12:00:24","amount":"70000","lastlogintime":"2016-10-17 16:58:24","identitytype":"0","userphone":"13440102360","usercredits":"17","usersex":"","identitycode":"","wechatid":"oxi19uMStisPpuIuvukA38No3WRE","paycount":"0","bankaccount":"","lastlogintype":"3","createtime":"2016-03-15 11:20:11","row":"7","registermodel":"2","usertype":"","exptime":"2016-03-18 00:00:00","secureemail":"","userparentid":"","cardpsw":"977002","useremail":"","userpassword":"229287fa3ae68ddc48cfa07ee0fb8b78","balance":"","cardid":"12624","maxamount":"0","activateuserid":"liaojing","leveltime":"","createuserid":"JiangPeili","unitid":"","cardstatus":"3","username":"","cardstatusname":"已充值","buyeruserid":"13099","registertime":"2015-03-31 10:18:22","cardno":"5127629639332513","lastloginaddr":"","baiduid":"606909354864073037","recomuserid":"","levelid":"3","useraddr":"","areaid":"","waiterauth":"0","bankaddr":"","efftime":"2016-03-15 00:00:00","activatetime":"2016-03-15 11:27:54","userphonewx":"","likedrink":"","alipayid":"","userage":"","alipayname":"","clientid":"","chargelevelid":""},{"userbirthday":"","apparea":"四川省成都市武侯区","charactersign":"介绍","paypwd":"","batchno":"20160201","appendtime":"2016-02-01 01:10:08","amount":"1000","lastlogintime":"2016-04-21 17:38:22","identitytype":"1","userphone":"13730845676","usercredits":"2220","usersex":"1","identitycode":"","wechatid":"oRhoFt5Hw4KObNur1A9ziv6wYTEw","paycount":"0","bankaccount":"","lastlogintype":"1","createtime":"2016-02-01 00:58:13","row":"8","registermodel":"3","usertype":"","exptime":"2016-02-02 00:00:00","secureemail":"","userparentid":"","cardpsw":"532632","useremail":"","userpassword":"e10adc3949ba59abbe56e057f20f883e","balance":"","cardid":"12622","maxamount":"0","activateuserid":"jsadmin","leveltime":"","createuserid":"jsadmin","unitid":"","cardstatus":"3","username":"","cardstatusname":"已充值","buyeruserid":"10841","registertime":"2014-12-22 10:18:40","cardno":"8080864451794306","lastloginaddr":"","baiduid":"4796f8836fec57a7c43de5e18860d3b4ac960899944e97bcecbf59c76943334b","recomuserid":"","levelid":"3","useraddr":"","areaid":"","waiterauth":"0","bankaddr":"","efftime":"2016-02-01 00:00:00","activatetime":"2016-02-01 00:58:19","userphonewx":"","likedrink":"","alipayid":"","userage":"","alipayname":"","clientid":"","chargelevelid":"2"},{"userbirthday":"","apparea":"四川省成都市武侯区","charactersign":"介绍","paypwd":"","batchno":"20160201","appendtime":"2016-02-01 00:47:58","amount":"1000","lastlogintime":"2016-04-21 17:38:22","identitytype":"1","userphone":"13730845676","usercredits":"2220","usersex":"1","identitycode":"","wechatid":"oRhoFt5Hw4KObNur1A9ziv6wYTEw","paycount":"0","bankaccount":"","lastlogintype":"1","createtime":"2016-02-01 00:30:16","row":"9","registermodel":"3","usertype":"","exptime":"2016-02-02 00:00:00","secureemail":"","userparentid":"","cardpsw":"382462","useremail":"","userpassword":"e10adc3949ba59abbe56e057f20f883e","balance":"","cardid":"12621","maxamount":"0","activateuserid":"jsadmin","leveltime":"","createuserid":"jsadmin","unitid":"","cardstatus":"3","username":"","cardstatusname":"已充值","buyeruserid":"10841","registertime":"2014-12-22 10:18:40","cardno":"7975036556973359","lastloginaddr":"","baiduid":"4796f8836fec57a7c43de5e18860d3b4ac960899944e97bcecbf59c76943334b","recomuserid":"","levelid":"3","useraddr":"","areaid":"","waiterauth":"0","bankaddr":"","efftime":"2016-02-01 00:00:00","activatetime":"2016-02-01 00:30:22","userphonewx":"","likedrink":"","alipayid":"","userage":"","alipayname":"","clientid":"","chargelevelid":"2"},{"userbirthday":"","apparea":"四川省成都市武侯区","charactersign":"介绍","paypwd":"","batchno":"20160201","appendtime":"2016-02-01 00:29:57","amount":"1000","lastlogintime":"2016-04-21 17:38:22","identitytype":"1","userphone":"13730845676","usercredits":"2220","usersex":"1","identitycode":"","wechatid":"oRhoFt5Hw4KObNur1A9ziv6wYTEw","paycount":"0","bankaccount":"","lastlogintype":"1","createtime":"2016-02-01 00:27:34","row":"10","registermodel":"3","usertype":"","exptime":"2016-02-02 00:00:00","secureemail":"","userparentid":"","cardpsw":"798310","useremail":"","userpassword":"e10adc3949ba59abbe56e057f20f883e","balance":"","cardid":"12620","maxamount":"0","activateuserid":"jsadmin","leveltime":"","createuserid":"jsadmin","unitid":"","cardstatus":"3","username":"","cardstatusname":"已充值","buyeruserid":"10841","registertime":"2014-12-22 10:18:40","cardno":"7900180715807914","lastloginaddr":"","baiduid":"4796f8836fec57a7c43de5e18860d3b4ac960899944e97bcecbf59c76943334b","recomuserid":"","levelid":"3","useraddr":"","areaid":"","waiterauth":"0","bankaddr":"","efftime":"2016-02-01 00:00:00","activatetime":"2016-02-01 00:27:45","userphonewx":"","likedrink":"","alipayid":"","userage":"","alipayname":"","clientid":"","chargelevelid":"2"},{"userbirthday":"","apparea":"","charactersign":"","paypwd":"","batchno":"20160119","appendtime":"2016-01-19 18:23:21","amount":"70000","lastlogintime":"2016-02-02 20:06:49","identitytype":"0","userphone":"13402820441","usercredits":"0","usersex":"","identitycode":"","wechatid":"","paycount":"0","bankaccount":"","lastlogintype":"3","createtime":"2016-01-19 17:27:21","row":"11","registermodel":"2","usertype":"","exptime":"2016-01-21 00:00:00","secureemail":"","userparentid":"","cardpsw":"644614","useremail":"","userpassword":"4dc044060953c1062c32208e91373815","balance":"","cardid":"12619","maxamount":"0","activateuserid":"liaojing","leveltime":"","createuserid":"JiangPeili","unitid":"","cardstatus":"3","username":"","cardstatusname":"已充值","buyeruserid":"14319","registertime":"2015-05-06 22:08:20","cardno":"2252491125057583","lastloginaddr":"","baiduid":"ba9a110612617f6e5b9fd0a1b71667d0cab3ff92c574035d69952e1a72915bb0","recomuserid":"","levelid":"3","useraddr":"","areaid":"","waiterauth":"0","bankaddr":"","efftime":"2016-01-18 00:00:00","activatetime":"2016-01-19 17:27:51","userphonewx":"","likedrink":"","alipayid":"","userage":"","alipayname":"","clientid":"","chargelevelid":""},{"userbirthday":"","apparea":"","charactersign":"","paypwd":"","batchno":"20160108","appendtime":"2016-01-08 21:51:29","amount":"100000","lastlogintime":"2016-10-27 15:06:30","identitytype":"0","userphone":"13541308165","usercredits":"558","usersex":"","identitycode":"","wechatid":"","paycount":"0","bankaccount":"","lastlogintype":"1","createtime":"2016-01-08 16:13:11","row":"12","registermodel":"2","usertype":"","exptime":"2016-01-31 00:00:00","secureemail":"","userparentid":"","cardpsw":"301194","useremail":"","userpassword":"4607e782c4d86fd5364d7e4508bb10d9","balance":"","cardid":"12618","maxamount":"0","activateuserid":"liaojing","leveltime":"","createuserid":"JiangPeili","unitid":"","cardstatus":"3","username":"","cardstatusname":"已充值","buyeruserid":"13480","registertime":"2015-04-12 10:37:37","cardno":"2744864972813452","lastloginaddr":"","baiduid":"","recomuserid":"","levelid":"3","useraddr":"","areaid":"","waiterauth":"0","bankaddr":"","efftime":"2016-01-08 00:00:00","activatetime":"2016-01-08 16:22:08","userphonewx":"","likedrink":"","alipayid":"","userage":"","alipayname":"","clientid":"","chargelevelid":""}],"res.page":[{"RecordsCount":12598,"hasNextPage":true,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12,"TotalPageCount":1050}],"res.size":"12598","returnview":"@json"},
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
