<template>
  <div>
    <div
      class="swiper-container"
      ref="my_swiper"
      :style="{'width':`${width}`,'height':`${height}`}"
    >
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in value" :key="index">
          <div class="my" :style="{'background-image':`url(${item})`}"></div>
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
    },
    width: "",
    height: "",
  },
  mounted() {
    this.swiper = new Swiper(this.$refs.my_swiper, {
      direction: "horizontal", // 垂直切换选项
      loop: true, // 循环模式选项
      // 如果需要分页器
      pagination: {
        el: ".swiper-pagination",
      },
      observer: true,
    });
  },
  watch: {
    value: {
      handler(val) {
        // console.log("val: ", val);
        this.swiper.update();
      },
    },
  },
};
</script>

<style>
.my {
  height: 100%;
  background-size: cover;
}
</style>