<template lang="html">
  <div class="exposure">
    <mt-header title="质量曝光">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <section class="search-site">
      <div class="search-logo">
        <img src="../assets/img/exposure_logo.png" alt="质量曝光" />
      </div>
      <div class="search-block">
          <input type="text" class="form-control form-control-lg" placeholder="请输入企业名称或产品名称" v-model="keyword"><button type="button" name="button" class="btn-radius btn-primary btn-lg" @click="search">查询</button>
      </div>
    </section>
    <exposure-list></exposure-list>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import ExposureList from './exposure_list.vue'
export default {
  data() {
    return {
      keyword: ''
    };
  },
  methods: {
    search(){
      if(!this.keyword){
        Toast('请输入关键字')
        return false
      }else{
        this.keyword = encodeURI(encodeURI(this.keyword))
        this.$router.push({path: `/ExposureResult/${this.keyword}`})
      }
    }
  },
  components: { ExposureList }
};
</script>
