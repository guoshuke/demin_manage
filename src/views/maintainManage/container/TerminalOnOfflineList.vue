<template>
  <div>
    <div class="flex-row filter-box flex-wrap">
      <div>
        <span>门店/门店号：</span>
        <el-input v-model="requestParams.storeName" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>终端号：</span>
        <el-input v-model="requestParams.devId" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>上线日期：</span>
        <el-date-picker
          v-model="requestParams.onlineTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div>
        <span>下线日期：</span>
        <el-date-picker
          v-model="requestParams.outlineTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
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
        prop="devid"
        label="终端号">
      </el-table-column>
      <el-table-column
        prop="storename"
        label="所在门店">
      </el-table-column>
      <el-table-column
        prop="onlinetime"
        label="上线时间">
      </el-table-column>
      <el-table-column
        prop="outlinetime"
        label="下线时间">
      </el-table-column>
      <el-table-column
        prop="ip"
        label="IP地址">
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
  name: 'TerminalOnOfflineList',
  components: {
    PageChange,
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        storeName: '',
        devId: '',
        onlineTime: '',
        outlineTime: '',
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
      jsonName: {"jvcpagename":"se_deviceonlinehistory","jvcoldpageName":"se_deviceonlinehistory","cmd":"query","returnvalue":"1","res.recordsperpage":"12","RecordsPerPage":"12","res":[{"devid":"251401","outlinetime":"2020-02-03 16:14:21","storename":"汇益堂养生会所","onlinetime":"2020-02-03 15:45:59","ip":"114.226.53.26","row":"1","storeid":"2514"},{"devid":"251401","outlinetime":"2020-02-03 15:45:55","storename":"汇益堂养生会所","onlinetime":"2020-02-03 15:45:52","ip":"114.226.53.26","row":"2","storeid":"2514"},{"devid":"228301","outlinetime":"2020-02-01 12:42:16","storename":"晋中30","onlinetime":"2020-02-01 12:16:35","ip":"59.48.111.58","row":"3","storeid":"2283"},{"devid":"135601","outlinetime":"2020-01-29 18:18:55","storename":"陕西旬阳美豪酒店","onlinetime":"2020-01-29 15:24:55","ip":"113.133.151.110","row":"4","storeid":"1356"},{"devid":"135601","outlinetime":"2020-01-29 15:24:52","storename":"陕西旬阳美豪酒店","onlinetime":"2020-01-29 15:24:47","ip":"113.133.151.110","row":"5","storeid":"1356"},{"devid":"134001","outlinetime":"2020-01-28 19:27:01","storename":"赤峰得民数联科技","onlinetime":"2020-01-28 19:11:04","ip":"110.7.132.22","row":"6","storeid":"1340"},{"devid":"134001","outlinetime":"2020-01-28 19:11:02","storename":"赤峰得民数联科技","onlinetime":"2020-01-28 19:10:56","ip":"110.7.132.22","row":"7","storeid":"1340"},{"devid":"161001","outlinetime":"2020-01-26 18:35:40","storename":"扬州富春大酒店","onlinetime":"2020-01-26 17:57:30","ip":"180.119.212.137","row":"8","storeid":"1610"},{"devid":"161001","outlinetime":"2020-01-26 17:57:25","storename":"扬州富春大酒店","onlinetime":"2020-01-26 17:46:30","ip":"180.119.212.137","row":"9","storeid":"1610"},{"devid":"248201","outlinetime":"2020-01-26 19:46:28","storename":"镇江市和记餐饮有限公司","onlinetime":"2020-01-26 17:23:54","ip":"114.229.192.247","row":"10","storeid":"2482"},{"devid":"161001","outlinetime":"2020-01-26 17:46:25","storename":"扬州富春大酒店","onlinetime":"2020-01-26 17:13:29","ip":"180.119.212.137","row":"11","storeid":"1610"},{"devid":"161001","outlinetime":"2020-01-26 17:13:24","storename":"扬州富春大酒店","onlinetime":"2020-01-26 17:02:29","ip":"180.119.212.137","row":"12","storeid":"1610"}],"res.page":[{"RecordsCount":1971170,"hasNextPage":true,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12,"TotalPageCount":164265}],"res.size":"1971170","returnview":"@json"},
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
