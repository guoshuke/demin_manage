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
        <span>终端版本：</span>
        <el-input v-model="requestParams.devAppVersion" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>媒体版本：</span>
        <el-input v-model="requestParams.advAppVersion" clearable placeholder="请输入内容"></el-input>
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
        prop="devid"
        label="终端号">
      </el-table-column>
      <el-table-column
        prop="storename"
        label="所在门店">
      </el-table-column>
      <el-table-column
        prop="devappversion"
        label="终端版本">
      </el-table-column>
      <el-table-column
        prop="advappversion"
        label="媒体版本">
      </el-table-column>
      <el-table-column
        prop="reporttime"
        label="终端上报时间">
      </el-table-column>
      <el-table-column
        prop="advreporttime"
        label="媒体上报时间">
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
  name: 'TerminalVersionList',
  components: {
    PageChange,
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        storeName: '',
        devId: '',
        advAppVersion: '',
        devAppVersion: '',
        pageNum: 1,
        pageSize: 10
      },
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
      jsonName: {"jvcpagename":"pub_device","jvcoldpageName":"pub_device","cmd":"query","returnvalue":"1","res.recordsperpage":"12","RecordsPerPage":"12","res":[{"advappversion":"116","appversionnum":"","advreporttime":"2015-11-27 15:42:13","devappsetversion":"233","storename":"重庆万宗火锅（成都）","devappversion":"200","advappversionnum":"","reporttime":"2018-05-11 12:05:21","advappsetversion":"223","devid":"100301","storeid":"1003","row":"1"},{"advappversion":"116","appversionnum":"110","advreporttime":"2015-12-03 18:08:17","devappsetversion":"230","storename":"成都渝宗老灶火锅（金沙店）","devappversion":"179","advappversionnum":"","reporttime":"2016-07-29 13:46:28","advappsetversion":"223","devid":"100401","storeid":"1004","row":"2"},{"advappversion":"116","appversionnum":"174","advreporttime":"2015-12-01 18:00:02","devappsetversion":"230","storename":"成都花遍地餐厅","devappversion":"181","advappversionnum":"","reporttime":"2017-06-05 14:00:24","advappsetversion":"223","devid":"100501","storeid":"1005","row":"3"},{"advappversion":"116","appversionnum":"","advreporttime":"2015-11-27 11:47:01","devappsetversion":"233","storename":"成都樽宴","devappversion":"200","advappversionnum":"","reporttime":"2016-10-10 20:19:03","advappsetversion":"223","devid":"100601","storeid":"1006","row":"4"},{"advappversion":"118","appversionnum":"110","advreporttime":"2016-08-30 20:48:55","devappsetversion":"230","storename":"山东潍坊第一招待所","devappversion":"179","advappversionnum":"203","reporttime":"2016-08-30 21:51:26","advappsetversion":"223","devid":"101901","storeid":"1019","row":"5"},{"advappversion":"118","appversionnum":"110","advreporttime":"2016-08-14 20:22:51","devappsetversion":"230","storename":"山东潍坊中恒国际大酒店","devappversion":"179","advappversionnum":"203","reporttime":"2016-08-30 21:23:35","advappsetversion":"223","devid":"102001","storeid":"1020","row":"6"},{"advappversion":"118","appversionnum":"110","advreporttime":"2016-08-09 06:58:04","devappsetversion":"230","storename":"山东潍坊金融大酒店","devappversion":"179","advappversionnum":"203","reporttime":"2016-08-31 19:42:44","advappsetversion":"223","devid":"102101","storeid":"1021","row":"7"},{"advappversion":"115","appversionnum":"172","advreporttime":"2016-03-19 19:23:50","devappsetversion":"230","storename":"山东潍坊爱雷特会所","devappversion":"175","advappversionnum":"","reporttime":"2016-03-19 19:23:33","advappsetversion":"223","devid":"102201","storeid":"1022","row":"8"},{"advappversion":"118","appversionnum":"110","advreporttime":"2016-06-18 20:43:50","devappsetversion":"230","storename":"山东潍坊双玲餐厅","devappversion":"179","advappversionnum":"203","reporttime":"2016-06-22 13:08:23","advappsetversion":"223","devid":"102301","storeid":"1023","row":"9"},{"advappversion":"118","appversionnum":"","advreporttime":"2016-05-21 11:41:56","devappsetversion":"230","storename":"山东潍坊知舍紫砂茶艺会所","devappversion":"176","advappversionnum":"203","reporttime":"2016-05-25 15:55:19","advappsetversion":"223","devid":"102401","storeid":"1024","row":"10"},{"advappversion":"118","appversionnum":"174","advreporttime":"2016-08-14 19:48:36","devappsetversion":"230","storename":"山东济南桃源大酒店（经七路店）1楼","devappversion":"181","advappversionnum":"203","reporttime":"2017-04-17 17:03:42","advappsetversion":"223","devid":"102601","storeid":"1026","row":"11"},{"advappversion":"118","appversionnum":"174","advreporttime":"2017-10-07 18:05:50","devappsetversion":"230","storename":"山东济南济南煎饼卷大葱(祝甸店)","devappversion":"181","advappversionnum":"203","reporttime":"2017-10-11 20:52:59","advappsetversion":"223","devid":"102701","storeid":"1027","row":"12"}],"res.page":[{"RecordsCount":1583,"hasNextPage":true,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12,"TotalPageCount":132}],"res.size":"1583","returnview":"@json"},
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
