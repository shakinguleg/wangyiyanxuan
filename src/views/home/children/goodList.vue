<template>
  <div class="good_list page">
    <swiper v-model="bannerUrl" :width="width" :height="height"></swiper>
    <!-- 所有商品分类列表项 -->
    <div class="category" v-for="(item,index) in itemList" :key="index">
      <!-- 商品分类 -->
      <div class="category_item">
        <!-- 商品分类标题 -->
        <title>
          <span class="title">{{item.category.title}}</span>
          <span class="desc">{{item.category.frontName}}</span>
        </title>
        <!-- 该分类的商品 -->
        <div class="goods_wrap">
          <!-- 商品 -->
          <div
            class="goods"
            v-for="i_item in item.itemList"
            :key="i_item.id"
            @click="toGoodsDetail(i_item.id)"
          >
            <div class="img_wrap">
              <img v-lazy="i_item.listPicUrl" alt />
              <span class="desc">{{i_item.simpleDesc}}</span>
            </div>
            <span class="name">{{i_item.name}}</span>
            <div class="price">￥{{i_item.retailPrice}}</div>
            <div class="count" v-if="i_item.itemTagList.length>=1">{{i_item.itemTagList[0].name}}</div>
          </div>
        </div>
      </div>
    </div>

    <!--  kingkong模块 -->
    <div></div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      cate: {},
      bannerUrl: [],
      width: "100%",
      height: "3.94667rem",
    };
  },
  computed: {
    ...mapState({
      bannerList: (store) => store.homeNav.bannerList,
      itemList: (store) => store.homeNav.itemList,
    }),
  },
  methods: {
    toGoodsDetail(id) {
      this.$router.push({ name: "goods_detail", params: { id } });
    },
  },
  mounted() {},
  watch: {
    "$route.params.id": {
      handler(newVal) {
        // 获取当前标签页数据
        this.$store.dispatch("homeNav/getCurrentCateList", {
          __timestamp: Date.now(),
          categoryId: newVal,
        });
      },
      immediate: true,
      deep: true,
    },
    bannerList: {
      handler() {
        this.bannerUrl = this.bannerList.map((item) => item.picUrl);
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.good_list {
  width: 100%;
  height: 100%;
  background-color: white;
}

.category {
  width: 100%;
  // 商品分类
  .category_item {
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    // 商品分类标题
    title {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      height: 120px;
      .title {
        font-size: 32px;
      }
      .desc {
        font-size: 24px;
      }
    }
    // 该分类的商品
    .goods_wrap {
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      justify-content: space-between;
      // 每个商品
      .goods {
        height: 543px;
        width: 345px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-bottom: 33px;
        .img_wrap {
          position: relative;
          img {
            width: 345px;
            height: 345px;
          }
          .desc {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            height: 48px;
            line-height: 42px;
            font-size: 24px;
            padding: 6px 10px 0;
            margin-bottom: 6px;
            color: #9f8a60;
            box-sizing: border-box;
            background-color: #f1ece2;
          }
        }
        .name {
          margin-top: 16px;
          font-size: 28px;
          color: #333;
        }
        .price {
          height: 48px;
          line-height: 48px;
          font-size: 32px;
          color: #dd1a21;
        }
        .count {
          font-size: 18px;
          color: #dd1a21;
          margin: 4px 0 12px 0;
        }
      }
    }
  }
}
</style>