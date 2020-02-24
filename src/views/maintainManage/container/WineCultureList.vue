<template>
  <div>
    <div class="flex-row filter-box flex-wrap">
      <div>
        <el-button type="primary">添加</el-button>
      </div>
    </div>
    <el-table
      :data="jsonName.res"
      border
      style="width: 100%">
      <el-table-column
        prop="storename"
        label="酒厂">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题">
      </el-table-column>
      <el-table-column
        prop="ordernum"
        label="显示顺序"
        width="100">
      </el-table-column>
      <el-table-column
        width="90"
        label="封面图片">
        <template slot-scope="scope">
          <img src="" alt="" class="app-icon">
        </template>
      </el-table-column>
      <el-table-column
        prop="typename"
        label="类型"
        width="100">
      </el-table-column>
      <el-table-column
        prop="createtime"
        label="创建日期"
        width="160">
      </el-table-column>
      <el-table-column
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
  name: 'WineCultureList',
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
      cardStatusOptions: [{
        value: '',
        label: '全部'
      }, {
        value: '1',
        label: '未激活'
      }, {
        value: '2',
        label: '已激活'
      }, {
        value: '3',
        label: '已充值'
      }, {
        value: '4',
        label: '作废'
      }, {
        value: '5',
        label: '已过期'
      }],
      dialogVisible: false,
      jsonName: {"jvcpagename":"pub_wineculture","jvcoldpageName":"pub_wineculture","cmd":"query","returnvalue":"1","res.recordsperpage":"12","RecordsPerPage":"12","res":[{"storename":"五粮液","typename":"品牌文化","winecultureid":"3","createtime":"2015-10-22 16:46:17","ordernum":"1","content":"<p style=\"text-align:justify;\">\n\t<span style=\"line-height:1.5;\">&nbsp; &nbsp; &nbsp;&nbsp;</span><span style=\"line-height:1;font-size:14px;\">明朝初期，四川宜宾一位姓陈的老板，创“温德羊”酒坊，潜心研究，探索出杂粮酒的配方，嫡传六代。到了清代，因陈家无子，最后一代将秘方传给徒弟赵铭盛，赵铭盛去世前又将“秘方”传给徒弟邓子均。</span> \n</p>\n<div style=\"text-align:justify;\">\n\t<br />\n</div>\n<p style=\"text-align:justify;\">\n\t<span style=\"line-height:1;font-size:14px;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1909年，宜宾县团练局局长雷东桓做东，宴请宜宾名流士绅，杨惠泉作为当地知名举人自然也名列其中。在这次聚会上“利川永”老板邓子均携带来了那罐倾注了他10多年心血的“杂粮酒”。</span> \n</p>\n<p style=\"text-align:justify;\">\n\t<span style=\"line-height:1;\"><br />\n</span> \n</p>\n<p style=\"text-align:justify;\">\n\t<span style=\"line-height:1;\"><span style=\"font-size:14px;\">&nbsp; &nbsp; &nbsp;&nbsp;</span><span style=\"font-size:14px;\">席间，“杂粮酒”一开，顿时，满屋喷香，令人陶醉。众人不约一阵美誉，这时惟独杨惠泉沉默不语，他一边品酒，一边似在暗自思度。</span></span> \n</p>\n<p style=\"text-align:justify;\">\n\t<span style=\"line-height:1;\"><br />\n</span> \n</p>\n<p align=\"justify\">\n\t<span style=\"line-height:1;font-size:14px;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style=\"line-height:1;font-size:14px;\">忽然他抬头问邓子均说：“这酒叫什么名字？”</span><span style=\"line-height:1;font-size:14px;\">&nbsp;</span><span style=\"line-height:1;font-size:14px;\">“老百姓称之为‘杂粮酒’，以前文人雅士称之为‘姚子雪曲’。”邓子均用不解的目光望向杨惠泉，不知他为何如此发问。</span> \n</p>\n<p align=\"justify\">\n\t<span style=\"line-height:1;\"><br />\n</span> \n</p>\n<p align=\"justify\">\n\t<span style=\"line-height:1;font-size:14px;\">&nbsp; &nbsp; &nbsp;“为何取名‘杂粮酒’？”杨惠泉又问。</span><span style=\"line-height:1;font-size:14px;\">“因为它是由大米、糯米、小麦、玉米、高粱五种粮食之精华酿造的。”邓子均说。 “如此佳酿，名为‘姚子雪曲’似嫌曲高和寡，称‘杂粮酒’，实属不雅。</span> \n</p>\n<p align=\"justify\">\n\t<span style=\"line-height:1;\"><br />\n</span> \n</p>\n<p align=\"justify\">\n\t<span style=\"line-height:1;font-size:14px;\">&nbsp; &nbsp; &nbsp; 此酒既然集五粮之精华而成玉液，何不更名为五粮液？”杨惠泉胸有成竹地说。邓子均茅塞顿开，大喜。 “好，这个名字取得好。”众人纷纷拍案叫绝。</span> \n</p>\n<div align=\"justify\">\n\t<br />\n</div>\n<p align=\"justify\">\n\t<span style=\"line-height:1;font-size:14px;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 自此，一个美名——“五粮液”诞生了。经过百年的洗礼，五粮液这块金字招牌历久弥新。</span> \n</p>\n<p align=\"justify\">\n\t<br />\n</p>","type":"1","pic3path":"","popularitycount":"737","storeid":"229","title":"名字的由来","pic2path":"","pic1path":"","row":"1","brandid":""},{"storename":"五粮液","typename":"酒段子","winecultureid":"12","createtime":"2015-10-22 16:47:17","ordernum":"1","content":"<p align=\"center\">\n\t<span style=\"line-height:1;font-size:14px;\">领导干部不喝酒，一个朋友也没有。</span> \n</p>\n<p align=\"center\">\n\t<span style=\"line-height:1;font-size:14px;\">中层干部不喝酒，一点信息也没有。</span> \n</p>\n<p align=\"center\">\n\t<span style=\"line-height:1;font-size:14px;\">基层干部不喝酒，一点希望也没有。</span> \n</p>\n<p align=\"center\">\n\t<span style=\"line-height:1;font-size:14px;\">纪检干部不喝酒，一点线索也没有。</span> \n</p>\n<p align=\"center\">\n\t<span style=\"line-height:1;font-size:14px;\">平民百姓不喝酒，一点快乐也没有。</span> \n</p>\n<p align=\"center\">\n\t<span style=\"line-height:1;font-size:14px;\">兄弟之间不喝酒，一点感情也没有。</span> \n</p>\n<p align=\"center\">\n\t<span style=\"line-height:1;font-size:14px;\">男女之间不喝酒，一点机会都没有。</span> \n</p>\n<p align=\"center\">\n\t<br />\n<span style=\"line-height:1;\"></span> \n</p>\n<p align=\"center\">\n\t<span style=\"line-height:1;\"><br />\n</span> \n</p>","type":"2","pic3path":"","popularitycount":"421","storeid":"229","title":"不喝酒，一无所有","pic2path":"","pic1path":"","row":"2","brandid":""},{"storename":"泸州老窖","typename":"品牌文化","winecultureid":"15","createtime":"2015-10-22 16:50:03","ordernum":"1","content":"<p style=\"text-align:justify;\">\n\t<span style=\"line-height:1.5;\">&nbsp;<span style=\"font-size:14px;\">&nbsp; 清朝末期以前，泸州被称为酒城，大小小的酒作坊不胜其数，后因战乱中断了一段时间，但那时还没有泸州老窖一说。</span></span>\n</p>\n<div style=\"text-align:justify;\">\n\t<br />\n</div>\n<div style=\"text-align:justify;\">\n\t<span style=\"font-size:14px;\">&nbsp; &nbsp; 民国初期，1949年12月3日，泸州解放恢复和发展泸州曲酒生产。</span>\n</div>\n<div style=\"text-align:justify;\">\n\t<br />\n</div>\n<p style=\"text-align:justify;\">\n\t<span style=\"font-size:14px;\">&nbsp; &nbsp; 1950年初，在政府的扶持下，泸州酿酒实业家李华伯 先生，以其“春和荣”作坊为首，牵头组建了“泸州曲酒 联营工业酿造社”， 迈出了恢复发展泸酒生产的第一步。</span>\n</p>\n<p style=\"text-align:justify;\">\n\t<br />\n</p>\n<p style=\"text-align:justify;\">\n\t<span style=\"font-size:14px;\">&nbsp; &nbsp;年底，温氏兄弟分别经营的几家 “温永盛”酒坊，又联 合成立了“温永盛曲酒联营社”（所以有说，泸州老窖永盛烧坊是泸州老窖集团的前身）。</span>\n</p>\n<div style=\"text-align:justify;\">\n\t<br />\n</div>\n<div style=\"text-align:justify;\">\n\t<span style=\"font-size:14px;\">&nbsp; &nbsp; 1951年，“定记”、“温永盛”、“曲联”、“义中”和川南人民行政公署五家私营酒社整合了36家私营曲酒作坊，成立了“川南区专卖事业公司国营第一曲酒厂”</span>\n</div>\n<div style=\"text-align:justify;\">\n\t<br />\n</div>\n<div style=\"text-align:justify;\">\n\t<span style=\"font-size:14px;\">&nbsp; &nbsp; 1953—1964年泸州市把私营去酒厂与国营曲酒厂多次合并，最后在1964年更名为“四川省泸州曲酒厂”</span>\n</div>\n<div style=\"text-align:justify;\">\n\t<br />\n</div>\n<div style=\"text-align:justify;\">\n\t<span style=\"font-size:14px;\">&nbsp; &nbsp; 1990年8月28日，经过泸州市人民政府批准，更名为“泸州老窖酒厂”。</span>\n</div>\n<div style=\"text-align:justify;\">\n\t<br />\n</div>\n<div style=\"text-align:justify;\">\n\t<span style=\"font-size:14px;\">&nbsp; &nbsp; 2000年12月21日，正式成立泸州老窖集团有限责任公司。</span>\n</div>\n<p style=\"text-align:justify;\">\n\t<br />\n</p>\n<p style=\"text-align:justify;\">\n\t<br />\n</p>\n<p style=\"text-align:justify;\">\n\t<br />\n</p>\n<p style=\"text-align:justify;\">\n\t<br />\n</p>","type":"1","pic3path":"","popularitycount":"183","storeid":"230","title":"名字的由来","pic2path":"","pic1path":"","row":"3","brandid":""},{"storename":"金沙窖酒","typename":"品牌文化","winecultureid":"22","createtime":"2015-10-22 16:50:41","ordernum":"1","content":"<p align=\"justify\">\n\t<span style=\"font-size:14px;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 清代光绪年间，金沙所产白酒就有“村酒留宾不用赊”的赞美诗句，因而大有名气。</span>\n</p>\n<p align=\"justify\">\n\t<br />\n</p>\n<p align=\"justify\">\n\t<span style=\"font-size:14px;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 30年代茅台酒技师刘开庭传入茅台酒工艺。“金沙回沙酒”、“金沙窖酒”以“香醇味浓，馥郁堪夸”而声誉大振。</span>\n</p>\n<p align=\"justify\">\n\t<br />\n</p>\n<p align=\"justify\">\n\t<span style=\"font-size:14px;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1988年，国家工商总局作出产品商标必须与产地相同的规定。虽然当时金沙窖酒已被评为“贵州名酒”的称号，但根据这个规定，金沙窖酒必须更名为“金沙”牌。</span>\n</p>\n<p align=\"justify\">\n\t<br />\n</p>\n<p align=\"justify\">\n\t<br />\n</p>","type":"1","pic3path":"","popularitycount":"116","storeid":"881","title":"名字的由来","pic2path":"","pic1path":"","row":"4","brandid":""},{"storename":"茅台","typename":"品牌文化","winecultureid":"30","createtime":"2015-10-22 16:51:02","ordernum":"1","content":"<p align=\"justify\">\n\t<span style=\"line-height:1;font-size:12px;\"><span style=\"font-size:14px;\"></span><span style=\"font-size:14px;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 茅台酒因产自茅台镇而得名；</span></span><span style=\"line-height:1;font-size:12px;\"><br />\n</span> \n</p>\n<p align=\"justify\">\n\t<span style=\"line-height:1;font-size:12px;\"><br />\n</span> \n</p>\n<p align=\"justify\">\n\t<span style=\"line-height:1;font-size:14px;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 公司的前身是成立于1951年的贵州茅台酒厂；</span> \n</p>\n<div align=\"justify\">\n\t<br />\n<span style=\"line-height:1;font-size:14px;\"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1997年，成功改制为中国贵州茅台酒厂有限责任公司；</span><br />\n<br />\n<span style=\"line-height:1;font-size:14px;\"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1999年，由中国贵州茅台酒厂有限责任公司联合中国食品发酵研究所等八家单位发起成立了贵州茅台酒股份有限公司；</span><br />\n<br />\n</div>\n<p align=\"justify\">\n\t<span style=\"line-height:1;font-size:14px;\"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2011年12月，公司更名为中国贵州茅台酒厂（集团）有限责任公司。</span> \n</p>\n<p align=\"justify\">\n\t<br />\n<span style=\"line-height:1;font-size:12px;\"></span> \n</p>\n<div align=\"justify\">\n\t<br />\n</div>","type":"1","pic3path":"","popularitycount":"221","storeid":"606","title":"名字的由来","pic2path":"","pic1path":"","row":"5","brandid":""},{"storename":"茅台","typename":"酒段子","winecultureid":"34","createtime":"2015-10-22 16:51:28","ordernum":"1","content":"<p align=\"justify\" style=\"text-align:center;\">\n\t<br />\n</p>\n<p class=\"MsoNormal\" style=\"text-align:center;text-indent:21pt;\">\n\t<span style=\"font-size:14px;\">会喝一两喝二两，这样的朋友够豪爽!</span>\n</p>\n<p class=\"MsoNormal\" style=\"text-align:center;text-indent:21pt;\">\n\t<span style=\"font-size:14px;\">会喝二两喝五两，这样的同志应培养!</span>\n</p>\n<p class=\"MsoNormal\" style=\"text-align:center;text-indent:21pt;\">\n\t<span style=\"font-size:14px;\">会喝半斤喝壹斤，这样的哥们最贴心!</span>\n</p>\n<p class=\"MsoNormal\" style=\"text-align:center;text-indent:21pt;\">\n\t<span style=\"font-size:14px;\">会喝壹斤喝壹桶，考虑提拔当副总!</span>\n</p>\n<p class=\"MsoNormal\" style=\"text-align:center;text-indent:21pt;\">\n\t<span style=\"font-size:14px;\">会喝壹桶喝壹缸，酒厂厂长让你当!</span>\n</p>\n<p class=\"MsoNormal\" style=\"text-align:center;text-indent:21pt;\">\n\t<span style=\"font-size:14px;\">会喝白酒喝啤酒，这样的干部得调走!</span><o:p></o:p>\n</p>\n<p class=\"MsoNormal\" style=\"text-align:center;text-indent:21pt;\">\n\t<br />\n</p>\n<p class=\"MsoNormal\" style=\"text-align:center;text-indent:21pt;\">\n\t<br />\n</p>\n<p style=\"text-align:center;\">\n\t<br />\n</p>","type":"2","pic3path":"","popularitycount":"99","storeid":"606","title":"喝酒看感情","pic2path":"","pic1path":"","row":"6","brandid":""},{"storename":"金窖醇","typename":"品牌文化","winecultureid":"36","createtime":"2015-10-22 16:51:48","ordernum":"1","content":"<p>\n\t<span style=\"line-height:1;font-size:14px;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style=\"line-height:1;font-size:14px;\">“千年老窖万年糟”，老窖酿酒，格外生香。</span> \n</p>\n<p>\n\t<span style=\"line-height:1;\"><span style=\"font-size:14px;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><br />\n</span> \n</p>\n<p>\n\t<span style=\"line-height:1;font-size:14px;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style=\"line-height:1;font-size:14px;\">源自浓香泰斗的经典品质，秉承“泸州传统的酿制技艺”</span> \n</p>\n<p>\n\t<br />\n<span style=\"line-height:1;\"></span> \n</p>\n<span style=\"font-size:14px;\"></span><br />","type":"1","pic3path":"","popularitycount":"67","storeid":"233","title":"名字的由来","pic2path":"","pic1path":"","row":"7","brandid":""},{"storename":"沱牌舍得","typename":"品牌文化","winecultureid":"40","createtime":"2015-10-22 16:52:08","ordernum":"1","content":"<p style=\"text-align:justify;\">\n\t<span style=\"line-height:1;\"><span style=\"font-size:14px;\"></span><span style=\"font-size:14px;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 悠悠岁月酒，滴滴沱牌情。智慧人生，品味舍得。从“唐代春酒”到“明代谢酒”，再到“清代沱酒”，沱牌曲酒、舍得酒一脉相承。</span></span> \n</p>\n<div style=\"text-align:justify;\">\n\t<br />\n</div>\n<span>\n<div style=\"text-align:justify;\">\n\t<span style=\"line-height:1;font-size:14px;\">&nbsp; &nbsp; &nbsp; 唐</span><span style=\"font-size:12pt;font-family:宋体;\"><span style=\"font-size:12pt;\"></span></span><span style=\"line-height:1;font-size:14px;\">代宗宝应元年（762年）11月，诗圣杜甫到射洪凭吊先贤、开唐朝诗风的“一代文宗”陈子昂时，曾赞誉“射洪春酒寒仍绿，极目伤神谁为携”。</span>\n</div>\n</span> \n<div style=\"text-align:justify;\">\n\t<br />\n</div>\n<span>\n<div style=\"text-align:justify;\">\n\t<span style=\"line-height:1;font-size:14px;\">&nbsp; &nbsp; &nbsp; 宋</span><span style=\"font-size:12pt;font-family:宋体;\"></span><span style=\"line-height:1;font-size:14px;\">绍兴年间，著名学者王灼曾赞誉“射洪春酒旧知名，更得新诗意已倾”。</span>\n</div>\n</span> \n<div style=\"text-align:justify;\">\n\t<br />\n</div>\n<span>\n<div style=\"text-align:justify;\">\n\t<span style=\"line-height:1;font-size:14px;\">&nbsp; &nbsp; &nbsp; 明</span><span style=\"font-size:12pt;font-family:宋体;\"></span><span style=\"line-height:1;font-size:14px;\">万历中，四川抚军饶景晖曾赞誉“射洪春酒今仍在，一语当年重品题”。</span>\n</div>\n</span> \n<div style=\"text-align:justify;\">\n\t<br />\n</div>\n<span>\n<div style=\"text-align:justify;\">\n\t<span style=\"line-height:1;font-size:14px;\">&nbsp; &nbsp; &nbsp; 清</span><span style=\"font-size:12pt;font-family:宋体;\"></span><span style=\"line-height:1;font-size:14px;\">康熙四十九年（1710年），浙西词人吴陈琰曾赞誉“射洪春酒美，曾记少陵诗”。</span>\n</div>\n</span> \n<div style=\"text-align:justify;\">\n\t<br />\n</div>\n<span style=\"line-height:1;font-size:14px;\">\n<div style=\"text-align:justify;\">\n\t<span style=\"line-height:1;\">&nbsp; &nbsp; &nbsp; 民国三十五年（1946年）正月，举人马天衢根据店前牌坊“沱泉酿美酒，牌名誉千秋”之寓意而命名为“沱牌酒”。</span>\n</div>\n</span> \n<p style=\"text-align:justify;\">\n\t<br />\n</p>\n<p style=\"text-align:justify;\">\n\t<br />\n</p>","type":"1","pic3path":"","popularitycount":"152","storeid":"231","title":"名字的由来","pic2path":"","pic1path":"","row":"8","brandid":""},{"storename":"沱牌舍得","typename":"酒段子","winecultureid":"44","createtime":"2015-10-22 16:52:23","ordernum":"1","content":"<p align=\"justify\">\n\t<br />\n</p>\n<p class=\"MsoNormal\" style=\"text-align:center;\">\n\t<span style=\"font-size:14px;\">豪言壮语，酒壮英雄胆。&nbsp;</span>\n</p>\n<p class=\"MsoNormal\" style=\"text-align:center;\">\n\t<span style=\"font-size:14px;\">花言巧语，劝友多喝点</span><span style=\"line-height:1.5;font-size:14px;\">。</span> \n</p>\n<p class=\"MsoNormal\" style=\"text-align:center;\">\n\t<span style=\"line-height:1.5;font-size:14px;\">&nbsp;胡言乱语，神智无深浅。</span> \n</p>\n<p class=\"MsoNormal\" style=\"text-align:center;\">\n\t<span style=\"line-height:1.5;font-size:14px;\">&nbsp;不言不语，进入梦里面。&nbsp;</span> \n</p>\n<p class=\"MsoNormal\" style=\"text-align:center;\">\n\t<span style=\"line-height:1.5;font-size:14px;\">自言自语，醒来悔不断。</span> \n</p>\n<p class=\"MsoNormal\" style=\"text-align:center;\">\n\t<span style=\"line-height:1.5;\"><br />\n</span> \n</p>\n<p class=\"MsoNormal\" style=\"text-align:center;\">\n\t<span style=\"line-height:1.5;\"><br />\n</span> \n</p>\n<p>\n\t<br />\n</p>","type":"2","pic3path":"","popularitycount":"57","storeid":"231","title":"喝酒五种语言","pic2path":"","pic1path":"","row":"9","brandid":""},{"storename":"泸州老窖","typename":"酒段子","winecultureid":"57","createtime":"2015-10-22 16:52:36","ordernum":"1","content":"<p class=\"MsoNormal\" style=\"text-align:center;text-indent:21pt;\">\n\t<span style=\"font-size:14px;\">酒这东东：</span>\n</p>\n<p class=\"MsoNormal\" style=\"text-align:center;text-indent:21pt;\">\n\t<span style=\"font-size:14px;\">看起来像水，闻起来陶醉</span><span style=\"text-indent:21pt;line-height:1.5;font-size:14px;\">。</span> \n</p>\n<p class=\"MsoNormal\" style=\"text-align:center;text-indent:21pt;\">\n\t<span style=\"text-indent:21pt;line-height:1.5;font-size:14px;\">喝进去辣嘴，留肚里闹鬼</span><span style=\"line-height:1.5;text-indent:21pt;font-size:14px;\">。</span> \n</p>\n<p class=\"MsoNormal\" style=\"text-align:center;text-indent:21pt;\">\n\t<span style=\"line-height:1.5;text-indent:21pt;font-size:14px;\">走路来绊腿，半夜想找水。</span> \n</p>\n<p class=\"MsoNormal\" style=\"text-align:center;text-indent:21pt;\">\n\t<span style=\"line-height:1.5;text-indent:21pt;font-size:14px;\">醒来就后悔，身心俱疲惫。</span> \n</p>\n<p class=\"MsoNormal\" style=\"text-align:center;text-indent:21pt;\">\n\t<span style=\"line-height:1.5;text-indent:21pt;\"><br />\n</span> \n</p>\n<p class=\"MsoNormal\" style=\"text-align:center;text-indent:21pt;\">\n\t<span style=\"line-height:1.5;text-indent:21pt;\"><br />\n</span> \n</p>\n<p class=\"MsoNormal\" style=\"text-indent:21pt;\">\n\t<o:p></o:p>\n</p>","type":"2","pic3path":"","popularitycount":"117","storeid":"230","title":"品酒","pic2path":"","pic1path":"","row":"10","brandid":""},{"storename":"金窖醇","typename":"酒段子","winecultureid":"69","createtime":"2015-10-22 16:52:52","ordernum":"1","content":"<p class=\"MsoNormal\" style=\"text-align:center;text-indent:21pt;\">\n\t<span style=\"font-size:14px;\">不会喝酒,前途没有。</span>\n</p>\n<p class=\"MsoNormal\" style=\"text-align:center;text-indent:21pt;\">\n\t<span style=\"font-size:14px;\">只喝饮料,提拔难料。</span>\n</p>\n<p class=\"MsoNormal\" style=\"text-align:center;text-indent:21pt;\">\n\t<span style=\"font-size:14px;\">一喝就跑,升官还早</span><span style=\"text-indent:21pt;line-height:1.5;font-size:14px;\">。</span> \n</p>\n<p class=\"MsoNormal\" style=\"text-align:center;text-indent:21pt;\">\n\t<span style=\"text-indent:21pt;line-height:1.5;font-size:14px;\">一喝就倒,官位难保</span><span style=\"text-indent:21pt;line-height:1.5;font-size:14px;\">。</span> \n</p>\n<p class=\"MsoNormal\" style=\"text-align:center;text-indent:21pt;\">\n\t<span style=\"text-indent:21pt;line-height:1.5;font-size:14px;\">能喝不输,准当秘书。</span> \n</p>\n<p class=\"MsoNormal\" style=\"text-align:center;text-indent:21pt;\">\n\t<span style=\"font-size:14px;\">一喝九两,重点培养。</span>\n</p>\n<p class=\"MsoNormal\" style=\"text-align:center;text-indent:21pt;\">\n\t<span style=\"font-size:14px;\">久喝嫌少,人才难找。</span>\n</p>\n<p class=\"MsoNormal\" style=\"text-align:center;text-indent:21pt;\">\n\t<span style=\"font-size:14px;\">带头喝倒,未来</span><span style=\"text-indent:21pt;line-height:1.5;font-size:14px;\">领导。</span> \n</p>\n<p class=\"MsoNormal\" style=\"text-align:center;text-indent:21pt;\">\n\t<span style=\"text-indent:21pt;line-height:1.5;\"><br />\n</span> \n</p>\n<p class=\"MsoNormal\" style=\"text-align:center;text-indent:21pt;\">\n\t<span style=\"text-indent:21pt;line-height:1.5;\"><br />\n</span> \n</p>\n<p class=\"MsoNormal\" style=\"text-indent:21pt;\">\n\t<o:p></o:p>\n</p>","type":"2","pic3path":"","popularitycount":"31","storeid":"233","title":"酒与升职","pic2path":"","pic1path":"","row":"11","brandid":""},{"storename":"金沙窖酒","typename":"酒段子","winecultureid":"81","createtime":"2015-10-22 16:53:02","ordernum":"1","content":"<p class=\"MsoNormal\" style=\"text-align:center;\">\n\t<span style=\"font-size:14px;\">激动的心，颤抖的手，我给领导敬杯酒。</span>\n</p>\n<p class=\"MsoNormal\" style=\"text-align:center;\">\n\t<span style=\"font-size:14px;\">&nbsp;希望不嫌我貌丑，喝了这杯我就走。</span>\n</p>\n<p class=\"MsoNormal\">\n\t<br />\n</p>\n<p class=\"MsoNormal\">\n\t<br />\n</p>","type":"2","pic3path":"","popularitycount":"36","storeid":"881","title":"女士劝酒","pic2path":"","pic1path":"","row":"12","brandid":""}],"res.page":[{"RecordsCount":35,"hasNextPage":true,"hasPreviousPage":false,"CurPage":1,"RecordsPerPage":12,"TotalPageCount":3}],"res.size":"35","returnview":""},
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
