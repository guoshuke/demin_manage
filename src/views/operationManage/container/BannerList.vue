<template>
  <div>
    <el-table
      :data="jsonName.res"
      border
      style="width: 100%">
      <el-table-column
        prop=""
        label="分类">
      </el-table-column>
      <el-table-column
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="dialogVisible=true">轮播图管理</el-button>
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
  name: 'BannerList',
  components: {
    PageChange
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        pageNum: 1,
        pageSize: 10
      },
      dialogVisible: false,
      jsonName: {"jvcpagename":"se_store","jvcoldpageName":"se_store","cmd":"queryPicture","returnvalue":"1","query.a-pictureType":"4","res.recordsperpage":"50","RecordsPerPage":"50","res":[{"url":"","pictureid":"191","isenable":"1","picturetype":"4","sort":"","pictureaddress":"cyclePic/12/3/64dccc4420c04ba29d66f8369bcc8881.jpg","areaid":"0","storeid":"0","addtime":"2019-07-22 16:43:08","isenablename":"显示中","row":"1"}],"res.page":[{"RecordsCount":1,"hasNextPage":false,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":50,"TotalPageCount":1}],"res.size":"1","returnview":""}
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
  .el-icon-edit {
    font-size: 16px;
  }
</style>
