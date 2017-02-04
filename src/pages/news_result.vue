<template lang="html">
  <div class="news">
    <mt-header title="质量热点">
      <router-link to="/News" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <!-- 搜索页 -->
    <div class="container"  v-cloak>
      <h3 class="list-title">侦码管家为您找到相关结果约<mt-badge type="primary">{{page.total}}</mt-badge>个</h3>
      <div class="empty" v-if="empty">
        <h4 class="list-title">推荐新闻</h4>
      </div>
      <div class="list">
        <div v-for="news in newsList" class="list-item" @click="newsView(news.id)">
          <div class="left">
            <img v-lazy="news.thumbnail" slot="icon" class="thumbnail">
          </div>
          <div class="right">
            <h3 class="title" v-text="news.title"></h3>
            <span class="time">{{news.publishTime | dateFormat}}</span>
            <span class="source">{{news.platform | newsPlatformFormat}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api'
import { PageInit } from '../api/config'
import { Toast, Indicator } from 'mint-ui'
import moment from 'moment'
export default {
  data() {
    return {
      newsList: [],
      allLoaded: false,
      page: new PageInit,
      keyword: '',
      empty: true,
    };
  },
  beforeRouteEnter(to, from, next){
    setTimeout(() => {
      if(sessionStorage.newsResultTop){
        $(window).scrollTop(parseInt(sessionStorage.newsResultTop))
      }
    }, 100)
    next()
  },
  beforeRouteLeave(to, from, next){
    sessionStorage.newsResultTop = $(window).scrollTop()
    next()
  },
  filters: {
    dateFormat(date){
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  created() {
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    })
    this.keyword = decodeURI(decodeURI(this.$route.params.keyword))
    api.fetchNewsListByKeyword(0, this.page.size, this.keyword).then(data => {
      this.page.total = data.total
      if(data.total === 0){
        //推荐
        api.fetchNewsListByCategory(0, this.page.size, 1).then(data => {
          this.newsList = JSON.parse(data.data)
        }).catch(err => Toast(err))
      }else{
        this.empty = false
        this.newsList = JSON.parse(data.data)
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
      api.fetchNewsListByKeyword(0, this.page.size, this.keyword).then(data => {
        this.newsList = JSON.parse(data.data)
        this.$refs.loadmore.onTopLoaded(id)
      }).catch(err => Toast(err))
    },
    /**
     * 底部上拉读取更多数据
     * @param  {[string]} id [loadmore的唯一编号，防止重复]
     * @return {[object]}    [新闻列表]
     */
    loadBottom(id) {
      api.fetchNewsListByKeyword(this.page.current, this.page.size, this.keyword)
      .then(data => {
        const list = JSON.parse(data.data)
        if(list.length === 0){
          this.allLoaded = true  // 若数据已全部获取完毕
        }
        list.forEach(item => {
          this.newsList.push(item)
        })
        this.loadCurren++
        this.$refs.loadmore.onBottomLoaded(id)
      }).catch(err => Toast(err))
    },
    /**
     * 查看新闻详情
     * @param  {[number]} id [新闻编号]
     * @return {[view]}    [新闻详情视图]
     */
    newsView(id){
      this.$router.push({path: '/NewsView/' +  id})
    }
  },
};
</script>

<style lang="less">
</style>
