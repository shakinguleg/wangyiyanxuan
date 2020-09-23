<template>
  <div class="goods_detail">
    <div class="header">
      <span class="iconfont icon-zhuye"></span>
      <div class="center_wrap">
        <span class="title">网易严选</span>
        <span class="iconfont icon-sousuo"></span>
      </div>
      <span class="iconfont icon-gouwuchedaohanglan"></span>
    </div>
    <!-- 轮播图 -->
    <swiper class="swiper" :width="width" :height="height" v-model="goodsDetail.bannerUrl"></swiper>

    <!-- 活动-->
    <div class="prom"></div>

    <!-- 领券 -->
    <div class="top_text" v-if="goodsDetail.promoTip">{{goodsDetail.promoTip}}</div>
    <!-- 商品价格、推荐理由 -->
    <div class="sail_info">
      <div class="sail_price">￥{{goodsDetail.retailPrice}}</div>

      <!-- 推荐理由 -->
      <div class="recommend">
        <div class="wrap">
          <div class="name">{{goodsDetail.name}}</div>
          <span class="re_text">推荐理由</span>
        </div>
        <ul>
          <li v-for=" (item,index) in goodsDetail.recommendReason" :key="index">
            <span>{{index}}</span>
            <div>{{item}}</div>
          </li>
        </ul>
        <!-- 好评率 -->
        <div class="goodRate">
          <span class="rate">{{goodsDetail.goodCmtRate}}</span>
          <span class="text">好评率</span>
          <span class="iconfont"></span>
        </div>
      </div>
    </div>

    <!-- 优惠返利 -->
    <div class="discount_select">
      <div></div>
    </div>

    <!-- 个人选择 -->
    <div class="select"></div>

    <!-- 广告轮播图 -->
    <div class="adBanner"></div>

    <!-- 用户评价 -->
    <div class="evalu"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      width: "100%",
      height: "750px",
    };
  },
  computed: {
    ...mapState({
      goodsDetail: (store) => store.goodsDetail.goodsDetail,
    }),
  },
  methods: {
    back() {
      this.$router.back();
    },
  },
  watch: {
    "$route.params.id": {
      handler(newVal) {
        this.$store.dispatch("goodsDetail/getGoodsDetail", { id: newVal });
      },
      immediate: true,
    },
  },
  mounted() {
    // var div = document.createElement("div");
    // div.innerHTML = this.picHtml;
    // this.$refs.photo.append(div);
  },
};
</script>

<style lang="scss" scoped>
.goods_detail {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(244, 244, 244);
  .header {
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
      .title{
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

  .swiper {
    width: 100%;
  }
  .top_text {
    width: 100%;
    height: 60px;
    box-sizing: border-box;
    padding: 12px 30px;
    font-size: 24px;
    color: #f48f18;
    background-color: #fff0dd;
  }
  .sail_info {
    background-color: white;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    padding: 26px 0 36px 30px;
    .sail_price {
      width: 100%;
      font-size: 54px;
      color: #dd1a21;
    }

    .recommend {
      position: relative;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      .wrap {
        width: 100%;
        .name {
          font-size: 32px;
          color: #333;
          font-weight: bold;
          margin-bottom: 4px;
        }
        .re_text {
          height: 32px;
          line-height: 32px;
          font-size: 24px;
          color: #333;
        }
      }
      ul {
        margin-top: 12px;
        width: 648px;
        padding: 14px 20px;
        background-color: #fafafa;
        border: 1px solid #e6e6e6;
        li {
          display: flex;
          font-size: 24px;
          height: 32px;
          line-height: 32px;
        }
      }
      .goodRate {
        width: 178px;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        top: 0;
        right: 0;
        .rate {
          color: #dd1a21;
          font-size: 32px;
        }
        .text {
          color: #7f7f7f;
          font-size: 24px;
        }
      }
    }
  }
}
</style>