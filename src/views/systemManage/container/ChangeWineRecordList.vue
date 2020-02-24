<template>
  <div>
    <div class="flex-row filter-box flex-wrap">
      <div>
        <span>账号：</span>
        <el-input v-model="requestParams.buyerUserId" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>会员手机：</span>
        <el-input v-model="requestParams.userPhone" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>原酒品：</span>
        <el-input v-model="requestParams.brandNameQ1" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>置换酒品：</span>
        <el-input v-model="requestParams.brandNameQ2" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>时间：</span>
        <el-date-picker
          v-model="requestParams.swapTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div>
        <el-button type="primary">查询</el-button>
        <el-button type="primary">重置</el-button>
        <el-button type="primary">导出</el-button>
      </div>
    </div>
    <el-table
      :data="jsonName.res"
      border
      style="width: 100%">
      <el-table-column
        prop="buyeruserid"
        label="账号"
        width="90">
      </el-table-column>
      <el-table-column
        prop="userphone"
        width="120"
        label="会员手机">
      </el-table-column>
      <el-table-column
        prop="displacebrandname"
        label="原酒品">
      </el-table-column>
      <el-table-column
        prop=""
        label="原品牌价格"
        width="120">
        <template slot-scope="scope">
          <span>{{scope.row.displaceprice/100}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="displacenum"
        label="原品牌数量"
        width="100">
      </el-table-column>
      <el-table-column
        prop="newbrandname"
        label="置换酒品">
      </el-table-column>
      <el-table-column
        prop=""
        label="置换品牌价格"
        width="110">
        <template slot-scope="scope">
          <span>{{scope.row.newprice/100}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="newnum"
        label="置换品牌数量"
        width="110">
      </el-table-column>
      <el-table-column
        prop="swaptime"
        label="置换时间"
        width="160">
      </el-table-column>
      <el-table-column
        prop="swapfromname"
        label="置换来源"
        width="120">
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
  name: 'ChangeWineRecordList',
  components: {
    PageChange,
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        buyerUserId: '',
        userPhone: '',
        brandNameQ1: '',
        brandNameQ2: '',
        swapTime: '',
        pageNum: 1,
        pageSize: 10
      },
      dialogVisible: false,
      options: [{
        value: '',
        label: '全部'
      }, {
        value: '1',
        label: '自助购买'
      }, {
        value: '2',
        label: '代购'
      }, {
        value: '3',
        label: '充酒卡'
      }, {
        value: '10',
        label: '钱包购买'
      }, {
        value: '12',
        label: '代付'
      }],
      jsonName: {"jvcpagename":"ur_swapbrand","jvcoldpageName":"ur_swapbrand","cmd":"querynew","returnvalue":"1","res.recordsperpage":"12","RecordsPerPage":"12","res":[{"userbirthday":"","apparea":"","charactersign":"","paypwd":"","newbrand":"112","displacepricestr":"699","swapaddr":"10.25.23.96","lastlogintime":"2017-04-06 15:41:18","identitytype":"0","userphone":"13906507636","usercredits":"6990","usersex":"","identitycode":"","wechatid":"","paycount":"0","bankaccount":"","swapid":"1483","lastlogintype":"3","row":"1","registermodel":"2","usertype":"","secureemail":"","userparentid":"","useremail":"","userpassword":"2a629b5ceb491b17ffc012ccb6499e6a","balance":"","maxamount":"0","swaptime":"2017-04-06 15:28:58","displacebrandname":"沱牌生态[15年]","surplus":"0","leveltime":"","unitid":"","username":"","newbrandname":"五粮液股份[纯粮陈窖]52°","buyeruserid":"11331","registertime":"2015-01-26 10:22:47","lastloginaddr":"","baiduid":"f7c8c1859d0b5d553fd743ab0d2bdf57e6e2b8b1eaf1ae1f26eb2d8da0047099","recomuserid":"","displaceprice":"69900","levelid":"3","useraddr":"","areaid":"","swapfromname":"client","waiterauth":"0","bankaddr":"","userphonewx":"","likedrink":"","displacenum":"400","alipayid":"","userage":"","newprice":"27900","alipayname":"","newnum":"1002","displacebrand":"123","newpricestr":"279","clientid":"","chargelevelid":"","swapfrom":"3"},{"userbirthday":"","apparea":"","charactersign":"","paypwd":"","newbrand":"112","displacepricestr":"699","swapaddr":"10.25.23.96","lastlogintime":"2017-04-06 15:41:18","identitytype":"0","userphone":"13906507636","usercredits":"6990","usersex":"","identitycode":"","wechatid":"","paycount":"0","bankaccount":"","swapid":"1482","lastlogintype":"3","row":"2","registermodel":"2","usertype":"","secureemail":"","userparentid":"","useremail":"","userpassword":"2a629b5ceb491b17ffc012ccb6499e6a","balance":"","maxamount":"0","swaptime":"2017-04-06 15:28:38","displacebrandname":"沱牌生态[15年]","surplus":"400","leveltime":"","unitid":"","username":"","newbrandname":"五粮液股份[纯粮陈窖]52°","buyeruserid":"11331","registertime":"2015-01-26 10:22:47","lastloginaddr":"","baiduid":"f7c8c1859d0b5d553fd743ab0d2bdf57e6e2b8b1eaf1ae1f26eb2d8da0047099","recomuserid":"","displaceprice":"69900","levelid":"3","useraddr":"","areaid":"","swapfromname":"client","waiterauth":"0","bankaddr":"","userphonewx":"","likedrink":"","displacenum":"500","alipayid":"","userage":"","newprice":"27900","alipayname":"","newnum":"1252","displacebrand":"123","newpricestr":"279","clientid":"","chargelevelid":"","swapfrom":"3"},{"userbirthday":"","apparea":"","charactersign":"","paypwd":"","newbrand":"112","displacepricestr":"699","swapaddr":"10.25.23.96","lastlogintime":"2017-04-06 15:41:18","identitytype":"0","userphone":"13906507636","usercredits":"6990","usersex":"","identitycode":"","wechatid":"","paycount":"0","bankaccount":"","swapid":"1477","lastlogintype":"3","row":"3","registermodel":"2","usertype":"","secureemail":"","userparentid":"","useremail":"","userpassword":"2a629b5ceb491b17ffc012ccb6499e6a","balance":"","maxamount":"0","swaptime":"2017-03-10 11:48:36","displacebrandname":"沱牌生态[15年]","surplus":"900","leveltime":"","unitid":"","username":"","newbrandname":"五粮液股份[纯粮陈窖]52°","buyeruserid":"11331","registertime":"2015-01-26 10:22:47","lastloginaddr":"","baiduid":"f7c8c1859d0b5d553fd743ab0d2bdf57e6e2b8b1eaf1ae1f26eb2d8da0047099","recomuserid":"","displaceprice":"69900","levelid":"3","useraddr":"","areaid":"","swapfromname":"client","waiterauth":"0","bankaddr":"","userphonewx":"","likedrink":"","displacenum":"500","alipayid":"","userage":"","newprice":"27900","alipayname":"","newnum":"1252","displacebrand":"123","newpricestr":"279","clientid":"","chargelevelid":"","swapfrom":"3"},{"userbirthday":"","apparea":"","charactersign":"","paypwd":"","newbrand":"174","displacepricestr":"279","swapaddr":"10.25.23.96","lastlogintime":"2016-09-07 02:20:30","identitytype":"0","userphone":"15928699915","usercredits":"0","usersex":"","identitycode":"","wechatid":"","paycount":"0","bankaccount":"","swapid":"1472","lastlogintype":"3","row":"4","registermodel":"3","usertype":"","secureemail":"","userparentid":"","useremail":"","userpassword":"0bef88608e40a452936ff0d2745a6bcf","balance":"","maxamount":"0","swaptime":"2017-01-27 19:15:32","displacebrandname":"五粮液股份[纯粮陈窖]52°","surplus":"1000","leveltime":"","unitid":"","username":"","newbrandname":"贵州茅台.华茅酒[得民精选]","buyeruserid":"32971","registertime":"2016-09-07 02:20:29","lastloginaddr":"","baiduid":"b5223f0eb39f79438e11ccf680c52eff1ae90fa41a857748632b11d5e97904fe","recomuserid":"","displaceprice":"27900","levelid":"3","useraddr":"","areaid":"","swapfromname":"","waiterauth":"0","bankaddr":"","userphonewx":"","likedrink":"","displacenum":"950","alipayid":"","userage":"","newprice":"49900","alipayname":"","newnum":"531","displacebrand":"112","newpricestr":"499","clientid":"","chargelevelid":"","swapfrom":"4"},{"userbirthday":"","apparea":"","charactersign":"","paypwd":"","newbrand":"174","displacepricestr":"279","swapaddr":"10.25.23.96","lastlogintime":"2016-09-07 02:20:30","identitytype":"0","userphone":"15928699915","usercredits":"0","usersex":"","identitycode":"","wechatid":"","paycount":"0","bankaccount":"","swapid":"1471","lastlogintype":"3","row":"5","registermodel":"3","usertype":"","secureemail":"","userparentid":"","useremail":"","userpassword":"0bef88608e40a452936ff0d2745a6bcf","balance":"","maxamount":"0","swaptime":"2017-01-27 19:13:43","displacebrandname":"五粮液股份[纯粮陈窖]52°","surplus":"1950","leveltime":"","unitid":"","username":"","newbrandname":"贵州茅台.华茅酒[得民精选]","buyeruserid":"32971","registertime":"2016-09-07 02:20:29","lastloginaddr":"","baiduid":"b5223f0eb39f79438e11ccf680c52eff1ae90fa41a857748632b11d5e97904fe","recomuserid":"","displaceprice":"27900","levelid":"3","useraddr":"","areaid":"","swapfromname":"","waiterauth":"0","bankaddr":"","userphonewx":"","likedrink":"","displacenum":"600","alipayid":"","userage":"","newprice":"49900","alipayname":"","newnum":"335","displacebrand":"112","newpricestr":"499","clientid":"","chargelevelid":"","swapfrom":"4"},{"userbirthday":"","apparea":"","charactersign":"","paypwd":"","newbrand":"174","displacepricestr":"279","swapaddr":"10.25.23.96","lastlogintime":"2016-09-07 02:20:30","identitytype":"0","userphone":"15928699915","usercredits":"0","usersex":"","identitycode":"","wechatid":"","paycount":"0","bankaccount":"","swapid":"1470","lastlogintype":"3","row":"6","registermodel":"3","usertype":"","secureemail":"","userparentid":"","useremail":"","userpassword":"0bef88608e40a452936ff0d2745a6bcf","balance":"","maxamount":"0","swaptime":"2017-01-27 19:07:07","displacebrandname":"五粮液股份[纯粮陈窖]52°","surplus":"2550","leveltime":"","unitid":"","username":"","newbrandname":"贵州茅台.华茅酒[得民精选]","buyeruserid":"32971","registertime":"2016-09-07 02:20:29","lastloginaddr":"","baiduid":"b5223f0eb39f79438e11ccf680c52eff1ae90fa41a857748632b11d5e97904fe","recomuserid":"","displaceprice":"27900","levelid":"3","useraddr":"","areaid":"","swapfromname":"","waiterauth":"0","bankaddr":"","userphonewx":"","likedrink":"","displacenum":"1100","alipayid":"","userage":"","newprice":"49900","alipayname":"","newnum":"615","displacebrand":"112","newpricestr":"499","clientid":"","chargelevelid":"","swapfrom":"4"},{"userbirthday":"","apparea":"","charactersign":"","paypwd":"","newbrand":"120","displacepricestr":"279","swapaddr":"10.25.23.96","lastlogintime":"2016-09-07 02:20:30","identitytype":"0","userphone":"15928699915","usercredits":"0","usersex":"","identitycode":"","wechatid":"","paycount":"0","bankaccount":"","swapid":"1469","lastlogintype":"3","row":"7","registermodel":"3","usertype":"","secureemail":"","userparentid":"","useremail":"","userpassword":"0bef88608e40a452936ff0d2745a6bcf","balance":"","maxamount":"0","swaptime":"2017-01-27 19:04:58","displacebrandname":"五粮液股份[纯粮陈窖]52°","surplus":"3650","leveltime":"","unitid":"","username":"","newbrandname":"沱牌生态[10年]浓香","buyeruserid":"32971","registertime":"2016-09-07 02:20:29","lastloginaddr":"","baiduid":"b5223f0eb39f79438e11ccf680c52eff1ae90fa41a857748632b11d5e97904fe","recomuserid":"","displaceprice":"27900","levelid":"3","useraddr":"","areaid":"","swapfromname":"","waiterauth":"0","bankaddr":"","userphonewx":"","likedrink":"","displacenum":"250","alipayid":"","userage":"","newprice":"23900","alipayname":"","newnum":"291","displacebrand":"112","newpricestr":"239","clientid":"","chargelevelid":"","swapfrom":"4"},{"userbirthday":"","apparea":"","charactersign":"","paypwd":"","newbrand":"174","displacepricestr":"699","swapaddr":"10.25.23.96","lastlogintime":"2016-01-09 22:38:25","identitytype":"0","userphone":"18081913429","usercredits":"0","usersex":"","identitycode":"","wechatid":"","paycount":"0","bankaccount":"","swapid":"1468","lastlogintype":"3","row":"8","registermodel":"3","usertype":"","secureemail":"","userparentid":"","useremail":"","userpassword":"c5ea54ab0b9f0c0087714ba528bee08f","balance":"","maxamount":"0","swaptime":"2016-12-16 15:35:43","displacebrandname":"沱牌生态[15年]","surplus":"0","leveltime":"","unitid":"","username":"","newbrandname":"贵州茅台.华茅酒[得民精选]","buyeruserid":"26144","registertime":"2016-01-09 22:38:24","lastloginaddr":"","baiduid":"","recomuserid":"","displaceprice":"69900","levelid":"3","useraddr":"","areaid":"","swapfromname":"","waiterauth":"0","bankaddr":"","userphonewx":"","likedrink":"","displacenum":"450","alipayid":"","userage":"","newprice":"49900","alipayname":"","newnum":"630","displacebrand":"123","newpricestr":"499","clientid":"","chargelevelid":"","swapfrom":"4"},{"userbirthday":"","apparea":"","charactersign":"介绍","paypwd":"","newbrand":"112","displacepricestr":"89","swapaddr":"10.25.23.96","lastlogintime":"2017-10-27 14:55:25","identitytype":"0","userphone":"13880912212","usercredits":"81","usersex":"1","identitycode":"","wechatid":"","paycount":"0","bankaccount":"","swapid":"1467","lastlogintype":"1","row":"9","registermodel":"1","usertype":"","secureemail":"","userparentid":"","useremail":"","userpassword":"9de879e598b99efa7665ab67aaf2db19","balance":"","maxamount":"0","swaptime":"2016-11-29 15:55:04","displacebrandname":"泸州老窖永盛烧坊[10]","surplus":"0","leveltime":"","unitid":"","username":"","newbrandname":"五粮液股份[纯粮陈窖]52°","buyeruserid":"10565","registertime":"2014-10-16 15:54:22","lastloginaddr":"","baiduid":"e61911c39322c1b0ddcc79e90a0729dbbd23fdb08af4661b8c5e73a2e6c93b32","recomuserid":"","displaceprice":"8900","levelid":"3","useraddr":"","areaid":"","swapfromname":"app","waiterauth":"0","bankaddr":"","userphonewx":"","likedrink":"","displacenum":"200","alipayid":"","userage":"","newprice":"27900","alipayname":"","newnum":"63","displacebrand":"116","newpricestr":"279","clientid":"","chargelevelid":"","swapfrom":"1"},{"userbirthday":"","apparea":"","charactersign":"","paypwd":"","newbrand":"112","displacepricestr":"89","swapaddr":"10.25.23.96","lastlogintime":"2017-04-14 12:17:09","identitytype":"0","userphone":"13977128188","usercredits":"45890","usersex":"2","identitycode":"","wechatid":"oxi19uHeUDaheExEDzEYZsO8Ido0","paycount":"0","bankaccount":"","swapid":"1464","lastlogintype":"3","row":"10","registermodel":"3","usertype":"","secureemail":"","userparentid":"","useremail":"","userpassword":"8cc946123dcf3c00c15de91c11db056f","balance":"","maxamount":"0","swaptime":"2016-11-13 23:04:45","displacebrandname":"泸州老窖永盛烧坊[10]","surplus":"0","leveltime":"","unitid":"","username":"","newbrandname":"五粮液股份[纯粮陈窖]52°","buyeruserid":"10396","registertime":"2014-08-20 16:17:27","lastloginaddr":"","baiduid":"f68039068c4e115140505877b438febad275fc5e9ed8965795d1ce46d7f13fcb","recomuserid":"","displaceprice":"8900","levelid":"3","useraddr":"","areaid":"","swapfromname":"","waiterauth":"0","bankaddr":"","userphonewx":"","likedrink":"","displacenum":"167","alipayid":"","userage":"","newprice":"27900","alipayname":"","newnum":"53","displacebrand":"116","newpricestr":"279","clientid":"","chargelevelid":"1","swapfrom":"4"},{"userbirthday":"","apparea":"","charactersign":"","paypwd":"","newbrand":"112","displacepricestr":"699","swapaddr":"10.25.23.96","lastlogintime":"2018-12-30 14:09:50","identitytype":"1","userphone":"15881007888","usercredits":"837","usersex":"","identitycode":"","wechatid":"","paycount":"0","bankaccount":"","swapid":"1463","lastlogintype":"1","row":"11","registermodel":"1","usertype":"","secureemail":"","userparentid":"","useremail":"","userpassword":"9e55c277f693710b519680311be88a1f","balance":"","maxamount":"0","swaptime":"2016-11-13 22:10:44","displacebrandname":"沱牌生态[15年]","surplus":"150","leveltime":"","unitid":"","username":"刘","newbrandname":"五粮液股份[纯粮陈窖]52°","buyeruserid":"21485","registertime":"2015-01-30 17:40:01","lastloginaddr":"","baiduid":"a4101b045ecb917cb5ef5e03344366c21dc250fab49d706e5dbb9f090818c70d","recomuserid":"","displaceprice":"69900","levelid":"3","useraddr":"","areaid":"","swapfromname":"","waiterauth":"0","bankaddr":"","userphonewx":"","likedrink":"","displacenum":"250","alipayid":"","userage":"","newprice":"27900","alipayname":"","newnum":"626","displacebrand":"123","newpricestr":"279","clientid":"","chargelevelid":"","swapfrom":"4"},{"userbirthday":"","apparea":"","charactersign":"","paypwd":"","newbrand":"115","displacepricestr":"279","swapaddr":"10.25.23.96","lastlogintime":"2019-12-23 18:33:23","identitytype":"0","userphone":"13877772555","usercredits":"28585","usersex":"","identitycode":"","wechatid":"oxi19uEpFGqA8TPRcAqXdMfjikz0","paycount":"0","bankaccount":"","swapid":"1462","lastlogintype":"1","row":"12","registermodel":"3","usertype":"","secureemail":"","userparentid":"","useremail":"","userpassword":"340fe88e8f5748c1a5fa1ba0bc375069","balance":"","maxamount":"0","swaptime":"2016-11-01 12:50:20","displacebrandname":"天香池[15年]","surplus":"3100","leveltime":"","unitid":"","username":"","newbrandname":"泸州老窖永盛烧坊[20]","buyeruserid":"10831","registertime":"2014-12-19 22:56:30","lastloginaddr":"","baiduid":"392c1a094b317051c190153a7e44f886060905ed1d6727bd3e4ddddd8afbe98d","recomuserid":"","displaceprice":"27900","levelid":"3","useraddr":"","areaid":"","swapfromname":"","waiterauth":"0","bankaddr":"","userphonewx":"","likedrink":"","displacenum":"776","alipayid":"","userage":"","newprice":"17900","alipayname":"","newnum":"1209","displacebrand":"125","newpricestr":"179","clientid":"","chargelevelid":"","swapfrom":"4"}],"res.page":[{"RecordsCount":991,"hasNextPage":true,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12,"TotalPageCount":83}],"res.size":"991","returnview":"@json"}
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
