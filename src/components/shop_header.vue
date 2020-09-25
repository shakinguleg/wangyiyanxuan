<template>
  <div class="header">
    <span class="iconfont icon-zhuye" @click="back"></span>
    <div class="center_wrap">
      <span class="title">网易严选</span>
      <span class="iconfont icon-sousuo"></span>
    </div>
    <span class="iconfont icon-gouwuchedaohanglan" @click="toCart"></span>
  </div>
</template>

<script>
export default {
  methods: {
    toCart() {
      // 前往购物车
      this.$router.push({ name: "cart" });
      this.$store.commit("setCurrentIndex", 3);
    },
    back() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  padding: 0 16px 0 24px;
  display: flex;
  height: 88px;
  justify-content: space-between;
  align-items: center;
  .icon-zhuye {
    font-size: 38px;
  }
  .icon-gouwuchedaohanglan {
    font-size: 48px;
  }
  .center_wrap {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: center;
    position: relative;
    .title {
      font-size: 38px;
      line-height: 88px;
    }
    .icon-sousuo {
      font-size: 38px;
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translate(0, -50%);
    }
  }
}
</style>