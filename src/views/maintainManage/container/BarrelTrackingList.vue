<template>
  <div>
    <div class="flex-row filter-box flex-wrap">
      <div>
        <span>门店/酒厂：</span>
        <el-input v-model="requestParams.storeName" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>酒品：</span>
        <el-input v-model="requestParams.brandName" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>酒桶编号：</span>
        <el-input v-model="requestParams.barrelId" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>永久RFID：</span>
        <el-input v-model="requestParams.barrelRFID" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>封口RFID：</span>
        <el-input v-model="requestParams.tempRFID" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>状态：</span>
        <el-select v-model="requestParams.barrelStatus" placeholder="请选择" style="width: 80px">
          <el-option
            v-for="item in barrelStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <span>是否空桶：</span>
        <el-select v-model="requestParams.isEmpty" placeholder="请选择" style="width: 100px">
          <el-option
            v-for="item in isEmptyOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <span>类型：</span>
        <el-select v-model="requestParams.barrelType" placeholder="请选择" style="width: 100px">
          <el-option
            v-for="item in barrelTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <span>使用次数：</span>
        <el-input v-model="requestParams.useTimes" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>剩余酒量：</span>
        <el-input v-model="requestParams.morethan" clearable placeholder="请输入内容"></el-input>至
        <el-input v-model="requestParams.lessthan" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>出厂日期：</span>
        <el-date-picker
          v-model="requestParams.datetime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div>
        <el-button type="primary">查询</el-button>
        <el-button type="primary">重置</el-button>
        <el-button type="primary">导出</el-button>
      </div>
    </div>
    <el-table
      :data="jsonName.res"
      border
      style="width: 100%">
      <el-table-column
        prop="barrelid"
        label="酒桶编号">
      </el-table-column>
      <el-table-column
        prop="barrelrfid"
        label="永久RFID">
      </el-table-column>
      <el-table-column
        prop="temprfid"
        label="封口RFID">
      </el-table-column>
      <el-table-column
        prop="storename"
        label="当前位置">
      </el-table-column>
      <el-table-column
        prop="barrelfactorydate"
        label="出厂日期"
        width="110">
      </el-table-column>
      <el-table-column
        prop="makebatch"
        label="出厂批次">
      </el-table-column>
      <el-table-column
        prop="brandname"
        label="当前酒品">
      </el-table-column>
      <el-table-column
        prop="statusname"
        label="状态">
      </el-table-column>
      <el-table-column
        prop="usetimes"
        label="使用次数">
      </el-table-column>
      <el-table-column
        prop="barrelremain"
        label="剩余酒量">
      </el-table-column>
      <el-table-column
        prop="isemptyname"
        label="是否空桶">
      </el-table-column>
      <el-table-column
        prop="barreltypename"
        label="酒桶类型">
      </el-table-column>
      <el-table-column
        prop="onlinetime"
        label="上线时间">
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
  name: 'BarrelTrackingList',
  components: {
    PageChange,
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        storeName: '',
        brandName: '',
        barrelId: '',
        barrelRFID: '',
        barrelStatus: '',
        tempRFID: '',
        isEmpty: '',
        barrelType: '',
        useTimes: '',
        morethan: '',
        lessthan: '',
        datetime: '',
        pageNum: 1,
        pageSize: 10
      },
      dialogVisible: false,
      barrelStatusOptions: [{
        value: '',
        label: '全部'
      }, {
        value: '1',
        label: '闲置'
      }, {
        value: '2',
        label: '在用'
      }, {
        value: '3',
        label: '报废'
      }],
      isEmptyOptions: [{
        value: '',
        label: '全部'
      }, {
        value: '1',
        label: '是'
      }, {
        value: '0',
        label: '否'
      }],
      barrelTypeOptions: [{
        value: '',
        label: '全部'
      }, {
        value: '0',
        label: '不锈钢桶'
      }, {
        value: '1',
        label: '塑料桶'
      }],
      jsonName: {"jvcpagename":"pc_barrel","jvcoldpageName":"pc_barrel","cmd":"querytracking","returnvalue":"1","res.recordsperpage":"12","RecordsPerPage":"12","res":[{"statusname":"闲置","barrelremain":"10000","barreltypename":"塑料桶","barrelstatus":"1","isempty":"0","barrelvolume":"10000","brandid":"174","row":"1","barrelrfid":"300000076252","usetimes":"1","makebatch":"20191217","barrelid":"300000076252","storename":"成都得民","barreltype":"1","barrelfactorydate":"2019-12-17","onlinetime":"","packagetime":"2019-12-17 17:38:39","storeid":"1","temprfid":"300000076252","isemptyname":"否","brandname":"贵州茅台.华茅酒[得民精选]"},{"statusname":"闲置","barrelremain":"10000","barreltypename":"塑料桶","barrelstatus":"1","isempty":"0","barrelvolume":"10000","brandid":"174","row":"2","barrelrfid":"300000076251","usetimes":"1","makebatch":"20191217","barrelid":"300000076251","storename":"成都得民","barreltype":"1","barrelfactorydate":"2019-12-17","onlinetime":"","packagetime":"2019-12-17 17:28:07","storeid":"1","temprfid":"300000076251","isemptyname":"否","brandname":"贵州茅台.华茅酒[得民精选]"},{"statusname":"在用","barrelremain":"9707","barreltypename":"塑料桶","barrelstatus":"2","isempty":"0","barrelvolume":"10000","brandid":"238","row":"3","barrelrfid":"300000076240","usetimes":"1","makebatch":"20181221","barrelid":"300000076240","storename":"江苏总部展示机","barreltype":"1","barrelfactorydate":"2018-12-21","onlinetime":"2018-12-21 13:43:14.0","packagetime":"2018-12-21 13:35:09","storeid":"2603","temprfid":"300000076240","isemptyname":"否","brandname":"曼珠沙华"},{"statusname":"闲置","barrelremain":"10000","barreltypename":"塑料桶","barrelstatus":"1","isempty":"0","barrelvolume":"10000","brandid":"238","row":"4","barrelrfid":"300000076239","usetimes":"1","makebatch":"20181221","barrelid":"300000076239","storename":"成都得民","barreltype":"1","barrelfactorydate":"2018-12-21","onlinetime":"","packagetime":"2018-12-21 13:25:02","storeid":"1","temprfid":"300000076239","isemptyname":"否","brandname":"曼珠沙华"},{"statusname":"在用","barrelremain":"10000","barreltypename":"塑料桶","barrelstatus":"2","isempty":"0","barrelvolume":"10000","brandid":"174","row":"5","barrelrfid":"300000076238","usetimes":"1","makebatch":"20181208","barrelid":"300000076238","storename":"苏州汇融广场假日酒店","barreltype":"1","barrelfactorydate":"2018-12-08","onlinetime":"2018-12-08 11:27:45.0","packagetime":"2018-12-08 11:20:50","storeid":"2604","temprfid":"300000076238","isemptyname":"否","brandname":"贵州茅台.华茅酒[得民精选]"},{"statusname":"在用","barrelremain":"10000","barreltypename":"塑料桶","barrelstatus":"2","isempty":"0","barrelvolume":"10000","brandid":"174","row":"6","barrelrfid":"300000076236","usetimes":"1","makebatch":"20181208","barrelid":"300000076236","storename":"苏州汇融广场假日酒店","barreltype":"1","barrelfactorydate":"2018-12-08","onlinetime":"2018-12-08 11:26:45.0","packagetime":"2018-12-08 11:17:04","storeid":"2604","temprfid":"300000076236","isemptyname":"否","brandname":"贵州茅台.华茅酒[得民精选]"},{"statusname":"在用","barrelremain":"10000","barreltypename":"塑料桶","barrelstatus":"2","isempty":"0","barrelvolume":"10000","brandid":"174","row":"7","barrelrfid":"300000076237","usetimes":"1","makebatch":"20181208","barrelid":"300000076237","storename":"苏州汇融广场假日酒店","barreltype":"1","barrelfactorydate":"2018-12-08","onlinetime":"2018-12-08 11:25:41.0","packagetime":"2018-12-08 11:16:55","storeid":"2604","temprfid":"300000076237","isemptyname":"否","brandname":"贵州茅台.华茅酒[得民精选]"},{"statusname":"在用","barrelremain":"9950","barreltypename":"塑料桶","barrelstatus":"2","isempty":"0","barrelvolume":"10000","brandid":"112","row":"8","barrelrfid":"300000076233","usetimes":"1","makebatch":"20181208","barrelid":"300000076233","storename":"苏州汇融广场假日酒店","barreltype":"1","barrelfactorydate":"2018-12-08","onlinetime":"2018-12-08 11:24:37.0","packagetime":"2018-12-08 11:14:48","storeid":"2604","temprfid":"300000076233","isemptyname":"否","brandname":"五粮液股份[纯粮陈窖]52°"},{"statusname":"在用","barrelremain":"10000","barreltypename":"塑料桶","barrelstatus":"2","isempty":"0","barrelvolume":"10000","brandid":"112","row":"9","barrelrfid":"300000076234","usetimes":"1","makebatch":"20181208","barrelid":"300000076234","storename":"苏州汇融广场假日酒店","barreltype":"1","barrelfactorydate":"2018-12-08","onlinetime":"2018-12-08 11:23:58.0","packagetime":"2018-12-08 11:14:40","storeid":"2604","temprfid":"300000076234","isemptyname":"否","brandname":"五粮液股份[纯粮陈窖]52°"},{"statusname":"在用","barrelremain":"10000","barreltypename":"塑料桶","barrelstatus":"2","isempty":"0","barrelvolume":"10000","brandid":"112","row":"10","barrelrfid":"300000076235","usetimes":"1","makebatch":"20181208","barrelid":"300000076235","storename":"苏州汇融广场假日酒店","barreltype":"1","barrelfactorydate":"2018-12-08","onlinetime":"2018-12-08 11:22:59.0","packagetime":"2018-12-08 11:14:28","storeid":"2604","temprfid":"300000076235","isemptyname":"否","brandname":"五粮液股份[纯粮陈窖]52°"},{"statusname":"在用","barrelremain":"10000","barreltypename":"塑料桶","barrelstatus":"2","isempty":"0","barrelvolume":"10000","brandid":"124","row":"11","barrelrfid":"300000076232","usetimes":"1","makebatch":"20181207","barrelid":"300000076232","storename":"江苏总部展示机","barreltype":"1","barrelfactorydate":"2018-12-07","onlinetime":"2018-12-07 15:16:05.0","packagetime":"2018-12-07 15:13:16","storeid":"2603","temprfid":"300000076232","isemptyname":"否","brandname":"天香池[10年]"},{"statusname":"闲置","barrelremain":"10000","barreltypename":"塑料桶","barrelstatus":"1","isempty":"0","barrelvolume":"10000","brandid":"124","row":"12","barrelrfid":"300000076231","usetimes":"1","makebatch":"20181207","barrelid":"300000076231","storename":"成都得民","barreltype":"1","barrelfactorydate":"2018-12-07","onlinetime":"","packagetime":"2018-12-07 15:01:14","storeid":"1","temprfid":"300000076231","isemptyname":"否","brandname":"天香池[10年]"}],"res.page":[{"RecordsCount":44255,"hasNextPage":true,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12,"TotalPageCount":3688}],"res.size":"44255","returnview":"@json"},
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
