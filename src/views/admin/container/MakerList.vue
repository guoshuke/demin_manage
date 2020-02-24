<template>
  <div>
    <div class="flex-row filter-box">
      <div>
        <span>编号：</span>
        <el-input v-model="requestParams.no" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>姓名：</span>
        <el-input v-model="requestParams.name" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>电话：</span>
        <el-input v-model="requestParams.phone" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>身份证：</span>
        <el-input v-model="requestParams.idCard" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <el-button type="primary">查询</el-button>
      </div>
    </div>
    <div class="operation-box">
      <el-button type="success" size="small" @click="dialogVisible=true">新增创客</el-button>
    </div>
    <el-table
      :data="jsonName.res"
      border
      style="width: 100%">
      <el-table-column
        prop="row"
        label="编号"
        width="50">
      </el-table-column>
      <el-table-column
        prop="creatorname"
        width="110"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号"
        width="110">
      </el-table-column>
      <el-table-column
        prop="previouname"
        label="所属上级">
      </el-table-column>
      <el-table-column
        prop="cardid"
        label="身份证号"
        width="170">
      </el-table-column>
      <el-table-column
        prop="bankcardno"
        label="银行卡号"
        width="170">
      </el-table-column>
      <el-table-column
        prop="openname"
        label="开户名"
        width="90">
      </el-table-column>
      <el-table-column
        prop="bankcardname"
        label="所属银行"
        width="80">
      </el-table-column>
      <el-table-column
        prop="banktype"
        label="账户类型"
        width="80">
        <template slot-scope="scope">
          <span>{{scope.row.banktype=='1'?'对私':(scope.row.banktype=='2'?'对公':'')}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="starttime"
        label="落店时间"
        width="156">
      </el-table-column>
      <el-table-column
        prop="alipayid"
        label="支付宝账号"
        width="120">
      </el-table-column>
      <el-table-column
        prop="alipayname"
        label="支付宝姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="helperStatus"
        label="操作"
        width="60">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="dialogVisible=true"><i class="el-icon-edit"></i></el-button>
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
import Breadcrumb from '@/components/Breadcrumb.vue'

export default {
  name: 'MakerList',
  components: {
    PageChange,
    Breadcrumb
  },
  data() {
    return {
      breadData: [
        {name: '专题活动', path: '/activityHome'},
        {name: '活动列表', path: '/projectActivity'},
        {name: '活动详情', path: ''}
      ],
      total: 1000,
      requestParams: {
        no: '',
        name: '',
        phone: '',
        idCard: '',
        pageNum: 1,
        pageSize: 10
      },
      dialogVisible: false,
      jsonName: {
        "jvcpagename": "yjm_creator",
        "jvcoldpageName": "yjm_creator",
        "cmd": "query",
        "returnvalue": "1",
        "res.recordsperpage": "12",
        "RecordsPerPage": "12",
        "res": [{
          "bankcardname": "ICBC",
          "cardid": "511025198808255710",
          "province": "",
          "banktype": "1",
          "openname": "中国银行",
          "creatorname": "何洪",
          "city": "",
          "bankcardno": "5110252155522112541",
          "storepreviou": "1858",
          "phone": "13880912212",
          "alipayid": "13880912212",
          "starttime": "2018-03-29 12:58:47",
          "creatorid": "1",
          "alipayname": "何鹏",
          "previouname": "小民公司",
          "row": "1"
        }, {
          "bankcardname": "ICBC",
          "cardid": "321027199303105421",
          "province": "",
          "banktype": "1",
          "openname": "吴艳",
          "creatorname": "扬州测试创客",
          "city": "",
          "bankcardno": "88888888888",
          "storepreviou": "1111",
          "phone": "123456789",
          "alipayid": "13880912212",
          "starttime": "",
          "creatorid": "3",
          "alipayname": "扬州测试创客",
          "previouname": "江苏得民数联智能设备科技有限公司",
          "row": "2"
        }, {
          "bankcardname": "",
          "cardid": "511023199812257231",
          "province": "",
          "banktype": "",
          "openname": "",
          "creatorname": "糖衣",
          "city": "",
          "bankcardno": "",
          "storepreviou": "1111",
          "phone": "18582592470",
          "alipayid": "13880912212",
          "starttime": "",
          "creatorid": "6",
          "alipayname": "何洪",
          "previouname": "江苏得民数联智能设备科技有限公司",
          "row": "3"
        }, {
          "bankcardname": "BOC",
          "cardid": "32101119710427031X",
          "province": "",
          "banktype": "1",
          "openname": "金国",
          "creatorname": "金国",
          "city": "",
          "bankcardno": "6217876100007757803",
          "storepreviou": "1111",
          "phone": "15366905148",
          "alipayid": "",
          "starttime": "2018-01-09 00:00:00",
          "creatorid": "8",
          "alipayname": "",
          "previouname": "江苏得民数联智能设备科技有限公司",
          "row": "4"
        }, {
          "bankcardname": "CMB",
          "cardid": "321002198203100349",
          "province": "",
          "banktype": "1",
          "openname": "董巍",
          "creatorname": "董巍",
          "city": "",
          "bankcardno": "6214835140242445",
          "storepreviou": "1111",
          "phone": "13813198212",
          "alipayid": "",
          "starttime": "2018-01-10 00:00:00",
          "creatorid": "9",
          "alipayname": "",
          "previouname": "江苏得民数联智能设备科技有限公司",
          "row": "5"
        }, {
          "bankcardname": "COMM",
          "cardid": "321083197309303711",
          "province": "",
          "banktype": "1",
          "openname": "许建强",
          "creatorname": "许建强",
          "city": "",
          "bankcardno": "6222620160000090775",
          "storepreviou": "1111",
          "phone": "13615245712",
          "alipayid": "",
          "starttime": "2018-01-10 00:00:00",
          "creatorid": "10",
          "alipayname": "",
          "previouname": "江苏得民数联智能设备科技有限公司",
          "row": "6"
        }, {
          "bankcardname": "COMM",
          "cardid": "320000000000000000",
          "province": "320000",
          "banktype": "2",
          "openname": "南京三兄弟投资管理有限公司",
          "creatorname": "王继发",
          "city": "320100",
          "bankcardno": "320899991010003203044",
          "storepreviou": "1111",
          "phone": "17705191199",
          "alipayid": "",
          "starttime": "2018-01-11 00:00:00",
          "creatorid": "11",
          "alipayname": "",
          "previouname": "江苏得民数联智能设备科技有限公司",
          "row": "7"
        }, {
          "bankcardname": "ICBC",
          "cardid": "321027196706066320",
          "province": "",
          "banktype": "1",
          "openname": "陈翠琴",
          "creatorname": "陈翠琴",
          "city": "",
          "bankcardno": "6222081108002292495",
          "storepreviou": "1111",
          "phone": "13815809887",
          "alipayid": "",
          "starttime": "2018-04-19 16:34:11",
          "creatorid": "12",
          "alipayname": "",
          "previouname": "江苏得民数联智能设备科技有限公司",
          "row": "8"
        }, {
          "bankcardname": "ICBC",
          "cardid": "320000000000000000",
          "province": "320000",
          "banktype": "2",
          "openname": "徐州天益企业咨询管理有限公司",
          "creatorname": "刘念坤",
          "city": "320300",
          "bankcardno": "1106061009200031219",
          "storepreviou": "1111",
          "phone": "15852339900",
          "alipayid": "",
          "starttime": "2018-04-17 10:54:44",
          "creatorid": "13",
          "alipayname": "",
          "previouname": "江苏得民数联智能设备科技有限公司",
          "row": "9"
        }, {
          "bankcardname": "CCB",
          "cardid": "321023196601031839",
          "province": "",
          "banktype": "1",
          "openname": "赵士才",
          "creatorname": "赵士才",
          "city": "",
          "bankcardno": "6214661330008002",
          "storepreviou": "1111",
          "phone": "13079970170",
          "alipayid": "",
          "starttime": "2018-01-27 00:00:00",
          "creatorid": "14",
          "alipayname": "",
          "previouname": "江苏得民数联智能设备科技有限公司",
          "row": "10"
        }, {
          "bankcardname": "CCB",
          "cardid": "321083197205283736",
          "province": "",
          "banktype": "1",
          "openname": "陈爱荣",
          "creatorname": "陈爱荣",
          "city": "",
          "bankcardno": "6227001311640165414",
          "storepreviou": "1111",
          "phone": "18861068790",
          "alipayid": "",
          "starttime": "2018-01-22 00:00:00",
          "creatorid": "15",
          "alipayname": "",
          "previouname": "江苏得民数联智能设备科技有限公司",
          "row": "11"
        }, {
          "bankcardname": "ABC",
          "cardid": "321002198010222112",
          "province": "",
          "banktype": "1",
          "openname": "夏葆",
          "creatorname": "夏葆",
          "city": "",
          "bankcardno": "6228480448736180978",
          "storepreviou": "1111",
          "phone": "19905147777",
          "alipayid": "",
          "starttime": "2018-01-19 00:00:00",
          "creatorid": "16",
          "alipayname": "",
          "previouname": "江苏得民数联智能设备科技有限公司",
          "row": "12"
        }],
        "res.page": [{
          "RecordsCount": 42,
          "hasNextPage": true,
          "hasPreviousPage": false,
          "CurPage": 1,
          "RecordsPerPage": 12,
          "TotalPageCount": 4
        }],
        "res.size": "42",
        "returnview": "@json"
      }
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
  .el-icon-edit {
    font-size: 16px;
  }
</style>
