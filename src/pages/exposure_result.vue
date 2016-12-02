<template lang="html">
  <div class="exposure">
    <mt-header title="质量曝光">
      <router-link to="/Exposure" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <section class="list">
      <h3 class="list-title">侦码管家为您找到相关结果约<mt-badge type="primary">{{page.total}}</mt-badge>个</h3>
      <div class="list-item" v-for="exposure of exposureList" @click="view(exposure.id)">
        <div class="cont left">
          <h3 class="title" v-text="exposure.productName"></h3>
          <span class="time" v-text="exposure.batch"></span>
          <span class="source" v-text="exposure.accreditationBody"></span>
        </div>
        <!-- <div class="img right">
          <img slot="icon" src="../assets/img/complete.png">
        </div> -->
      </div>
    </section>
  </div>
</template>

<script>
import api from '../api'
import { PageInit } from '../api/config'
import { Toast } from 'mint-ui'
export default {
  data() {
    return {
      exposureList: [],
      page: new PageInit()
    };
  },
  created() {
    const keyword = decodeURI(decodeURI(this.$route.params.keyword))
    api.fetchExposureListByKeyword(this.page.current - 1, this.page.size, keyword).then(data => {
      if(data.total === 0){
        this.$router.push({path: '/ExposureEmpty'})
      }else{
        this.page.total = data.total
        this.exposureList = JSON.parse(data.data)
      }
    }).catch(err => Toast(err))
  },
  methods: {
    view(id){
      this.$router.push({path: `/ExposureView/${id}`})
    }
  }
};
</script>
