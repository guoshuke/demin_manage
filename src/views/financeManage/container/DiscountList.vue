<template>
  <div>
    <div class="flex-row filter-box flex-wrap">
      <div>
        <span>名称：</span>
        <el-input v-model="requestParams.storeName" clearable placeholder="请输入内容"></el-input>
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
        prop="storeid"
        width="60"
        label="编号">
      </el-table-column>
      <el-table-column
        prop="storename"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="discount"
        label="餐费消费折扣（%）"
        width="90">
      </el-table-column>
      <el-table-column
        prop="divide"
        label="餐费充值折扣（%）"
        width="90">
      </el-table-column>
      <el-table-column
        prop="divideproportion"
        label="门店分成比例（%）"
        width="90">
      </el-table-column>
      <el-table-column
        prop=""
        label="酒券买酒"
        width="80">
      </el-table-column>
      <el-table-column
        prop=""
        label="合作"
        width="60">
      </el-table-column>
      <el-table-column
        prop="creatorid"
        label="创客编号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="freecreator"
        label="创客酒券分成（%）"
        width="100">
      </el-table-column>
      <el-table-column
        prop="cashcreator"
        label="创客现金分成（%）"
        width="100">
      </el-table-column>
      <el-table-column
        prop="avgconsume"
        label="平均消费（元）"
        width="100">
      </el-table-column>
      <el-table-column
        prop="consumenum"
        label="消费人数（人）"
        width="100">
      </el-table-column>
      <el-table-column
        prop="helperStatus"
        label="操作"
        width="60">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="dialogVisible=true"><i class="el-icon-edit icon-size"></i></el-button>
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

export default {
  name: 'DiscountList',
  components: {
    PageChange
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        storeName:'',
        pageNum: 1,
        pageSize: 10
      },
      dialogVisible: false,
      jsonName:{"jvcpagename":"se_store","jvcoldpageName":"se_store","cmd":"queryDivide","returnvalue":"1","res.recordsperpage":"12","RecordsPerPage":"12","res":[{"usebalance":"1","cooperation":"1","id":"4","cashcreator":"20","storename":"成都得民科技云酒柜","divide":"85","divideproportion":"0","avgconsume":"50","consumenum":"218","storeid":"324","creatorid":"77","waiterproportion":"3","freecreator":"10","discount":"100","storeaddr":"四川省成都市武侯区一环路南三段49号华诚大厦4楼","row":"1"},{"usebalance":"1","cooperation":"1","id":"5","cashcreator":"20","storename":"扬州得民（门店）","divide":"80","divideproportion":"30","avgconsume":"0","consumenum":"85","storeid":"1144","creatorid":"0","waiterproportion":"3","freecreator":"10","discount":"100","storeaddr":"江苏省扬州市邗江区文汇西路215号华远国际大厦650室","row":"2"},{"usebalance":"1","cooperation":"1","id":"7","cashcreator":"20","storename":"富春酒楼 （来鹤台店)","divide":"85","divideproportion":"0","avgconsume":"100","consumenum":"287","storeid":"1609","creatorid":"22","waiterproportion":"3","freecreator":"10","discount":"100","storeaddr":"江苏省扬州市广陵区文昌西路316号（来鹤台广场西侧）","row":"3"},{"usebalance":"1","cooperation":"0","id":"8","cashcreator":"20","storename":"重庆四姐老火锅","divide":"80","divideproportion":"30","avgconsume":"60","consumenum":"48","storeid":"1613","creatorid":"","waiterproportion":"3","freecreator":"10","discount":"100","storeaddr":"江苏省扬州市广陵区渡江南路146-2","row":"4"},{"usebalance":"1","cooperation":"0","id":"9","cashcreator":"20","storename":"扬州鼎食汇","divide":"85","divideproportion":"0","avgconsume":"45","consumenum":"73","storeid":"1620","creatorid":"","waiterproportion":"3","freecreator":"10","discount":"100","storeaddr":"江苏省扬州市邗江区莱福花园西门(西区市人医对面)","row":"5"},{"usebalance":"1","cooperation":"0","id":"10","cashcreator":"20","storename":"老街饭庄 （文汇西路店）","divide":"80","divideproportion":"30","avgconsume":"50","consumenum":"251","storeid":"1623","creatorid":"8","waiterproportion":"3","freecreator":"10","discount":"100","storeaddr":"扬州市邗江区文汇西路235-237号","row":"6"},{"usebalance":"1","cooperation":"0","id":"11","cashcreator":"20","storename":"扬州富春花园茶社","divide":"80","divideproportion":"30","avgconsume":"50","consumenum":"71","storeid":"1637","creatorid":"72","waiterproportion":"3","freecreator":"10","discount":"100","storeaddr":"江苏扬州广陵区盐阜东路9号（个园大门东侧）","row":"7"},{"usebalance":"1","cooperation":"0","id":"12","cashcreator":"20","storename":"扬州菜根香饭店","divide":"80","divideproportion":"30","avgconsume":"50","consumenum":"51","storeid":"1642","creatorid":"16","waiterproportion":"3","freecreator":"10","discount":"100","storeaddr":"江苏省扬州市南通东路128号（1912街区）","row":"8"},{"usebalance":"1","cooperation":"0","id":"15","cashcreator":"20","storename":"广陵区紫气东来大酒店","divide":"80","divideproportion":"30","avgconsume":"50","consumenum":"44","storeid":"1905","creatorid":"9","waiterproportion":"3","freecreator":"10","discount":"100","storeaddr":"江苏省扬州市广陵区泰州路62号","row":"9"},{"usebalance":"1","cooperation":"0","id":"16","cashcreator":"20","storename":"扬州富春江都店","divide":"80","divideproportion":"30","avgconsume":"70","consumenum":"59","storeid":"1907","creatorid":"","waiterproportion":"3","freecreator":"10","discount":"100","storeaddr":"江苏省扬州市江都区新都南路30号","row":"10"},{"usebalance":"1","cooperation":"0","id":"18","cashcreator":"20","storename":"扬州世豪大酒店","divide":"80","divideproportion":"30","avgconsume":"60","consumenum":"45","storeid":"1909","creatorid":"","waiterproportion":"3","freecreator":"10","discount":"100","storeaddr":"江苏省扬州市江都区樊川镇邵吴路工业园区","row":"11"},{"usebalance":"1","cooperation":"0","id":"20","cashcreator":"20","storename":"扬州富春明珠店","divide":"80","divideproportion":"30","avgconsume":"60","consumenum":"56","storeid":"1911","creatorid":"","waiterproportion":"3","freecreator":"10","discount":"100","storeaddr":"江苏省扬州市江都区新都北路与黄山路交叉口(洪泉医院旁)","row":"12"}],"res.page":[{"RecordsCount":400,"hasNextPage":true,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12,"TotalPageCount":34}],"res.size":"400","returnview":"@json"},
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
    // this.$store.dispatch("Breadecrumb",this.breadData)
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
  .app-icon {
    width: 48px;
    height: 48px;
  }
</style>
