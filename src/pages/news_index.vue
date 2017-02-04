<template lang="html">
  <div class="news">
    <mt-header title="质量热点">
      <!-- <router-link to="/News" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link> -->
      <a href="javascript:;" slot="left" onClick="window.Quality.closeWebView()">
        <mt-button icon="back">返回</mt-button>
      </a>
      <mt-button slot="right" icon="search" @click.native="searchPopup = true"></mt-button>
    </mt-header>
    <!-- 内容页 -->
    <div class="container">
      <div class="banner">
        <mt-swipe :auto="4000">
          <mt-swipe-item
            class="full-bg"
            v-for="item of bannerNews"
            :style="{'background-image': 'url(' + item.thumbnail + ')'}"
            @click.native="newsView(item.id)">
              <!-- <img :src="item.thumbnail" :alt="item.title" /> -->
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <nav class="tab-nav">
        <a class="tab-toggle"
          :class="{'active': index === tabActive}"
          v-for="(type, index) of newsTabs"
          v-text="type.name"
          @click="tabSwitch(index, type.id)"></a>
      </nav>
      <mt-loadmore
        :top-method="loadTop"
        :bottom-method="loadBottom"
        :bottom-all-loaded="allLoaded"
        ref="loadmore">
        <div class="list" v-cloak v-finger:swipe="swipe">
          <div v-for="news in newsList" class="list-item" @click="newsView(news.id)">
            <div class="left">
              <!-- <img v-lazy="news.thumbnail" slot="icon" class="thumbnail"> -->
              <img :src="news.thumbnail" slot="icon" class="thumbnail">
            </div>
            <div class="right">
              <h3 class="title" v-text="news.title"></h3>
              <span class="time">{{news.publishTime | dateFormat}}</span>
              <span class="source">{{news.platform | newsPlatformFormat}}</span>
            </div>
          </div>
        </div>
      </mt-loadmore>
    </div>
    <mt-popup v-model="searchPopup" position="top" class="search-popup">
      <mt-header class="search-header">
          <mt-button icon="back" slot="left" @click.native="searchPopup = false"></mt-button>
        <div slot="right">
          <input type="text" class="form-control" v-model="keyword" placeholder="请输入关键字">
          <mt-button @click.native="search(keyword)">搜索</mt-button>
        </div>
      </mt-header>
      <ul class="recommend">
        <li class="recommend-item" v-for="item of recommend" @click="search(item.name)">
          <a href="javascript:;" @click.stop="search(item.title)">{{item.title}}</a>
        </li>
      </ul>
    </mt-popup>
  </div>
</template>

<script>
import api from '../api'
import {newsTabs, newsRecommend, PageInit } from '../api/config'
import { Toast, Indicator } from 'mint-ui'
import moment from 'moment'
export default {
  data() {
    return {
      tabActive: 0,
      newsTabs: newsTabs,
      newsTabsLength: 8,
      newsList: [],
      searchPopup: false,
      allLoaded: false,
      type: 0,
      page: new PageInit,
      keyword: '',
      recommend: [],
      bannerNews: [],
      // recommend: newsRecommend,
    };
  },
  beforeRouteEnter(to, from, next){
    setTimeout(() => {
      if(sessionStorage.newsListTop){
        $(window).scrollTop(parseInt(sessionStorage.newsListTop))
      }
    }, 100)
    next()
  },
  beforeRouteLeave(to, from, next){
    sessionStorage.newsListTop = $(window).scrollTop()
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
    api.fetchNewsListByCategory(0, this.page.size, 1).then(data => {
      this.newsList = JSON.parse(data.data)
      this.recommend = JSON.parse(data.data).slice(0, 6)
      this.bannerNews = JSON.parse(data.data).slice(0, 3)
      Indicator.close()
    }).catch(err => Toast(err))
  },
  methods: {
    /**
     * 选项卡切换
     * @param  {[Number]} index [选项卡索引]
     * @param  {[Number]} type  [新闻分类]
     * @return {[object]}       [新闻列表]
     */
    tabSwitch(index, type){
      this.tabActive = index
      this.type = type
      this.loadCurren = 0
      //推荐
      if(type === 0){
        api.fetchNewsListByCategory(0, this.page.size, 1).then(data => {
          const list = JSON.parse(data.data)
          this.newsList = list
        }).catch(err => Toast(err))
        return false
      }
      //分类
      api.fetchNewsListByType(0, this.page.size, this.type).then(data => {
        const list = JSON.parse(data.data)
        this.newsList = list
      }).catch(err => Toast(err))
    },
    /**
     * 顶部下拉更新数据
     * @param  {[string]} id [loadmore的唯一编号，防止重复]
     * @return {[object]}    [新闻列表]
     */
    loadTop(id) {
      //推荐
      if(this.type === 0){
        api.fetchNewsListByCategory(0, this.page.size, 1).then(data => {
          const list = JSON.parse(data.data)
          this.newsList = list
          this.$refs.loadmore.onTopLoaded(id)
        }).catch(err => Toast(err))
        return false
      }
      //分类
      api.fetchNewsListByType(0, this.page.size, this.type).then(data => {
        const list = JSON.parse(data.data)
        this.newsList = list
        this.$refs.loadmore.onTopLoaded(id)
      }).catch(err => Toast(err))
    },
    /**
     * 底部上拉读取更多数据
     * @param  {[string]} id [loadmore的唯一编号，防止重复]
     * @return {[object]}    [新闻列表]
     */
    loadBottom(id) {
      //推荐
      if(this.type === 0){
        api.fetchNewsListByCategory(this.page.current, this.page.size, 1).then(data => {
          const list = JSON.parse(data.data)
          if(list.length === 0){
            this.allLoaded = true  // 若数据已全部获取完毕
          }
          list.forEach(item => {
            this.newsList.push(item)
          })
          this.page.current++
          this.$refs.loadmore.onBottomLoaded(id)
        }).catch(err => Toast(err))
        return false
      }
      //分类
      api.fetchNewsListByType(this.page.current, this.page.size, this.type).then(data => {
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
    search(keyword){
      if(!keyword){
        Toast('请输入查询内容！')
        return false
      }
      keyword = encodeURI(encodeURI(keyword))
      this.$router.push({path: `/NewsResult/${keyword}`})
    },
    /**
     * 查看新闻详情
     * @param  {[number]} id [新闻编号]
     * @return {[view]}    [新闻详情视图]
     */
    newsView(id){
      this.$router.push({path: '/NewsView/' +  id})
    },
    swipe(evt){
      // debugger
      if(evt.direction === 'Left'){
        if(this.tabActive < this.newsTabsLength - 1){
           $('.list').addClass('aniSlideIn')
           this.tabActive ++
           this.type ++
           this.tabSwitch(this.tabActive, this.type)
        }
      }
      if(evt.direction === 'Right'){
        if(this.tabActive > 0){
           this.tabActive --
           this.type --
           this.tabSwitch(this.tabActive, this.type)
           $('.list').addClass('aniSlideOut')
        }
      }

      setTimeout(() => {
        $('.list').removeClass('aniSlideIn aniSlideOut')
      }, 300)
    }
  },
};
</script>
