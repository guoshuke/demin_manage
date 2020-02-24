<template>
  <div>
    <div class="flex-row filter-box flex-wrap">
      <div>
        <span>抬头类型：</span>
        <el-select v-model="requestParams.invoiceType" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <span>发票状态：</span>
        <el-select v-model="requestParams.invoiceStatus" placeholder="请选择">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <span>快递单号：</span>
        <el-input v-model="requestParams.expressNo" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>开票金额：</span>
        <el-input v-model="requestParams.invoiceAmount" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>抬头名称：</span>
        <el-input v-model="requestParams.invoiceTitle" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>识别税号：</span>
        <el-input v-model="requestParams.invoiceNo" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>联系电话：</span>
        <el-input v-model="requestParams.deliverPhone" clearable placeholder="请输入内容"></el-input>
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
        prop="invoiceid"
        label="发票编号"
        width="90">
      </el-table-column>
      <el-table-column
        prop="invoicetypename"
        width="100"
        label="抬头类型">
      </el-table-column>
      <el-table-column
        prop="taxid"
        label="识别税号">
      </el-table-column>
      <el-table-column
        prop=""
        label="开票金额"
        width="100">
        <template slot-scope="scope">
          <span>{{scope.row.invoiceamount/100}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="deliverphone"
        label="联系电话"
        width="180">
      </el-table-column>
      <el-table-column
        prop="invoicetime"
        label="申请时间"
        width="200">
      </el-table-column>
      <el-table-column
        prop="invoicestatusname"
        label="发票状态"
        width="100">
      </el-table-column>
      <el-table-column
        prop="orderids"
        label="订单号"
        width="180">
      </el-table-column>
      <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="dialogVisible=true">编辑</el-button>
          <el-button type="text" size="small" @click="dialogVisible=true">删除</el-button>
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
  name: 'BuyRecordList',
  components: {
    PageChange,
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        invoiceType: '',
        invoiceStatus: '',
        expressNo: '',
        invoiceAmount: '',
        invoiceTitle: '',
        invoiceNo: '',
        deliverPhone: '',
        pageNum: 1,
        pageSize: 10
      },
      dialogVisible: false,
      options: [{
        value: '',
        label: '全部'
      }, {
        value: '1',
        label: '个人'
      }, {
        value: '2',
        label: '公司'
      }],
      options2: [{
        value: '',
        label: '全部'
      }, {
        value: '1',
        label: '未审核'
      }, {
        value: '2',
        label: '已审核'
      }, {
        value: '3',
        label: '已否决'
      }, {
        value: '4',
        label: '寄送中'
      }, {
        value: '5',
        label: '已签收'
      }, {
        value: '6',
        label: '已退回'
      }, {
        value: '7',
        label: '已作废'
      }],
      jsonName: {"jvcpagename":"ur_invoice","jvcoldpageName":"ur_invoice","cmd":"query1","returnvalue":"1","res.recordsperpage":"12","RecordsPerPage":"12","res":[{"taxid":"","deliverphone":"18766542346","invoicecode":"","invoiceusetypename":"普通","invoicetype":"1","invoiceamount":"400","invoicetypename":"个人","invoicestatusname":"已审核","orderids":"6909","row":"1","invoicetime":"2018-04-08 13:37:48","deliveraddress":"\n\t\t\t\t\t\t\t内蒙古自治区 乌兰察布市 察哈尔右翼前旗  Hash \n\t\t\t\t\t\t","invoiceno":"","expressno":"","delivername":"Hdhdh ","invoicestatus":"2","invoicetitle":"Hdhdhdhdh ","invoiceusetype":"1","invoiceid":"4"},{"taxid":"","deliverphone":"18584248454","invoicecode":"","invoiceusetypename":"普通","invoicetype":"1","invoiceamount":"800","invoicetypename":"个人","invoicestatusname":"未审核","orderids":"5062 ","row":"2","invoicetime":"2018-01-03 14:44:53","deliveraddress":" 内蒙古自治区 呼伦贝尔市 莫力达瓦达斡尔族自治旗时光的好多好多好","invoiceno":"","expressno":"","delivername":"yshdhd","invoicestatus":"1","invoicetitle":"好想好想积极的","invoiceusetype":"1","invoiceid":"3"},{"taxid":"","deliverphone":"18524554644","invoicecode":"","invoiceusetypename":"普通","invoicetype":"1","invoiceamount":"6500","invoicetypename":"个人","invoicestatusname":"未审核","orderids":"4598","row":"3","invoicetime":"2018-01-03 11:22:35","deliveraddress":"河南省 新乡市 红旗区  dbdbdb","invoiceno":"","expressno":"","delivername":"hdhdhddhdh","invoicestatus":"1","invoicetitle":"好我QQ西游","invoiceusetype":"1","invoiceid":"2"},{"taxid":"1545544585A","deliverphone":"18525885647","invoicecode":"1654811516155dsf","invoiceusetypename":"普通","invoicetype":"2","invoiceamount":"1200","invoicetypename":"公司","invoicestatusname":"已签收","orderids":"5049","row":"4","invoicetime":"2018-01-03 10:49:01","deliveraddress":"海南省 三沙市 中沙群岛的岛礁及其海域  里你害羞虎扑124584疾病X","invoiceno":"1561564544ssd","expressno":"115454564512sf","delivername":"躺椅","invoicestatus":"5","invoicetitle":"up几几开","invoiceusetype":"1","invoiceid":"1"}],"res.page":[{"RecordsCount":4,"hasNextPage":false,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12,"TotalPageCount":1}],"res.size":"4","returnview":""},
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
