<template lang="html">
  <div class="exposure">
    <mt-header title="质量曝光">
      <!-- <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link> -->
      <a href="javascript:;" slot="left" onClick="window.Quality.closeWebView()">
        <mt-button icon="back">返回</mt-button>
      </a>
    </mt-header>
    <section class="search-site">
      <div class="search-logo">
        <img src="../assets/img/exposure_logo.png" alt="质量曝光" />
      </div>
      <div class="search-block">
          <input type="text" class="form-control form-control-lg" placeholder="请输入企业名称或产品名称" v-model="keyword" id="kw"><button type="button" name="button" class="btn-radius btn-primary btn-lg" @click="search">查询</button>
      </div>
    </section>
    <exposure-list></exposure-list>
  </div>
</template>

<script>
import api from '../api'
import { PageInit } from '../api/config'
import { Toast } from 'mint-ui'
import ExposureList from './exposure_list.vue'
export default {
  data() {
    return {
      keyword: '',
      page: new PageInit()
    };
  },
  beforeRouteEnter(to, from, next){
    setTimeout(() => {
      if(sessionStorage.exposureListTop){
        $(window).scrollTop(parseInt(sessionStorage.exposureListTop))
      }
    }, 100)

    next(vm => {
        $('#kw').val('')
    })
  },
  beforeRouteLeave(to, from, next){
    sessionStorage.exposureListTop = $(window).scrollTop()
    next()
  },
  methods: {
    search(){
      if(!this.keyword){
        Toast('请输入关键字')
        return false
      }else{
        let kw = $('#kw').val()
        let kwEncode = encodeURI(encodeURI(kw))
        // this.keyword = encodeURI(encodeURI(kw))
        api.fetchExposureListByKeyword(0, this.page.size, kw).then(data => {
          if(data.total === 0){
            this.$router.push({path: '/ExposureEmpty'})
          }else{
            this.$router.push({path: `/ExposureResult/${kwEncode}`})
          }
        }).catch(err => Toast(err))
        // this.$router.push({path: `/ExposureResult/${this.keyword}`})
      }
    }
  },
  components: { ExposureList }
};
</script>
