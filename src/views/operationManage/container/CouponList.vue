<template>
  <div>
    <div class="flex-row filter-box flex-wrap">
      <div>
        <span>活动名称：</span>
        <el-input v-model="requestParams.couponName" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>批次号：</span>
        <el-input v-model="requestParams.batchNo" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>类型：</span>
        <el-select v-model="requestParams.couponType" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <span>优惠券状态：</span>
        <el-select v-model="requestParams.coupponStatus" placeholder="请选择">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <span>审核状态：</span>
        <el-select v-model="requestParams.hasPass" placeholder="请选择">
          <el-option
            v-for="item in options3"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <el-button type="primary">查询</el-button>
        <el-button type="primary">导出</el-button>
      </div>
    </div>
    <el-table
      :data="jsonName.res"
      border
      style="width: 100%">
      <el-table-column
        prop="couponid"
        label="编号"
        width="50">
      </el-table-column>
      <el-table-column
        prop="batchno"
        label="批次号"
        width="130">
      </el-table-column>
      <el-table-column
        prop="couponname"
        label="优惠券名称">
      </el-table-column>
      <el-table-column
        prop="couponstatusname"
        width="70"
        label="状态">
      </el-table-column>
      <el-table-column
        label="有效期"
        width="180">
        <template slot-scope="scope">
          <span>{{scope.row.starttime}}--{{scope.row.endtime}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="inventory"
        width="80"
        label="库存">
      </el-table-column>
      <el-table-column
        prop="haspassname"
        label="审核"
        width="80">
      </el-table-column>
      <el-table-column
        prop="url"
        label="站外优惠链接">
      </el-table-column>
      <el-table-column
        prop="helperStatus"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="dialogVisible=true">编辑</el-button>
          <el-button type="text" size="small" @click="dialogVisible=true">查看</el-button>
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
  name: 'ConponList',
  components: {
    PageChange
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        couponName: '',
        batchNo: '',
        couponType: '',
        coupponStatus: '',
        hasPass: '',
        pageNum: 1,
        pageSize: 10
      },
      options: [{
        value: '',
        label: '全部'
      }, {
        value: '1',
        label: '满减'
      }, {
        value: '2',
        label: '打折'
      }],
      options2: [
        {
          value: '',
          label: '全部'
        }, {
          value: '0',
          label: '下架'
        }, {
          value: '1',
          label: '上架'
        },
      ],
      options3: [
        {
          value: '',
          label: '全部'
        }, {
          value: '0',
          label: '未审核'
        }, {
          value: '1',
          label: '审核通过'
        }, {
          value: '2',
          label: '审核失败'
        }
      ],
      value: '',
      tableData: [],
      dialogVisible: false,
      jsonName: {"jvcpagename":"ma_coupon","jvcoldpageName":"ma_coupon","cmd":"query1","returnvalue":"1","res.recordsperpage":"12","RecordsPerPage":"12","res":[{"couponname":"蜻蜓FM7天超级会员","couponstatusname":"上架中","weekuse":"","couponpic":"","url":"http://sss.qingting.fm/newTopic/index.html?newTopicId=5b8df9c607be20049c6f4591","coupontype":"6","haspassname":"审核通过","couponid":"14","couponprice":"9900","timeusestart":"","storeoffer":"","row":"1","starttime":"2018-09-10","couponuse":"","detailtype":"","inventory":"0","batchno":"q201809107720","passtime":"2018-09-10 14:01:44","couponstatus":"1","throwtype":"","limitarea":"","haspass":"1","singleuse":"","passman":"shaoyu","baseprice":"0","islimit":"0","operatetime":"2018-09-10 14:00:37","hqoffer":"","remark":"","operateman":"shaoyu","limitstore":"","coupontypename":"","cpoffer":"","timeuseend":"","endtime":"2018-12-31"},{"couponname":"唱吧麦颂2小时欢唱","couponstatusname":"上架中","weekuse":"","couponpic":"","url":"http://act1.mysongktv.cn:9091/actWxMarketServer/wxCallBack/toCouponGame?couponKey=mysong18_04","coupontype":"6","haspassname":"审核通过","couponid":"13","couponprice":"18800","timeusestart":"","storeoffer":"","row":"2","starttime":"2018-09-10","couponuse":"","detailtype":"","inventory":"0","batchno":"q201809108402","passtime":"2018-09-10 13:56:58","couponstatus":"1","throwtype":"","limitarea":"","haspass":"1","singleuse":"","passman":"shaoyu","baseprice":"0","islimit":"0","operatetime":"2018-09-10 13:54:24","hqoffer":"","remark":"","operateman":"shaoyu","limitstore":"","coupontypename":"","cpoffer":"","timeuseend":"","endtime":"2018-12-31"},{"couponname":"京东到家新用户29-15","couponstatusname":"上架中","weekuse":"","couponpic":"","url":"http://www.jddj.com/xxl/?code=787db924a73740168c091b7bc517ed9e&infoId=70&channel=pjkj","coupontype":"6","haspassname":"审核通过","couponid":"12","couponprice":"1500","timeusestart":"","storeoffer":"","row":"3","starttime":"2018-09-10","couponuse":"","detailtype":"","inventory":"0","batchno":"q201809104088","passtime":"2018-09-10 13:51:12","couponstatus":"1","throwtype":"","limitarea":"","haspass":"1","singleuse":"","passman":"shaoyu","baseprice":"0","islimit":"0","operatetime":"2018-09-10 13:46:07","hqoffer":"","remark":"<br />","operateman":"shaoyu","limitstore":"","coupontypename":"","cpoffer":"","timeuseend":"","endtime":"2018-12-31"},{"couponname":"屈臣氏新用户100元组合券","couponstatusname":"下架中","weekuse":"","couponpic":"","url":"http://h5.watsons.com.cn/topic/T20180417193208163?f=pinjiantuig","coupontype":"6","haspassname":"未审核","couponid":"11","couponprice":"10000","timeusestart":"","storeoffer":"","row":"4","starttime":"2018-08-27","couponuse":"","detailtype":"","inventory":"0","batchno":"q201808272335","passtime":"2018-08-29 11:02:54","couponstatus":"0","throwtype":"","limitarea":"","haspass":"0","singleuse":"","passman":"shaoyu","baseprice":"0","islimit":"0","operatetime":"2018-08-27 11:16:00","hqoffer":"","remark":"","operateman":"shaoyu","limitstore":"","coupontypename":"","cpoffer":"","timeuseend":"","endtime":"2018-12-31"},{"couponname":"新用户100元组合券","couponstatusname":"下架中","weekuse":"","couponpic":"","url":"http://h5.watsons.com.cn/topic/T20180417193208163?f=pinjiantuig","coupontype":"6","haspassname":"未审核","couponid":"10","couponprice":"10000","timeusestart":"","storeoffer":"","row":"5","starttime":"2018-08-27","couponuse":"","detailtype":"","inventory":"0","batchno":"q201808271935","passtime":"2018-08-27 11:15:33","couponstatus":"0","throwtype":"","limitarea":"","haspass":"0","singleuse":"","passman":"shaoyu","baseprice":"0","islimit":"0","operatetime":"2018-08-27 11:11:27","hqoffer":"","remark":"","operateman":"shaoyu","limitstore":"","coupontypename":"","cpoffer":"","timeuseend":"","endtime":"2018-12-31"},{"couponname":"职场精英课套餐599元","couponstatusname":"下架中","weekuse":"","couponpic":"","url":"http://hybrid.liulishuo.com/campaign/workplace-elite.html?channel=ec13b7393782a99e6d206dcd85b9e265","coupontype":"6","haspassname":"审核通过","couponid":"9","couponprice":"59900","timeusestart":"","storeoffer":"","row":"6","starttime":"2018-08-27","couponuse":"","detailtype":"","inventory":"0","batchno":"q201808277561","passtime":"2018-09-10 13:45:46","couponstatus":"0","throwtype":"","limitarea":"","haspass":"1","singleuse":"","passman":"shaoyu","baseprice":"0","islimit":"0","operatetime":"2018-08-27 11:00:41","hqoffer":"","remark":"","operateman":"shaoyu","limitstore":"","coupontypename":"","cpoffer":"","timeuseend":"","endtime":"2018-12-31"},{"couponname":"298一对一体验课","couponstatusname":"下架中","weekuse":"","couponpic":"","url":"http://lp.vipjr.com/landingpage/faq/studyplan/indexq.html?fromwhere=5rCSpL2DjL","coupontype":"6","haspassname":"审核通过","couponid":"8","couponprice":"29800","timeusestart":"","storeoffer":"","row":"7","starttime":"2018-08-10","couponuse":"","detailtype":"","inventory":"0","batchno":"q201808273559","passtime":"2018-09-10 13:45:34","couponstatus":"0","throwtype":"","limitarea":"","haspass":"1","singleuse":"","passman":"shaoyu","baseprice":"0","islimit":"0","operatetime":"2018-08-27 10:57:09","hqoffer":"","remark":"","operateman":"shaoyu","limitstore":"","coupontypename":"","cpoffer":"","timeuseend":"","endtime":"2018-12-31"},{"couponname":"0元购保温杯","couponstatusname":"下架中","weekuse":"","couponpic":"","url":"http://m.mia.com/gift_event/index/28306062?sign=4C9E8DDMjgzMDYwNjI=","coupontype":"6","haspassname":"未审核","couponid":"7","couponprice":"7900","timeusestart":"","storeoffer":"","row":"8","starttime":"2018-08-27","couponuse":"","detailtype":"","inventory":"0","batchno":"q201808274088","passtime":"2018-08-27 11:18:26","couponstatus":"0","throwtype":"","limitarea":"","haspass":"0","singleuse":"","passman":"shaoyu","baseprice":"0","islimit":"0","operatetime":"2018-08-27 10:51:06","hqoffer":"","remark":"<br />","operateman":"shaoyu","limitstore":"","coupontypename":"","cpoffer":"","timeuseend":"","endtime":"2018-12-31"},{"couponname":"车主无忧加油礼包","couponstatusname":"下架中","weekuse":"","couponpic":"","url":"http://xmiles.cn/campaign_service/pages/generalize_gascard/index.jsp?channel=11211&prdid=0","coupontype":"6","haspassname":"审核通过","couponid":"6","couponprice":"5000","timeusestart":"","storeoffer":"","row":"9","starttime":"2018-08-19","couponuse":"","detailtype":"","inventory":"0","batchno":"q201808208757","passtime":"2018-09-10 13:44:54","couponstatus":"0","throwtype":"","limitarea":"","haspass":"1","singleuse":"","passman":"shaoyu","baseprice":"0","islimit":"0","operatetime":"2018-08-20 15:59:40","hqoffer":"","remark":"","operateman":"shaoyu","limitstore":"","coupontypename":"","cpoffer":"","timeuseend":"","endtime":"2018-08-31"},{"couponname":"优酷会员7天体验福利","couponstatusname":"上架中","weekuse":"","couponpic":"","url":"http://acz.youku.com/wow/tvact/act/bd06?refer=playjw_operation.zy_bd06_041601","coupontype":"6","haspassname":"审核通过","couponid":"4","couponprice":"700","timeusestart":"","storeoffer":"","row":"10","starttime":"2018-08-19","couponuse":"","detailtype":"","inventory":"0","batchno":"q201808203019","passtime":"2018-08-20 15:54:23","couponstatus":"1","throwtype":"","limitarea":"","haspass":"1","singleuse":"","passman":"shaoyu","baseprice":"0","islimit":"0","operatetime":"2018-08-20 15:52:23","hqoffer":"","remark":"","operateman":"shaoyu","limitstore":"","coupontypename":"","cpoffer":"","timeuseend":"","endtime":"2018-08-23"},{"couponname":"唯品会购物红包","couponstatusname":"下架中","weekuse":"","couponpic":"","url":"http://http://dmp-data.vip.com/deeplink/showSpecial?sid=NPvl5B&tra_from=tra%3A0vy3g774%3A%3A%3A%3A","coupontype":"6","haspassname":"未审核","couponid":"2","couponprice":"5000","timeusestart":"","storeoffer":"","row":"11","starttime":"2018-08-19","couponuse":"","detailtype":"","inventory":"0","batchno":"q201808202313","passtime":"","couponstatus":"0","throwtype":"","limitarea":"","haspass":"0","singleuse":"","passman":"","baseprice":"0","islimit":"0","operatetime":"2018-08-20 15:47:10","hqoffer":"","remark":"","operateman":"shaoyu","limitstore":"","coupontypename":"","cpoffer":"","timeuseend":"","endtime":"2018-10-31"},{"couponname":"途牛旅游大礼包","couponstatusname":"下架中","weekuse":"","couponpic":"","url":"http://m.tuniu.com/event/geLottery/shareCode/name/zxxinkequan?fta=1&p=20021","coupontype":"6","haspassname":"审核通过","couponid":"1","couponprice":"48000","timeusestart":"","storeoffer":"","row":"12","starttime":"2018-08-20","couponuse":"","detailtype":"","inventory":"0","batchno":"q201808202496","passtime":"2018-09-10 13:45:23","couponstatus":"0","throwtype":"","limitarea":"","haspass":"1","singleuse":"","passman":"shaoyu","baseprice":"0","islimit":"0","operatetime":"2018-08-20 15:11:41","hqoffer":"","remark":"1、使用时间：自领取之日起30天内有效<br />\n2、新用户可领取：10元新人立减券、60元新人立减券、155元新人立减券、国内机票30元券、国际机票60元券、火车票5元券、国内酒店20元券、国际酒店40元券，国内接送机100元新客券-闪电专车。<br />\n3、老用户可领取：国内酒店20元券、国际酒店40元券。","operateman":"admin","limitstore":"","coupontypename":"","cpoffer":"","timeuseend":"","endtime":"2018-12-31"}],"res.page":[{"RecordsCount":12,"hasNextPage":false,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12,"TotalPageCount":1}],"res.size":"12","returnview":""}
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
  .app-icon {
    width: 46px;
    height: 46px;
  }
</style>
