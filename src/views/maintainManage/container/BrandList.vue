<template>
  <div>
    <div class="flex-row filter-box flex-wrap">
      <div>
        <span>酒品：</span>
        <el-input v-model="requestParams.brandName" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>度数：</span>
        <el-input v-model="requestParams.morethan" clearable placeholder="请输入内容"></el-input>至
        <el-input v-model="requestParams.lessthan" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>香型：</span>
        <el-select v-model="requestParams.tasteModel" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div>
        <el-button type="primary">查询</el-button>
        <el-button type="primary">添加</el-button>
      </div>
    </div>
    <el-table
      :data="jsonName.res"
      border
      style="width: 100%">
      <el-table-column
        prop="brandname"
        label="酒品">
      </el-table-column>
      <el-table-column
        prop="degree"
        label="酒精度"
        width="80">
      </el-table-column>
      <el-table-column
        prop="cn"
        label="香型"
        width="80">
      </el-table-column>
      <el-table-column
        prop="brandplace"
        label="生产地址">
      </el-table-column>
      <el-table-column
        prop="storename"
        label="生产厂商">
      </el-table-column>
      <el-table-column
        width="90"
        label="终端大图">
        <template slot-scope="scope">
          <img :src="`http://139.196.151.129:8081/${scope.row.bigpicpath}`" alt="" class="app-icon">
        </template>
      </el-table-column>
      <el-table-column
        width="90"
        label="终端小图">
        <template slot-scope="scope">
          <img :src="`http://139.196.151.129:8081/${scope.row.smallpicpath}`" alt="" class="app-icon">
        </template>
      </el-table-column>
      <el-table-column
        width="100"
        label="手机列表图">
        <template slot-scope="scope">
          <img :src="`http://139.196.151.129:8081/${scope.row.smallpicpath}`" alt="" class="app-icon">
        </template>
      </el-table-column>
      <el-table-column
        prop="isenabledshow"
        label="可用"
        width="60">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="简介">
      </el-table-column>
      <el-table-column
        label="操作"
        width="60">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="dialogVisible=true">编辑</el-button>
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
  name: 'BrandList',
  components: {
    PageChange,
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        batchNo: '',
        cardNo: '',
        userPhone: '',
        createTime: '',
        cardStatus: '',
        brandName: '',
        accountType: '',
        pageNum: 1,
        pageSize: 10
      },
      options: [{
        value: '0',
        label: '全部'
      }, {
        value: '1',
        label: '清香'
      }, {
        value: '2',
        label: '酱香'
      }, {
        value: '3',
        label: '浓香'
      }, {
        value: '4',
        label: '绵柔凤香型'
      }, {
        value: '5',
        label: '凤香型'
      }, {
        value: '6',
        label: '馥郁香型'
      }, {
        value: '7',
        label: '兼香型'
      }, {
        value: '8',
        label: '特香型'
      }, {
        value: '9',
        label: '芝麻香型'
      }, {
        value: '10',
        label: '豉香型'
      }, {
        value: '11',
        label: '老白干香型'
      }, {
        value: '12',
        label: '米香型'
      }],
      dialogVisible: false,
      jsonName: {"jvcpagename":"pub_brand","jvcoldpageName":"pub_brand","cmd":"query","returnvalue":"1","res.recordsperpage":"12","RecordsPerPage":"12","res":[{"retailprice":"38000","minstorecount":"0","tastemodel":"3","brandseries":"纯粮陈窖","degree":"52","bcount":"18413","brandnamekey":"10","brandid":"112","row":"1","cn":"浓香","buyquantity":"2007239","bigpicpath":"upload/brand_big112201972618118.png","storename":"五粮液","mobilepicpath":"../upload/brand_mobile112201532111812.png","smallpicpath":"upload/brand_small112201972618114.png","buycount":"7030","bigpath":"<img src='http://139.196.151.129:8081/upload/brand_big112201972618118.png?id=0.6098551407676432' width='30'/>","remark":"五粮液股份有限公司","brandnamenote":"五粮液股份","storeid":"229","defaultpurprice":"334800","isenabled":"1","brandplace":"四川省宜宾市","isenabledshow":"是","logopicpath":"<img src='http://139.196.151.129:8081/upload/brand_logo112201972618121.png?id=0.30382071590673787' width='30'/>","smallpath":"<img src='http://139.196.151.129:8081/upload/brand_small112201972618114.png?id=0.4201623075348453' width='30'/>","brandname":"五粮液股份[纯粮陈窖]52°","logopath":"upload/brand_logo112201972618121.png"},{"retailprice":"64000","minstorecount":"0","tastemodel":"2","brandseries":"纯粮醇品","degree":"53","bcount":"1520","brandnamekey":"10","brandid":"113","row":"2","cn":"酱香","buyquantity":"120432","bigpicpath":"upload/brand_big1132019726185524.png","storename":"五粮液","mobilepicpath":"","smallpicpath":"upload/brand_small1132019726185454.png","buycount":"404","bigpath":"<img src='http://139.196.151.129:8081/upload/brand_big1132019726185524.png?id=0.9208414034897292' width='30'/>","remark":"五粮液股份有限公司","brandnamenote":"五粮液股份","storeid":"229","defaultpurprice":"586800","isenabled":"1","brandplace":"四川省宜宾市","isenabledshow":"是","logopicpath":"<img src='http://139.196.151.129:8081/upload/brand_logo113201972618550.png?id=0.3170558946767904' width='30'/>","smallpath":"<img src='http://139.196.151.129:8081/upload/brand_small1132019726185454.png?id=0.5171775617908461' width='30'/>","brandname":"五粮液股份[纯粮醇品]53°","logopath":"upload/brand_logo113201972618550.png"},{"retailprice":"26000","minstorecount":"0","tastemodel":"3","brandseries":"永盛烧坊","degree":"52","bcount":"9245","brandnamekey":"2","brandid":"115","row":"3","cn":"浓香","buyquantity":"1146280","bigpicpath":"upload/brand_big115201972621113.png","storename":"泸州老窖","mobilepicpath":"","smallpicpath":"upload/brand_small1152019726211059.png","buycount":"6707","bigpath":"<img src='http://139.196.151.129:8081/upload/brand_big115201972621113.png?id=0.4107616311795249' width='30'/>","remark":"泸州老窖股份有限公司","brandnamenote":"泸州老窖","storeid":"230","defaultpurprice":"214800","isenabled":"1","brandplace":"四川省泸州市","isenabledshow":"是","logopicpath":"<img src='http://139.196.151.129:8081/upload/brand_logo1152019726211111.png?id=0.9215192809647353' width='30'/>","smallpath":"<img src='http://139.196.151.129:8081/upload/brand_small1152019726211059.png?id=0.5340015562688359' width='30'/>","brandname":"泸州老窖永盛烧坊[20]","logopath":"upload/brand_logo1152019726211111.png"},{"retailprice":"12000","minstorecount":"0","tastemodel":"3","brandseries":"永盛烧坊","degree":"52","bcount":"4714","brandnamekey":"2","brandid":"116","row":"4","cn":"浓香","buyquantity":"1715375","bigpicpath":"upload/brand_big1162019726185733.png","storename":"泸州老窖","mobilepicpath":"","smallpicpath":"upload/brand_small1162019726185724.png","buycount":"4776","bigpath":"<img src='http://139.196.151.129:8081/upload/brand_big1162019726185733.png?id=0.7927736931765513' width='30'/>","remark":"泸州老窖股份有限公司","brandnamenote":"泸州老窖","storeid":"230","defaultpurprice":"106800","isenabled":"1","brandplace":"四川省泸州市","isenabledshow":"是","logopicpath":"<img src='http://139.196.151.129:8081/upload/brand_logo1162019726185729.png?id=0.46025318026779793' width='30'/>","smallpath":"<img src='http://139.196.151.129:8081/upload/brand_small1162019726185724.png?id=0.7342445350244214' width='30'/>","brandname":"泸州老窖永盛烧坊[10]","logopath":"upload/brand_logo1162019726185729.png"},{"retailprice":"39000","minstorecount":"0","tastemodel":"3","brandseries":"永盛烧坊","degree":"52","bcount":"6451","brandnamekey":"2","brandid":"117","row":"5","cn":"浓香","buyquantity":"612548","bigpicpath":"upload/brand_big1172019726212259.png","storename":"泸州老窖","mobilepicpath":"","smallpicpath":"upload/brand_small1172019726212255.png","buycount":"1351","bigpath":"<img src='http://139.196.151.129:8081/upload/brand_big1172019726212259.png?id=0.06973766204238785' width='30'/>","remark":"泸州老窖股份有限公司","brandnamenote":"泸州老窖","storeid":"230","defaultpurprice":"346800","isenabled":"1","brandplace":"四川省泸州市","isenabledshow":"是","logopicpath":"<img src='http://139.196.151.129:8081/upload/brand_logo117201972621234.png?id=0.6499264853699781' width='30'/>","smallpath":"<img src='http://139.196.151.129:8081/upload/brand_small1172019726212255.png?id=0.8803089437073278' width='30'/>","brandname":"泸州老窖永盛烧坊[30]","logopath":"upload/brand_logo117201972621234.png"},{"retailprice":"18000","minstorecount":"0","tastemodel":"3","brandseries":"沱牌生态","degree":"50","bcount":"1822","brandnamekey":"3","brandid":"118","row":"6","cn":"浓香","buyquantity":"495451","bigpicpath":"upload/brand_big1182019729173417.png","storename":"沱牌舍得","mobilepicpath":"","smallpicpath":"upload/brand_small1182019729173413.png","buycount":"1366","bigpath":"<img src='http://139.196.151.129:8081/upload/brand_big1182019729173417.png?id=0.5296331303392325' width='30'/>","remark":"沱牌舍得供销有限公司","brandnamenote":"沱牌舍得","storeid":"231","defaultpurprice":"166800","isenabled":"1","brandplace":"四川省遂宁市","isenabledshow":"是","logopicpath":"<img src='http://139.196.151.129:8081/upload/brand_logo1182019729173421.png?id=0.22490619513845977' width='30'/>","smallpath":"<img src='http://139.196.151.129:8081/upload/brand_small1182019729173413.png?id=0.27793437234080987' width='30'/>","brandname":"沱牌生态[6年]","logopath":"upload/brand_logo1182019729173421.png"},{"retailprice":"31000","minstorecount":"0","tastemodel":"3","brandseries":"沱牌生态","degree":"50","bcount":"4391","brandnamekey":"3","brandid":"120","row":"7","cn":"浓香","buyquantity":"883326","bigpicpath":"upload/brand_big1202019729173316.png","storename":"沱牌舍得","mobilepicpath":"","smallpicpath":"upload/brand_small1202019729173312.png","buycount":"5471","bigpath":"<img src='http://139.196.151.129:8081/upload/brand_big1202019729173316.png?id=0.18114991366246325' width='30'/>","remark":"沱牌舍得供销有限公司","brandnamenote":"沱牌舍得","storeid":"231","defaultpurprice":"286800","isenabled":"1","brandplace":"四川省遂宁市","isenabledshow":"是","logopicpath":"<img src='http://139.196.151.129:8081/upload/brand_logo1202019729173321.png?id=0.2770003193468277' width='30'/>","smallpath":"<img src='http://139.196.151.129:8081/upload/brand_small1202019729173312.png?id=0.4487065205855151' width='30'/>","brandname":"沱牌生态[10年]浓香","logopath":"upload/brand_logo1202019729173321.png"},{"retailprice":"65000","minstorecount":"0","tastemodel":"2","brandseries":"沱牌生态","degree":"53","bcount":"674","brandnamekey":"3","brandid":"121","row":"8","cn":"酱香","buyquantity":"242990","bigpicpath":"upload/brand_big1212019729173047.png","storename":"沱牌舍得","mobilepicpath":"","smallpicpath":"upload/brand_small1212019729173042.png","buycount":"545","bigpath":"<img src='http://139.196.151.129:8081/upload/brand_big1212019729173047.png?id=0.8988904522231635' width='30'/>","remark":"沱牌舍得供销有限公司","brandnamenote":"沱牌舍得","storeid":"231","defaultpurprice":"598800","isenabled":"1","brandplace":"四川省遂宁市","isenabledshow":"是","logopicpath":"<img src='http://139.196.151.129:8081/upload/brand_logo1212019729173052.png?id=0.41745761882606447' width='30'/>","smallpath":"<img src='http://139.196.151.129:8081/upload/brand_small1212019729173042.png?id=0.9564208554757223' width='30'/>","brandname":"沱牌生态[10年]酱香","logopath":"upload/brand_logo1212019729173052.png"},{"retailprice":"91000","minstorecount":"0","tastemodel":"2","brandseries":"沱牌生态","degree":"53","bcount":"657","brandnamekey":"3","brandid":"123","row":"9","cn":"酱香","buyquantity":"660640","bigpicpath":"upload/brand_big1232019729173144.png","storename":"沱牌舍得","mobilepicpath":"","smallpicpath":"upload/brand_small1232019729173140.png","buycount":"1014","bigpath":"<img src='http://139.196.151.129:8081/upload/brand_big1232019729173144.png?id=0.6641453746790708' width='30'/>","remark":"沱牌舍得供销有限公司","brandnamenote":"沱牌舍得","storeid":"231","defaultpurprice":"838800","isenabled":"1","brandplace":"四川省遂宁市","isenabledshow":"是","logopicpath":"<img src='http://139.196.151.129:8081/upload/brand_logo1232019729173148.png?id=0.26623426792228155' width='30'/>","smallpath":"<img src='http://139.196.151.129:8081/upload/brand_small1232019729173140.png?id=0.6656895654177961' width='30'/>","brandname":"沱牌生态[15年]","logopath":"upload/brand_logo1232019729173148.png"},{"retailprice":"18000","minstorecount":"0","tastemodel":"3","brandseries":"纯粮原浆","degree":"52","bcount":"5245","brandnamekey":"4","brandid":"124","row":"10","cn":"浓香","buyquantity":"423047","bigpicpath":"upload/brand_big1242019726193019.png","storename":"金窖醇","mobilepicpath":"","smallpicpath":"upload/brand_small124201972619308.png","buycount":"912","bigpath":"<img src='http://139.196.151.129:8081/upload/brand_big1242019726193019.png?id=0.5062410208459722' width='30'/>","remark":"泸州金窖醇酒业有限公司","brandnamenote":"天香池","storeid":"233","defaultpurprice":"166800","isenabled":"1","brandplace":"四川省泸州市","isenabledshow":"是","logopicpath":"<img src='http://139.196.151.129:8081/upload/brand_logo1242019726193015.png?id=0.581629744986965' width='30'/>","smallpath":"<img src='http://139.196.151.129:8081/upload/brand_small124201972619308.png?id=0.9151551054695557' width='30'/>","brandname":"天香池[10年]","logopath":"upload/brand_logo1242019726193015.png"},{"retailprice":"36500","minstorecount":"0","tastemodel":"3","brandseries":"纯粮原浆","degree":"52","bcount":"5077","brandnamekey":"4","brandid":"125","row":"11","cn":"浓香","buyquantity":"748641","bigpicpath":"upload/brand_big1252019729172513.png","storename":"金窖醇","mobilepicpath":"","smallpicpath":"upload/brand_small1252019729172510.png","buycount":"1638","bigpath":"<img src='http://139.196.151.129:8081/upload/brand_big1252019729172513.png?id=0.28580529022315715' width='30'/>","remark":"泸州金窖醇酒业有限公司","brandnamenote":"天香池","storeid":"233","defaultpurprice":"334800","isenabled":"1","brandplace":"四川省泸州市","isenabledshow":"是","logopicpath":"<img src='http://139.196.151.129:8081/upload/brand_logo1252019729172520.png?id=0.7998123848607638' width='30'/>","smallpath":"<img src='http://139.196.151.129:8081/upload/brand_small1252019729172510.png?id=0.17209591460913476' width='30'/>","brandname":"天香池[15年]","logopath":"upload/brand_logo1252019729172520.png"},{"retailprice":"65000","minstorecount":"0","tastemodel":"2","brandseries":"茅台","degree":"53","bcount":"2824","brandnamekey":"13","brandid":"174","row":"12","cn":"酱香","buyquantity":"471572","bigpicpath":"upload/brand_big1742019729171916.png","storename":"茅台","mobilepicpath":"","smallpicpath":"upload/brand_small1742019729171912.png","buycount":"1650","bigpath":"<img src='http://139.196.151.129:8081/upload/brand_big1742019729171916.png?id=0.03209264168255077' width='30'/>","remark":"华茅酒是茅台的前身,属酱香型白酒","brandnamenote":"贵州茅台","storeid":"606","defaultpurprice":"598800","isenabled":"1","brandplace":"贵州省仁怀市","isenabledshow":"是","logopicpath":"<img src='http://139.196.151.129:8081/upload/brand_logo1742019729171921.png?id=0.5798597826338918' width='30'/>","smallpath":"<img src='http://139.196.151.129:8081/upload/brand_small1742019729171912.png?id=0.8710855663662095' width='30'/>","brandname":"贵州茅台.华茅酒[得民精选]","logopath":"upload/brand_logo1742019729171921.png"}],"res.page":[{"RecordsCount":20,"hasNextPage":true,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12,"TotalPageCount":2}],"res.size":"20","returnview":"@json"},
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
