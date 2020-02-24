<template>
  <div class="page-box" v-if="total > pageSize">
    <el-pagination
      background
      :current-page = "pageNum"
      @current-change = "handleCurrentChange"
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize">
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: [
    'total',
    'pageSize',
    'pageNum'
  ],
  data () {
    return {
    }
  },
  mounted(){
  },
  methods: {
    handleCurrentChange (val) {
      this.$emit('getList', val)
    }
  }
}
</script>

<style scoped>

</style>
