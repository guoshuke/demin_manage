<template>
  <div>
    <div class="flex-row filter-box flex-wrap">
      <div>
        <span>用户编号：</span>
        <el-input v-model="requestParams.userId" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>手机号：</span>
        <el-input v-model="requestParams.phoneNumber" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>区域：</span>
        <el-select v-model="requestParams.city" placeholder="请选择">
          <el-option
            v-for="item in cityOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <span>分销提成时间：</span>
        <el-date-picker
          v-model="requestParams.consumeTime"
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
    <div class="total-style">
      <span>分销发起总计:{{jsonName.sumInt}}</span>
      <span>一级分销人员总计:{{jsonName.firstInt}}</span>
      <span>二级分销人员总计:{{jsonName.secondtInt}}</span>
    </div>
    <el-table
      :data="jsonName.res"
      border
      style="width: 100%">
      <el-table-column
        prop="userid"
        label="用户编号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="昵称">
      </el-table-column>
      <el-table-column
        prop="phonenumber"
        label="手机号"
        width="110">
      </el-table-column>
      <el-table-column
        prop="districtname"
        label="区域"
        width="120">
      </el-table-column>
      <el-table-column
        label="总计分销提成(元)"
        width="160">
        <template slot-scope="scope">
          <span>{{scope.row.sumspread/100}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="一级会员提成"
        width="120">
        <template slot-scope="scope">
          <span>{{scope.row.firstspread/100}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="二级会员提成"
        width="120">
        <template slot-scope="scope">
          <span>{{scope.row.secondspread/100}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="firstnum"
        label="一级会员数量"
        width="120">
      </el-table-column>
      <el-table-column
        prop="secondnum"
        label="二级会员数量"
        width="120">
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
  name: 'DistributionStatisticalList',
  components: {
    PageChange
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        userId: '',
        phoneNumber: '',
        city: '',
        consumeTime: '',
        pageNum: 1,
        pageSize: 10
      },
      cityOptions: [
        {
          value: '',
          label: '全部'
        }, {
          value: '277',
          label: '成都市'
        }, {
          value: '1110',
          label: '扬州市'
        }, {
          value: '1120',
          label: '宜春市'
        }, {
          value: '1513',
          label: '兰州市'
        }, {
          value: '2406',
          label: '镇江市'
        }, {
          value: '2509',
          label: '常州市'
        }, {
          value: '2598',
          label: '苏州市'
        }, {
          value: '2722',
          label: '淄博市'
        }
      ],
      dialogVisible: false,
      jsonName: {"jvcpagename":"yjm_users","jvcoldpageName":"yjm_users","cmd":"querySpreadList","res":[{"districtname":"扬州市","phonenumber":"18651293699","sumspread":"306895","secondnum":"4","secondspread":"87","firstnum":"978","userid":"10393","firstspread":"306808","row":"1","nickname":"川德烧鸡公"},{"districtname":"扬州市","phonenumber":"18151447161","sumspread":"146832","secondnum":"15","secondspread":"1361","firstnum":"435","userid":"9183","firstspread":"145471","row":"2","nickname":"万世安"},{"districtname":"","phonenumber":"18552582019","sumspread":"138360","secondnum":"978","secondspread":"76366","firstnum":"214","userid":"10384","firstspread":"61994","row":"3","nickname":"81"},{"districtname":"扬州市","phonenumber":"13082563888","sumspread":"135018","secondnum":"39","secondspread":"4721","firstnum":"1","userid":"3731","firstspread":"130297","row":"4","nickname":"小酒仙"},{"districtname":"扬州市","phonenumber":"18362108189","sumspread":"127828","secondnum":"1305","secondspread":"104821","firstnum":"56","userid":"7754","firstspread":"23007","row":"5","nickname":"lucky"},{"districtname":"扬州市","phonenumber":"13373684461","sumspread":"115839","secondnum":"9","secondspread":"683","firstnum":"350","userid":"10717","firstspread":"115156","row":"6","nickname":"朵儿"},{"districtname":"扬州市","phonenumber":"18952740822","sumspread":"88073","secondnum":"6","secondspread":"366","firstnum":"204","userid":"11458","firstspread":"87707","row":"7","nickname":"童德大虾"},{"districtname":"","phonenumber":"13252554567","sumspread":"72842","secondnum":"1","secondspread":"0","firstnum":"252","userid":"16121","firstspread":"72842","row":"8","nickname":"马到成功"},{"districtname":"镇江市","phonenumber":"13861346699","sumspread":"72669","secondnum":"740","secondspread":"60969","firstnum":"50","userid":"13838","firstspread":"11700","row":"9","nickname":"任虎平???????????"},{"districtname":"扬州市","phonenumber":"18852859227","sumspread":"70634","secondnum":"0","secondspread":"0","firstnum":"235","userid":"9179","firstspread":"70634","row":"10","nickname":"亲故℡"},{"districtname":"扬州市","phonenumber":"18021325271","sumspread":"70172","secondnum":"660","secondspread":"52375","firstnum":"54","userid":"10575","firstspread":"17797","row":"11","nickname":"天意"},{"districtname":"镇江市","phonenumber":"13913439500","sumspread":"55864","secondnum":"24","secondspread":"1870","firstnum":"140","userid":"14841","firstspread":"53994","row":"12","nickname":"喵儿"}],"res.page":[{"TotalPageCount":35,"hasNextPage":true,"RecordsCount":413,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12}],"district":[{"districtid":"277","districtname":"成都市","row":"1"},{"districtid":"1110","districtname":"扬州市","row":"2"},{"districtid":"1120","districtname":"宜春市","row":"3"},{"districtid":"1513","districtname":"兰州市","row":"4"},{"districtid":"2406","districtname":"镇江市","row":"5"},{"districtid":"2509","districtname":"常州市","row":"6"},{"districtid":"2598","districtname":"苏州市","row":"7"},{"districtid":"2722","districtname":"淄博市","row":"8"}],"sumInt":"10392","firstInt":"3800","secondtInt":"6592","returnview":"@json"}
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
<style lang="less" scoped>

  .el-input {
    width: 150px;
  }
  .el-icon-edit {
    font-size: 16px;
  }
  .total-style {
    padding-bottom: 10px;
    span {
      margin-right: 30px;
    }
  }
</style>
