<template>
  <div>
    <div ref="editor"></div>
    <!--<p v-if="tpisStatus">内容不能为空</p>-->
  </div>
</template>

<script>
  // import api from '../util/api'
import E from 'wangeditor'
var editor = null
export default {
  name: 'Editor',
  data () {
    return {
      editorContent: '',
      tpisStatus: false,
    }
  },
  methods: {
    setValue (obj) { // 供父组件调用--设置editer的html
      editor.txt.html(obj)
    }
  },
  mounted () {
    editor = new E(this.$refs.editor)
    editor.customConfig.onchange = (html) => {
      // console.log("html",html)
      //  var filterHtml = xss(html)
      this.editorContent = html
      // 判断是否为空
      // if(this.editorContent == "" || this.editorContent == "<p><br></p>"){
      //   this.tpisStatus = true
      // }
      // else {
      //   this.tpisStatus = false
      // }
      this.$emit('editorVal', this.editorContent)
    }
    // 配置服务器端地址
    // editor.customConfig.uploadImgServer = api.uploadImgs()
    // editor.customConfig.uploadImgShowBase64 = true
    //       editor.customConfig.linkImgCallback = function (url) {
    //     // console.log(url) // url 即插入图片的地址
    // }
    editor.customConfig.uploadImgTimeout = 20000
    editor.customConfig.uploadFileName = 'file'
    editor.customConfig.uploadImgHooks = {
      customInsert: function (insertImg, result, editor) {
        var url = result.data[0]
        insertImg(url)
        // result 必须是一个 JSON 格式字符串！！！否则报错
      }
    }
    editor.customConfig.pasteIgnoreImg = false
    editor.customConfig.zIndex = 100
    editor.customConfig.menus = [
      'head', // 标题
      'bold', // 粗体
      'fontSize', // 字号
      'fontName', // 字体
      'italic', // 斜体
      'underline', // 下划线
      'strikeThrough', // 删除线
      'foreColor', // 文字颜色
      'backColor', // 背景颜色
      // 'link',  // 插入链接
      'list', // 列表
      'justify', // 对齐方式
      'quote', // 引用
      // 'emoticon',  // 表情
      'image', // 插入图片
      'table', // 表格
      // 'video',  // 插入视频
      'code', // 插入代码
      'undo', // 撤销
      'redo' // 重复
    ]
    editor.create()
  }
}
</script>

<style scoped>

</style>
