<template>
  <div class="homeNav_wrap">
    <!-- 滚动栏 -->
    <scroll class="homeNav" :scrollX="true" :scrollY="false" :scrollLeft="scrollLeft">
      <ul>
        <li
          v-for="(item,index) in cate_list"
          :key="item.id"
          :class="{light:index==value}"
          @click="setCurrentIndex(index)"
          ref="scrollLi"
        >{{item.name}}</li>
      </ul>
    </scroll>

    <!-- 选择栏 -->
    <div class="select">
      <span class="iconfont icon-jiantou-down"></span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "homeNav",
  props: {
    value: Number,
  },
  data() {
    return {
      scrollLeft: 30,
    };
  },
  mounted() {
    // 获取标签栏数据
    this.$store.dispatch("homeNav/getCateList");
  },
  computed: {
    ...mapState({
      cate_list: (state) => [
        { name: "推荐", id: 11 },
        ...state.homeNav.cateList,
      ],
    }),
  },
  methods: {
    setCurrentIndex(index) {
      // 双向数据绑定
      this.$emit("input", index);
      this.scrollLeft = this.$refs.scrollLi[index].offsetLeft;
    },
  },
  watch: {
    value: {
      handler(newValue, oldValue) {
        //推荐标签界面
        if (newValue == 0) this.$router.push({ name: "homeList" });

        // 其他标签界面
        if (newValue != 0) {
          this.$router.push({
            name: "goodsList",
            params: { id: this.cate_list[this.value].id },
          });
        }
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss">
.homeNav_wrap {
  width: 100%;
  display: flex;

  .select {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-size: 30px;
      color: #666;
    }
  }
}

.homeNav {
  box-sizing: border-box;
  width: 650px;
  padding-left: 30px;
  ul {
    display: flex;
    flex-wrap: nowrap;
    width: max-content;
    height: 60px;
    align-items: center;
    li {
      box-sizing: border-box;
      margin-left: 22px;
      padding: 0 16px;
      font-size: 28px;
      height: 60px;
      line-height: 60px;
      color: #333;
      &:nth-of-type(1) {
        margin-left: 0px;
      }
    }
    .light {
      color: #dd1a21;
      border-bottom: 4px solid #dd1a21;
    }
  }
}
</style>