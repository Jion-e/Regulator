<template lang="html">
  <div class="exposure">
    <mt-header title="质量曝光">
      <router-link to="/Exposure" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <section class="list">
      <!-- <ul class="list-sort">
        <li :class="{'active': iscur === 1}">时间排序<i class="icon-arrow-down" @click="orderByTime"></i></li>
        <li :class="{'active': iscur === 2}">曝光程度<i class="icon-arrow-down" @click="orderByDanger"></i></li>
        <li :class="{'active': iscur === 3}">浏览器次数<i class="icon-arrow-down" @click="orderByViewCount"></i></li>
      </ul> -->
      <h3 class="list-title">侦码管家为您找到相关结果约<mt-badge type="primary">{{page.total}}</mt-badge>个</h3>
      <mt-loadmore
        :top-method="loadTop"
        :bottom-method="loadBottom"
        :bottom-all-loaded="allLoaded"
        ref="loadmore">
      <div class="list-item" v-for="exposure of exposureList" @click="view(exposure.id)" v-cloak>
        <div class="cont left">
          <h3 class="title">{{exposure.productName}}</h3>
          <p class="company">制造商：{{exposure.companyName}}</p>
          <span class="time" v-text="exposure.batch"></span>
          <span class="source" v-text="exposure.accreditationBody"></span>
        </div>
        <!-- <div class="img right">
          <img slot="icon" src="../assets/img/complete.png">
        </div> -->
      </div>
      </mt-loadmore>
    </section>
    <!-- <p>
      {{exposureList}}
    </p> -->
  </div>
</template>

<script>
import api from '../api'
import { PageInit } from '../api/config'
import { Toast, Indicator } from 'mint-ui'
export default {
  data() {
    return {
      iscur: 1,
      exposureList: [],
      page: new PageInit(),
      keyword: ''
    };
  },
  beforeRouteEnter(to, from, next){
    setTimeout(() => {
      if(sessionStorage.exposureResultTop){
        $(window).scrollTop(parseInt(sessionStorage.exposureResultTop))
      }
    }, 100)
    next()
  },
  beforeRouteLeave(to, from, next){
    sessionStorage.exposureResultTop = $(window).scrollTop()
    next()
  },
  created() {
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    })
    this.keyword = decodeURI(decodeURI(this.$route.params.keyword))
    api.fetchExposureListByKeyword(0, this.page.size, this.keyword).then(data => {
      if(data.total === 0){
        this.$router.push({path: '/ExposureEmpty'})
      }else{
        this.page.total = data.total
        this.exposureList = JSON.parse(data.data)
      }
      Indicator.close()
    }).catch(err => Toast(err))
  },
  methods: {
    /**
     * 顶部下拉更新数据
     * @param  {[string]} id [loadmore的唯一编号，防止重复]
     * @return {[object]}    [新闻列表]
     */
    loadTop(id) {
      api.fetchExposureListByKeyword(0, this.page.size, this.keyword).then(data => {
        this.page.total = data.total
        this.exposureList = JSON.parse(data.data)
      }).catch(err => Toast(err))
    },
    /**
     * 底部上拉读取更多数据
     * @param  {[string]} id [loadmore的唯一编号，防止重复]
     * @return {[object]}    [曝光列表]
     */
    loadBottom(id) {
      api.fetchExposureListByKeyword(this.page.current, this.page.size, this.keyword).then(data => {
        const list = JSON.parse(data.data)
        if(list.length === 0){
          this.allLoaded = true  // 若数据已全部获取完毕
          // return false
        }
        list.forEach(item => {
          this.exposureList.push(item)
        })
        this.page.current++
        this.$refs.loadmore.onBottomLoaded(id)
      }).catch(err => Toast(err))
    },
    view(id){
      this.$router.push({path: `/ExposureView/${id}`})
    },
    orderByTime(){
      this.iscur = 1
      this.exposureList.sort((x, y) => x.createTime > y.createTime)
    },
    orderByDanger(){
      this.iscur = 2
      this.exposureList.sort((x, y) => x.productName < y.productName)
    },
    orderByViewCount(){
      this.iscur = 3
      this.exposureList.sort((x, y) => x.batch < y.batch)
    }
  }
};
</script>
