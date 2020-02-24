<template>
  <div>
    <div class="flex-row filter-box flex-wrap">
      <div>
        <span>门店/酒厂：</span>
        <el-input v-model="requestParams.storeName" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>酒桶编号：</span>
        <el-input v-model="requestParams.barrelId" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>酒品：</span>
        <el-input v-model="requestParams.brandName" clearable placeholder="请输入内容"></el-input>
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
        <el-select v-model="requestParams.barrelStatus" placeholder="请选择" style="width: 100px">
          <el-option
            v-for="item in barrelStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
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
        prop="barrelid"
        label="酒桶编号">
      </el-table-column>
      <el-table-column
        prop="brandname"
        label="当前酒品">
      </el-table-column>
      <el-table-column
        prop="storename"
        label="当前位置">
      </el-table-column>
      <el-table-column
        prop="devid"
        label="当前终端"
        width="80">
      </el-table-column>
      <el-table-column
        prop="barrelremain"
        label="剩余酒量"
        width="90">
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
        prop="statusname"
        label="状态"
        width="80">
      </el-table-column>
      <el-table-column
        label="操作"
        width="60">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="dialogVisible=true">编辑</el-button>
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
  name: 'BarrelSoldOutList',
  components: {
    PageChange,
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        storeName: '',
        barrelId: '',
        brandName: '',
        barrelRFID: '',
        tempRFID: '',
        barrelStatus: '',
        pageNum: 1,
        pageSize: 10
      },
      dialogVisible: false,
      barrelStatusOptions: [{
        value: '',
        label: '全部'
      }, {
        value: '2',
        label: '在用'
      }, {
        value: '3',
        label: '已下架'
      }],
      jsonName: {"jvcpagename":"pc_barrel","jvcoldpageName":"pc_barrel","cmd":"queryoutofstock","returnvalue":"1","res.recordsperpage":"12","RecordsPerPage":"12","res":[{"statusname":"在用","barrelremain":"9707","outstockstr":"<a href=\"javascript:outofstock('300000076240','2603','260301')\" title=\"修改\"><img class=\"operateimg\" src=\"../images/edit_action.gif\"/></a>&nbsp","barrelstatus":"2","barrelvolume":"10000","brandid":"238","row":"1","barrelrfid":"300000076240","usetimes":"1","makebatch":"20181221","storename":"江苏总部展示机","barrelid":"300000076240","barreltype":"1","barrelfactorydate":"2018-12-21","devoutno":"6","devid":"260301","packagetime":"2018-12-21 13:35:09","storeid":"2603","temprfid":"300000076240","onboardid":"6207","brandname":"曼珠沙华"},{"statusname":"在用","barrelremain":"10000","outstockstr":"<a href=\"javascript:outofstock('300000076232','2603','260301')\" title=\"修改\"><img class=\"operateimg\" src=\"../images/edit_action.gif\"/></a>&nbsp","barrelstatus":"2","barrelvolume":"10000","brandid":"124","row":"2","barrelrfid":"300000076232","usetimes":"1","makebatch":"20181207","storename":"江苏总部展示机","barrelid":"300000076232","barreltype":"1","barrelfactorydate":"2018-12-07","devoutno":"5","devid":"260301","packagetime":"2018-12-07 15:13:16","storeid":"2603","temprfid":"300000076232","onboardid":"6186","brandname":"天香池[10年]"},{"statusname":"在用","barrelremain":"9850","outstockstr":"<a href=\"javascript:outofstock('300000076230','2603','260301')\" title=\"修改\"><img class=\"operateimg\" src=\"../images/edit_action.gif\"/></a>&nbsp","barrelstatus":"2","barrelvolume":"10000","brandid":"118","row":"3","barrelrfid":"300000076230","usetimes":"1","makebatch":"20181207","storename":"江苏总部展示机","barrelid":"300000076230","barreltype":"1","barrelfactorydate":"2018-12-07","devoutno":"4","devid":"260301","packagetime":"2018-12-07 10:54:53","storeid":"2603","temprfid":"300000076230","onboardid":"6185","brandname":"沱牌生态[6年]"},{"statusname":"在用","barrelremain":"8350","outstockstr":"<a href=\"javascript:outofstock('300000076229','2603','260301')\" title=\"修改\"><img class=\"operateimg\" src=\"../images/edit_action.gif\"/></a>&nbsp","barrelstatus":"2","barrelvolume":"10000","brandid":"117","row":"4","barrelrfid":"300000076229","usetimes":"1","makebatch":"20181207","storename":"江苏总部展示机","barrelid":"300000076229","barreltype":"1","barrelfactorydate":"2018-12-07","devoutno":"3","devid":"260301","packagetime":"2018-12-07 10:39:27","storeid":"2603","temprfid":"300000076229","onboardid":"6184","brandname":"泸州老窖永盛烧坊[30]"},{"statusname":"在用","barrelremain":"9949","outstockstr":"<a href=\"javascript:outofstock('300000076226','2603','260301')\" title=\"修改\"><img class=\"operateimg\" src=\"../images/edit_action.gif\"/></a>&nbsp","barrelstatus":"2","barrelvolume":"10000","brandid":"174","row":"5","barrelrfid":"300000076226","usetimes":"1","makebatch":"20181206","storename":"江苏总部展示机","barrelid":"300000076226","barreltype":"1","barrelfactorydate":"2018-12-06","devoutno":"2","devid":"260301","packagetime":"2018-12-06 15:20:16","storeid":"2603","temprfid":"300000076226","onboardid":"6180","brandname":"贵州茅台.华茅酒[得民精选]"},{"statusname":"在用","barrelremain":"9250","outstockstr":"<a href=\"javascript:outofstock('300000076225','2603','260301')\" title=\"修改\"><img class=\"operateimg\" src=\"../images/edit_action.gif\"/></a>&nbsp","barrelstatus":"2","barrelvolume":"10000","brandid":"112","row":"6","barrelrfid":"300000076225","usetimes":"1","makebatch":"20181206","storename":"江苏总部展示机","barrelid":"300000076225","barreltype":"1","barrelfactorydate":"2018-12-06","devoutno":"1","devid":"260301","packagetime":"2018-12-06 09:50:56","storeid":"2603","temprfid":"300000076225","onboardid":"6174","brandname":"五粮液股份[纯粮陈窖]52°"},{"statusname":"在用","barrelremain":"10000","outstockstr":"<a href=\"javascript:outofstock('300000054921','2410','241001')\" title=\"修改\"><img class=\"operateimg\" src=\"../images/edit_action.gif\"/></a>&nbsp","barrelstatus":"2","barrelvolume":"10000","brandid":"273","row":"7","barrelrfid":"300000054921","usetimes":"1","makebatch":"20180416","storename":"童德香辣虾","barrelid":"300000054921","barreltype":"1","barrelfactorydate":"2018-04-16","devoutno":"3","devid":"241001","packagetime":"2018-04-16 14:28:15","storeid":"2410","temprfid":"300000054921","onboardid":"6435","brandname":"五粮液股份[纯粮陈窖]42°"},{"statusname":"在用","barrelremain":"9942","outstockstr":"<a href=\"javascript:outofstock('300000075951','2487','248701')\" title=\"修改\"><img class=\"operateimg\" src=\"../images/edit_action.gif\"/></a>&nbsp","barrelstatus":"2","barrelvolume":"10000","brandid":"112","row":"8","barrelrfid":"300000075951","usetimes":"1","makebatch":"20180416","storename":"京口区老班长大锅台餐饮红豆店","barrelid":"300000075951","barreltype":"1","barrelfactorydate":"2018-04-16","devoutno":"1","devid":"248701","packagetime":"2018-04-16 14:21:25","storeid":"2487","temprfid":"300000075951","onboardid":"5921","brandname":"五粮液股份[纯粮陈窖]52°"},{"statusname":"在用","barrelremain":"10000","outstockstr":"<a href=\"javascript:outofstock('300000056918','2517','251701')\" title=\"修改\"><img class=\"operateimg\" src=\"../images/edit_action.gif\"/></a>&nbsp","barrelstatus":"2","barrelvolume":"10000","brandid":"117","row":"9","barrelrfid":"300000056918","usetimes":"1","makebatch":"20180328","storename":"丰奕佳缘酒店","barrelid":"300000056918","barreltype":"1","barrelfactorydate":"2018-03-28","devoutno":"5","devid":"251701","packagetime":"2018-03-28 10:51:40","storeid":"2517","temprfid":"300000056918","onboardid":"5699","brandname":"泸州老窖永盛烧坊[30]"},{"statusname":"在用","barrelremain":"9940","outstockstr":"<a href=\"javascript:outofstock('300000057125','2515','251501')\" title=\"修改\"><img class=\"operateimg\" src=\"../images/edit_action.gif\"/></a>&nbsp","barrelstatus":"2","barrelvolume":"10000","brandid":"117","row":"10","barrelrfid":"300000057125","usetimes":"1","makebatch":"20180328","storename":"亭尘居","barrelid":"300000057125","barreltype":"1","barrelfactorydate":"2018-03-28","devoutno":"5","devid":"251501","packagetime":"2018-03-28 10:51:36","storeid":"2515","temprfid":"300000057125","onboardid":"5671","brandname":"泸州老窖永盛烧坊[30]"},{"statusname":"在用","barrelremain":"10000","outstockstr":"<a href=\"javascript:outofstock('300000075017','2451','245101')\" title=\"修改\"><img class=\"operateimg\" src=\"../images/edit_action.gif\"/></a>&nbsp","barrelstatus":"2","barrelvolume":"10000","brandid":"112","row":"11","barrelrfid":"300000075017","usetimes":"1","makebatch":"20180301","storename":"富春（绿杨邨店）","barrelid":"300000075017","barreltype":"1","barrelfactorydate":"2018-03-01","devoutno":"1","devid":"245101","packagetime":"2018-03-01 17:10:29","storeid":"2451","temprfid":"300000075017","onboardid":"5647","brandname":"五粮液股份[纯粮陈窖]52°"},{"statusname":"在用","barrelremain":"3630","outstockstr":"<a href=\"javascript:outofstock('300000075061','1609','160901')\" title=\"修改\"><img class=\"operateimg\" src=\"../images/edit_action.gif\"/></a>&nbsp","barrelstatus":"2","barrelvolume":"10000","brandid":"112","row":"12","barrelrfid":"300000075061","usetimes":"1","makebatch":"20180301","storename":"富春酒楼 （来鹤台店)","barrelid":"300000075061","barreltype":"1","barrelfactorydate":"2018-03-01","devoutno":"1","devid":"160901","packagetime":"2018-03-01 17:01:47","storeid":"1609","temprfid":"300000075061","onboardid":"3120","brandname":"五粮液股份[纯粮陈窖]52°"}],"res.page":[{"RecordsCount":4814,"hasNextPage":true,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12,"TotalPageCount":402}],"res.size":"4814","returnview":"@json"},
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
