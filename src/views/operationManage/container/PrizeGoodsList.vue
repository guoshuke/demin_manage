<template>
  <div>
    <div class="flex-row filter-box flex-wrap">
      <div>
        <span>商品标题：</span>
        <el-input v-model="requestParams.goodsTitle" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>状态：</span>
        <el-select v-model="requestParams.shelveStatus" placeholder="请选择">
          <el-option
            v-for="item in shelveStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <span>个人抽奖限制：</span>
        <el-select v-model="requestParams.restrictType" placeholder="请选择">
          <el-option
            v-for="item in restrictTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <span>过期：</span>
        <el-select v-model="requestParams.unShelveTime" placeholder="请选择">
          <el-option
            v-for="item in unShelveTimeOptions"
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
        prop="goodsid"
        width="80"
        label="编号">
      </el-table-column>
      <el-table-column
        prop="goodstitle"
        label="抽奖标题">
      </el-table-column>
      <el-table-column
        prop="消耗积分"
        label="商品分类"
        width="80">
      </el-table-column>
      <el-table-column
        prop=""
        label="状态"
        width="80">
      </el-table-column>
      <el-table-column
        prop=""
        label="个人抽奖限制"
        width="110">
      </el-table-column>
      <el-table-column
        prop=""
        label="过期时间"
        width="140">
      </el-table-column>
      <el-table-column
        prop="helperStatus"
        label="操作"
        width="90">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="dialogVisible=true">编辑</el-button>
          <el-button type="text" size="small" @click="dialogVisible=true">删除</el-button>
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
  name: 'PrizeGoodsList',
  components: {
    PageChange
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        goodsTitle:'',
        shelveStatus: '',
        restrictType: '',
        unShelveTime: '',
        pageNum: 1,
        pageSize: 10
      },
      shelveStatusOptions: [
        {
          value: '',
          label: '全部'
        }, {
          value: '1',
          label: '上架'
        }, {
          value: '0',
          label: '下架'
        }
      ],
      restrictTypeOptions: [
        {
          value: '',
          label: '全部'
        }, {
          value: '1',
          label: '有'
        }, {
          value: '-1',
          label: '无'
        }
      ],
      unShelveTimeOptions: [
        {
          value: '',
          label: '全部'
        }, {
          value: '1',
          label: '已过期'
        }, {
          value: '2',
          label: '未过期'
        }
      ],
      dialogVisible: false,
      jsonName:{}
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
