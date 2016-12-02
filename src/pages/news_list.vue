<template lang="html">
  <div class="news-list">
    <mt-loadmore
      :top-method="loadTop"
      :bottom-method="loadBottom"
      :bottom-all-loaded="allLoaded"
      ref="loadmore">
      <div class="list">
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
</template>
<script>
import api from '../api'
export default {
  props: ['newsList', 'type'],
  data() {
    return {
    };
  },
  created(){

  },
  methods: {
    /**
     * 查看新闻详情
     * @param  {[number]} id [新闻编号]
     * @return {[view]}    [新闻详情视图]
     */
    newsView(id){
      this.$router.push({path: '/NewsView/' +  id})
    }
  }
};
</script>
