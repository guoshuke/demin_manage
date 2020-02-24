<template>
  <div>
    <div class="flex-row filter-box flex-wrap">
      <div>
        <span>商品标题：</span>
        <el-input v-model="requestParams.goodsTitle" clearable placeholder="请输入内容"></el-input>
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
        <span>兑换所需：</span>
        <el-select v-model="requestParams.exchangeType" placeholder="请选择">
          <el-option
            v-for="item in exchangeTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
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
        <span>个人兑换限制：</span>
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
        <span>库存：</span>
        <el-select v-model="requestParams.inventory" placeholder="请选择">
          <el-option
            v-for="item in inventoryOptions"
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
        label="商品标题">
      </el-table-column>
      <el-table-column
        prop="goodscategoryname"
        label="商品分类"
        width="80">
      </el-table-column>
      <el-table-column
        prop="integralprice"
        label="兑换所需"
        width="160">
      </el-table-column>
      <el-table-column
        prop=""
        label="状态"
        width="80">
      </el-table-column>
      <el-table-column
        prop=""
        label="个人兑换限制"
        width="110">
      </el-table-column>
      <el-table-column
        prop=""
        label="过期时间"
        width="140">
      </el-table-column>
      <el-table-column
        prop="totalinventory"
        label="总数量"
        width="80">
      </el-table-column>
      <el-table-column
        label="剩余库存"
        width="100">
        <template slot-scope="scope">
          <span>{{scope.row.inventory}}</span>
          [增减]
        </template>
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
  name: 'ForGoodsList',
  components: {
    PageChange
  },
  data() {
    return {
      total: 1000,
      requestParams: {
        goodsTitle:'',
        goodsCategory: '',
        exchangeType: '',
        shelveStatus: '',
        restrictType: '',
        unShelveTime: '',
        inventory: '',
        pageNum: 1,
        pageSize: 10
      },
      goodsCategoryOptions: [{
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
      }],
      exchangeTypeOptions: [
        {
          value: '',
          label: '全部'
        }, {
          value: '1',
          label: '仅积分'
        }, {
          value: '2',
          label: '仅人民币'
        }, {
          value: '3',
          label: '积分+人民币'
        }
      ],
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
      inventoryOptions: [
        {
          value: '',
          label: '全部'
        }, {
          value: '1',
          label: '充足'
        }, {
          value: '-1',
          label: '缺货'
        }
      ],
      dialogVisible: false,
      jsonName:{"jvcpagename":"yjm_integral","jvcoldpageName":"yjm_integral","cmd":"queryIntegralGoods","returnvalue":"1","query.a-goodsGenera":"1","res.recordsperpage":"12","RecordsPerPage":"12","res":[{"globalrestrictdateend":"","globalrestrictnum":"0","goodsid":"11","shelvestatus":"1","restrictnum":"0","goodstitle":"【运费到付】速腾多功能蔬果洁净仪速腾果蔬解毒仪速腾蔬菜水果解毒仪洁净仪HLC9-D","consumeprice":"0","integralprice":"2100积分+0.00人民币","globalrestricttimeend":"","goodscategoryname":"实物","globalrestrictdatebegin":"","row":"1","consumeintegral":"2100","createtime":"2019-07-21 18:53:03","inventory":"200","bigpicture":"goodsPic/15/1/65c018d98a0e476da458bd3f26b7422e.jpg","globalrestricttimebegin":"","probability":"0","smallpicture":"goodsPic/2/2/af84d8bc74e248a7a0518fd541884f84.jpg","goodsdetail":"<img width=\"360\" height=\"3156\" align=\"left\" alt=\"\" src=\"http://39.97.97.73/resource/10/2282_%E9%80%9F%E8%85%BE%E6%9E%9C%E8%94%AC%E6%9C%BA.jpg\" />","goodsgenera":"1","goodscategory":"1","totalinventory":"200","parentgoodsid":"0","restrictcustomdays":"0","couponno":"","unshelvetime":"","carriagetemplateid":"1","marketprice":"898000","restricttype":"0","virtualnum":"0"},{"globalrestrictdateend":"","globalrestrictnum":"0","goodsid":"12","shelvestatus":"1","restrictnum":"0","goodstitle":"【运费到付】金镶玉吊坠 足金镶嵌和田玉金镶玉佛玉佩挂件男女款","consumeprice":"0","integralprice":"888积分+0.00人民币","globalrestricttimeend":"","goodscategoryname":"实物","globalrestrictdatebegin":"","row":"2","consumeintegral":"888","createtime":"2019-07-21 19:10:31","inventory":"200","bigpicture":"goodsPic/11/8/f75d1560229f4ffeb7c42e848b260081.jpg","globalrestricttimebegin":"","probability":"0","smallpicture":"goodsPic/12/0/e8ee489a12f645038f96c13139ce7607.jpg","goodsdetail":"<img width=\"360\" height=\"360\" align=\"left\" alt=\"\" src=\"http://39.97.97.73/resource/10/2875_1.jpg\" /><img width=\"360\" height=\"360\" alt=\"\" src=\"http://39.97.97.73/resource/10/2876_2.jpg\" /><img width=\"360\" height=\"360\" align=\"left\" alt=\"\" src=\"http://39.97.97.73/resource/10/2877_3.jpg\" /><img width=\"360\" height=\"360\" alt=\"\" src=\"http://39.97.97.73/resource/10/2878_4.jpg\" /><img width=\"360\" height=\"360\" alt=\"\" src=\"http://39.97.97.73/resource/10/2879_5.jpg\" /><img width=\"360\" height=\"360\" alt=\"\" src=\"http://39.97.97.73/resource/10/2880_6.jpg\" /><img width=\"360\" height=\"384\" align=\"left\" alt=\"\" src=\"http://39.97.97.73/resource/10/2883_TB2BYOrg.FWMKJjSZFvXXaenFXa_!!593519368.jpg\" />","goodsgenera":"1","goodscategory":"1","totalinventory":"200","parentgoodsid":"0","restrictcustomdays":"0","couponno":"","unshelvetime":"","carriagetemplateid":"1","marketprice":"207700","restricttype":"0","virtualnum":"0"},{"globalrestrictdateend":"","globalrestrictnum":"0","goodsid":"13","shelvestatus":"1","restrictnum":"0","goodstitle":"【运费到付】艾淳智能家用果蔬解毒机","consumeprice":"0","integralprice":"999积分+0.00人民币","globalrestricttimeend":"","goodscategoryname":"实物","globalrestrictdatebegin":"","row":"3","consumeintegral":"999","createtime":"2019-07-21 19:22:31","inventory":"200","bigpicture":"goodsPic/4/3/cbfc13a1e11143e09752c5be54f1accd.jpg","globalrestricttimebegin":"","probability":"0","smallpicture":"goodsPic/4/7/2dd19e2619c1457bb877a3cb175c283b.jpg","goodsdetail":"<img width=\"360\" height=\"7044\" alt=\"\" src=\"http://39.97.97.73/resource/10/8964_%E8%89%BE%E6%B7%B3%E6%9E%9C%E8%94%AC%E8%A7%A3%E6%AF%92%E6%9C%BA%E8%AF%A6%E5%9B%BE.jpg\" />","goodsgenera":"1","goodscategory":"1","totalinventory":"200","parentgoodsid":"0","restrictcustomdays":"0","couponno":"","unshelvetime":"","carriagetemplateid":"1","marketprice":"368000","restricttype":"0","virtualnum":"0"},{"globalrestrictdateend":"","globalrestrictnum":"0","goodsid":"14","shelvestatus":"1","restrictnum":"0","goodstitle":"【运费到付】韩帅F9负离子空气净化器","consumeprice":"0","integralprice":"1880积分+0.00人民币","globalrestricttimeend":"","goodscategoryname":"实物","globalrestrictdatebegin":"","row":"4","consumeintegral":"1880","createtime":"2019-07-21 19:26:44","inventory":"150","bigpicture":"goodsPic/12/8/b4a093fc596b404d94eac8bc92ca4da2.jpg","globalrestricttimebegin":"","probability":"0","smallpicture":"goodsPic/12/5/1a07ace993f241319139160e269646ff.jpg","goodsdetail":"<img width=\"360\" height=\"397\" alt=\"\" src=\"http://39.97.97.73/resource/10/1727_1.jpg\" /><img width=\"360\" alt=\"\" src=\"http://39.97.97.73/resource/10/1728_2.jpg\" /><img width=\"360\" alt=\"\" src=\"http://39.97.97.73/resource/10/1729_3.jpg\" /><img width=\"360\" alt=\"\" src=\"http://39.97.97.73/resource/10/1730_4.jpg\" /><img width=\"360\" alt=\"\" src=\"http://39.97.97.73/resource/10/1731_5.jpg\" /><img width=\"360\" alt=\"\" src=\"http://39.97.97.73/resource/10/1732_6.jpg\" /><img width=\"360\" alt=\"\" src=\"http://39.97.97.73/resource/10/1733_7.jpg\" /><img width=\"360\" alt=\"\" src=\"http://39.97.97.73/resource/10/1734_8.jpg\" /><img width=\"360\" alt=\"\" src=\"http://39.97.97.73/resource/10/1735_9.jpg\" /><img width=\"360\" alt=\"\" src=\"http://39.97.97.73/resource/10/1736_10.jpg\" /><img width=\"360\" alt=\"\" src=\"http://39.97.97.73/resource/10/1737_11.jpg\" /><img width=\"360\" alt=\"\" src=\"http://39.97.97.73/resource/10/1738_12.jpg\" /><img width=\"360\" height=\"377\" alt=\"\" src=\"http://39.97.97.73/resource/10/1739_13.jpg\" /><img width=\"360\" height=\"376\" alt=\"\" src=\"http://39.97.97.73/resource/10/1740_14.jpg\" />","goodsgenera":"1","goodscategory":"1","totalinventory":"150","parentgoodsid":"0","restrictcustomdays":"0","couponno":"","unshelvetime":"","carriagetemplateid":"1","marketprice":"499900","restricttype":"0","virtualnum":"0"},{"globalrestrictdateend":"","globalrestrictnum":"0","goodsid":"15","shelvestatus":"1","restrictnum":"0","goodstitle":"【运费到付】 韩帅F13空气净化器","consumeprice":"0","integralprice":"2888积分+0.00人民币","globalrestricttimeend":"","goodscategoryname":"实物","globalrestrictdatebegin":"","row":"5","consumeintegral":"2888","createtime":"2019-07-21 19:30:50","inventory":"200","bigpicture":"goodsPic/14/10/25fbc436b6d64a03b68b6d7e35b2c7e7.jpg","globalrestricttimebegin":"","probability":"0","smallpicture":"goodsPic/6/9/df5193197d6a4dad95a163305a0f57c1.jpg","goodsdetail":"<img width=\"360\" height=\"538\" alt=\"\" src=\"http://39.97.97.73/resource/10/1707_1.jpg\" /> \n<div style=\"color:#333333;font-family:&quot;font-size:14px;text-align:center;background-color:#FFFFFF;\">\n\t<img width=\"360\" height=\"538\" align=\"left\" alt=\"\" src=\"http://39.97.97.73/resource/10/1707_1.jpg\" /> \n</div>\n<div style=\"color:#333333;font-family:&quot;font-size:14px;text-align:center;background-color:#FFFFFF;\">\n\t<img width=\"360\" height=\"538\" alt=\"\" src=\"http://39.97.97.73/resource/10/1708_2.jpg\" /> \n</div>\n<div style=\"color:#333333;font-family:&quot;font-size:14px;text-align:center;background-color:#FFFFFF;\">\n\t<img width=\"360\" height=\"538\" alt=\"\" src=\"http://39.97.97.73/resource/10/1709_3.jpg\" /> \n</div>\n<div style=\"color:#333333;font-family:&quot;font-size:14px;text-align:center;background-color:#FFFFFF;\">\n\t<img width=\"360\" height=\"538\" alt=\"\" src=\"http://39.97.97.73/resource/10/1710_4.jpg\" /> \n</div>\n<div style=\"color:#333333;font-family:&quot;font-size:14px;text-align:center;background-color:#FFFFFF;\">\n\t<img width=\"360\" height=\"538\" alt=\"\" src=\"http://39.97.97.73/resource/10/1711_5.jpg\" /> \n</div>\n<div style=\"color:#333333;font-family:&quot;font-size:14px;text-align:center;background-color:#FFFFFF;\">\n\t<img width=\"360\" height=\"549\" alt=\"\" src=\"http://39.97.97.73/resource/10/1712_6.jpg\" /> \n</div>\n<div style=\"color:#333333;font-family:&quot;font-size:14px;text-align:center;background-color:#FFFFFF;\">\n\t<img width=\"360\" height=\"550\" alt=\"\" src=\"http://39.97.97.73/resource/10/1713_7.jpg\" /> \n</div>\n<div style=\"color:#333333;font-family:&quot;font-size:14px;text-align:center;background-color:#FFFFFF;\">\n\t<img width=\"360\" height=\"549\" alt=\"\" src=\"http://39.97.97.73/resource/10/1714_8.jpg\" /> \n</div>\n<div style=\"color:#333333;font-family:&quot;font-size:14px;text-align:center;background-color:#FFFFFF;\">\n\t<img width=\"360\" height=\"550\" alt=\"\" src=\"http://39.97.97.73/resource/10/1715_9.jpg\" /> \n</div>\n<div style=\"color:#333333;font-family:&quot;font-size:14px;text-align:center;background-color:#FFFFFF;\">\n\t<img width=\"360\" height=\"549\" alt=\"\" src=\"http://39.97.97.73/resource/10/1716_10.jpg\" /> \n</div>","goodsgenera":"1","goodscategory":"1","totalinventory":"200","parentgoodsid":"0","restrictcustomdays":"0","couponno":"","unshelvetime":"","carriagetemplateid":"1","marketprice":"559900","restricttype":"0","virtualnum":"0"},{"globalrestrictdateend":"","globalrestrictnum":"0","goodsid":"16","shelvestatus":"1","restrictnum":"0","goodstitle":"【运费到付】艾淳805款空气净化器AC-X6-07","consumeprice":"0","integralprice":"1880积分+0.00人民币","globalrestricttimeend":"","goodscategoryname":"实物","globalrestrictdatebegin":"","row":"6","consumeintegral":"1880","createtime":"2019-07-22 15:18:34","inventory":"500","bigpicture":"goodsPic/3/1/f7cf069ce71b4ffcb712d33cbdffb2be.jpg","globalrestricttimebegin":"","probability":"0","smallpicture":"goodsPic/1/14/15d035b7d54b4897952718c43d50cecb.jpg","goodsdetail":"<img width=\"360\" height=\"6377\" alt=\"\" src=\"http://39.97.97.73/resource/10/15936_%E8%89%BE%E6%B7%B3AC-X6-07%E7%A9%BA%E5%87%80%E8%AF%A6%E6%83%85%E9%A1%B5.jpg\" />","goodsgenera":"1","goodscategory":"1","totalinventory":"500","parentgoodsid":"0","restrictcustomdays":"0","couponno":"","unshelvetime":"","carriagetemplateid":"1","marketprice":"428000","restricttype":"0","virtualnum":"0"},{"globalrestrictdateend":"","globalrestrictnum":"0","goodsid":"17","shelvestatus":"1","restrictnum":"0","goodstitle":"【运费到付】金镶玉吊坠 足金镶嵌和田玉金镶玉观音玉佩挂件男女款","consumeprice":"0","integralprice":"888积分+0.00人民币","globalrestricttimeend":"","goodscategoryname":"实物","globalrestrictdatebegin":"","row":"7","consumeintegral":"888","createtime":"2019-07-22 15:23:49","inventory":"200","bigpicture":"goodsPic/4/0/24a7b1e3ce394a44b3647ba9bf643a49.jpg","globalrestricttimebegin":"","probability":"0","smallpicture":"goodsPic/9/7/f6b124b995944eebaf2579736fab441c.jpg","goodsdetail":"<div style=\"color:#333333;font-family:&quot;font-size:14px;text-align:center;background-color:#FFFFFF;\">\n\t<img width=\"360\" height=\"360\" alt=\"\" src=\"http://39.97.97.73/resource/10/2889_1.jpg\" /> \n</div>\n<div style=\"color:#333333;font-family:&quot;font-size:14px;text-align:center;background-color:#FFFFFF;\">\n\t<img width=\"360\" height=\"360\" alt=\"\" src=\"http://39.97.97.73/resource/10/2890_2.jpg\" /> \n</div>\n<div style=\"color:#333333;font-family:&quot;font-size:14px;text-align:center;background-color:#FFFFFF;\">\n\t<img width=\"360\" height=\"360\" alt=\"\" src=\"http://39.97.97.73/resource/10/2891_3.jpg\" /> \n</div>\n<div style=\"color:#333333;font-family:&quot;font-size:14px;text-align:center;background-color:#FFFFFF;\">\n\t<img width=\"360\" height=\"360\" alt=\"\" src=\"http://39.97.97.73/resource/10/2892_4.jpg\" /> \n</div>\n<div style=\"color:#333333;font-family:&quot;font-size:14px;text-align:center;background-color:#FFFFFF;\">\n\t<img width=\"360\" height=\"360\" alt=\"\" src=\"http://39.97.97.73/resource/10/2893_5.jpg\" /> \n</div>\n<div style=\"color:#333333;font-family:&quot;font-size:14px;text-align:center;background-color:#FFFFFF;\">\n\t<img width=\"360\" height=\"360\" alt=\"\" src=\"http://39.97.97.73/resource/10/2894_6.jpg\" /> \n</div>\n<div style=\"color:#333333;font-family:&quot;font-size:14px;text-align:center;background-color:#FFFFFF;\">\n\t<img width=\"360\" height=\"360\" alt=\"\" src=\"http://39.97.97.73/resource/10/2895_7.jpg\" /> \n</div>\n<div style=\"color:#333333;font-family:&quot;font-size:14px;text-align:center;background-color:#FFFFFF;\">\n\t<img width=\"360\" height=\"360\" alt=\"\" src=\"http://39.97.97.73/resource/10/2896_8.jpg\" /> \n</div>\n<div style=\"color:#333333;font-family:&quot;font-size:14px;text-align:center;background-color:#FFFFFF;\">\n\t<img width=\"360\" height=\"384\" alt=\"\" src=\"http://39.97.97.73/resource/10/2897_TB2BYOrg.FWMKJjSZFvXXaenFXa_!!593519368.jpg\" /> \n</div>","goodsgenera":"1","goodscategory":"1","totalinventory":"200","parentgoodsid":"0","restrictcustomdays":"0","couponno":"","unshelvetime":"","carriagetemplateid":"1","marketprice":"150000","restricttype":"0","virtualnum":"0"},{"globalrestrictdateend":"","globalrestrictnum":"0","goodsid":"18","shelvestatus":"1","restrictnum":"0","goodstitle":"【运费到付】速腾空气净化器K7","consumeprice":"0","integralprice":"1999积分+0.00人民币","globalrestricttimeend":"","goodscategoryname":"实物","globalrestrictdatebegin":"","row":"8","consumeintegral":"1999","createtime":"2019-07-22 15:28:04","inventory":"200","bigpicture":"goodsPic/9/1/ca578f8468904d619983f54b17f32c62.jpg","globalrestricttimebegin":"","probability":"0","smallpicture":"goodsPic/6/5/97050a5df1fe4b49b7697cd65431984e.jpg","goodsdetail":"<img width=\"360\" height=\"5557\" alt=\"\" src=\"http://39.97.97.73/resource/10/6750_611808811178322389.jpg\" />","goodsgenera":"1","goodscategory":"1","totalinventory":"200","parentgoodsid":"0","restrictcustomdays":"0","couponno":"","unshelvetime":"","carriagetemplateid":"1","marketprice":"428000","restricttype":"0","virtualnum":"0"},{"globalrestrictdateend":"","globalrestrictnum":"0","goodsid":"20","shelvestatus":"1","restrictnum":"0","goodstitle":"【运费到付】勒德威智能代步平衡车 led跑马灯儿童成人两轮便携电动车R9 plus","consumeprice":"0","integralprice":"9990积分+0.00人民币","globalrestricttimeend":"","goodscategoryname":"实物","globalrestrictdatebegin":"","row":"9","consumeintegral":"9990","createtime":"2019-07-22 15:35:58","inventory":"200","bigpicture":"goodsPic/0/2/fbe5a733e33b49a7be4040cd1548543c.jpg","globalrestricttimebegin":"","probability":"0","smallpicture":"goodsPic/13/8/14cbd13636774c67a2f1b45680eab499.jpg","goodsdetail":"<div style=\"color:#333333;font-family:&quot;font-size:14px;text-align:center;background-color:#FFFFFF;\">\n\t<img width=\"360\" height=\"449\" alt=\"\" src=\"http://39.97.97.73/resource/10/16211_%E5%B9%B3%E8%A1%A1%E8%BD%A6_01.jpg\" /> \n</div>\n<div style=\"color:#333333;font-family:&quot;font-size:14px;text-align:center;background-color:#FFFFFF;\">\n\t<img width=\"360\" height=\"300\" alt=\"\" src=\"http://39.97.97.73/resource/10/16212_%E5%B9%B3%E8%A1%A1%E8%BD%A6_02.jpg\" /> \n</div>\n<div style=\"color:#333333;font-family:&quot;font-size:14px;text-align:center;background-color:#FFFFFF;\">\n\t<img width=\"360\" height=\"286\" alt=\"\" src=\"http://39.97.97.73/resource/10/16213_%E5%B9%B3%E8%A1%A1%E8%BD%A6_03.jpg\" /> \n</div>\n<div style=\"color:#333333;font-family:&quot;font-size:14px;text-align:center;background-color:#FFFFFF;\">\n\t<img width=\"360\" height=\"486\" alt=\"\" src=\"http://39.97.97.73/resource/10/16214_%E5%B9%B3%E8%A1%A1%E8%BD%A6_04.jpg\" /> \n</div>\n<div style=\"color:#333333;font-family:&quot;font-size:14px;text-align:center;background-color:#FFFFFF;\">\n\t<img width=\"360\" height=\"412\" alt=\"\" src=\"http://39.97.97.73/resource/10/16215_%E5%B9%B3%E8%A1%A1%E8%BD%A6_05.jpg\" /> \n</div>\n<div style=\"color:#333333;font-family:&quot;font-size:14px;text-align:center;background-color:#FFFFFF;\">\n\t<img width=\"360\" height=\"437\" alt=\"\" src=\"http://39.97.97.73/resource/10/16216_%E5%B9%B3%E8%A1%A1%E8%BD%A6_06.jpg\" /> \n</div>\n<div style=\"color:#333333;font-family:&quot;font-size:14px;text-align:center;background-color:#FFFFFF;\">\n\t<img width=\"360\" height=\"413\" alt=\"\" src=\"http://39.97.97.73/resource/10/16217_%E5%B9%B3%E8%A1%A1%E8%BD%A6_07.jpg\" /> \n</div>\n<div style=\"color:#333333;font-family:&quot;font-size:14px;text-align:center;background-color:#FFFFFF;\">\n\t<img width=\"360\" height=\"436\" alt=\"\" src=\"http://39.97.97.73/resource/10/16218_%E5%B9%B3%E8%A1%A1%E8%BD%A6_08.jpg\" /> \n</div>\n<div style=\"color:#333333;font-family:&quot;font-size:14px;text-align:center;background-color:#FFFFFF;\">\n\t<img width=\"360\" height=\"444\" alt=\"\" src=\"http://39.97.97.73/resource/10/16219_%E5%B9%B3%E8%A1%A1%E8%BD%A6_09.jpg\" /> \n</div>\n<div style=\"color:#333333;font-family:&quot;font-size:14px;text-align:center;background-color:#FFFFFF;\">\n\t<img width=\"360\" height=\"379\" alt=\"\" src=\"http://39.97.97.73/resource/10/16220_%E5%B9%B3%E8%A1%A1%E8%BD%A6_10.jpg\" /> \n</div>\n<div style=\"color:#333333;font-family:&quot;font-size:14px;text-align:center;background-color:#FFFFFF;\">\n\t<img width=\"360\" height=\"387\" alt=\"\" src=\"http://39.97.97.73/resource/10/16221_%E5%B9%B3%E8%A1%A1%E8%BD%A6_11.jpg\" /> \n</div>\n<div style=\"color:#333333;font-family:&quot;font-size:14px;text-align:center;background-color:#FFFFFF;\">\n\t<img width=\"360\" height=\"446\" alt=\"\" src=\"http://39.97.97.73/resource/10/16222_%E5%B9%B3%E8%A1%A1%E8%BD%A6_12.jpg\" /> \n</div>\n<div style=\"color:#333333;font-family:&quot;font-size:14px;text-align:center;background-color:#FFFFFF;\">\n\t<img width=\"360\" height=\"451\" alt=\"\" src=\"http://39.97.97.73/resource/10/16223_%E5%B9%B3%E8%A1%A1%E8%BD%A6_13.jpg\" /> \n</div>\n<div style=\"color:#333333;font-family:&quot;font-size:14px;text-align:center;background-color:#FFFFFF;\">\n\t<img width=\"360\" height=\"349\" alt=\"\" src=\"http://39.97.97.73/resource/10/16224_%E5%B9%B3%E8%A1%A1%E8%BD%A6_14.jpg\" /> \n</div>\n<div style=\"color:#333333;font-family:&quot;font-size:14px;text-align:center;background-color:#FFFFFF;\">\n\t<img width=\"360\" height=\"222\" alt=\"\" src=\"http://39.97.97.73/resource/10/16225_%E5%B9%B3%E8%A1%A1%E8%BD%A6_15.jpg\" /> \n</div>\n<div style=\"color:#333333;font-family:&quot;font-size:14px;text-align:center;background-color:#FFFFFF;\">\n\t<img width=\"360\" height=\"651\" alt=\"\" src=\"http://39.97.97.73/resource/10/16226_%E5%B9%B3%E8%A1%A1%E8%BD%A6_16.jpg\" /> \n</div>","goodsgenera":"1","goodscategory":"1","totalinventory":"200","parentgoodsid":"0","restrictcustomdays":"0","couponno":"","unshelvetime":"","carriagetemplateid":"1","marketprice":"1680000","restricttype":"0","virtualnum":"0"},{"globalrestrictdateend":"","globalrestrictnum":"0","goodsid":"21","shelvestatus":"1","restrictnum":"0","goodstitle":"【运费到付】艾淳空净宝净化器AC-KJ-04","consumeprice":"0","integralprice":"1888积分+0.00人民币","globalrestricttimeend":"","goodscategoryname":"实物","globalrestrictdatebegin":"","row":"10","consumeintegral":"1888","createtime":"2019-07-22 15:37:58","inventory":"200","bigpicture":"goodsPic/14/14/973703543026427aac5b5de296e61cad.jpg","globalrestricttimebegin":"","probability":"0","smallpicture":"goodsPic/8/8/9cc6559b882d4a6aa72dcca07fd66a35.jpg","goodsdetail":"<img width=\"360\" height=\"5918\" alt=\"\" src=\"http://39.97.97.73/resource/10/15933_%E8%89%BE%E6%B7%B3AC-KJ-04%E7%A9%BA%E5%87%80%E8%AF%A6%E6%83%85%E9%A1%B5.jpg\" />","goodsgenera":"1","goodscategory":"1","totalinventory":"200","parentgoodsid":"0","restrictcustomdays":"0","couponno":"","unshelvetime":"","carriagetemplateid":"1","marketprice":"368000","restricttype":"0","virtualnum":"0"},{"globalrestrictdateend":"","globalrestrictnum":"0","goodsid":"23","shelvestatus":"1","restrictnum":"0","goodstitle":"【运费到付】艾淳五级超滤净水器","consumeprice":"0","integralprice":"1600积分+0.00人民币","globalrestricttimeend":"","goodscategoryname":"实物","globalrestrictdatebegin":"","row":"11","consumeintegral":"1600","createtime":"2019-07-22 15:44:30","inventory":"200","bigpicture":"goodsPic/0/15/edef3cb7d4234cd88e5a93f82e58801b.jpg","globalrestricttimebegin":"","probability":"0","smallpicture":"goodsPic/14/0/6adbf1ce45cf462cbe8b4c577010fafc.jpg","goodsdetail":"<u><img width=\"360\" height=\"2098\" alt=\"\" src=\"http://39.97.97.73/resource/10/14075_%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20190225153312.png\" /></u>","goodsgenera":"1","goodscategory":"1","totalinventory":"200","parentgoodsid":"0","restrictcustomdays":"0","couponno":"","unshelvetime":"","carriagetemplateid":"1","marketprice":"288000","restricttype":"0","virtualnum":"0"},{"globalrestrictdateend":"","globalrestrictnum":"0","goodsid":"24","shelvestatus":"1","restrictnum":"0","goodstitle":"【运费到付】康佳（KONKA）枫叶仙林空气净化器KGJH-11E","consumeprice":"0","integralprice":"3200积分+0.00人民币","globalrestricttimeend":"","goodscategoryname":"实物","globalrestrictdatebegin":"","row":"12","consumeintegral":"3200","createtime":"2019-07-23 09:58:41","inventory":"200","bigpicture":"goodsPic/2/8/dc3d3018d32b499ba586d376b332ecff.jpg","globalrestricttimebegin":"","probability":"0","smallpicture":"goodsPic/10/5/fd76ac9772f74e6bab3d50d013dcc3b9.jpg","goodsdetail":"<img width=\"360\" height=\"4620\" alt=\"\" src=\"http://39.97.97.73/resource/10/4416_KGJH-11E-%E6%9E%AB%E5%8F%B6%E4%BB%99%E6%9E%97-%E7%A9%BA%E6%B0%94%E5%87%80%E5%8C%96%E5%99%A8-%E6%8F%8F%E8%BF%B0-750.jpg\" />","goodsgenera":"1","goodscategory":"1","totalinventory":"200","parentgoodsid":"0","restrictcustomdays":"0","couponno":"","unshelvetime":"","carriagetemplateid":"1","marketprice":"468000","restricttype":"0","virtualnum":"0"}],"res.page":[{"RecordsCount":210,"hasNextPage":true,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12,"TotalPageCount":18}],"res.size":"210","returnview":""}
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
