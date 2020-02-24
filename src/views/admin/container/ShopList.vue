<template>
  <div>
    <div class="flex-row filter-box">
      <div>
        <span>编号：</span>
        <el-input v-model="requestParams.no" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>姓名：</span>
        <el-input v-model="requestParams.name" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>电话：</span>
        <el-input v-model="requestParams.phone" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>门店名称：</span>
        <el-input v-model="requestParams.storename" clearable placeholder="请输入内容"></el-input>
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
        prop="row"
        label="编号"
        width="50">
      </el-table-column>
      <el-table-column
        prop="creatorname"
        width="150"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号"
        width="120">
      </el-table-column>
      <el-table-column
        prop="starttime"
        label="落店时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="storeid"
        label="门店编号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="storename"
        label="门店名称">
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
  name: 'ShopList',
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
        no: '',
        name: '',
        phone: '',
        storename: '',
        pageNum: 1,
        pageSize: 10
      },
      dialogVisible: false,
      jsonName: {"jvcpagename":"yjm_creator","jvcoldpageName":"yjm_creator","cmd":"querystore","returnvalue":"1","res.recordsperpage":"12","RecordsPerPage":"12","res":[{"phone":"15366905148","creatorname":"金国","storename":"老街饭庄 （文汇西路店）","starttime":"2018-01-09 00:00:00","creatorid":"8","row":"1","storeid":"1623"},{"phone":"13813198212","creatorname":"董巍","storename":"广陵区紫气东来大酒店","starttime":"2018-01-10 00:00:00","creatorid":"9","row":"2","storeid":"1905"},{"phone":"13615245712","creatorname":"许建强","storename":"小菜坊","starttime":"2018-01-10 00:00:00","creatorid":"10","row":"3","storeid":"2380"},{"phone":"17705191199","creatorname":"王继发","storename":"老扬州","starttime":"2018-01-11 00:00:00","creatorid":"11","row":"4","storeid":"1633"},{"phone":"17705191199","creatorname":"王继发","storename":"尚膳私房菜","starttime":"2018-01-11 00:00:00","creatorid":"11","row":"5","storeid":"2535"},{"phone":"13815809887","creatorname":"陈翠琴","storename":"锦绣饭庄","starttime":"2018-04-19 16:34:11","creatorid":"12","row":"6","storeid":"2456"},{"phone":"15852339900","creatorname":"刘念坤","storename":"富春（绿杨邨店）","starttime":"2018-04-17 10:54:44","creatorid":"13","row":"7","storeid":"2451"},{"phone":"13079970170","creatorname":"赵士才","storename":"长江渔村","starttime":"2018-01-27 00:00:00","creatorid":"14","row":"8","storeid":"2419"},{"phone":"18861068790","creatorname":"陈爱荣","storename":"得民创客加盟店（兴化市星海路店）","starttime":"2018-01-22 00:00:00","creatorid":"15","row":"9","storeid":"2383"},{"phone":"19905147777","creatorname":"夏葆","storename":"扬州菜根香饭店","starttime":"2018-01-19 00:00:00","creatorid":"16","row":"10","storeid":"1642"},{"phone":"13805283169","creatorname":"吴荣生","storename":"宴春酒楼（金山店）","starttime":"","creatorid":"17","row":"11","storeid":"2386"},{"phone":"15952792468","creatorname":"倪文富","storename":"姥家大锅台火锅店","starttime":"2018-01-24 00:00:00","creatorid":"18","row":"12","storeid":"2425"}],"res.page":[{"RecordsCount":43,"hasNextPage":true,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12,"TotalPageCount":4}],"res.size":"43","returnview":"@json"}
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
</style>
