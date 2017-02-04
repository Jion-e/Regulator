<template lang="html">
  <div class="news">
    <mt-header title="新闻详情">
      <!-- <router-link to="/News" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link> -->
      <a href="javascript:;" slot="left" @click="back">
        <mt-button icon="back">返回</mt-button>
      </a>
      <mt-button slot="right" class="icon-share"></mt-button>
    </mt-header>
    <main class="news-page" v-finger:swipe="swipe">
      <div class='news-header'>
        <h1 class="news-title" v-text="news.title"></h1>
        <span class="news-time" v-text="news.publishTime"></span>
        <span class="news-source">{{news.platform | newsPlatformFormat}}</span>
      </div>
      <div class="news-cont" v-html="news.content"></div>
    </main>
  </div>
</template>

<script>

import api from '../api'
import { Toast } from 'mint-ui'
import moment from 'moment'
export default {
  data() {
    return {
      news: {},
    };
  },
  beforeRouteEnter(to, from, next){
    next(vm => {
      $('.-mob-share-open').addClass('show')

      const id = vm.$route.params.id
      api.fetchNews(id).then(data => {
        vm.news = data
        vm.news.publishTime = moment(vm.news.publishTime).format('YYYY年MM月DD日 HH:mm:ss')
      }).catch(err => Toast(err))

      $('.news').addClass('aniSlideIn')
    })
  },
  beforeRouteLeave(to, from, next){
    $('.-mob-share-open').removeClass('show')
    next()
  },
  methods: {
    back(){
      window.history.back()
    },
    swipe(evt) {
      if(evt.direction === 'Right'){
        this.back()
      }
    }
  }
};
</script>
