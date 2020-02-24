<template>
  <div>
    <div class="flex-row filter-box">
      <div>
        <span>酒品：</span>
        <el-input v-model="requestParams.brandName" clearable placeholder="请输入内容"></el-input>
      </div>
      <div>
        <span>度数：</span>
        <el-input v-model="requestParams.dushu1" clearable placeholder="请输入内容"></el-input>至
        <el-input v-model="requestParams.dushu2" clearable placeholder="请输入内容"></el-input>
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
      </div>
    </div>
    <el-table
      :data="jsonName.res"
      border
      style="width: 100%">
      <el-table-column
        prop="brandname"
        label="酒品"
        width="200">
      </el-table-column>
      <el-table-column
        prop="degree"
        width="80"
        label="酒度数">
      </el-table-column>
      <el-table-column
        prop="cn"
        label="香型"
        width="120">
      </el-table-column>
      <el-table-column
        prop="brandplace"
        label="生产地址">
      </el-table-column>
      <el-table-column
        prop="storename"
        label="生产厂商"
        width="180">
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
        width="80">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="简介">
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
import Breadcrumb from '@/components/Breadcrumb.vue'

export default {
  name: 'WineInfromationList',
  components: {
    PageChange,
    Breadcrumb
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        brandName: '',
        dushu1: '',
        dushu2: '',
        tasteModel: '',
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
      jsonName: {"jvcpagename":"pub_brand","jvcoldpageName":"pub_brand","cmd":"query","returnvalue":"1","res.recordsperpage":"12","RecordsPerPage":"12","res":[{"retailprice":"38000","minstorecount":"0","tastemodel":"3","brandseries":"纯粮陈窖","degree":"52","brandnamekey":"10","brandid":"112","row":"1","cn":"浓香","buyquantity":"2007239","bigpicpath":"upload/brand_big112201972618118.png","storename":"","mobilepicpath":"../upload/brand_mobile112201532111812.png","smallpicpath":"upload/brand_small112201972618114.png","buycount":"7030","bigpath":"<img src='http://139.196.151.129:8081/upload/brand_big112201972618118.png?id=0.3866289286498388' width='30'/>","remark":"五粮液股份有限公司","storeid":"229","defaultpurprice":"334800","isenabled":"1","brandplace":"四川省宜宾市","isenabledshow":"是","logopicpath":"<img src='http://139.196.151.129:8081/upload/brand_logo112201972618121.png?id=0.34645674718489305' width='30'/>","smallpath":"<img src='http://139.196.151.129:8081/upload/brand_small112201972618114.png?id=0.33607009299006596' width='30'/>","brandname":"五粮液股份[纯粮陈窖]52°","logopath":"upload/brand_logo112201972618121.png"},{"retailprice":"64000","minstorecount":"0","tastemodel":"2","brandseries":"纯粮醇品","degree":"53","brandnamekey":"10","brandid":"113","row":"2","cn":"酱香","buyquantity":"120432","bigpicpath":"upload/brand_big1132019726185524.png","storename":"","mobilepicpath":"","smallpicpath":"upload/brand_small1132019726185454.png","buycount":"404","bigpath":"<img src='http://139.196.151.129:8081/upload/brand_big1132019726185524.png?id=0.603603720994863' width='30'/>","remark":"五粮液股份有限公司","storeid":"229","defaultpurprice":"586800","isenabled":"1","brandplace":"四川省宜宾市","isenabledshow":"是","logopicpath":"<img src='http://139.196.151.129:8081/upload/brand_logo113201972618550.png?id=0.228057034104035' width='30'/>","smallpath":"<img src='http://139.196.151.129:8081/upload/brand_small1132019726185454.png?id=0.750702991734065' width='30'/>","brandname":"五粮液股份[纯粮醇品]53°","logopath":"upload/brand_logo113201972618550.png"},{"retailprice":"26000","minstorecount":"0","tastemodel":"3","brandseries":"永盛烧坊","degree":"52","brandnamekey":"2","brandid":"115","row":"3","cn":"浓香","buyquantity":"1146280","bigpicpath":"upload/brand_big115201972621113.png","storename":"","mobilepicpath":"","smallpicpath":"upload/brand_small1152019726211059.png","buycount":"6707","bigpath":"<img src='http://139.196.151.129:8081/upload/brand_big115201972621113.png?id=0.9180720992977002' width='30'/>","remark":"泸州老窖股份有限公司","storeid":"230","defaultpurprice":"214800","isenabled":"1","brandplace":"四川省泸州市","isenabledshow":"是","logopicpath":"<img src='http://139.196.151.129:8081/upload/brand_logo1152019726211111.png?id=0.3005353418684399' width='30'/>","smallpath":"<img src='http://139.196.151.129:8081/upload/brand_small1152019726211059.png?id=0.45317690320431836' width='30'/>","brandname":"泸州老窖永盛烧坊[20]","logopath":"upload/brand_logo1152019726211111.png"},{"retailprice":"12000","minstorecount":"0","tastemodel":"3","brandseries":"永盛烧坊","degree":"52","brandnamekey":"2","brandid":"116","row":"4","cn":"浓香","buyquantity":"1715375","bigpicpath":"upload/brand_big1162019726185733.png","storename":"","mobilepicpath":"","smallpicpath":"upload/brand_small1162019726185724.png","buycount":"4776","bigpath":"<img src='http://139.196.151.129:8081/upload/brand_big1162019726185733.png?id=0.1088582647908316' width='30'/>","remark":"泸州老窖股份有限公司","storeid":"230","defaultpurprice":"106800","isenabled":"1","brandplace":"四川省泸州市","isenabledshow":"是","logopicpath":"<img src='http://139.196.151.129:8081/upload/brand_logo1162019726185729.png?id=0.9010297141715855' width='30'/>","smallpath":"<img src='http://139.196.151.129:8081/upload/brand_small1162019726185724.png?id=0.5277971930126585' width='30'/>","brandname":"泸州老窖永盛烧坊[10]","logopath":"upload/brand_logo1162019726185729.png"},{"retailprice":"39000","minstorecount":"0","tastemodel":"3","brandseries":"永盛烧坊","degree":"52","brandnamekey":"2","brandid":"117","row":"5","cn":"浓香","buyquantity":"612548","bigpicpath":"upload/brand_big1172019726212259.png","storename":"","mobilepicpath":"","smallpicpath":"upload/brand_small1172019726212255.png","buycount":"1351","bigpath":"<img src='http://139.196.151.129:8081/upload/brand_big1172019726212259.png?id=0.5988343696543617' width='30'/>","remark":"泸州老窖股份有限公司","storeid":"230","defaultpurprice":"346800","isenabled":"1","brandplace":"四川省泸州市","isenabledshow":"是","logopicpath":"<img src='http://139.196.151.129:8081/upload/brand_logo117201972621234.png?id=0.9273066246864086' width='30'/>","smallpath":"<img src='http://139.196.151.129:8081/upload/brand_small1172019726212255.png?id=0.7443195729489149' width='30'/>","brandname":"泸州老窖永盛烧坊[30]","logopath":"upload/brand_logo117201972621234.png"},{"retailprice":"18000","minstorecount":"0","tastemodel":"3","brandseries":"沱牌生态","degree":"50","brandnamekey":"3","brandid":"118","row":"6","cn":"浓香","buyquantity":"495451","bigpicpath":"upload/brand_big1182019729173417.png","storename":"","mobilepicpath":"","smallpicpath":"upload/brand_small1182019729173413.png","buycount":"1366","bigpath":"<img src='http://139.196.151.129:8081/upload/brand_big1182019729173417.png?id=0.2562829382680649' width='30'/>","remark":"沱牌舍得供销有限公司","storeid":"231","defaultpurprice":"166800","isenabled":"1","brandplace":"四川省遂宁市","isenabledshow":"是","logopicpath":"<img src='http://139.196.151.129:8081/upload/brand_logo1182019729173421.png?id=0.35866442495598794' width='30'/>","smallpath":"<img src='http://139.196.151.129:8081/upload/brand_small1182019729173413.png?id=0.2905372607035632' width='30'/>","brandname":"沱牌生态[6年]","logopath":"upload/brand_logo1182019729173421.png"},{"retailprice":"31000","minstorecount":"0","tastemodel":"3","brandseries":"沱牌生态","degree":"50","brandnamekey":"3","brandid":"120","row":"7","cn":"浓香","buyquantity":"883326","bigpicpath":"upload/brand_big1202019729173316.png","storename":"","mobilepicpath":"","smallpicpath":"upload/brand_small1202019729173312.png","buycount":"5471","bigpath":"<img src='http://139.196.151.129:8081/upload/brand_big1202019729173316.png?id=0.8725732158947686' width='30'/>","remark":"沱牌舍得供销有限公司","storeid":"231","defaultpurprice":"286800","isenabled":"1","brandplace":"四川省遂宁市","isenabledshow":"是","logopicpath":"<img src='http://139.196.151.129:8081/upload/brand_logo1202019729173321.png?id=0.5315361753976804' width='30'/>","smallpath":"<img src='http://139.196.151.129:8081/upload/brand_small1202019729173312.png?id=0.19493893208587743' width='30'/>","brandname":"沱牌生态[10年]浓香","logopath":"upload/brand_logo1202019729173321.png"},{"retailprice":"65000","minstorecount":"0","tastemodel":"2","brandseries":"沱牌生态","degree":"53","brandnamekey":"3","brandid":"121","row":"8","cn":"酱香","buyquantity":"242990","bigpicpath":"upload/brand_big1212019729173047.png","storename":"","mobilepicpath":"","smallpicpath":"upload/brand_small1212019729173042.png","buycount":"545","bigpath":"<img src='http://139.196.151.129:8081/upload/brand_big1212019729173047.png?id=0.8767511988989102' width='30'/>","remark":"沱牌舍得供销有限公司","storeid":"231","defaultpurprice":"598800","isenabled":"1","brandplace":"四川省遂宁市","isenabledshow":"是","logopicpath":"<img src='http://139.196.151.129:8081/upload/brand_logo1212019729173052.png?id=0.9080307385378131' width='30'/>","smallpath":"<img src='http://139.196.151.129:8081/upload/brand_small1212019729173042.png?id=0.9266674392691556' width='30'/>","brandname":"沱牌生态[10年]酱香","logopath":"upload/brand_logo1212019729173052.png"},{"retailprice":"91000","minstorecount":"0","tastemodel":"2","brandseries":"沱牌生态","degree":"53","brandnamekey":"3","brandid":"123","row":"9","cn":"酱香","buyquantity":"660640","bigpicpath":"upload/brand_big1232019729173144.png","storename":"","mobilepicpath":"","smallpicpath":"upload/brand_small1232019729173140.png","buycount":"1014","bigpath":"<img src='http://139.196.151.129:8081/upload/brand_big1232019729173144.png?id=0.993378563863122' width='30'/>","remark":"沱牌舍得供销有限公司","storeid":"231","defaultpurprice":"838800","isenabled":"1","brandplace":"四川省遂宁市","isenabledshow":"是","logopicpath":"<img src='http://139.196.151.129:8081/upload/brand_logo1232019729173148.png?id=0.5030975871150235' width='30'/>","smallpath":"<img src='http://139.196.151.129:8081/upload/brand_small1232019729173140.png?id=0.1382778489373664' width='30'/>","brandname":"沱牌生态[15年]","logopath":"upload/brand_logo1232019729173148.png"},{"retailprice":"18000","minstorecount":"0","tastemodel":"3","brandseries":"纯粮原浆","degree":"52","brandnamekey":"4","brandid":"124","row":"10","cn":"浓香","buyquantity":"423047","bigpicpath":"upload/brand_big1242019726193019.png","storename":"","mobilepicpath":"","smallpicpath":"upload/brand_small124201972619308.png","buycount":"912","bigpath":"<img src='http://139.196.151.129:8081/upload/brand_big1242019726193019.png?id=0.2902154338261743' width='30'/>","remark":"泸州金窖醇酒业有限公司","storeid":"233","defaultpurprice":"166800","isenabled":"1","brandplace":"四川省泸州市","isenabledshow":"是","logopicpath":"<img src='http://139.196.151.129:8081/upload/brand_logo1242019726193015.png?id=0.15671896822939846' width='30'/>","smallpath":"<img src='http://139.196.151.129:8081/upload/brand_small124201972619308.png?id=0.6522245990867847' width='30'/>","brandname":"天香池[10年]","logopath":"upload/brand_logo1242019726193015.png"},{"retailprice":"36500","minstorecount":"0","tastemodel":"3","brandseries":"纯粮原浆","degree":"52","brandnamekey":"4","brandid":"125","row":"11","cn":"浓香","buyquantity":"748641","bigpicpath":"upload/brand_big1252019729172513.png","storename":"","mobilepicpath":"","smallpicpath":"upload/brand_small1252019729172510.png","buycount":"1638","bigpath":"<img src='http://139.196.151.129:8081/upload/brand_big1252019729172513.png?id=0.12017957687600833' width='30'/>","remark":"泸州金窖醇酒业有限公司","storeid":"233","defaultpurprice":"334800","isenabled":"1","brandplace":"四川省泸州市","isenabledshow":"是","logopicpath":"<img src='http://139.196.151.129:8081/upload/brand_logo1252019729172520.png?id=0.16507056318819946' width='30'/>","smallpath":"<img src='http://139.196.151.129:8081/upload/brand_small1252019729172510.png?id=0.5233346945843916' width='30'/>","brandname":"天香池[15年]","logopath":"upload/brand_logo1252019729172520.png"},{"retailprice":"65000","minstorecount":"0","tastemodel":"2","brandseries":"茅台","degree":"53","brandnamekey":"13","brandid":"174","row":"12","cn":"酱香","buyquantity":"471572","bigpicpath":"upload/brand_big1742019729171916.png","storename":"","mobilepicpath":"","smallpicpath":"upload/brand_small1742019729171912.png","buycount":"1650","bigpath":"<img src='http://139.196.151.129:8081/upload/brand_big1742019729171916.png?id=0.4420681723786314' width='30'/>","remark":"华茅酒是茅台的前身,属酱香型白酒","storeid":"606","defaultpurprice":"598800","isenabled":"1","brandplace":"贵州省仁怀市","isenabledshow":"是","logopicpath":"<img src='http://139.196.151.129:8081/upload/brand_logo1742019729171921.png?id=0.24637901992949351' width='30'/>","smallpath":"<img src='http://139.196.151.129:8081/upload/brand_small1742019729171912.png?id=0.6972781803581177' width='30'/>","brandname":"贵州茅台.华茅酒[得民精选]","logopath":"upload/brand_logo1742019729171921.png"}],"res.page":[{"RecordsCount":20,"hasNextPage":true,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12,"TotalPageCount":2}],"res.size":"20","returnview":"@json"}
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
  .app-icon {
    width: 46px;
    height: 46px;
  }
</style>
