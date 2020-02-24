<template>
  <div>
    <div class="flex-row filter-box">
      <div>
        <span>角色名称：</span>
        <el-input v-model="requestParams.roleName" clearable placeholder="请输入内容"></el-input>
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
        prop="rolename"
        label="角色名称">
      </el-table-column>
      <el-table-column
        prop="description"
        label="角色描述">
      </el-table-column>
      <el-table-column
        label="权限"
        width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="dialogVisible=true">权限配置</el-button>
        </template>
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
        roleName: '',
        pageNum: 1,
        pageSize: 10
      },
      dialogVisible: false,
      jsonName: {"jvcpagename":"sm_role","jvcoldpageName":"sm_role","cmd":"query","returnvalue":"1","res.recordsperpage":"12","RecordsPerPage":"12","res":[{"roleid":"1","rolename":"系统管理员","description":"系统管理员","row":"1"},{"roleid":"2","rolename":"门店管理员","description":"门店管理员","row":"2"},{"roleid":"3","rolename":"门店财务管理员","description":"仅限门店使用，名称不可以变。","row":"3"},{"roleid":"4","rolename":"门店收银员","description":"仅限门店使用，名称不可以变。","row":"4"},{"roleid":"5","rolename":"门店服务员","description":"仅限门店使用，名称不可以变。","row":"5"},{"roleid":"7","rolename":"财务管理员","description":"仅限得民财务部使用。","row":"6"},{"roleid":"8","rolename":"普通系统管理员","description":"仅限高级管理人员使用。","row":"7"},{"roleid":"10","rolename":"运营管理","description":"仅限运营经理及运营人员使用。","row":"8"},{"roleid":"13","rolename":"市场助理","description":"仅限各分公司市场部内勤使用。","row":"9"},{"roleid":"14","rolename":"合伙人","description":"","row":"10"},{"roleid":"16","rolename":"创客","description":"创客使用，名称不可以变。","row":"11"},{"roleid":"20","rolename":"异业联盟管理员","description":"异业联盟管理员","row":"12"}],"res.page":[{"RecordsCount":17,"hasNextPage":true,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12,"TotalPageCount":2}],"res.size":"17","returnview":"@json"},
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
