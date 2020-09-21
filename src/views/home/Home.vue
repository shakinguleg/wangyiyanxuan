<template>
  <div class="home_wrap">
    <!-- 头部 -->
    <div class="header">
      <span>网易严选</span>
      <search></search>
    </div>

    <!-- 横向滚动条 -->
    <homeNav></homeNav>

    <!-- 轮播图 -->
    <div></div>

    <!-- 优势 -->
    <div></div>

    <!--  kingkong模块 -->
    <div></div>
  </div>
</template>

<script>
import components from "../../components/index";
import homeNav from "../../components/homeNav";

export default {
  components: {
    [components.search.name]: components.search,
    homeNav,
  },
  methods: {
    //   展示物品详情列表
    // showGoodList() {
    //   this.$router.push({ name: "goodsList" });
    // },
  },
  mounted() {
    this.$store.dispatch("home/getHomeData");
  },
};
</script>

<style lang="scss" scoped>
.home_wrap {
  width: 100%;
  height: 100%;
  background-color: red;
}

.header {
  height: 88px;
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  span {
    width: 138px;
    height: 40px;
    font-size: 30px;
    text-align: center;
  }
  div {
    width: 532px;
  }
}
</style>