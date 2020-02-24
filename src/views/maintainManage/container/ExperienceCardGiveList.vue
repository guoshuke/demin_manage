<template>
  <div>
    <div class="flex-row filter-box flex-wrap">
      <div>
        <span>微信名：</span>
        <el-input v-model="requestParams.nickName" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>手机号：</span>
        <el-input v-model="requestParams.userPhone" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>城市：</span>
        <el-input v-model="requestParams.city" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>投资人编号：</span>
        <el-input v-model="requestParams.investor" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>注册时间：</span>
        <el-date-picker
          v-model="requestParams.registerTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div>
        <el-button type="primary">查询</el-button>
        <el-button type="primary">重置</el-button>
        <el-button type="primary">区域赠送</el-button>
        <el-button type="primary">会员赠送</el-button>
      </div>
    </div>
    <el-table
      :data="jsonName.res"
      border
      style="width: 100%">
      <el-table-column
        type="selection"
        width="40">
      </el-table-column>
      <el-table-column
        prop="wechatid"
        label="账号">
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="微信名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="userphonewx"
        label="电话号码"
        width="120">
      </el-table-column>
      <el-table-column
        prop="city"
        label="城市"
        width="100">
      </el-table-column>
      <el-table-column
        prop="province"
        label="省份"
        width="100">
      </el-table-column>
      <el-table-column
        prop="sexname"
        label="性别"
        width="80">
      </el-table-column>
      <el-table-column
        prop="registertime"
        label="注册时间"
        width="160">
      </el-table-column>
      <el-table-column
        label="操作"
        width="90">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="dialogVisible=true">查看体验卡</el-button>
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
        内容
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
  name: 'ExperienceCardGiveList',
  components: {
    PageChange,
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        nickName: '',
        userPhone: '',
        city: '',
        investor: '',
        registerTime: '',
        pageNum: 1,
        pageSize: 10
      },
      dialogVisible: false,
      jsonName: {"jvcpagename":"ur_user","jvcoldpageName":"ur_user","cmd":"queryWeChat","returnvalue":"1","res.recordsperpage":"12","RecordsPerPage":"12","res":[{"buyeruserid":"35607demin","headimgurl":"http://thirdwx.qlogo.cn/mmopen/Q3auHgzwzM5YcXMHg4SWAyl2uncSrcoQckb9YU8d73ibGqoFeseLxXXz7Qa4cR8EjqxtVHAV6CIfIBFx7msVc3g/132","country":"中国","province":"江苏","city":"苏州","userphonewx":"","language":"zh_CN","nickname":"k","sex":"1","wechatid":"oOL3g1Wg1rC-06DfM4n4Jp24VN2w_demin","sexname":" 男","registertime":"2019-08-28 10:14:17","row":"1"},{"buyeruserid":"50689","headimgurl":"http://thirdwx.qlogo.cn/mmopen/yZbrAEah7WWdPk7hcy4UGOtD2HNq93NPJktUwvBhZ28nUGLoUwrWA9s5exbjiaCHaxPlUQFOdiaLBF1bkjEESPBOHoPcnHo5nY/132","country":"中国","province":"广西","city":"柳州","userphonewx":"","language":"zh_CN","nickname":"-树叶-","sex":"1","wechatid":"oxi19uAFQktHO0ukjv8ognVgR_Ck_mjh5299","sexname":" 男","registertime":"2019-06-02 15:58:38","row":"2"},{"buyeruserid":"50688","headimgurl":"http://thirdwx.qlogo.cn/mmopen/yZbrAEah7WUR12WTUKsU4I9m1yLoA1X2A8G9veibWvB8hhOVvv1ASfz49kaW3SIorC4LSPjSg3x9Lbc0fRxzVHLlicb7d8t1th/132","country":"中国","province":"浙江","city":"杭州","userphonewx":"","language":"zh_CN","nickname":"段爷广勋","sex":"1","wechatid":"oxi19uJsjOSVQlKkkFrw2p8HJrfk_mjh5299","sexname":" 男","registertime":"2019-06-01 23:14:13","row":"3"},{"buyeruserid":"50687","headimgurl":"http://thirdwx.qlogo.cn/mmopen/Jiavz9UrH80lIb5iapiaDBJOkW8icgCLzicPb8lCbTjqicTQRk6vnVKj3icqebRBARyh71KKQSwPpOibjRNmMFL0GhDB4RquDpCErbaS/132","country":"中国","province":"","city":"","userphonewx":"","language":"zh_TW","nickname":"关关","sex":"2","wechatid":"oxi19uANsiTktc3Z9tySYN17NyJ0_mjh5299","sexname":" 女","registertime":"2019-06-01 21:37:28","row":"4"},{"buyeruserid":"50686","headimgurl":"http://thirdwx.qlogo.cn/mmopen/yZbrAEah7WUR12WTUKsU4MphcLdtyrQQsQKeicN4jTgMKPe2GZ2wOnQFUNsefGkWuInCibFVyjicOpic954HAEVPCpPX4lOvKwHh/132","country":"阿拉伯联合酋长国","province":"迪拜","city":"","userphonewx":"","language":"zh_CN","nickname":"Mr.徐","sex":"1","wechatid":"oxi19uCQSputTh6Y-KfvYC8baNGY_mjh5299","sexname":" 男","registertime":"2019-06-01 18:06:38","row":"5"},{"buyeruserid":"50685","headimgurl":"http://thirdwx.qlogo.cn/mmopen/FZmfsz48tWO8IusrL5R8evpjuW0ZOvtOHDvl21bBvYUwibI3fXwTHiaxJVjxBnzLLPaOSiakgFNDbBJ48ic6IKAI2zc2IDXvpia7L/132","country":"","province":"","city":"","userphonewx":"","language":"zh_CN","nickname":"粟","sex":"2","wechatid":"oxi19uMulZjwcMMOOvFdRwyBWHvM_mjh5299","sexname":" 女","registertime":"2019-05-31 23:24:13","row":"6"},{"buyeruserid":"50684","headimgurl":"http://thirdwx.qlogo.cn/mmopen/zdKUwWibMDIR5oXtRq15zrUmYzWElPLxicqkBUGmkPViaUbTd338AgAmbicJLv0A2xPTPNxHEZzAefU1EXspS6P9csRrklhRwBgp/132","country":"中国","province":"广西","city":"桂林","userphonewx":"","language":"zh_CN","nickname":"罗","sex":"1","wechatid":"oxi19uLYNLxrQi6nFiZ2Oh_syq7E_mjh5299","sexname":" 男","registertime":"2019-05-31 21:57:54","row":"7"},{"buyeruserid":"50683","headimgurl":"","country":"","province":"","city":"","userphonewx":"","language":"zh_CN","nickname":"佳敞","sex":"0","wechatid":"oxi19uLrAy2DJToNMbb5Y4hrba8k_mjh5299","sexname":" 未知","registertime":"2019-05-31 18:37:03","row":"8"},{"buyeruserid":"50682","headimgurl":"http://thirdwx.qlogo.cn/mmopen/ZeVR223SUd3gRYJMFHoxVGOeXic6yk8cs1XOeUeZXU9ULfcsqNrOpiaiampzgw2XA7GNqLtmibuomuIXVeibXTVjmsNkCjlJ4f3Xl/132","country":"中国","province":"湖南","city":"长沙","userphonewx":"","language":"zh_CN","nickname":"八一","sex":"1","wechatid":"oxi19uF1fHq94at1kv5V03hRv3Nw_mjh5299","sexname":" 男","registertime":"2019-05-30 20:17:27","row":"9"},{"buyeruserid":"50681","headimgurl":"http://thirdwx.qlogo.cn/mmopen/yZbrAEah7WUR12WTUKsU4G9g4aKGKBxY2HtZPDJ1WFicR7mibWyibfvGETWAGfVbHER8n9BQdttMot0DcAxWTic14buU568vY5Hd/132","country":"中国","province":"广西","city":"南宁","userphonewx":"","language":"zh_CN","nickname":"莫失莫忘","sex":"1","wechatid":"oxi19uBPFgIB2Kny-qtLj8OOw_3Q_mjh5299","sexname":" 男","registertime":"2019-05-28 20:08:22","row":"10"},{"buyeruserid":"50680","headimgurl":"http://thirdwx.qlogo.cn/mmopen/Jiavz9UrH80k1xjYI4LoBX6ibM3kA79VYBayAicfBQCRfnecibGCUuogajOOKYCWKWnfPqJ33h2YhszT7PjH6Zz8jRXVflf1s4Z7/132","country":"中国","province":"江西","city":"吉安","userphonewx":"","language":"zh_CN","nickname":"忆中人","sex":"1","wechatid":"oxi19uG3XaLJVzP2Xs5r3V6VvBXY_mjh5299","sexname":" 男","registertime":"2019-05-27 15:04:26","row":"11"},{"buyeruserid":"50679","headimgurl":"http://thirdwx.qlogo.cn/mmopen/yZbrAEah7WVKcq4letIVfClcedDiavXtvXur6qFbJtj82fPKQqNFmpzZXFZhiaEKuFhnjnm7YQaicjUnVziaYBVfStq8QsNFgTxl/132","country":"中国","province":"广西","city":"柳州","userphonewx":"","language":"zh_CN","nickname":"a.婧小妞","sex":"2","wechatid":"oxi19uIFCAmFx6wusIHPOuRk2iXQ_mjh5299","sexname":" 女","registertime":"2019-05-26 22:13:28","row":"12"}],"res.page":[{"RecordsCount":24296,"hasNextPage":true,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12,"TotalPageCount":2025}],"res.size":"24296","returnview":""},
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
</style>
