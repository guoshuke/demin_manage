<template>
  <div>
    <Header />
    <div class="flex-row">
      <LeftNav />
      <div class="right-content col-a1">
        <!--<Breadcrumb />-->
        <router-view/>
        <!--<PageChange :total="total" :pageNum="requestParams.pageNum" :pageSize="requestParams.pageSize" @getList="getHomeData"/>-->
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Api from "../util/api";
import Header from "../../../components/Header"
import LeftNav from "../components/LeftNav"
import PageChange from '@/components/PageChange.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'

export default {
  name: 'home',
  components: {
    Header,
    LeftNav,
    PageChange,
    Breadcrumb
  },
  data() {
    return {

    }
  },
  methods: {

  },
  created() {

  },
  mounted() {

  }
}
</script>
