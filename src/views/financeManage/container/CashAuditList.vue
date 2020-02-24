<template>
  <div>
    <div class="flex-row filter-box flex-wrap">
      <div>
        <span>银行流水ID：</span>
        <el-input v-model="requestParams.orderId" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>投资人/门店：</span>
        <el-input v-model="requestParams.storeName" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>批次号：</span>
        <el-input v-model="requestParams.batchNo" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>提现类型：</span>
        <el-select v-model="requestParams.withholdType" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <span>账户类型：</span>
        <el-select v-model="requestParams.payMode" placeholder="请选择">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <span>上报时间：</span>
        <el-date-picker
          v-model="requestParams.appendTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div>
        <el-button type="primary">查询</el-button>
        <el-button type="primary">重置</el-button>
        <el-button type="primary">批量审批</el-button>
        <el-button type="primary">导出</el-button>
      </div>
    </div>
    <el-table
      :data="jsonName.res"
      border
      style="width: 100%">
      <el-table-column
        type="selection"
        width="45">
      </el-table-column>
      <el-table-column
        prop="orderid"
        label="银行流水ID">
      </el-table-column>
      <el-table-column
        prop=""
        label="批次号">
      </el-table-column>
      <el-table-column
        prop="outorderid"
        label="订单号">
      </el-table-column>
      <el-table-column
        prop="withholdtypename"
        label="提现类型">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="服务员手机号">
      </el-table-column>
      <el-table-column
        prop="accountname"
        label="银行类型">
      </el-table-column>
      <el-table-column
        label="金额(元)">
        <template slot-scope="scope">
          <span>{{scope.row.totalamount/100}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="storename"
        label="投资人/门店">
      </el-table-column>
      <el-table-column
        prop="paystatusname"
        label="支付状态">
      </el-table-column>
      <el-table-column
        prop="ordertime"
        label="生成时间">
      </el-table-column>
      <el-table-column
        prop="paytime"
        label="支付时间">
      </el-table-column>
      <el-table-column
        prop="cardno"
        label="提现账户">
      </el-table-column>
      <el-table-column
        prop="paymodename"
        label="账户类型">
      </el-table-column>
      <el-table-column
        prop="holder"
        label="账户名">
      </el-table-column>
      <el-table-column
        label="操作"
        width="80">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="dialogVisible=true">查看明细</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-style">
      <PageChange :total="total" :pageSize="requestParams.pageSize" :pageNum="requestParams.pageNum" @getList="getListData"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Api from "../util/api";
import PageChange from '../../../components/PageChange.vue'

export default {
  name: 'WaiterAccountList',
  components: {
    PageChange,
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        orderId: '',
        storeName: '',
        batchNo: '',
        withholdType: '',
        payMode: '',
        pageNum: 1,
        pageSize: 10
      },
      options: [{
        value: '',
        label: '全部'
      }, {
        value: '1',
        label: '门店提现'
      }, {
        value: '2',
        label: '服务提现'
      }, {
        value: '3',
        label: '推广提现'
      }, {
        value: '4',
        label: '创客提现'
      }],
      options2: [{
        value: '',
        label: '全部'
      }, {
        value: '1',
        label: '银行账户'
      }, {
        value: '2',
        label: '支付宝'
      }],
      jsonName: {"jvcpagename":"ls_bankaccount","jvcoldpageName":"ls_bankaccount","cmd":"query","returnvalue":"1","res.recordsperpage":"12","RecordsPerPage":"12","res":[{"paymodename":"银行账户","paystatus":"0","amounttype":"1","orderid":"1855","phone":"","paystatusname":"初始","row":"1","cardno":"34343535332","ordertime":"2020-02-01 00:04:54","withholdtypename":"创客提现","storename":"成都得民科技云酒柜","batchno":"","withholdtype":"4","holder":"5343434","paytime":"","totalamount":"1300","remark":"","storeid":"324","accountname":"个人","paymode":"1","outorderid":"20200201000454901656"},{"paymodename":"银行账户","paystatus":"0","amounttype":"1","orderid":"1854","phone":"","paystatusname":"初始","row":"2","cardno":"6216666100002473998","ordertime":"2020-02-01 00:04:54","withholdtypename":"创客提现","storename":"楼上楼私房菜","batchno":"","withholdtype":"4","holder":"徐颖宏","paytime":"","totalamount":"20150","remark":"","storeid":"2581","accountname":"个人","paymode":"1","outorderid":"20200201000454661308"},{"paymodename":"银行账户","paystatus":"10","amounttype":"1","orderid":"1853","phone":"","paystatusname":"已审核","row":"3","cardno":"6228480405802449778","ordertime":"2020-01-14 16:08:27","withholdtypename":"门店提现","storename":"帽牌货冒菜","batchno":"","withholdtype":"1","holder":"农行常熟市梅李支行","paytime":"","totalamount":"11050","remark":"","storeid":"2813","accountname":"个人","paymode":"1","outorderid":"20200114160827954874"},{"paymodename":"支付宝","paystatus":"3","amounttype":"0","orderid":"1852","phone":"","paystatusname":"支付成功","row":"4","cardno":"13906101852","ordertime":"2020-01-12 23:02:29","withholdtypename":"推广提现","batchno":"","withholdtype":"3","holder":"胡昶昌","paytime":"2020-01-12 23:02:29","totalamount":"2457","remark":"","storeid":"","accountname":"","paymode":"2","outorderid":"20200112230229698060"},{"paymodename":"银行账户","paystatus":"10","amounttype":"2","orderid":"1851","phone":"","paystatusname":"已审核","row":"5","cardno":"531358205064","ordertime":"2020-01-10 10:11:08","withholdtypename":"门店提现","storename":"富春（绿杨邨店）","batchno":"","withholdtype":"1","holder":"扬州富春饮服集团有限公司绿杨邨茶社","paytime":"","totalamount":"305150","remark":"","storeid":"2451","accountname":"对公","paymode":"1","outorderid":"20200110101108945360"},{"paymodename":"支付宝","paystatus":"3","amounttype":"0","orderid":"1850","phone":"","paystatusname":"支付成功","row":"6","cardno":"18006100345","ordertime":"2020-01-06 11:44:03","withholdtypename":"服务提现","storename":"丹徒区新城新锦尚餐厅宝龙店","batchno":"","withholdtype":"2","holder":"杨阳","paytime":"2020-01-06 11:44:03","totalamount":"263","remark":"","storeid":"2473","accountname":"","paymode":"2","outorderid":"20200106114403194945"},{"paymodename":"银行账户","paystatus":"10","amounttype":"1","orderid":"1849","phone":"","paystatusname":"已审核","row":"7","cardno":"4340611331965298","ordertime":"2020-01-06 11:05:38","withholdtypename":"门店提现","storename":"扬州鼎食汇","batchno":"","withholdtype":"1","holder":"岑其森","paytime":"","totalamount":"68000","remark":"","storeid":"1620","accountname":"个人","paymode":"1","outorderid":"20200106110538688129"},{"paymodename":"银行账户","paystatus":"10","amounttype":"1","orderid":"1848","phone":"","paystatusname":"已审核","row":"8","cardno":"6228480445803413779","ordertime":"2020-01-04 10:59:35","withholdtypename":"门店提现","storename":"赛维健康洗衣生活馆","batchno":"","withholdtype":"1","holder":"农行京华城支行","paytime":"","totalamount":"56100","remark":"","storeid":"2819","accountname":"个人","paymode":"1","outorderid":"20200104105935482457"},{"paymodename":"支付宝","paystatus":"0","amounttype":"0","orderid":"1847","phone":"","paystatusname":"初始","row":"9","cardno":"","ordertime":"2020-01-03 13:58:18","withholdtypename":"门店提现","storename":"啪啪乐","batchno":"","withholdtype":"1","holder":"朱壮壮","paytime":"","totalamount":"16","remark":"","storeid":"2920","accountname":"","paymode":"2","outorderid":"20200103135818436153"},{"paymodename":"支付宝","paystatus":"10","amounttype":"0","orderid":"1846","phone":"","paystatusname":"已审核","row":"10","cardno":"","ordertime":"2020-01-03 11:04:27","withholdtypename":"门店提现","storename":"啪啪乐","batchno":"","withholdtype":"1","holder":"朱壮壮","paytime":"","totalamount":"8","remark":"","storeid":"2920","accountname":"","paymode":"2","outorderid":"20200103110427304588"},{"paymodename":"支付宝","paystatus":"11","amounttype":"0","orderid":"1845","phone":"","paystatusname":"审核拒绝","row":"11","cardno":"","ordertime":"2020-01-02 17:01:57","withholdtypename":"门店提现","storename":"啪啪乐","batchno":"","withholdtype":"1","holder":"朱壮壮","paytime":"","totalamount":"800","remark":"测试","storeid":"2920","accountname":"","paymode":"2","outorderid":"20200102170157826335"},{"paymodename":"支付宝","paystatus":"10","amounttype":"0","orderid":"1844","phone":"","paystatusname":"已审核","row":"12","cardno":"","ordertime":"2020-01-02 16:59:08","withholdtypename":"门店提现","storename":"啪啪乐","batchno":"","withholdtype":"1","holder":"黄进军","paytime":"","totalamount":"800","remark":"","storeid":"2920","accountname":"","paymode":"2","outorderid":"20200102165908673657"}],"res.page":[{"RecordsCount":1412,"hasNextPage":true,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12,"TotalPageCount":118}],"res.size":"1412","returnview":"@json"},
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
