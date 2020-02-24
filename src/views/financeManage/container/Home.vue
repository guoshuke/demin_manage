<template>
  <div>
    <div class="flex-row filter-box flex-wrap">
      <div>
        <span>酒品编号：</span>
        <el-input v-model="requestParams.brandId" clearable placeholder="请输入内容"></el-input>
      </div>
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
            :key="item.brandid"
            :label="item.brandname"
            :value="item.brandid">
          </el-option>
        </el-select>
      </div>
      <div>
        <el-button type="primary">查询</el-button>
        <el-button type="primary">赠送分享礼包</el-button>
      </div>
    </div>
    <el-table
      :data="jsonName.res"
      border
      style="width: 100%">
      <el-table-column
        prop="brandid"
        label="酒品编号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="brandname"
        label="酒品">
      </el-table-column>
      <el-table-column
        prop="degree"
        label="酒度数"
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
        prop="cn"
        label="零售价(元/500ml)"
        width="140">
        <template slot-scope="scope">
          <span>{{scope.row.retailprice/100}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="cn"
        label="批发价(元/15000ml)"
        width="150">
        <template slot-scope="scope">
          <span>{{scope.row.defaultpurprice/100}}</span>
        </template>
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
  name: 'home',
  components: {
    PageChange
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        brandId: '',
        brandName: '',
        morethan: '',
        lessthan: '',
        tasteModel: '',
        pageNum: 1,
        pageSize: 10
      },
      options: [{"retailprice":"38000","minstorecount":"0","tastemodel":"3","brandseries":"纯粮陈窖","degree":"52","bcount":"18413","brandnamekey":"10","brandid":"112","row":"1","cn":"浓香","buyquantity":"2007239","bigpicpath":"upload/brand_big112201972618118.png","storename":"五粮液","mobilepicpath":"../upload/brand_mobile112201532111812.png","smallpicpath":"upload/brand_small112201972618114.png","buycount":"7030","bigpath":"<img src='http://139.196.151.129:8081/upload/brand_big112201972618118.png?id=0.9994605940441702' width='30'/>","remark":"五粮液股份有限公司","brandnamenote":"五粮液股份","storeid":"229","defaultpurprice":"334800","isenabled":"1","brandplace":"四川省宜宾市","isenabledshow":"是","logopicpath":"<img src='http://139.196.151.129:8081/upload/brand_logo112201972618121.png?id=0.23575568365952315' width='30'/>","smallpath":"<img src='http://139.196.151.129:8081/upload/brand_small112201972618114.png?id=0.6439618591621258' width='30'/>","brandname":"五粮液股份[纯粮陈窖]52°","logopath":"upload/brand_logo112201972618121.png"},{"retailprice":"64000","minstorecount":"0","tastemodel":"2","brandseries":"纯粮醇品","degree":"53","bcount":"1520","brandnamekey":"10","brandid":"113","row":"2","cn":"酱香","buyquantity":"120432","bigpicpath":"upload/brand_big1132019726185524.png","storename":"五粮液","mobilepicpath":"","smallpicpath":"upload/brand_small1132019726185454.png","buycount":"404","bigpath":"<img src='http://139.196.151.129:8081/upload/brand_big1132019726185524.png?id=0.10979689130764425' width='30'/>","remark":"五粮液股份有限公司","brandnamenote":"五粮液股份","storeid":"229","defaultpurprice":"586800","isenabled":"1","brandplace":"四川省宜宾市","isenabledshow":"是","logopicpath":"<img src='http://139.196.151.129:8081/upload/brand_logo113201972618550.png?id=0.3749024382133658' width='30'/>","smallpath":"<img src='http://139.196.151.129:8081/upload/brand_small1132019726185454.png?id=0.5749013499381832' width='30'/>","brandname":"五粮液股份[纯粮醇品]53°","logopath":"upload/brand_logo113201972618550.png"},{"retailprice":"26000","minstorecount":"0","tastemodel":"3","brandseries":"永盛烧坊","degree":"52","bcount":"9245","brandnamekey":"2","brandid":"115","row":"3","cn":"浓香","buyquantity":"1146280","bigpicpath":"upload/brand_big115201972621113.png","storename":"泸州老窖","mobilepicpath":"","smallpicpath":"upload/brand_small1152019726211059.png","buycount":"6707","bigpath":"<img src='http://139.196.151.129:8081/upload/brand_big115201972621113.png?id=0.13972370179091298' width='30'/>","remark":"泸州老窖股份有限公司","brandnamenote":"泸州老窖","storeid":"230","defaultpurprice":"214800","isenabled":"1","brandplace":"四川省泸州市","isenabledshow":"是","logopicpath":"<img src='http://139.196.151.129:8081/upload/brand_logo1152019726211111.png?id=0.8747324475997866' width='30'/>","smallpath":"<img src='http://139.196.151.129:8081/upload/brand_small1152019726211059.png?id=0.5022525041821149' width='30'/>","brandname":"泸州老窖永盛烧坊[20]","logopath":"upload/brand_logo1152019726211111.png"},{"retailprice":"12000","minstorecount":"0","tastemodel":"3","brandseries":"永盛烧坊","degree":"52","bcount":"4714","brandnamekey":"2","brandid":"116","row":"4","cn":"浓香","buyquantity":"1715375","bigpicpath":"upload/brand_big1162019726185733.png","storename":"泸州老窖","mobilepicpath":"","smallpicpath":"upload/brand_small1162019726185724.png","buycount":"4776","bigpath":"<img src='http://139.196.151.129:8081/upload/brand_big1162019726185733.png?id=0.12373298197608362' width='30'/>","remark":"泸州老窖股份有限公司","brandnamenote":"泸州老窖","storeid":"230","defaultpurprice":"106800","isenabled":"1","brandplace":"四川省泸州市","isenabledshow":"是","logopicpath":"<img src='http://139.196.151.129:8081/upload/brand_logo1162019726185729.png?id=0.2656219672622395' width='30'/>","smallpath":"<img src='http://139.196.151.129:8081/upload/brand_small1162019726185724.png?id=0.18309299274235924' width='30'/>","brandname":"泸州老窖永盛烧坊[10]","logopath":"upload/brand_logo1162019726185729.png"},{"retailprice":"39000","minstorecount":"0","tastemodel":"3","brandseries":"永盛烧坊","degree":"52","bcount":"6451","brandnamekey":"2","brandid":"117","row":"5","cn":"浓香","buyquantity":"612548","bigpicpath":"upload/brand_big1172019726212259.png","storename":"泸州老窖","mobilepicpath":"","smallpicpath":"upload/brand_small1172019726212255.png","buycount":"1351","bigpath":"<img src='http://139.196.151.129:8081/upload/brand_big1172019726212259.png?id=0.7983880333700966' width='30'/>","remark":"泸州老窖股份有限公司","brandnamenote":"泸州老窖","storeid":"230","defaultpurprice":"346800","isenabled":"1","brandplace":"四川省泸州市","isenabledshow":"是","logopicpath":"<img src='http://139.196.151.129:8081/upload/brand_logo117201972621234.png?id=0.9136213494625254' width='30'/>","smallpath":"<img src='http://139.196.151.129:8081/upload/brand_small1172019726212255.png?id=0.10701124514475113' width='30'/>","brandname":"泸州老窖永盛烧坊[30]","logopath":"upload/brand_logo117201972621234.png"},{"retailprice":"18000","minstorecount":"0","tastemodel":"3","brandseries":"沱牌生态","degree":"50","bcount":"1822","brandnamekey":"3","brandid":"118","row":"6","cn":"浓香","buyquantity":"495451","bigpicpath":"upload/brand_big1182019729173417.png","storename":"沱牌舍得","mobilepicpath":"","smallpicpath":"upload/brand_small1182019729173413.png","buycount":"1366","bigpath":"<img src='http://139.196.151.129:8081/upload/brand_big1182019729173417.png?id=0.007329193971534975' width='30'/>","remark":"沱牌舍得供销有限公司","brandnamenote":"沱牌舍得","storeid":"231","defaultpurprice":"166800","isenabled":"1","brandplace":"四川省遂宁市","isenabledshow":"是","logopicpath":"<img src='http://139.196.151.129:8081/upload/brand_logo1182019729173421.png?id=0.36503473692566335' width='30'/>","smallpath":"<img src='http://139.196.151.129:8081/upload/brand_small1182019729173413.png?id=0.9337159779059394' width='30'/>","brandname":"沱牌生态[6年]","logopath":"upload/brand_logo1182019729173421.png"},{"retailprice":"31000","minstorecount":"0","tastemodel":"3","brandseries":"沱牌生态","degree":"50","bcount":"4391","brandnamekey":"3","brandid":"120","row":"7","cn":"浓香","buyquantity":"883326","bigpicpath":"upload/brand_big1202019729173316.png","storename":"沱牌舍得","mobilepicpath":"","smallpicpath":"upload/brand_small1202019729173312.png","buycount":"5471","bigpath":"<img src='http://139.196.151.129:8081/upload/brand_big1202019729173316.png?id=0.26840652785238805' width='30'/>","remark":"沱牌舍得供销有限公司","brandnamenote":"沱牌舍得","storeid":"231","defaultpurprice":"286800","isenabled":"1","brandplace":"四川省遂宁市","isenabledshow":"是","logopicpath":"<img src='http://139.196.151.129:8081/upload/brand_logo1202019729173321.png?id=0.19636706675600524' width='30'/>","smallpath":"<img src='http://139.196.151.129:8081/upload/brand_small1202019729173312.png?id=0.8457684664729298' width='30'/>","brandname":"沱牌生态[10年]浓香","logopath":"upload/brand_logo1202019729173321.png"},{"retailprice":"65000","minstorecount":"0","tastemodel":"2","brandseries":"沱牌生态","degree":"53","bcount":"674","brandnamekey":"3","brandid":"121","row":"8","cn":"酱香","buyquantity":"242990","bigpicpath":"upload/brand_big1212019729173047.png","storename":"沱牌舍得","mobilepicpath":"","smallpicpath":"upload/brand_small1212019729173042.png","buycount":"545","bigpath":"<img src='http://139.196.151.129:8081/upload/brand_big1212019729173047.png?id=0.671524176846159' width='30'/>","remark":"沱牌舍得供销有限公司","brandnamenote":"沱牌舍得","storeid":"231","defaultpurprice":"598800","isenabled":"1","brandplace":"四川省遂宁市","isenabledshow":"是","logopicpath":"<img src='http://139.196.151.129:8081/upload/brand_logo1212019729173052.png?id=0.9976293467566508' width='30'/>","smallpath":"<img src='http://139.196.151.129:8081/upload/brand_small1212019729173042.png?id=0.3182201948366161' width='30'/>","brandname":"沱牌生态[10年]酱香","logopath":"upload/brand_logo1212019729173052.png"},{"retailprice":"91000","minstorecount":"0","tastemodel":"2","brandseries":"沱牌生态","degree":"53","bcount":"657","brandnamekey":"3","brandid":"123","row":"9","cn":"酱香","buyquantity":"660640","bigpicpath":"upload/brand_big1232019729173144.png","storename":"沱牌舍得","mobilepicpath":"","smallpicpath":"upload/brand_small1232019729173140.png","buycount":"1014","bigpath":"<img src='http://139.196.151.129:8081/upload/brand_big1232019729173144.png?id=0.48843791438439355' width='30'/>","remark":"沱牌舍得供销有限公司","brandnamenote":"沱牌舍得","storeid":"231","defaultpurprice":"838800","isenabled":"1","brandplace":"四川省遂宁市","isenabledshow":"是","logopicpath":"<img src='http://139.196.151.129:8081/upload/brand_logo1232019729173148.png?id=0.3398875403632289' width='30'/>","smallpath":"<img src='http://139.196.151.129:8081/upload/brand_small1232019729173140.png?id=0.7544998011106844' width='30'/>","brandname":"沱牌生态[15年]","logopath":"upload/brand_logo1232019729173148.png"},{"retailprice":"18000","minstorecount":"0","tastemodel":"3","brandseries":"纯粮原浆","degree":"52","bcount":"5245","brandnamekey":"4","brandid":"124","row":"10","cn":"浓香","buyquantity":"423047","bigpicpath":"upload/brand_big1242019726193019.png","storename":"金窖醇","mobilepicpath":"","smallpicpath":"upload/brand_small124201972619308.png","buycount":"912","bigpath":"<img src='http://139.196.151.129:8081/upload/brand_big1242019726193019.png?id=0.607398903225781' width='30'/>","remark":"泸州金窖醇酒业有限公司","brandnamenote":"天香池","storeid":"233","defaultpurprice":"166800","isenabled":"1","brandplace":"四川省泸州市","isenabledshow":"是","logopicpath":"<img src='http://139.196.151.129:8081/upload/brand_logo1242019726193015.png?id=0.12903958174967045' width='30'/>","smallpath":"<img src='http://139.196.151.129:8081/upload/brand_small124201972619308.png?id=0.7588443922536962' width='30'/>","brandname":"天香池[10年]","logopath":"upload/brand_logo1242019726193015.png"},{"retailprice":"36500","minstorecount":"0","tastemodel":"3","brandseries":"纯粮原浆","degree":"52","bcount":"5077","brandnamekey":"4","brandid":"125","row":"11","cn":"浓香","buyquantity":"748641","bigpicpath":"upload/brand_big1252019729172513.png","storename":"金窖醇","mobilepicpath":"","smallpicpath":"upload/brand_small1252019729172510.png","buycount":"1638","bigpath":"<img src='http://139.196.151.129:8081/upload/brand_big1252019729172513.png?id=0.5547562405422903' width='30'/>","remark":"泸州金窖醇酒业有限公司","brandnamenote":"天香池","storeid":"233","defaultpurprice":"334800","isenabled":"1","brandplace":"四川省泸州市","isenabledshow":"是","logopicpath":"<img src='http://139.196.151.129:8081/upload/brand_logo1252019729172520.png?id=0.423097796213986' width='30'/>","smallpath":"<img src='http://139.196.151.129:8081/upload/brand_small1252019729172510.png?id=0.7042028588837355' width='30'/>","brandname":"天香池[15年]","logopath":"upload/brand_logo1252019729172520.png"},{"retailprice":"65000","minstorecount":"0","tastemodel":"2","brandseries":"茅台","degree":"53","bcount":"2824","brandnamekey":"13","brandid":"174","row":"12","cn":"酱香","buyquantity":"471572","bigpicpath":"upload/brand_big1742019729171916.png","storename":"茅台","mobilepicpath":"","smallpicpath":"upload/brand_small1742019729171912.png","buycount":"1650","bigpath":"<img src='http://139.196.151.129:8081/upload/brand_big1742019729171916.png?id=0.7381173227363161' width='30'/>","remark":"华茅酒是茅台的前身,属酱香型白酒","brandnamenote":"贵州茅台","storeid":"606","defaultpurprice":"598800","isenabled":"1","brandplace":"贵州省仁怀市","isenabledshow":"是","logopicpath":"<img src='http://139.196.151.129:8081/upload/brand_logo1742019729171921.png?id=0.14478165367760598' width='30'/>","smallpath":"<img src='http://139.196.151.129:8081/upload/brand_small1742019729171912.png?id=0.3996177596505539' width='30'/>","brandname":"贵州茅台.华茅酒[得民精选]","logopath":"upload/brand_logo1742019729171921.png"}],
      value: '',
      tableData: [],
      dialogVisible: false,
      jsonName: {"jvcpagename":"pub_brand","jvcoldpageName":"pub_brand","cmd":"query","returnvalue":"1","res.recordsperpage":"12","RecordsPerPage":"12","res":[{"retailprice":"38000","minstorecount":"0","tastemodel":"3","brandseries":"纯粮陈窖","degree":"52","brandnamekey":"10","brandid":"112","row":"1","cn":"浓香","buyquantity":"2007239","bigpicpath":"upload/brand_big112201972618118.png","storename":"","mobilepicpath":"../upload/brand_mobile112201532111812.png","smallpicpath":"upload/brand_small112201972618114.png","buycount":"7030","bigpath":"<img src='http://139.196.151.129:8081/upload/brand_big112201972618118.png?id=0.5244929086638168' width='30'/>","remark":"五粮液股份有限公司","storeid":"229","defaultpurprice":"334800","isenabled":"1","brandplace":"四川省宜宾市","isenabledshow":"是","logopicpath":"<img src='http://139.196.151.129:8081/upload/brand_logo112201972618121.png?id=0.8129469098474238' width='30'/>","smallpath":"<img src='http://139.196.151.129:8081/upload/brand_small112201972618114.png?id=0.6638942756927827' width='30'/>","brandname":"五粮液股份[纯粮陈窖]52°","logopath":"upload/brand_logo112201972618121.png"},{"retailprice":"64000","minstorecount":"0","tastemodel":"2","brandseries":"纯粮醇品","degree":"53","brandnamekey":"10","brandid":"113","row":"2","cn":"酱香","buyquantity":"120432","bigpicpath":"upload/brand_big1132019726185524.png","storename":"","mobilepicpath":"","smallpicpath":"upload/brand_small1132019726185454.png","buycount":"404","bigpath":"<img src='http://139.196.151.129:8081/upload/brand_big1132019726185524.png?id=0.608142731842737' width='30'/>","remark":"五粮液股份有限公司","storeid":"229","defaultpurprice":"586800","isenabled":"1","brandplace":"四川省宜宾市","isenabledshow":"是","logopicpath":"<img src='http://139.196.151.129:8081/upload/brand_logo113201972618550.png?id=0.7486438169543425' width='30'/>","smallpath":"<img src='http://139.196.151.129:8081/upload/brand_small1132019726185454.png?id=0.9814401743603406' width='30'/>","brandname":"五粮液股份[纯粮醇品]53°","logopath":"upload/brand_logo113201972618550.png"},{"retailprice":"26000","minstorecount":"0","tastemodel":"3","brandseries":"永盛烧坊","degree":"52","brandnamekey":"2","brandid":"115","row":"3","cn":"浓香","buyquantity":"1146280","bigpicpath":"upload/brand_big115201972621113.png","storename":"","mobilepicpath":"","smallpicpath":"upload/brand_small1152019726211059.png","buycount":"6707","bigpath":"<img src='http://139.196.151.129:8081/upload/brand_big115201972621113.png?id=0.34617751343671055' width='30'/>","remark":"泸州老窖股份有限公司","storeid":"230","defaultpurprice":"214800","isenabled":"1","brandplace":"四川省泸州市","isenabledshow":"是","logopicpath":"<img src='http://139.196.151.129:8081/upload/brand_logo1152019726211111.png?id=0.5820318895008086' width='30'/>","smallpath":"<img src='http://139.196.151.129:8081/upload/brand_small1152019726211059.png?id=0.5036750541903289' width='30'/>","brandname":"泸州老窖永盛烧坊[20]","logopath":"upload/brand_logo1152019726211111.png"},{"retailprice":"12000","minstorecount":"0","tastemodel":"3","brandseries":"永盛烧坊","degree":"52","brandnamekey":"2","brandid":"116","row":"4","cn":"浓香","buyquantity":"1715375","bigpicpath":"upload/brand_big1162019726185733.png","storename":"","mobilepicpath":"","smallpicpath":"upload/brand_small1162019726185724.png","buycount":"4776","bigpath":"<img src='http://139.196.151.129:8081/upload/brand_big1162019726185733.png?id=0.91784951439376' width='30'/>","remark":"泸州老窖股份有限公司","storeid":"230","defaultpurprice":"106800","isenabled":"1","brandplace":"四川省泸州市","isenabledshow":"是","logopicpath":"<img src='http://139.196.151.129:8081/upload/brand_logo1162019726185729.png?id=0.3027986526146721' width='30'/>","smallpath":"<img src='http://139.196.151.129:8081/upload/brand_small1162019726185724.png?id=0.9401136955645725' width='30'/>","brandname":"泸州老窖永盛烧坊[10]","logopath":"upload/brand_logo1162019726185729.png"},{"retailprice":"39000","minstorecount":"0","tastemodel":"3","brandseries":"永盛烧坊","degree":"52","brandnamekey":"2","brandid":"117","row":"5","cn":"浓香","buyquantity":"612548","bigpicpath":"upload/brand_big1172019726212259.png","storename":"","mobilepicpath":"","smallpicpath":"upload/brand_small1172019726212255.png","buycount":"1351","bigpath":"<img src='http://139.196.151.129:8081/upload/brand_big1172019726212259.png?id=0.5951541920597926' width='30'/>","remark":"泸州老窖股份有限公司","storeid":"230","defaultpurprice":"346800","isenabled":"1","brandplace":"四川省泸州市","isenabledshow":"是","logopicpath":"<img src='http://139.196.151.129:8081/upload/brand_logo117201972621234.png?id=0.3798362236183296' width='30'/>","smallpath":"<img src='http://139.196.151.129:8081/upload/brand_small1172019726212255.png?id=0.42571363831212783' width='30'/>","brandname":"泸州老窖永盛烧坊[30]","logopath":"upload/brand_logo117201972621234.png"},{"retailprice":"18000","minstorecount":"0","tastemodel":"3","brandseries":"沱牌生态","degree":"50","brandnamekey":"3","brandid":"118","row":"6","cn":"浓香","buyquantity":"495451","bigpicpath":"upload/brand_big1182019729173417.png","storename":"","mobilepicpath":"","smallpicpath":"upload/brand_small1182019729173413.png","buycount":"1366","bigpath":"<img src='http://139.196.151.129:8081/upload/brand_big1182019729173417.png?id=0.007115370792430076' width='30'/>","remark":"沱牌舍得供销有限公司","storeid":"231","defaultpurprice":"166800","isenabled":"1","brandplace":"四川省遂宁市","isenabledshow":"是","logopicpath":"<img src='http://139.196.151.129:8081/upload/brand_logo1182019729173421.png?id=0.17567090057476642' width='30'/>","smallpath":"<img src='http://139.196.151.129:8081/upload/brand_small1182019729173413.png?id=0.4569727006081611' width='30'/>","brandname":"沱牌生态[6年]","logopath":"upload/brand_logo1182019729173421.png"},{"retailprice":"31000","minstorecount":"0","tastemodel":"3","brandseries":"沱牌生态","degree":"50","brandnamekey":"3","brandid":"120","row":"7","cn":"浓香","buyquantity":"883326","bigpicpath":"upload/brand_big1202019729173316.png","storename":"","mobilepicpath":"","smallpicpath":"upload/brand_small1202019729173312.png","buycount":"5471","bigpath":"<img src='http://139.196.151.129:8081/upload/brand_big1202019729173316.png?id=0.8641027417317743' width='30'/>","remark":"沱牌舍得供销有限公司","storeid":"231","defaultpurprice":"286800","isenabled":"1","brandplace":"四川省遂宁市","isenabledshow":"是","logopicpath":"<img src='http://139.196.151.129:8081/upload/brand_logo1202019729173321.png?id=0.26150367356081095' width='30'/>","smallpath":"<img src='http://139.196.151.129:8081/upload/brand_small1202019729173312.png?id=0.010574250931401186' width='30'/>","brandname":"沱牌生态[10年]浓香","logopath":"upload/brand_logo1202019729173321.png"},{"retailprice":"65000","minstorecount":"0","tastemodel":"2","brandseries":"沱牌生态","degree":"53","brandnamekey":"3","brandid":"121","row":"8","cn":"酱香","buyquantity":"242990","bigpicpath":"upload/brand_big1212019729173047.png","storename":"","mobilepicpath":"","smallpicpath":"upload/brand_small1212019729173042.png","buycount":"545","bigpath":"<img src='http://139.196.151.129:8081/upload/brand_big1212019729173047.png?id=0.780377161903967' width='30'/>","remark":"沱牌舍得供销有限公司","storeid":"231","defaultpurprice":"598800","isenabled":"1","brandplace":"四川省遂宁市","isenabledshow":"是","logopicpath":"<img src='http://139.196.151.129:8081/upload/brand_logo1212019729173052.png?id=0.5012267602936613' width='30'/>","smallpath":"<img src='http://139.196.151.129:8081/upload/brand_small1212019729173042.png?id=0.06227626274057674' width='30'/>","brandname":"沱牌生态[10年]酱香","logopath":"upload/brand_logo1212019729173052.png"},{"retailprice":"91000","minstorecount":"0","tastemodel":"2","brandseries":"沱牌生态","degree":"53","brandnamekey":"3","brandid":"123","row":"9","cn":"酱香","buyquantity":"660640","bigpicpath":"upload/brand_big1232019729173144.png","storename":"","mobilepicpath":"","smallpicpath":"upload/brand_small1232019729173140.png","buycount":"1014","bigpath":"<img src='http://139.196.151.129:8081/upload/brand_big1232019729173144.png?id=0.6261558262655874' width='30'/>","remark":"沱牌舍得供销有限公司","storeid":"231","defaultpurprice":"838800","isenabled":"1","brandplace":"四川省遂宁市","isenabledshow":"是","logopicpath":"<img src='http://139.196.151.129:8081/upload/brand_logo1232019729173148.png?id=0.5767568434812747' width='30'/>","smallpath":"<img src='http://139.196.151.129:8081/upload/brand_small1232019729173140.png?id=0.9179100078639343' width='30'/>","brandname":"沱牌生态[15年]","logopath":"upload/brand_logo1232019729173148.png"},{"retailprice":"18000","minstorecount":"0","tastemodel":"3","brandseries":"纯粮原浆","degree":"52","brandnamekey":"4","brandid":"124","row":"10","cn":"浓香","buyquantity":"423047","bigpicpath":"upload/brand_big1242019726193019.png","storename":"","mobilepicpath":"","smallpicpath":"upload/brand_small124201972619308.png","buycount":"912","bigpath":"<img src='http://139.196.151.129:8081/upload/brand_big1242019726193019.png?id=0.5292048665113614' width='30'/>","remark":"泸州金窖醇酒业有限公司","storeid":"233","defaultpurprice":"166800","isenabled":"1","brandplace":"四川省泸州市","isenabledshow":"是","logopicpath":"<img src='http://139.196.151.129:8081/upload/brand_logo1242019726193015.png?id=0.2967122902154272' width='30'/>","smallpath":"<img src='http://139.196.151.129:8081/upload/brand_small124201972619308.png?id=0.04042727339837249' width='30'/>","brandname":"天香池[10年]","logopath":"upload/brand_logo1242019726193015.png"},{"retailprice":"36500","minstorecount":"0","tastemodel":"3","brandseries":"纯粮原浆","degree":"52","brandnamekey":"4","brandid":"125","row":"11","cn":"浓香","buyquantity":"748641","bigpicpath":"upload/brand_big1252019729172513.png","storename":"","mobilepicpath":"","smallpicpath":"upload/brand_small1252019729172510.png","buycount":"1638","bigpath":"<img src='http://139.196.151.129:8081/upload/brand_big1252019729172513.png?id=0.704745894924392' width='30'/>","remark":"泸州金窖醇酒业有限公司","storeid":"233","defaultpurprice":"334800","isenabled":"1","brandplace":"四川省泸州市","isenabledshow":"是","logopicpath":"<img src='http://139.196.151.129:8081/upload/brand_logo1252019729172520.png?id=0.8225441229806004' width='30'/>","smallpath":"<img src='http://139.196.151.129:8081/upload/brand_small1252019729172510.png?id=0.7961277473923101' width='30'/>","brandname":"天香池[15年]","logopath":"upload/brand_logo1252019729172520.png"},{"retailprice":"65000","minstorecount":"0","tastemodel":"2","brandseries":"茅台","degree":"53","brandnamekey":"13","brandid":"174","row":"12","cn":"酱香","buyquantity":"471572","bigpicpath":"upload/brand_big1742019729171916.png","storename":"","mobilepicpath":"","smallpicpath":"upload/brand_small1742019729171912.png","buycount":"1650","bigpath":"<img src='http://139.196.151.129:8081/upload/brand_big1742019729171916.png?id=0.7849727945125635' width='30'/>","remark":"华茅酒是茅台的前身,属酱香型白酒","storeid":"606","defaultpurprice":"598800","isenabled":"1","brandplace":"贵州省仁怀市","isenabledshow":"是","logopicpath":"<img src='http://139.196.151.129:8081/upload/brand_logo1742019729171921.png?id=0.10493284519143464' width='30'/>","smallpath":"<img src='http://139.196.151.129:8081/upload/brand_small1742019729171912.png?id=0.42539903701328097' width='30'/>","brandname":"贵州茅台.华茅酒[得民精选]","logopath":"upload/brand_logo1742019729171921.png"}],"res.page":[{"RecordsCount":20,"hasNextPage":true,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12,"TotalPageCount":2}],"res.size":"20","returnview":"@json"}
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
