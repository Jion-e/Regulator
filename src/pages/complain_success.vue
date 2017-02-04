<template lang="html">
  <div class="complain">
    <mt-header title="质量投诉">
      <router-link to="/ComplainAdd" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <a href="javascript:;" slot="right" onClick="window.Quality.closeWebView()">
        <mt-button>完成</mt-button>
      </a>
      <!-- <router-link to="/" slot="right">
        <span>完成</span>
      </router-link> -->
    </mt-header>
    <div class="success">
      <figure>
        <img class="success-icon" src="../assets/img/complete.png" alt="投诉成功" />
        <figcaption class="success-text">投诉成功</figcaption>
      </figure>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  computed: {},
  ready() {},
  attached() {},
  methods: {},
  components: {}
};
</script>

<style lang="less">
</style>
