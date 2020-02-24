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
  name: 'TerminalSearchList',
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
      jsonName: {"jvcpagename":"se_deviceinfo","jvcoldpageName":"se_deviceinfo","cmd":"queryWithOutDeletedStore","returnvalue":"1","query.devType.unequ":"3","res.recordsperpage":"12","RecordsPerPage":"12","res":[{"directorname":"","devimpalenum":"","devlastouttime":"2017-07-24 18:01:26","statusname":"离线","directorphone":"","devlastreport":"2017-10-11 20:53:00","row":"1","factoryname":"A2机型","devclearnum":"","devcustomid":"J1021063211212U11614","storename":"山东济南济南煎饼卷大葱(祝甸店)","devtype":"2","makedate":"2015-11-01","devmodel":"1","devid":"102701","opennum":"","devinstalltime":"","devlanip":"","remark":"","storeid":"1027","period":"1","devbarcode":"3700dffaaba6837f","devrunstatus":"0","factoryid":"5","devgetoutnum":"216","devlastoutnumber":"300"},{"directorname":"","devimpalenum":"","devlastouttime":"2017-05-08 19:51:59","statusname":"离线","directorphone":"","devlastreport":"2018-01-15 11:50:56","row":"2","factoryname":"A2机型","devclearnum":"","devcustomid":"J1021063291313U11786","storename":"山东济南煎饼卷大葱","devtype":"2","makedate":"2015-11-01","devmodel":"1","devid":"102801","opennum":"","devinstalltime":"","devlanip":"","remark":"","storeid":"1028","period":"1","devbarcode":"32d011f160ecd7c6","devrunstatus":"0","factoryid":"5","devgetoutnum":"216","devlastoutnumber":"100"},{"directorname":"","devimpalenum":"","devlastouttime":"2017-02-13 15:50:50","statusname":"离线","directorphone":"","devlastreport":"2017-03-31 16:23:29","row":"3","factoryname":"A2机型","devclearnum":"","devcustomid":"J1021063261313U11708","storename":"山东济南融利银谷置业有限公司","devtype":"2","makedate":"2015-11-01","devmodel":"1","devid":"102901","opennum":"","devinstalltime":"","devlanip":"","remark":"","storeid":"1029","period":"1","devbarcode":"625134d635585a70","devrunstatus":"0","factoryid":"5","devgetoutnum":"95","devlastoutnumber":"0"},{"directorname":"","devimpalenum":"","devlastouttime":"2017-03-18 11:28:34","statusname":"离线","directorphone":"","devlastreport":"2018-09-05 13:50:20","row":"4","factoryname":"A2机型","devclearnum":"","devcustomid":"J1021063261313U11711","storename":"山东济南舜元大酒店（党校店）","devtype":"2","makedate":"2015-11-01","devmodel":"1","devid":"103101","opennum":"","devinstalltime":"","devlanip":"","remark":"","storeid":"1031","period":"1","devbarcode":"7a461ec9804146c8","devrunstatus":"0","factoryid":"5","devgetoutnum":"168","devlastoutnumber":"100"},{"directorname":"","devimpalenum":"","devlastouttime":"2017-11-13 19:00:17","statusname":"离线","directorphone":"","devlastreport":"2018-04-09 11:51:26","row":"5","factoryname":"A2机型","devclearnum":"","devcustomid":"J1021063261313U11706","storename":"山东济南东来顺(花园路店)","devtype":"2","makedate":"2015-11-01","devmodel":"1","devid":"103301","opennum":"","devinstalltime":"","devlanip":"","remark":"","storeid":"1033","period":"1","devbarcode":"dcffee0b228e97e6","devrunstatus":"0","factoryid":"5","devgetoutnum":"324","devlastoutnumber":"100"},{"directorname":"","devimpalenum":"","devlastouttime":"2017-04-27 20:28:20","statusname":"离线","directorphone":"","devlastreport":"2017-12-08 13:34:22","row":"6","factoryname":"A2机型","devclearnum":"","devcustomid":"J1021061071211U10360","storename":"山东潍坊辛上庄私房菜","devtype":"2","makedate":"2015-11-01","devmodel":"1","devid":"105101","opennum":"","devinstalltime":"","devlanip":"","remark":"","storeid":"1051","period":"1","devbarcode":"188ebe53c9a4dd1","devrunstatus":"0","factoryid":"5","devgetoutnum":"229","devlastoutnumber":"250"},{"directorname":"","devimpalenum":"","devlastouttime":"2018-04-05 19:39:43","statusname":"离线","directorphone":"","devlastreport":"2018-04-05 23:41:10","row":"7","factoryname":"A2机型","devclearnum":"","devcustomid":"J102105C011110T10514","storename":"山东烟台聚义堂火锅","devtype":"2","makedate":"2016-05-03","devmodel":"1","devid":"105701","opennum":"","devinstalltime":"","devlanip":"","remark":"","storeid":"1057","period":"1","devbarcode":"d46dc9d7f1de9eca","devrunstatus":"0","factoryid":"5","devgetoutnum":"777","devlastoutnumber":"250"},{"directorname":"","devimpalenum":"","devlastouttime":"2017-08-07 19:52:25","statusname":"离线","directorphone":"","devlastreport":"2017-08-31 20:03:18","row":"8","factoryname":"A2机型","devclearnum":"","devcustomid":"J1021061051211U10287","storename":"山东潍坊小厨会所","devtype":"2","makedate":"2016-06-01","devmodel":"1","devid":"105801","opennum":"","devinstalltime":"","devlanip":"","remark":"","storeid":"1058","period":"1","devbarcode":"7d300d313e125d9f","devrunstatus":"0","factoryid":"5","devgetoutnum":"116","devlastoutnumber":"300"},{"directorname":"","devimpalenum":"","devlastouttime":"2017-09-06 15:57:51","statusname":"离线","directorphone":"","devlastreport":"2018-04-17 17:52:30","row":"9","factoryname":"A2机型","devclearnum":"","devcustomid":"J1021061071211U10381","storename":"山东莱阳人家土菜馆","devtype":"2","makedate":"2016-05-19","devmodel":"123","devid":"105901","opennum":"","devinstalltime":"","devlanip":"","remark":"","storeid":"1059","period":"1","devbarcode":"d2f30dca3c1d54a9","devrunstatus":"0","factoryid":"5","devgetoutnum":"94","devlastoutnumber":"50"},{"directorname":"","devimpalenum":"","devlastouttime":"2019-01-07 12:43:11","statusname":"离线","directorphone":"","devlastreport":"2019-12-30 21:48:45","row":"10","factoryname":"A2机型","devclearnum":"","devcustomid":"10064","storename":"赤峰乌丹鑫隆小额贷款","devtype":"2","makedate":"2015-11-01","devmodel":"123","devid":"106701","opennum":"","devinstalltime":"","devlanip":"","remark":"","storeid":"1067","period":"1","devbarcode":"eabc801d9ead71fa","devrunstatus":"0","factoryid":"5","devgetoutnum":"4767","devlastoutnumber":"250"},{"directorname":"","devimpalenum":"","devlastouttime":"2018-12-28 20:43:01","statusname":"离线","directorphone":"","devlastreport":"2019-11-08 15:18:32","row":"11","factoryname":"A2机型","devclearnum":"","devcustomid":"10098","storename":"赤峰翁牛特旗全宁酒店302","devtype":"2","makedate":"2015-11-01","devmodel":"123","devid":"106901","opennum":"","devinstalltime":"","devlanip":"","remark":"","storeid":"1069","period":"1","devbarcode":"6fb8f629914d81a7","devrunstatus":"0","factoryid":"5","devgetoutnum":"374","devlastoutnumber":"250"},{"directorname":"","devimpalenum":"","devlastouttime":"2020-01-11 18:24:22","statusname":"离线","directorphone":"","devlastreport":"2020-01-11 20:38:39","row":"12","factoryname":"A2机型","devclearnum":"","devcustomid":"10087","storename":"赤峰翁牛特旗全宁酒店3楼","devtype":"2","makedate":"2015-11-13","devmodel":"123","devid":"107001","opennum":"","devinstalltime":"","devlanip":"","remark":"","storeid":"1070","period":"1","devbarcode":"8768a212476a58a5","devrunstatus":"0","factoryid":"5","devgetoutnum":"1526","devlastoutnumber":"250"}],"res.page":[{"RecordsCount":880,"hasNextPage":true,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12,"TotalPageCount":74}],"res.size":"880","returnview":""},
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
