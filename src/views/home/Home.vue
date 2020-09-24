<template>
  <div class="home_wrap">
    <!-- 头部 -->
    <div class="header">
      <span>网易严选</span>
      <search></search>
    </div>

    <!-- 横向滚动条 -->
    <homeNav v-model="currentIndex"></homeNav>

    <!-- 不同选项的标签页 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    
    
  </div>
</template>

<script>
import components from "../../components/index";
import homeNav from "./component/homeNav";

export default {
  components: {
    [components.search.name]: components.search,
    homeNav,
  },
  data() {
    return {
      currentIndex: 0,
    };
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
  overflow: hidden;
  position: relative;
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

<style>
.page {
  position: absolute;
  top: 148px;
  bottom: 97px;
  width: 100%;
  background-color: #eeeeee;
  overflow: scroll;
}


</style>