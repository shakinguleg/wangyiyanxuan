<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <div class="bottom">
      <div
        class="bottom_wrap"
        v-for="(item, index) in iconfontClass"
        :key="index"
        :class="{ light: index == currentIndex }"
        @click="setCurrentIndex(index)"
      >
        <span class="iconfont" :class="item.icon"></span>
        <span>{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      iconfontClass: [
        { icon: "icon-zhuye", name: "首页", to: "home" },
        { icon: "icon-guizi", name: "分类" },
        { icon: "icon-zhaopian", name: "值得买" },
        { icon: "icon-gouwuchedaohanglan", name: "购物车", to: "cart" },
        { icon: "icon-geren", name: "个人" },
      ],
    };
  },
  mounted() {},
  computed: {
    ...mapState({
      currentIndex: (store) => store.currentIndex,
    }),
  },
  methods: {
    setCurrentIndex(index) {
      this.$store.commit("setCurrentIndex", index);
      this.$router.push({ name: this.iconfontClass[index].to });
    },
  },
  watch: {
    currentIndex: {
      handler(newVal) {
        if (newVal == 0) {
          this.$router.push({ name: "homeList" });
        }
      },
    },
  },
};
</script>

<style lang="scss">
.bottom {
  position: absolute;
  bottom: 0;
  background-color: white;
  height: 97px;
  width: 100%;
  display: flex;
  .bottom_wrap {
    &:nth-of-type(4) {
      span {
        &:nth-of-type(1) {
          font-size: 50px;
        }
      }
    }
    height: 100%;
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #666;
    span {
      &:nth-of-type(1) {
        font-size: 40px;
      }
      &:nth-of-type(2) {
        font-size: 24px;
      }
    }
  }
  .light {
    color: #dd1a21;
  }
}
</style>