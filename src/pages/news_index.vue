<template lang="html">
  <div class="news">
    <mt-header title="质量热点">
      <router-link to="/News" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button slot="right" icon="search" @click.native="searchPopup = true"></mt-button>
    </mt-header>
    <!-- 内容页 -->
    <div class="container" v-if="!isSearch">
      <div class="banner">
        <img src="../assets/img/news_bannner.png" alt="新闻推荐" class="full-img"/>
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
        <div class="list" v-for="(n, index) of 6" v-show="tabActive == index">
          <div v-for="news in newsList" class="list-item" @click="newsView(news.id)">
            <div class="left">
              <img v-lazy="news.thumbnail" slot="icon" class="thumbnail">
            </div>
            <div class="right">
              <h3 class="title" v-text="news.title"></h3>
              <span class="time" v-text="news.publishTime"></span>
              <span class="source" v-text="news.platform"></span>
            </div>
          </div>
        </div>
      </mt-loadmore>
    </div>
    <!-- 搜索页 -->
    <div class="container" v-if="isSearch">
      <h3 class="list-header">搜索结果</h3>
      <div class="list" v-for="(n, index) of 6" v-show="tabActive == index">
        <div v-for="news in newsList" class="list-item" @click="newsView(news.id)">
          <div class="left">
            <img v-lazy="news.thumbnail" slot="icon" class="thumbnail">
          </div>
          <div class="right">
            <h3 class="title" v-text="news.title"></h3>
            <span class="time" v-text="news.publishTime"></span>
            <span class="source" v-text="news.platform"></span>
          </div>
        </div>
      </div>
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
        <li class="recommend-item" v-for="item of recommend" @click="search(item.name)"><a href="javascript:;">{{item.name}}</a></li>
      </ul>
    </mt-popup>
  </div>
</template>

<script>
import api from '../api'
import {newsTabs, newsRecommend, PageInit } from '../api/config'
import { Toast } from 'mint-ui'
export default {
  data() {
    return {
      tabActive: 0,
      newsTabs: newsTabs,
      newsList: [],
      searchPopup: false,
      allLoaded: false,
      isSearch: false,
      type: 0,
      page: new PageInit,
      keyword: '',
      recommend: newsRecommend,
    };
  },
  created() {
    /**
     * 分页查询新闻列表
     * @param  {[Number]} size      [每页条数]
     * @param  {[Number]} 0         [当前页码]
     * @param  {[Number]} 0         [新闻分类]
     * @return {[object]}           [新闻列表]
     */
    api.fetchNewsListByCategory(0, this.page.size, 0).then(data => {
      this.newsList = JSON.parse(data.data)
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
        api.fetchNewsListByCategory(0, this.page.size, type).then(data => {
          const list = JSON.parse(data.data)
          this.newsList = list
        }).catch(err => Toast(err))
        return false
      }
      //分类
      api.fetchNewsListByType(0, this.page.size, type).then(data => {
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
        api.fetchNewsListByCategory(0, this.page.size, type).then(data => {
          const list = JSON.parse(data.data)
          this.newsList = list
        }).catch(err => Toast(err))
        return false
      }
      //分类
      api.fetchNewsListByType(0, this.page.size, type).then(data => {
        const list = JSON.parse(data.data)
        this.newsList = list
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
        api.fetchNewsListByCategory(this.page.current, this.page.size, type).then(data => {
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
        return false
      }
      //分类
      api.fetchNewsListByType(this.page.current, this.page.size, type).then(data => {
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
      api.fetchNewsListByKeyword(0, this.page.size, keyword).then(data => {
        this.searchPopup = false
        this.isSearch = true
        this.newsList = JSON.parse(data.data)
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
