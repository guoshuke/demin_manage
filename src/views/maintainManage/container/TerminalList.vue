<template>
  <div>
    <div class="flex-row filter-box flex-wrap">
      <div>
        <span>所在门店：</span>
        <el-input v-model="requestParams.storeName" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>终端号：</span>
        <el-input v-model="requestParams.devId" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>在线状态：</span>
        <el-select v-model="requestParams.devRunStatus" placeholder="请选择" style="width: 80px">
          <el-option
            v-for="item in devRunStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <span>机器编号：</span>
        <el-input v-model="requestParams.devCustomId" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>机型：</span>
        <el-select v-model="requestParams.factoryId" placeholder="请选择" style="width: 100px">
          <el-option
            v-for="item in factoryIdOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <el-button type="primary">查询</el-button>
        <el-button type="primary">重置</el-button>
      </div>
    </div>
    <el-table
      :data="jsonName.res"
      border
      style="width: 100%">
      <el-table-column
        prop="row"
        label="序号"
        width="60">
      </el-table-column>
      <el-table-column
        prop="storename"
        label="所在门店">
      </el-table-column>
      <el-table-column
        prop="devid"
        label="终端号">
      </el-table-column>
      <el-table-column
        prop="devlastoutnumber"
        label="最后出酒数量"
        width="110">
      </el-table-column>
      <el-table-column
        prop="devlastouttime"
        label="最后出酒时间"
        width="110">
      </el-table-column>
      <el-table-column
        prop="factoryname"
        label="机型">
      </el-table-column>
      <el-table-column
        prop="makedate"
        label="生产日期"
        width="100">
      </el-table-column>
      <el-table-column
        prop="devcustomid"
        label="机器编号">
      </el-table-column>
      <el-table-column
        prop="devbarcode"
        label="设备序号">
      </el-table-column>
      <el-table-column
        prop="devmodel"
        label="硬件版本">
      </el-table-column>
      <el-table-column
        prop="period"
        label="质保期">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注">
      </el-table-column>
      <el-table-column
        prop="statusname"
        label="在线状态">
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
  name: 'TerminalList',
  components: {
    PageChange,
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        storeName: '',
        devId: '',
        devRunStatus: '',
        devCustomId: '',
        factoryId: '',
        pageNum: 1,
        pageSize: 10
      },
      dialogVisible: false,
      devRunStatusOptions: [{
        value: '',
        label: '全部'
      }, {
        value: '1',
        label: '在线'
      }, {
        value: '0',
        label: '离线'
      }],
      factoryIdOptions: [{
        value: '',
        label: '全部'
      }, {
        value: '1',
        label: 'A机型'
      }, {
        value: '4',
        label: 'A1机型'
      }, {
        value: '5',
        label: 'A2机型'
      }],
      jsonName: {"jvcpagename":"se_deviceinfo","jvcoldpageName":"se_deviceinfo","cmd":"queryWithOutDeletedStore","returnvalue":"1","query.devType.unequ":"3","query.devRunStatus":"1","res.recordsperpage":"12","RecordsPerPage":"12","res":[{"directorname":"","devimpalenum":"","devlastouttime":"2000-01-01 08:56:32","statusname":"在线","directorphone":"","devlastreport":"2019-12-05 15:32:37","row":"1","factoryname":"A2机型","devclearnum":"","devcustomid":"J102105C28111U10232","storename":"甘肃平凉崆峒区聚美味融合餐厅","devtype":"2","makedate":"2016-01-19","devmodel":"1","devid":"173401","opennum":"","devinstalltime":"","devlanip":"","remark":"","storeid":"1734","period":"1","devbarcode":"15aa570b6f237bf2","devrunstatus":"1","factoryid":"5","devgetoutnum":"470","devlastoutnumber":"250"},{"directorname":"","devimpalenum":"","devlastouttime":"2019-02-28 18:46:47","statusname":"在线","directorphone":"","devlastreport":"2019-12-12 11:21:27","row":"2","factoryname":"A2机型","devclearnum":"","devcustomid":"J1021063161212T11049","storename":"长江渔村","devtype":"2","makedate":"2017-02-02","devmodel":"124","devid":"241901","opennum":"","devinstalltime":"","devlanip":"","remark":"","storeid":"2419","period":"124","devbarcode":"c23886f5bc85ed5c","devrunstatus":"1","factoryid":"5","devgetoutnum":"39","devlastoutnumber":"150"},{"directorname":"","devimpalenum":"","devlastouttime":"2019-01-05 09:40:54","statusname":"在线","directorphone":"","devlastreport":"2020-01-09 20:19:39","row":"3","factoryname":"A2机型","devclearnum":"","devcustomid":"J1021062211212T10995","storename":"富春（绿杨邨店）","devtype":"2","makedate":"2017-02-02","devmodel":"111","devid":"245101","opennum":"","devinstalltime":"","devlanip":"","remark":"","storeid":"2451","period":"111","devbarcode":"2b1aa67011898eaf","devrunstatus":"1","factoryid":"5","devgetoutnum":"71","devlastoutnumber":"150"}],"res.page":[{"RecordsCount":3,"hasNextPage":false,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12,"TotalPageCount":1}],"res.size":"3","returnview":""},
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
