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
        <span>酒品：</span>
        <el-input v-model="requestParams.brandName" clearable placeholder="请输入内容"></el-input>
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
        <span>类型：</span>
        <el-select v-model="requestParams.accountType" placeholder="请选择" style="width: 100px">
          <el-option
            v-for="item in accountTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
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
        prop="brandname"
        label="品牌">
      </el-table-column>
      <el-table-column
        prop="appendnumber"
        label="充酒数">
      </el-table-column>
      <el-table-column
        prop="expiredate"
        label="有效日期">
      </el-table-column>
      <el-table-column
        prop="accounttypename"
        label="账户">
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
        label="操作"
        width="60">
        <template slot-scope="scope">
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
  name: 'TakeUpWineCardList',
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
        brandName: '',
        accountType: '',
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
      accountTypeOptions: [{
        value: '',
        label: '全部'
      }, {
        value: '1',
        label: '酒柜'
      }, {
        value: '2',
        label: '酒劵'
      }],
      dialogVisible: false,
      jsonName: {"jvcpagename":"ur_appenddrinkcard","jvcoldpageName":"ur_appenddrinkcard","cmd":"query","returnvalue":"1","res.recordsperpage":"12","RecordsPerPage":"12","res":[{"ticketstarttime":"2016-01-31 23:27:42","userbirthday":"","apparea":"四川省成都市武侯区","charactersign":"介绍","paypwd":"","batchno":"2016013101","accounttype":"2","lastlogintime":"2016-04-21 17:38:22","identitytype":"1","userphone":"13730845676","usercredits":"2220","expiredate":"2016-02-01","usersex":"1","identitycode":"","wechatid":"oRhoFt5Hw4KObNur1A9ziv6wYTEw","paycount":"0","appendnumber":"50","bankaccount":"","cardpwd":"46581135","lastlogintype":"1","createtime":"2016-01-31 23:27:42","row":"1","registermodel":"3","usertype":"","remark":"","secureemail":"","userparentid":"","useremail":"","userpassword":"e10adc3949ba59abbe56e057f20f883e","balance":"","maxamount":"0","cardid":"23500","activateuserid":"jsadmin","brandname":"天香池[15年]","leveltime":"","createuserid":"jsadmin","unitid":"","cardstatus":"3","username":"","cardstatusname":"已充值","buyeruserid":"10841","registertime":"2014-12-22 10:18:40","cardno":"1601755000235005","lastloginaddr":"","baiduid":"4796f8836fec57a7c43de5e18860d3b4ac960899944e97bcecbf59c76943334b","recomuserid":"","levelid":"3","useraddr":"","areaid":"","waiterauth":"0","brandid":"125","bankaddr":"","activatetime":"2016-01-31 23:28:13","userphonewx":"","likedrink":"","alipayid":"","userage":"","alipayname":"","ticketendtime":"2016-02-01 23:30:15","accounttypename":"酒券","clientid":"","chargelevelid":"2"},{"ticketstarttime":"2016-01-31 23:21:30","userbirthday":"","apparea":"四川省成都市武侯区","charactersign":"介绍","paypwd":"","batchno":"20160131","accounttype":"2","lastlogintime":"2016-04-21 17:38:22","identitytype":"1","userphone":"13730845676","usercredits":"2220","expiredate":"2016-02-01","usersex":"1","identitycode":"","wechatid":"oRhoFt5Hw4KObNur1A9ziv6wYTEw","paycount":"0","appendnumber":"50","bankaccount":"","cardpwd":"57344675","lastlogintype":"1","createtime":"2016-01-31 23:21:30","row":"2","registermodel":"3","usertype":"","remark":"","secureemail":"","userparentid":"","useremail":"","userpassword":"e10adc3949ba59abbe56e057f20f883e","balance":"","maxamount":"0","cardid":"23499","activateuserid":"jsadmin","brandname":"天香池[15年]","leveltime":"","createuserid":"jsadmin","unitid":"","cardstatus":"3","username":"","cardstatusname":"已充值","buyeruserid":"10841","registertime":"2014-12-22 10:18:40","cardno":"1601755000234990","lastloginaddr":"","baiduid":"4796f8836fec57a7c43de5e18860d3b4ac960899944e97bcecbf59c76943334b","recomuserid":"","levelid":"3","useraddr":"","areaid":"","waiterauth":"0","brandid":"125","bankaddr":"","activatetime":"2016-01-31 23:22:41","userphonewx":"","likedrink":"","alipayid":"","userage":"","alipayname":"","ticketendtime":"2016-01-31 23:24:38","accounttypename":"酒券","clientid":"","chargelevelid":"2"},{"ticketstarttime":"2015-12-30 13:55:38","userbirthday":"","apparea":"","charactersign":"","paypwd":"","batchno":"20151230","accounttype":"2","lastlogintime":"","identitytype":"","userphone":"","usercredits":"","expiredate":"2016-12-31","usersex":"","identitycode":"","wechatid":"","paycount":"","appendnumber":"1750","bankaccount":"","cardpwd":"15549500","lastlogintype":"","createtime":"2015-12-30 13:55:38","row":"3","registermodel":"","usertype":"","remark":"","secureemail":"","userparentid":"","useremail":"","userpassword":"","balance":"","maxamount":"","cardid":"23498","activateuserid":"liaojing","brandname":"沱牌生态[15年]","leveltime":"","createuserid":"JiangPeili","unitid":"","cardstatus":"4","username":"","cardstatusname":"作废","buyeruserid":"","registertime":"","cardno":"1512755000234980","lastloginaddr":"","baiduid":"","recomuserid":"","levelid":"","useraddr":"","areaid":"","waiterauth":"","brandid":"123","bankaddr":"","activatetime":"2015-12-30 14:03:36","userphonewx":"","likedrink":"","alipayid":"","userage":"","alipayname":"","ticketendtime":"2016-12-30 13:55:49","accounttypename":"酒券","clientid":"","chargelevelid":""},{"ticketstarttime":"2015-12-30 13:54:36","userbirthday":"","apparea":"","charactersign":"","paypwd":"","batchno":"20151230","accounttype":"2","lastlogintime":"","identitytype":"","userphone":"","usercredits":"","expiredate":"2016-12-31","usersex":"","identitycode":"","wechatid":"","paycount":"","appendnumber":"2500","bankaccount":"","cardpwd":"23009882","lastlogintype":"","createtime":"2015-12-30 13:54:36","row":"4","registermodel":"","usertype":"","remark":"","secureemail":"","userparentid":"","useremail":"","userpassword":"","balance":"","maxamount":"","cardid":"23494","activateuserid":"liaojing","brandname":"沱牌生态[15年]","leveltime":"","createuserid":"JiangPeili","unitid":"","cardstatus":"2","username":"","cardstatusname":"已过期","buyeruserid":"","registertime":"","cardno":"1512755000234944","lastloginaddr":"","baiduid":"","recomuserid":"","levelid":"","useraddr":"","areaid":"","waiterauth":"","brandid":"123","bankaddr":"","activatetime":"2015-12-30 14:03:36","userphonewx":"","likedrink":"","alipayid":"","userage":"","alipayname":"","ticketendtime":"2016-12-30 13:55:01","accounttypename":"酒券","clientid":"","chargelevelid":""},{"ticketstarttime":"2015-12-30 13:54:36","userbirthday":"","apparea":"","charactersign":"","paypwd":"","batchno":"20151230","accounttype":"2","lastlogintime":"","identitytype":"","userphone":"","usercredits":"","expiredate":"2016-12-31","usersex":"","identitycode":"","wechatid":"","paycount":"","appendnumber":"2500","bankaccount":"","cardpwd":"99535775","lastlogintype":"","createtime":"2015-12-30 13:54:36","row":"5","registermodel":"","usertype":"","remark":"","secureemail":"","userparentid":"","useremail":"","userpassword":"","balance":"","maxamount":"","cardid":"23495","activateuserid":"liaojing","brandname":"沱牌生态[15年]","leveltime":"","createuserid":"JiangPeili","unitid":"","cardstatus":"2","username":"","cardstatusname":"已过期","buyeruserid":"","registertime":"","cardno":"1512755000234953","lastloginaddr":"","baiduid":"","recomuserid":"","levelid":"","useraddr":"","areaid":"","waiterauth":"","brandid":"123","bankaddr":"","activatetime":"2015-12-30 14:03:36","userphonewx":"","likedrink":"","alipayid":"","userage":"","alipayname":"","ticketendtime":"2016-12-30 13:55:01","accounttypename":"酒券","clientid":"","chargelevelid":""},{"ticketstarttime":"2015-12-30 13:54:36","userbirthday":"","apparea":"","charactersign":"","paypwd":"","batchno":"20151230","accounttype":"2","lastlogintime":"","identitytype":"","userphone":"","usercredits":"","expiredate":"2016-12-31","usersex":"","identitycode":"","wechatid":"","paycount":"","appendnumber":"2500","bankaccount":"","cardpwd":"17377216","lastlogintype":"","createtime":"2015-12-30 13:54:36","row":"6","registermodel":"","usertype":"","remark":"","secureemail":"","userparentid":"","useremail":"","userpassword":"","balance":"","maxamount":"","cardid":"23496","activateuserid":"liaojing","brandname":"沱牌生态[15年]","leveltime":"","createuserid":"JiangPeili","unitid":"","cardstatus":"2","username":"","cardstatusname":"已过期","buyeruserid":"","registertime":"","cardno":"1512755000234962","lastloginaddr":"","baiduid":"","recomuserid":"","levelid":"","useraddr":"","areaid":"","waiterauth":"","brandid":"123","bankaddr":"","activatetime":"2015-12-30 14:03:36","userphonewx":"","likedrink":"","alipayid":"","userage":"","alipayname":"","ticketendtime":"2016-12-30 13:55:01","accounttypename":"酒券","clientid":"","chargelevelid":""},{"ticketstarttime":"2015-12-30 13:54:36","userbirthday":"","apparea":"","charactersign":"","paypwd":"","batchno":"20151230","accounttype":"2","lastlogintime":"","identitytype":"","userphone":"","usercredits":"","expiredate":"2016-12-31","usersex":"","identitycode":"","wechatid":"","paycount":"","appendnumber":"2500","bankaccount":"","cardpwd":"26914481","lastlogintype":"","createtime":"2015-12-30 13:54:36","row":"7","registermodel":"","usertype":"","remark":"","secureemail":"","userparentid":"","useremail":"","userpassword":"","balance":"","maxamount":"","cardid":"23497","activateuserid":"liaojing","brandname":"沱牌生态[15年]","leveltime":"","createuserid":"JiangPeili","unitid":"","cardstatus":"2","username":"","cardstatusname":"已过期","buyeruserid":"","registertime":"","cardno":"1512755000234971","lastloginaddr":"","baiduid":"","recomuserid":"","levelid":"","useraddr":"","areaid":"","waiterauth":"","brandid":"123","bankaddr":"","activatetime":"2015-12-30 14:03:36","userphonewx":"","likedrink":"","alipayid":"","userage":"","alipayname":"","ticketendtime":"2016-12-30 13:55:01","accounttypename":"酒券","clientid":"","chargelevelid":""},{"ticketstarttime":"2015-12-30 13:53:54","userbirthday":"","apparea":"","charactersign":"","paypwd":"","batchno":"20151230","accounttype":"2","lastlogintime":"","identitytype":"","userphone":"","usercredits":"","expiredate":"2016-12-31","usersex":"","identitycode":"","wechatid":"","paycount":"","appendnumber":"5000","bankaccount":"","cardpwd":"64952315","lastlogintype":"","createtime":"2015-12-30 13:53:54","row":"8","registermodel":"","usertype":"","remark":"","secureemail":"","userparentid":"","useremail":"","userpassword":"","balance":"","maxamount":"","cardid":"23479","activateuserid":"liaojing","brandname":"五粮液股份[纯粮陈窖]52°","leveltime":"","createuserid":"JiangPeili","unitid":"","cardstatus":"2","username":"","cardstatusname":"已过期","buyeruserid":"","registertime":"","cardno":"1512755000234795","lastloginaddr":"","baiduid":"","recomuserid":"","levelid":"","useraddr":"","areaid":"","waiterauth":"","brandid":"112","bankaddr":"","activatetime":"2015-12-30 14:03:36","userphonewx":"","likedrink":"","alipayid":"","userage":"","alipayname":"","ticketendtime":"2016-12-30 13:54:09","accounttypename":"酒券","clientid":"","chargelevelid":""},{"ticketstarttime":"2015-12-30 13:53:54","userbirthday":"","apparea":"","charactersign":"","paypwd":"","batchno":"20151230","accounttype":"2","lastlogintime":"","identitytype":"","userphone":"","usercredits":"","expiredate":"2016-12-31","usersex":"","identitycode":"","wechatid":"","paycount":"","appendnumber":"5000","bankaccount":"","cardpwd":"84200767","lastlogintype":"","createtime":"2015-12-30 13:53:54","row":"9","registermodel":"","usertype":"","remark":"","secureemail":"","userparentid":"","useremail":"","userpassword":"","balance":"","maxamount":"","cardid":"23480","activateuserid":"liaojing","brandname":"五粮液股份[纯粮陈窖]52°","leveltime":"","createuserid":"JiangPeili","unitid":"","cardstatus":"2","username":"","cardstatusname":"已过期","buyeruserid":"","registertime":"","cardno":"1512755000234801","lastloginaddr":"","baiduid":"","recomuserid":"","levelid":"","useraddr":"","areaid":"","waiterauth":"","brandid":"112","bankaddr":"","activatetime":"2015-12-30 14:03:36","userphonewx":"","likedrink":"","alipayid":"","userage":"","alipayname":"","ticketendtime":"2016-12-30 13:54:09","accounttypename":"酒券","clientid":"","chargelevelid":""},{"ticketstarttime":"2015-12-30 13:53:54","userbirthday":"","apparea":"","charactersign":"","paypwd":"","batchno":"20151230","accounttype":"2","lastlogintime":"","identitytype":"","userphone":"","usercredits":"","expiredate":"2016-12-31","usersex":"","identitycode":"","wechatid":"","paycount":"","appendnumber":"5000","bankaccount":"","cardpwd":"70913271","lastlogintype":"","createtime":"2015-12-30 13:53:54","row":"10","registermodel":"","usertype":"","remark":"","secureemail":"","userparentid":"","useremail":"","userpassword":"","balance":"","maxamount":"","cardid":"23481","activateuserid":"liaojing","brandname":"五粮液股份[纯粮陈窖]52°","leveltime":"","createuserid":"JiangPeili","unitid":"","cardstatus":"2","username":"","cardstatusname":"已过期","buyeruserid":"","registertime":"","cardno":"1512755000234810","lastloginaddr":"","baiduid":"","recomuserid":"","levelid":"","useraddr":"","areaid":"","waiterauth":"","brandid":"112","bankaddr":"","activatetime":"2015-12-30 14:03:36","userphonewx":"","likedrink":"","alipayid":"","userage":"","alipayname":"","ticketendtime":"2016-12-30 13:54:09","accounttypename":"酒券","clientid":"","chargelevelid":""},{"ticketstarttime":"2015-12-30 13:53:54","userbirthday":"","apparea":"","charactersign":"","paypwd":"","batchno":"20151230","accounttype":"2","lastlogintime":"","identitytype":"","userphone":"","usercredits":"","expiredate":"2016-12-31","usersex":"","identitycode":"","wechatid":"","paycount":"","appendnumber":"5000","bankaccount":"","cardpwd":"10018490","lastlogintype":"","createtime":"2015-12-30 13:53:54","row":"11","registermodel":"","usertype":"","remark":"","secureemail":"","userparentid":"","useremail":"","userpassword":"","balance":"","maxamount":"","cardid":"23482","activateuserid":"liaojing","brandname":"五粮液股份[纯粮陈窖]52°","leveltime":"","createuserid":"JiangPeili","unitid":"","cardstatus":"2","username":"","cardstatusname":"已过期","buyeruserid":"","registertime":"","cardno":"1512755000234829","lastloginaddr":"","baiduid":"","recomuserid":"","levelid":"","useraddr":"","areaid":"","waiterauth":"","brandid":"112","bankaddr":"","activatetime":"2015-12-30 14:03:36","userphonewx":"","likedrink":"","alipayid":"","userage":"","alipayname":"","ticketendtime":"2016-12-30 13:54:09","accounttypename":"酒券","clientid":"","chargelevelid":""},{"ticketstarttime":"2015-12-30 13:53:54","userbirthday":"","apparea":"","charactersign":"","paypwd":"","batchno":"20151230","accounttype":"2","lastlogintime":"","identitytype":"","userphone":"","usercredits":"","expiredate":"2016-12-31","usersex":"","identitycode":"","wechatid":"","paycount":"","appendnumber":"5000","bankaccount":"","cardpwd":"69675023","lastlogintype":"","createtime":"2015-12-30 13:53:54","row":"12","registermodel":"","usertype":"","remark":"","secureemail":"","userparentid":"","useremail":"","userpassword":"","balance":"","maxamount":"","cardid":"23483","activateuserid":"liaojing","brandname":"五粮液股份[纯粮陈窖]52°","leveltime":"","createuserid":"JiangPeili","unitid":"","cardstatus":"2","username":"","cardstatusname":"已过期","buyeruserid":"","registertime":"","cardno":"1512755000234838","lastloginaddr":"","baiduid":"","recomuserid":"","levelid":"","useraddr":"","areaid":"","waiterauth":"","brandid":"112","bankaddr":"","activatetime":"2015-12-30 14:03:36","userphonewx":"","likedrink":"","alipayid":"","userage":"","alipayname":"","ticketendtime":"2016-12-30 13:54:09","accounttypename":"酒券","clientid":"","chargelevelid":""}],"res.page":[{"RecordsCount":22397,"hasNextPage":true,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12,"TotalPageCount":1867}],"res.size":"22397","returnview":"@json"},
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
