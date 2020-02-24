<template>
  <div>
    <div class="flex-row filter-box flex-wrap">
      <div>
        <span>显示状态：</span>
        <el-select v-model="requestParams.isenablename" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <span>添加时间：</span>
        <el-date-picker
          v-model="requestParams.startDate"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div>
        <el-button type="primary">查询</el-button>
      </div>
    </div>
    <div class="operation-box">
      <el-button type="success" size="small" @click="dialogVisible=true">新增类目</el-button>
    </div>
    <el-table
      :data="jsonName.res"
      border
      style="width: 100%">
      <el-table-column
        prop="pictureaddress"
        width="120"
        label="图片预览">
        <template slot-scope="scope">
          <img :src="`http://139.196.151.129:8081/${scope.row.pictureaddress}`" alt="" class="app-icon">
        </template>
      </el-table-column>
      <el-table-column
        prop="itemname"
        label="显示名称">
      </el-table-column>
      <el-table-column
        prop="allianceitem"
        label="对应异业类目">
      </el-table-column>
      <el-table-column
        prop="addtime"
        label="添加时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="isenablename"
        label="显示状态"
        width="80">
      </el-table-column>
      <el-table-column
        prop="endtime"
        label="显示顺序"
        width="80">
        <template slot-scope="scope">
          <el-button type="text" size="small"><i class="el-icon-sort-down icon-size"></i></el-button>
          <el-button type="text" size="small"><i class="el-icon-sort-up icon-size"></i></el-button>
        </template>
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
import Breadcrumb from '@/components/Breadcrumb.vue'

export default {
  name: 'AppMenuList',
  components: {
    PageChange,
    Breadcrumb
  },
  data() {
    return {
      breadData: [
        {name: '专题活动', path: '/activityHome'},
        {name: '活动列表', path: '/projectActivity'},
        {name: '活动详情', path: ''}
      ],
      total: 1000,
      requestParams: {
        isenablename:'',
        startDate: '',
        pageNum: 1,
        pageSize: 10
      },
      options: [{
        value: '0',
        label: '全部'
      }, {
        value: '1',
        label: '显示中'
      }, {
        value: '2',
        label: '已隐藏'
      }],
      dialogVisible: false,
      jsonName:
        {"jvcpagename":"yjm_homepage","jvcoldpageName":"yjm_homepage","cmd":"queryPicture","returnvalue":"1","query.a-parentId":"0","res.recordsperpage":"50","RecordsPerPage":"50","res":[{"isenable":"1","allianceitem":"休闲娱乐","parentid":"0","sort":"8","pictureaddress":"areaPic/14/6/b66b63ea64e4476496ae3b002ca5b9ee.png","itemid":"3","itemname":"休闲","addtime":"2018-04-08 13:45:01","isenablename":"显示中","row":"1"},{"isenable":"1","allianceitem":"K歌","parentid":"0","sort":"7","pictureaddress":"areaPic/5/13/cd5dc8ad79e84f49b517180cdc0f0af3.png","itemid":"12","itemname":"k歌","addtime":"2019-07-11 13:04:13","isenablename":"显示中","row":"2"},{"isenable":"1","allianceitem":"精品美食","parentid":"0","sort":"3","pictureaddress":"areaPic/9/10/0a4082a197154c3eac0a4239e33e8456.png","itemid":"1","itemname":"美食","addtime":"2018-04-08 13:43:26","isenablename":"显示中","row":"3"},{"isenable":"1","allianceitem":"其它","parentid":"0","sort":"2","pictureaddress":"areaPic/13/13/cfa8e8e2ff9b43eda0dd3fd3fee6fd02.png","itemid":"2","itemname":"其它","addtime":"2018-04-08 13:44:26","isenablename":"显示中","row":"4"},{"isenable":"1","allianceitem":"航旅","parentid":"0","sort":"1","pictureaddress":"areaPic/4/7/21209fb218fe4016ade9f233328e19cd.png","itemid":"10","itemname":"航旅","addtime":"2018-04-11 10:50:21","isenablename":"显示中","row":"5"}],"res.page":[{"RecordsCount":5,"hasNextPage":false,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":50,"TotalPageCount":1}],"res.size":"5","returnview":""}
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
  .el-icon-edit {
    font-size: 16px;
  }
  .app-icon {
    width: 48px;
    height: 48px;
  }
</style>
