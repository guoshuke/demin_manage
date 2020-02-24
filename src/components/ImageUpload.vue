<template>
  <div >
    <el-row >
      <el-col :span="24" class="imageUp">
        <el-upload
          :action="uploadUrl"
          list-type="picture-card"
          :on-success="onSuccess"
          :on-error="onError"
          :file-list="fileList"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  // import api from '../util/api'
  export default {
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false ,
        fileList: [],
        // headers: {
        //   'Authorization': api.getToken()
        // },
        // uploadUrl: api.getImangeUploadUrl(),
        uploadUrl: ''
      }
    },
    mounted(){

    },
    methods: {
      // 图片移除钩子
      handleRemove (file, fileList) {
        this.$emit('imageUploadList',fileList)
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      // 上传成功钩子
      onSuccess (response, file, fileList) {
        this.$emit('imageUploadList',fileList)
      },
      // 上传失败钩子
      onError (err, response, file) {
        console.log('err：', err)
        console.log('response：', response)
        console.log('file：', file)
      },
      // 上传文件之前的钩子

      //文件超出个数限制钩子
      handleExceed (files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，`);
      },
      // 父组件传递数据方法
      setDefaultFileList (obj) {
        this.fileList = obj
      }
    }
  }
</script>
<style scoped>

</style>
