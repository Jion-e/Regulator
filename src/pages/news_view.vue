<template lang="html">
  <div class="news">
    <mt-header title="新闻详情">
      <router-link to="/News" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button slot="right" class="icon-share" @click.native="sharePopup = true"></mt-button>
    </mt-header>
    <main class="news-page">
      <div class='news-header'>
        <h1 class="news-title" v-text="news.title"></h1>
        <span class="news-time" v-text="news.publishTime"></span>
        <span class="news-source">{{news.platform | newsPlatformFormat}}</span>
      </div>
      <div class="news-cont" v-html="news.content"></div>
    </main>
    <mt-popup v-model="sharePopup" position="bottom" class="share-popup">
      <ul>
        <li class="share-item">
          <a href="javascript:;">
            <figure>
              <img src="../assets/img/complete.png" alt="微博" />
              <figcaption>微博</figcaption>
            </figure>
          </a>
        </li>
        <li class="share-item">
          <a href="javascript:;">
            <figure>
              <img src="../assets/img/complete.png" alt="QQ" />
              <figcaption>QQ</figcaption>
            </figure>
          </a>
        </li>
        <li class="share-item">
          <a href="javascript:;">
            <figure>
              <img src="../assets/img/complete.png" alt="QQ空间" />
              <figcaption>QQ空间</figcaption>
            </figure>
          </a>
        </li>
        <li class="share-item">
          <a href="javascript:;">
            <figure>
              <img src="../assets/img/complete.png" alt="朋友圈" />
              <figcaption>朋友圈</figcaption>
            </figure>
          </a>
        </li>
        <li class="share-item">
          <a href="javascript:;">
            <figure>
              <img src="../assets/img/complete.png" alt="微信好友" />
              <figcaption>微信好友</figcaption>
            </figure>
          </a>
        </li>
        <li class="share-item">
          <a href="javascript:;">
            <figure>
              <img src="../assets/img/complete.png" alt="收藏" />
              <figcaption>收藏</figcaption>
            </figure>
          </a>
        </li>
        <li class="share-item">
          <a href="javascript:;">
            <figure>
              <img src="../assets/img/complete.png" alt="复制链接" />
              <figcaption>复制链接</figcaption>
            </figure>
          </a>
        </li>
      </ul>
    </mt-popup>
  </div>
</template>

<script>
import api from '../api'
import { Toast } from 'mint-ui'
import moment from 'moment'
export default {
  data() {
    return {
      sharePopup: false,
      news: {}
    };
  },
  beforeRouteEnter(to, from, next) {
    alert('a')
  },
  created(){
    const id = this.$route.params.id
    /**
     * 根据新闻编号获取新闻详情
     * @param  {[number]} id [新闻编号]
     * @return {[object]}    [新闻详情]
     */
    api.fetchNews(id).then(data => {
      this.news = data
      this.news.publishTime = moment(this.news.publishTime).format('YYYY年MM月DD日 HH:mm:ss')
    }).catch(err => Toast(err))
  }
};
</script>
