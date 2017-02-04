<template>
  <div id="app">
     <!-- <transition name="ani" mode="out-in"> -->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    <!-- </transition> -->
    <v-back-top></v-back-top>
  </div>
</template>

<script>
  import vBackTop from './components/v-back-top.vue'
  export default {
    name: 'app',
    components: { vBackTop }
  };
</script>
<style media="screen">
/*.ani-enter-active, .ani-leave-active {animation: slideInFromRight 0.3s}*/
/*.ani-enter-active{animation: fadeIn 0.3s}*/
</style>
