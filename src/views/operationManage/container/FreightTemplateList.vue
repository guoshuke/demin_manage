<template>
  <div>
    <div class="flex-row filter-box flex-wrap">
      <div>
        <span>状态：</span>
        <el-select v-model="requestParams.templateStatus" placeholder="请选择">
          <el-option
            v-for="item in templateStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <span>计费方式：</span>
        <el-select v-model="requestParams.chargeMode" placeholder="请选择">
          <el-option
            v-for="item in chargeModeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <span>创建时间：</span>
        <el-date-picker
          v-model="requestParams.createTime"
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
    <el-table
      :data="jsonName.res"
      border
      style="width: 100%">
      <el-table-column
        prop="templateid"
        label="编号"
        width="60">
      </el-table-column>
      <el-table-column
        prop="templatename"
        width="110"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="templatestatusname"
        label="状态"
        width="100">
      </el-table-column>
      <el-table-column
        prop=""
        label="配送区域">
      </el-table-column>
      <el-table-column
        label="首重(kg)/首件"
        width="120">
        <template slot-scope="scope">
          <span>{{scope.row.firstnum/100}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="createtime"
        label="运费"
        width="160">
      </el-table-column>
      <el-table-column
        prop="extendnum"
        label="续重(kg)/续件"
        width="120">
      </el-table-column>
      <el-table-column
        prop="consumeprice"
        label="续费"
        width="100">
        <template slot-scope="scope">
          <span>{{scope.row.extendamount/100}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="80">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="dialogVisible=true">收货地址/快递信息</el-button>
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
  name: 'FreightTemplateList',
  components: {
    PageChange,
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        templateStatus: '',
        chargeMode: '',
        createTime: '',
        pageNum: 1,
        pageSize: 10
      },
      templateStatusOptions: [
        {
          value: '',
          label: '全部'
        }, {
          value: '1',
          label: '启用'
        }, {
          value: '2',
          label: '停用'
        }
      ],
      chargeModeOptions: [
        {
          value: '',
          label: '全部'
        }, {
          value: '1',
          label: '计重'
        }, {
          value: '2',
          label: '计件'
        }
      ],
      dialogVisible: false,
      jsonName: {"jvcpagename":"yjm_integral","jvcoldpageName":"yjm_integral","cmd":"queryCarriageTemplateList","returnvalue":"1","res.recordsperpage":"12","RecordsPerPage":"12","res":[{"templateid":"1","areaname":"","chargemodename":"","extendamount":"","templatestatus":"2","chargemode":"","firstamount":"","templatestatusname":"默认","createtime":"2018-05-25 16:09:03","templatename":"到付","firstnum":"","extendnum":"","row":"1"},{"templateid":"2","areaname":"北京市,天津市,河北省,山西省,内蒙古自治区,辽宁省,吉林省,黑龙江省,上海市,江苏省,浙江省,安徽省,福建省,江西省,山东省,河南省,湖北省,湖南省,广东省,广西壮族自治区,海南省,重庆市,四川省,贵州省,云南省,西藏自治区,陕西省,甘肃省,青海省,宁夏回族自治区,新疆维吾尔自治区,台湾省,香港特别行政区,澳门特别行政区","chargemodename":"计重","extendamount":"500","templatestatus":"1","chargemode":"1","firstamount":"1500","templatestatusname":"启用","createtime":"2019-09-21 11:48:17","templatename":"寄付","firstnum":"8","extendnum":"2","row":"2"}],"res.page":[{"RecordsCount":2,"hasNextPage":false,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12,"TotalPageCount":1}],"res.size":"2","returnview":""}
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
  .app-icon {
    width: 46px;
    height: 46px;
  }
</style>
