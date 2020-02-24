<template>
  <div>
    <div class="flex-row filter-box flex-wrap">
      <div>
        <span>手机号：</span>
        <el-input v-model="requestParams.applyPhone" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>类型：</span>
        <el-select v-model="requestParams.applyType" placeholder="请选择">
          <el-option
            v-for="item in applyTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <span>状态：</span>
        <el-select v-model="requestParams.applyStatus" placeholder="请选择">
          <el-option
            v-for="item in applyStatusOptions"
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
        prop="applyid"
        label="序号"
        width="60">
      </el-table-column>
      <el-table-column
        prop="applytypename"
        label="类型">
      </el-table-column>
      <el-table-column
        prop="applyphone"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="applyarea"
        label="地区">
      </el-table-column>
      <el-table-column
        prop="applytime"
        label="申请时间">
      </el-table-column>
      <el-table-column
        prop="applystatusname"
        label="审核状态"
        width="100">
      </el-table-column>
      <el-table-column
        label="操作"
        width="80">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="dialogVisible=true">已联系</el-button>
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
  name: 'JoinIntentionApplyList',
  components: {
    PageChange
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        applyPhone: '',
        applyType: '',
        applyStatus: '',
        pageNum: 1,
        pageSize: 10
      },
      dialogVisible: false,
      applyTypeOptions: [{
        value: '',
        label: '全部'
      }, {
        value: '1',
        label: '创客'
      }, {
        value: '2',
        label: '城市合伙人'
      }],
      applyStatusOptions: [{
        value: '',
        label: '全部'
      }, {
        value: '1',
        label: '未联系'
      }, {
        value: '2',
        label: '已联系'
      }],
      jsonName: {"jvcpagename":"yjm_creator","jvcoldpageName":"yjm_creator","cmd":"queryApply","returnvalue":"1","res.recordsperpage":"12","RecordsPerPage":"12","res":[{"applytype":"1","applyarea":"成都","applyid":"11","applytime":"2018-03-23 13:02:24","applyphone":"15828639355","applystatus":"2","applystatusname":"已联系","applyuserid":"37","applytypename":"创客","row":"1"},{"applytype":"2","applyarea":"成都","applyid":"12","applytime":"2019-09-09 16:54:36","applyphone":"15680611385","applystatus":"2","applystatusname":"已联系","applyuserid":"8309","applytypename":"城市合伙人","row":"2"},{"applytype":"1","applyarea":"成都市","applyid":"13","applytime":"2018-02-09 10:23:08","applyphone":"13880912212","applystatus":"1","applystatusname":"未处理","applyuserid":"1","applytypename":"创客","row":"3"},{"applytype":"2","applyarea":"精疲力尽","applyid":"14","applytime":"2018-02-09 10:23:21","applyphone":"18671040942","applystatus":"1","applystatusname":"未处理","applyuserid":"8354","applytypename":"城市合伙人","row":"4"},{"applytype":"2","applyarea":"男的","applyid":"15","applytime":"2018-02-09 10:23:35","applyphone":"15282916886","applystatus":"1","applystatusname":"未处理","applyuserid":"82","applytypename":"城市合伙人","row":"5"},{"applytype":"1","applyarea":"成都","applyid":"16","applytime":"2018-02-09 10:24:27","applyphone":"13908205454","applystatus":"1","applystatusname":"未处理","applyuserid":"3","applytypename":"创客","row":"6"},{"applytype":"2","applyarea":"成都","applyid":"17","applytime":"2018-02-09 11:37:18","applyphone":"15881009184","applystatus":"2","applystatusname":"已联系","applyuserid":"60","applytypename":"城市合伙人","row":"7"},{"applytype":"1","applyarea":"兰州市","applyid":"18","applytime":"2018-03-26 16:25:33","applyphone":"13619326181","applystatus":"2","applystatusname":"已联系","applyuserid":"7797","applytypename":"创客","row":"8"},{"applytype":"1","applyarea":"泰州市","applyid":"19","applytime":"2018-03-26 16:25:36","applyphone":"13016700236","applystatus":"2","applystatusname":"已联系","applyuserid":"13208","applytypename":"创客","row":"9"},{"applytype":"2","applyarea":"兰州","applyid":"20","applytime":"2018-03-26 16:25:38","applyphone":"18919069188","applystatus":"2","applystatusname":"已联系","applyuserid":"26","applytypename":"城市合伙人","row":"10"},{"applytype":"1","applyarea":"镇江","applyid":"28","applytime":"2018-03-28 16:08:18","applyphone":"18651286670","applystatus":"1","applystatusname":"未处理","applyuserid":"14260","applytypename":"创客","row":"11"},{"applytype":"1","applyarea":"扬州","applyid":"29","applytime":"2018-04-10 14:31:33","applyphone":"15062835708","applystatus":"2","applystatusname":"已联系","applyuserid":"12559","applytypename":"创客","row":"12"}],"res.page":[{"RecordsCount":31,"hasNextPage":true,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12,"TotalPageCount":3}],"res.size":"31","returnview":""},
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
    width: 180px;
  }
  .el-icon-edit {
    font-size: 16px;
  }
</style>
