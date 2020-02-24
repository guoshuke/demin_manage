<template>
  <div>
    <div class="flex-row filter-box">
      <div>
        <span>上级模块：</span>
        <el-select v-model="requestParams.parentModule" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <el-button type="primary">查询</el-button>
        <el-button type="primary">添加</el-button>
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
        prop="modulename"
        label="模块名称">
      </el-table-column>
      <el-table-column
        prop="modulelink"
        label="模块链接">
      </el-table-column>
      <el-table-column
        prop=""
        label="上级模块名称">
      </el-table-column>
      <el-table-column
        prop="moduleorder"
        label="模块排序"
        width="80">
      </el-table-column>
      <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="dialogVisible=true">编辑</el-button>
          <el-button type="text" size="small" @click="dialogVisible=true" class="ft-color-red">删除</el-button>
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
  name: 'home',
  components: {
    PageChange
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        parentModule: '',
        pageNum: 1,
        pageSize: 10
      },
      options: [],
      dialogVisible: false,
      jsonName: {"jvcpagename":"sm_module","jvcoldpageName":"sm_module","cmd":"query","returnvalue":"1","query.parentModuleId":"0","res.recordsperpage":"12","RecordsPerPage":"12","res":[{"parentmoduleid":"0","moduleid":"1","modulename":"基本信息","childcount":"2","moduleorder":"1","hastree":"1","modulelink":"main.jsp","row":"1"},{"parentmoduleid":"0","moduleid":"160227","modulename":"用户管理","childcount":"1","moduleorder":"2","hastree":"1","modulelink":"main.jsp","row":"2"},{"parentmoduleid":"0","moduleid":"160266","modulename":"财务管理","childcount":"4","moduleorder":"4","hastree":"1","modulelink":"main.jsp","row":"3"},{"parentmoduleid":"0","moduleid":"160340","modulename":"系统设置","childcount":"2","moduleorder":"8","hastree":"1","modulelink":"main.jsp","row":"4"},{"parentmoduleid":"0","moduleid":"160485","modulename":"运营管理","childcount":"8","moduleorder":"5","hastree":"1","modulelink":"main.jsp","row":"5"}],"res.page":[{"RecordsCount":5,"hasNextPage":false,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12,"TotalPageCount":1}],"res.size":"5","returnview":""},
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
</style>
