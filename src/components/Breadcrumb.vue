<template>
  <div class="bread-crumb">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="container-c flex-row flex-center">
      <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="item in breadData" :key="item.name" :to="{path: item.path}">{{item.name}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'Breadcrumb',
  computed: {
    ...mapState({
      breadData: state => { if (state.breadData.length > 0) return state.breadData }
    })
  }
}
</script>

<style scoped>

</style>
