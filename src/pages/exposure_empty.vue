<template lang="html">
  <div class="exposure">
    <mt-header title="质量曝光">
      <router-link to="/Exposure" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <section class="search-site">
      <figure class="search-logo">
        <img src="../assets/img/complete.png" alt="暂无相关曝光" />
        <figcaption>暂无相关曝光</figcaption>
      </figure>
      <!-- <router-link class="go-exposure" to="/Exposure">我要曝光</router-link> -->
    </section>
    <p class="line"></p>
    <exposure-list></exposure-list>
  </div>
</template>

<script>
  import ExposureList from './exposure_list.vue'
  export default {
    data() {
      return {
      };
    },
    methods: {},
    components: {ExposureList}
  };
</script>
