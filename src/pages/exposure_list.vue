<template lang="html">
  <div class="export">
    <section class="list">
      <h3 class="list-title">最新曝光</h3>
      <mt-loadmore
        :top-method="loadTop"
        :bottom-method="loadBottom"
        :bottom-all-loaded="allLoaded"
        ref="loadmore">
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
      </mt-loadmore>
    </section>
  </div>
</template>

<script>
import api from '../api'
import { PageInit } from '../api/config'
import { Toast } from 'mint-ui'
export default {
  name: 'exposure-list',
  data() {
    return {
      exposureList: [],
      allLoaded: false,
      page: new PageInit()
    };
  },
  created() {
    api.fetchExposureList(0, this.page.size).then(data => {
      this.exposureList = JSON.parse(data.data)
    }).catch(err => Toast(err))
  },
  methods: {
    /**
     * 顶部下拉更新数据
     * @param  {[string]} id [loadmore的唯一编号，防止重复]
     * @return {[object]}    [新闻列表]
     */
    loadTop(id) {
      api.fetchExposureList(0, this.page.size).then(data => {
        this.exposureList = JSON.parse(data.data)
        this.$refs.loadmore.onTopLoaded(id)
      }).catch(err => Toast(err))
    },
    /**
     * 底部上拉读取更多数据
     * @param  {[string]} id [loadmore的唯一编号，防止重复]
     * @return {[object]}    [曝光列表]
     */
    loadBottom(id) {
      api.fetchExposureList(this.page.current, this.page.size).then(data => {
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
    }
  },
};
</script>
