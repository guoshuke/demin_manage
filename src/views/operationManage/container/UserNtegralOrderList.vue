<template>
  <div>
    <div class="flex-row filter-box flex-wrap">
      <div>
        <span>手机号：</span>
        <el-input v-model="requestParams.phoneNumber" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>订单类型：</span>
        <el-select v-model="requestParams.orderType" placeholder="请选择">
          <el-option
            v-for="item in orderTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <span>商品分类：</span>
        <el-select v-model="requestParams.goodsCategory" placeholder="请选择">
          <el-option
            v-for="item in goodsCategoryOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <span>订单状态：</span>
        <el-select v-model="requestParams.orderStatus" placeholder="请选择">
          <el-option
            v-for="item in orderStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <span>快递状态：</span>
        <el-select v-model="requestParams.deliverStatus" placeholder="请选择">
          <el-option
            v-for="item in deliverStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <span>订单时间：</span>
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
        prop="orderid"
        label="编号"
        width="60">
      </el-table-column>
      <el-table-column
        prop="phonenumber"
        width="110"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="ordertypename"
        label="订单类型"
        width="100">
      </el-table-column>
      <el-table-column
        prop="goodstitle"
        label="商品名称">
      </el-table-column>
      <el-table-column
        prop="goodscategoryname"
        label="商品分类"
        width="80">
      </el-table-column>
      <el-table-column
        prop="createtime"
        label="订单时间"
        width="160">
      </el-table-column>
      <el-table-column
        prop="consumeintegral"
        label="消费积分"
        width="80">
      </el-table-column>
      <el-table-column
        prop="consumeprice"
        label="消费金额(元)"
        width="100">
      </el-table-column>
      <el-table-column
        prop="afteramount"
        label="订单状态"
        width="80">
      </el-table-column>
      <el-table-column
        prop=""
        label="支付方式"
        width="80">
      </el-table-column>
      <el-table-column
        prop=""
        label="第三方流水号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="deliverstatusname"
        label="快递状态"
        width="80">
      </el-table-column>
      <el-table-column
        prop="helperStatus"
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
  name: 'UserNtegralOrderList',
  components: {
    PageChange,
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        phoneNumber: '',
        orderType: '',
        goodsCategory: '',
        orderStatus: '',
        deliverStatus: '',
        createTime: '',
        pageNum: 1,
        pageSize: 10
      },
      orderTypeOptions: [
        {
          value: '',
          label: '全部'
        }, {
          value: '1',
          label: '兑换'
        }, {
          value: '2',
          label: '抽奖'
        }
      ],
      goodsCategoryOptions: [
        {
          value: '',
          label: '全部'
        }, {
          value: '1',
          label: '实物'
        }, {
          value: '2',
          label: '卡券'
        }, {
          value: '3',
          label: '积分'
        }, {
          value: '4',
          label: '现金'
        }
      ],
      orderStatusOptions: [
        {
          value: '',
          label: '全部'
        }, {
          value: '1',
          label: '支付失败'
        }, {
          value: '2',
          label: '支付中'
        }, {
          value: '3',
          label: '已领取'
        }, {
          value: '4',
          label: '未领取'
        }, {
          value: '5',
          label: '未中奖'
        }
      ],
      deliverStatusOptions: [
        {
          value: '',
          label: '全部'
        }, {
          value: '1',
          label: '未发货'
        }, {
          value: '2',
          label: '已发货'
        }, {
          value: '3',
          label: '已收货'
        }, {
          value: '4',
          label: '快递异常'
        }, {
          value: '5',
          label: '已退回'
        }, {
          value: '6',
          label: '未通过审核'
        }
      ],
      dialogVisible: false,
      jsonName: {"jvcpagename":"yjm_integral","jvcoldpageName":"yjm_integral","cmd":"queryUserIntegralOrder","returnvalue":"1","res.recordsperpage":"12","RecordsPerPage":"12","res":[{"deliverphone":"13805277118","goodsid":"229","userid":"2316","goodstitle":"【现场拿货】宏滴 富硒稻花香米（礼盒装）","consumeprice":"","prizeid":"","goodscategoryname":"实物","ordertype":"1","orderid":"87","paymodel":"","row":"1","consumeintegral":"150","deliveraddress":"江苏省 扬州市 邗江区 邗江北路8号海德庄园墅园1幢1O4室","deliverstatus":"1","createtime":"2019-10-23 10:01:33","expressno":"","phonenumber":"13805277118","thirdpartyorder":"","delivername":"李爱东","goodscategory":"1","paytime":"","deliverstatusname":"未发货","orderstatusname":"已领取","orderstatus":"3","carriagetemplateid":"1","expresscompany":"","paymodelname":"","ordertypename":"兑换","isalready":"1","endtime":"2019-10-23 10:16:33"},{"deliverphone":"13805277118","goodsid":"229","userid":"2316","goodstitle":"【现场拿货】宏滴 富硒稻花香米（礼盒装）","consumeprice":"","prizeid":"","goodscategoryname":"实物","ordertype":"1","orderid":"86","paymodel":"","row":"2","consumeintegral":"150","deliveraddress":"江苏省 扬州市 邗江区 邗江北路8号海德庄园墅园1幢1O4室","deliverstatus":"1","createtime":"2019-10-23 10:01:22","expressno":"","phonenumber":"13805277118","thirdpartyorder":"","delivername":"李爱东","goodscategory":"1","paytime":"","deliverstatusname":"未发货","orderstatusname":"已领取","orderstatus":"3","carriagetemplateid":"1","expresscompany":"","paymodelname":"","ordertypename":"兑换","isalready":"1","endtime":"2019-10-23 10:16:22"},{"deliverphone":"13805277118","goodsid":"229","userid":"2316","goodstitle":"【现场拿货】宏滴 富硒稻花香米（礼盒装）","consumeprice":"","prizeid":"","goodscategoryname":"实物","ordertype":"1","orderid":"85","paymodel":"","row":"3","consumeintegral":"150","deliveraddress":"江苏省 扬州市 邗江区 邗江北路8号海德庄园墅园1幢1O4室","deliverstatus":"1","createtime":"2019-10-23 10:01:09","expressno":"","phonenumber":"13805277118","thirdpartyorder":"","delivername":"李爱东","goodscategory":"1","paytime":"","deliverstatusname":"未发货","orderstatusname":"已领取","orderstatus":"3","carriagetemplateid":"1","expresscompany":"","paymodelname":"","ordertypename":"兑换","isalready":"1","endtime":"2019-10-23 10:16:09"},{"deliverphone":"13805277118","goodsid":"229","userid":"2316","goodstitle":"【现场拿货】宏滴 富硒稻花香米（礼盒装）","consumeprice":"","prizeid":"","goodscategoryname":"实物","ordertype":"1","orderid":"84","paymodel":"","row":"4","consumeintegral":"150","deliveraddress":"江苏省 扬州市 邗江区 邗江北路8号海德庄园墅园1幢1O4室","deliverstatus":"1","createtime":"2019-10-23 10:00:55","expressno":"","phonenumber":"13805277118","thirdpartyorder":"","delivername":"李爱东","goodscategory":"1","paytime":"","deliverstatusname":"未发货","orderstatusname":"已领取","orderstatus":"3","carriagetemplateid":"1","expresscompany":"","paymodelname":"","ordertypename":"兑换","isalready":"1","endtime":"2019-10-23 10:15:55"},{"deliverphone":"13805277118","goodsid":"229","userid":"2316","goodstitle":"【现场拿货】宏滴 富硒稻花香米（礼盒装）","consumeprice":"","prizeid":"","goodscategoryname":"实物","ordertype":"1","orderid":"83","paymodel":"","row":"5","consumeintegral":"150","deliveraddress":"江苏省 扬州市 邗江区 邗江北路8号海德庄园墅园1幢1O4室","deliverstatus":"1","createtime":"2019-10-23 10:00:43","expressno":"","phonenumber":"13805277118","thirdpartyorder":"","delivername":"李爱东","goodscategory":"1","paytime":"","deliverstatusname":"未发货","orderstatusname":"已领取","orderstatus":"3","carriagetemplateid":"1","expresscompany":"","paymodelname":"","ordertypename":"兑换","isalready":"1","endtime":"2019-10-23 10:15:43"},{"deliverphone":"13805277118","goodsid":"229","userid":"2316","goodstitle":"【现场拿货】宏滴 富硒稻花香米（礼盒装）","consumeprice":"","prizeid":"","goodscategoryname":"实物","ordertype":"1","orderid":"82","paymodel":"","row":"6","consumeintegral":"150","deliveraddress":"江苏省 扬州市 邗江区 邗江北路8号海德庄园墅园1幢1O4室","deliverstatus":"1","createtime":"2019-10-23 10:00:30","expressno":"","phonenumber":"13805277118","thirdpartyorder":"","delivername":"李爱东","goodscategory":"1","paytime":"","deliverstatusname":"未发货","orderstatusname":"已领取","orderstatus":"3","carriagetemplateid":"1","expresscompany":"","paymodelname":"","ordertypename":"兑换","isalready":"1","endtime":"2019-10-23 10:15:30"},{"deliverphone":"13805277118","goodsid":"229","userid":"2316","goodstitle":"【现场拿货】宏滴 富硒稻花香米（礼盒装）","consumeprice":"","prizeid":"","goodscategoryname":"实物","ordertype":"1","orderid":"81","paymodel":"","row":"7","consumeintegral":"150","deliveraddress":"江苏省 扬州市 邗江区 邗江北路8号海德庄园墅园1幢1O4室","deliverstatus":"1","createtime":"2019-10-23 10:00:17","expressno":"","phonenumber":"13805277118","thirdpartyorder":"","delivername":"李爱东","goodscategory":"1","paytime":"","deliverstatusname":"未发货","orderstatusname":"已领取","orderstatus":"3","carriagetemplateid":"1","expresscompany":"","paymodelname":"","ordertypename":"兑换","isalready":"1","endtime":"2019-10-23 10:15:17"},{"deliverphone":"13805277118","goodsid":"229","userid":"2316","goodstitle":"【现场拿货】宏滴 富硒稻花香米（礼盒装）","consumeprice":"","prizeid":"","goodscategoryname":"实物","ordertype":"1","orderid":"80","paymodel":"","row":"8","consumeintegral":"150","deliveraddress":"江苏省 扬州市 邗江区 邗江北路8号海德庄园墅园1幢1O4室","deliverstatus":"1","createtime":"2019-10-23 09:59:57","expressno":"","phonenumber":"13805277118","thirdpartyorder":"","delivername":"李爱东","goodscategory":"1","paytime":"","deliverstatusname":"未发货","orderstatusname":"已领取","orderstatus":"3","carriagetemplateid":"1","expresscompany":"","paymodelname":"","ordertypename":"兑换","isalready":"1","endtime":"2019-10-23 10:14:57"},{"deliverphone":"13805277118","goodsid":"229","userid":"2316","goodstitle":"【现场拿货】宏滴 富硒稻花香米（礼盒装）","consumeprice":"","prizeid":"","goodscategoryname":"实物","ordertype":"1","orderid":"79","paymodel":"","row":"9","consumeintegral":"150","deliveraddress":"江苏省 扬州市 邗江区 邗江北路8号海德庄园墅园1幢1O4室","deliverstatus":"1","createtime":"2019-10-23 09:59:43","expressno":"","phonenumber":"13805277118","thirdpartyorder":"","delivername":"李爱东","goodscategory":"1","paytime":"","deliverstatusname":"未发货","orderstatusname":"已领取","orderstatus":"3","carriagetemplateid":"1","expresscompany":"","paymodelname":"","ordertypename":"兑换","isalready":"1","endtime":"2019-10-23 10:14:43"},{"deliverphone":"13805277118","goodsid":"229","userid":"2316","goodstitle":"【现场拿货】宏滴 富硒稻花香米（礼盒装）","consumeprice":"","prizeid":"","goodscategoryname":"实物","ordertype":"1","orderid":"78","paymodel":"","row":"10","consumeintegral":"150","deliveraddress":"江苏省 扬州市 邗江区 邗江北路8号海德庄园墅园1幢1O4室","deliverstatus":"1","createtime":"2019-10-23 09:59:29","expressno":"","phonenumber":"13805277118","thirdpartyorder":"","delivername":"李爱东","goodscategory":"1","paytime":"","deliverstatusname":"未发货","orderstatusname":"已领取","orderstatus":"3","carriagetemplateid":"1","expresscompany":"","paymodelname":"","ordertypename":"兑换","isalready":"1","endtime":"2019-10-23 10:14:29"},{"deliverphone":"13805277118","goodsid":"229","userid":"2316","goodstitle":"【现场拿货】宏滴 富硒稻花香米（礼盒装）","consumeprice":"","prizeid":"","goodscategoryname":"实物","ordertype":"1","orderid":"77","paymodel":"","row":"11","consumeintegral":"150","deliveraddress":"江苏省 扬州市 邗江区 邗江北路8号海德庄园墅园1幢1O4室","deliverstatus":"1","createtime":"2019-10-23 09:59:18","expressno":"","phonenumber":"13805277118","thirdpartyorder":"","delivername":"李爱东","goodscategory":"1","paytime":"","deliverstatusname":"未发货","orderstatusname":"已领取","orderstatus":"3","carriagetemplateid":"1","expresscompany":"","paymodelname":"","ordertypename":"兑换","isalready":"1","endtime":"2019-10-23 10:14:18"},{"deliverphone":"13805277118","goodsid":"229","userid":"2316","goodstitle":"【现场拿货】宏滴 富硒稻花香米（礼盒装）","consumeprice":"","prizeid":"","goodscategoryname":"实物","ordertype":"1","orderid":"76","paymodel":"","row":"12","consumeintegral":"150","deliveraddress":"江苏省 扬州市 邗江区 邗江北路8号海德庄园墅园1幢1O4室","deliverstatus":"1","createtime":"2019-10-23 09:59:04","expressno":"","phonenumber":"13805277118","thirdpartyorder":"","delivername":"李爱东","goodscategory":"1","paytime":"","deliverstatusname":"未发货","orderstatusname":"已领取","orderstatus":"3","carriagetemplateid":"1","expresscompany":"","paymodelname":"","ordertypename":"兑换","isalready":"1","endtime":"2019-10-23 10:14:04"}],"res.page":[{"RecordsCount":87,"hasNextPage":true,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12,"TotalPageCount":8}],"res.size":"87","returnview":""},
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
