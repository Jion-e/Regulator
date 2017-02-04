<template lang="html">
  <div class="topcontrol" @click="backTop()">
      <i class="icon-angle-up"></i>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  mounted() {
    $(window).scroll(function() {
      if ($(this).scrollTop() > 200) {
        $('.topcontrol').show();
      } else {
        $('.topcontrol').hide();
      }
    });
  },
  methods: {
    backTop() {
      $('html, body').animate({
        scrollTop: 0,
        easing: 'swing'
      }, 750);
    }
  },
};
</script>
