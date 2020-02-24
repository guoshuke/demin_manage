<template>
  <div>
    <div class="flex-row filter-box flex-wrap">
      <div>
        <span>手机号：</span>
        <el-input v-model="requestParams.phoneNumber" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>类型：</span>
        <el-select v-model="requestParams.detailCase" placeholder="请选择">
          <el-option
            v-for="item in detailCaseOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <span>类型：</span>
        <el-select v-model="requestParams.detailType" placeholder="请选择">
          <el-option
            v-for="item in detailTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <span>明细时间：</span>
        <el-date-picker
          v-model="requestParams.consumeTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
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
        prop="detailid"
        label="编号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="phonenumber"
        width="120"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="昵称">
      </el-table-column>
      <el-table-column
        prop="detailcasename"
        label="类型"
        width="80">
      </el-table-column>
      <el-table-column
        prop="detailtypename"
        label="出入账"
        width="80">
      </el-table-column>
      <el-table-column
        prop="consumeamount"
        label="积分"
        width="80">
      </el-table-column>
      <el-table-column
        prop="consumetime"
        label="明细时间"
        width="160">
      </el-table-column>
      <el-table-column
        prop="beforeamount"
        label="操作前"
        width="80">
      </el-table-column>
      <el-table-column
        prop="afteramount"
        label="操作后"
        width="80">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注">
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
  name: 'UserNtegralDetailList',
  components: {
    PageChange,
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        phoneNumber: '',
        detailCase: '',
        detailType: '',
        pageNum: 1,
        pageSize: 10
      },
      detailCaseOptions: [
        {
          value: '',
          label: '全部'
        }, {
          value: '2',
          label: '充值赠送'
        }, {
          value: '3',
          label: '一般评论'
        }, {
          value: '4',
          label: '评论满100字'
        }, {
          value: '5',
          label: '兑换扣除'
        }, {
          value: '6',
          label: '抽奖扣除'
        }, {
          value: '7',
          label: '抽奖中奖'
        }, {
          value: '8',
          label: '手动操作'
        }
      ],
      detailTypeOptions: [
        {
          value: '',
          label: '全部'
        }, {
          value: '1',
          label: '出账'
        }, {
          value: '2',
          label: '入账'
        }
      ],
      dialogVisible: false,
      jsonName: {"jvcpagename":"yjm_integral","jvcoldpageName":"yjm_integral","cmd":"queryUserIntegralDetail","returnvalue":"1","res.recordsperpage":"12","RecordsPerPage":"12","res":[{"beforeamount":"273","detailtype":"2","detailid":"477","detailcase":"9","detailcasename":"","detailtypename":"入账","userid":"35665","nickname":"啊娟","remark":"在帽牌货冒菜买单赠送积分！","phonenumber":"15715256062","consumeamount":"130","afteramount":"403","row":"1","consumetime":"2020-01-10 13:19:58"},{"beforeamount":"1900","detailtype":"2","detailid":"476","detailcase":"9","detailcasename":"","detailtypename":"入账","userid":"37714","nickname":"金德宝 美景暖通股份","remark":"在富春（绿杨邨店）买单赠送积分！","phonenumber":"15252768488","consumeamount":"1690","afteramount":"3590","row":"2","consumetime":"2020-01-09 21:44:04"},{"beforeamount":"","detailtype":"2","detailid":"475","detailcase":"9","detailcasename":"","detailtypename":"入账","userid":"37714","nickname":"金德宝 美景暖通股份","remark":"在富春（绿杨邨店）买单赠送积分！","phonenumber":"15252768488","consumeamount":"1900","afteramount":"1900","row":"3","consumetime":"2020-01-09 21:42:55"},{"beforeamount":"19786","detailtype":"2","detailid":"474","detailcase":"9","detailcasename":"","detailtypename":"入账","userid":"52","nickname":"得民【天下有酒】高桂芹","remark":"在扬州鼎食汇买单赠送积分！","phonenumber":"18652756881","consumeamount":"800","afteramount":"20586","row":"4","consumetime":"2020-01-04 13:35:10"},{"beforeamount":"19126","detailtype":"2","detailid":"473","detailcase":"9","detailcasename":"","detailtypename":"入账","userid":"52","nickname":"得民【天下有酒】高桂芹","remark":"在赛维健康洗衣生活馆买单赠送积分！","phonenumber":"18652756881","consumeamount":"660","afteramount":"19786","row":"5","consumetime":"2020-01-04 10:24:42"},{"beforeamount":"4","detailtype":"2","detailid":"472","detailcase":"9","detailcasename":"","detailtypename":"入账","userid":"44539","nickname":"番丶茄","remark":"在啪啪乐买单赠送积分！","phonenumber":"17312830217","consumeamount":"1","afteramount":"5","row":"6","consumetime":"2020-01-03 13:53:05"},{"beforeamount":"3","detailtype":"2","detailid":"471","detailcase":"9","detailcasename":"","detailtypename":"入账","userid":"44539","nickname":"番丶茄","remark":"在啪啪乐买单赠送积分！","phonenumber":"17312830217","consumeamount":"1","afteramount":"4","row":"7","consumetime":"2020-01-03 11:14:00"},{"beforeamount":"2","detailtype":"2","detailid":"470","detailcase":"9","detailcasename":"","detailtypename":"入账","userid":"44539","nickname":"番丶茄","remark":"在啪啪乐买单赠送积分！","phonenumber":"17312830217","consumeamount":"1","afteramount":"3","row":"8","consumetime":"2020-01-03 11:06:42"},{"beforeamount":"1","detailtype":"2","detailid":"469","detailcase":"9","detailcasename":"","detailtypename":"入账","userid":"44539","nickname":"番丶茄","remark":"在啪啪乐买单赠送积分！","phonenumber":"17312830217","consumeamount":"1","afteramount":"2","row":"9","consumetime":"2020-01-03 11:01:16"},{"beforeamount":"20","detailtype":"2","detailid":"468","detailcase":"9","detailcasename":"","detailtypename":"入账","userid":"43043","nickname":"方得始终。","remark":"在啪啪乐买单赠送积分！","phonenumber":"18550890446","consumeamount":"1","afteramount":"21","row":"10","consumetime":"2020-01-03 10:09:46"},{"beforeamount":"","detailtype":"2","detailid":"467","detailcase":"9","detailcasename":"","detailtypename":"入账","userid":"44539","nickname":"番丶茄","remark":"在成都得民科技云酒柜买单赠送积分！","phonenumber":"17312830217","consumeamount":"1","afteramount":"1","row":"11","consumetime":"2020-01-02 11:45:22"},{"beforeamount":"220","detailtype":"2","detailid":"466","detailcase":"9","detailcasename":"","detailtypename":"入账","userid":"1484","nickname":"吉程","remark":"在扬州鼎食汇买单赠送积分！","phonenumber":"15052529073","consumeamount":"700","afteramount":"920","row":"12","consumetime":"2019-12-31 19:00:04"}],"res.page":[{"RecordsCount":471,"hasNextPage":true,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12,"TotalPageCount":40}],"res.size":"471","returnview":""}
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
