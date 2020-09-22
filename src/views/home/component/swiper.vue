<template>
  <div>
    <div class="swiper-container my_swiper" ref="my_swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in value" :key="index">
          <div class="my" :style="{'background-image':`url(${item.picUrl})`}"></div>
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
      defalut: [
        {
          picUrl:
            "https://yanxuan.nosdn.127.net/d8c8dee5e4faed42aa4d8b08db6a6926.jpg?type=webp&imageView&quality=75&thumbnail=750x0",
        },
        {
          picUrl:
            "https://yanxuan.nosdn.127.net/431d859982dfe732edd3f92d5b308a7a.png?type=webp&imageView&quality=75&thumbnail=750x0",
        },
        {
          picUrl:
            "https://yanxuan.nosdn.127.net/1059736611334f6ea531057a918dfaff.jpg?type=webp&imageView&quality=75&thumbnail=750x0",
        },
      ],
    },
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
.my_swiper {
  width: 100%;
  height: 300px;
}

.my {
  height: 100%;
  background-size: cover;
}
</style>