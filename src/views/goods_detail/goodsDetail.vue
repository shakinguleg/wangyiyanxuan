<template>
  <div class="goods_detail">
    <div class="header">
      <span class="iconfont icon-zhuye" @click="back"></span>
      <div class="center_wrap">
        <span class="title">网易严选</span>
        <span class="iconfont icon-sousuo"></span>
      </div>
      <span class="iconfont icon-gouwuchedaohanglan"></span>
    </div>

    <div class="detail_page">
      <!-- 商品详情界面 -->
      <div class="detail_wrap">
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
          <div class="test">111</div>
        </div>

        <!-- 个人选择 -->
        <div class="select">
          <selectPage class="select_page" v-model="isShow">
            <template>
              <div class="selected">
                <span>已选择</span>
                <span>g黑色选择</span>
                <span class="iconfont"></span>
              </div>
            </template>
          </selectPage>
        </div>

        <!-- 广告轮播图 -->
        <div class="adBanner"></div>

        <!-- 用户评价 -->
        <div class="evalu"></div>
      </div>
    </div>

    <div class="bottom">
      <span class="server iconfont icon-kefu" v-if="!isShow"></span>
      <span class="server" v-if="isShow" @click="isShow= false">返回</span>

      <span class="bottom_center">立即购买</span>
      <span class="add" @click="addCart">加入购物车</span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import selectPage from "./component/select_page";

export default {
  components: {
    selectPage,
  },
  data() {
    return {
      width: "100%",
      height: "750px",
      isShow: false,
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
    addCart() {
      // 加入购物车逻辑
      this.$store.commit("goodsDetail/sendTolocalStore");
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
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 3;

  // 头部
  .header {
    position: absolute;
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

  // 中间页面
  .detail_page {
    position: absolute;
    top: 88px;
    bottom: 106px;
    width: 100%;
    left: 0;

    // 弹出的商品规格选择
    .select_goods {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: #999;
      z-index: 3;
    }

    // 商品页面
    .detail_wrap {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      background-color: rgb(244, 244, 244);
      overflow: scroll;
      z-index: 2;

      .swiper {
        width: 100%;
      }

      // 优惠券提示
      .top_text {
        width: 100%;
        height: 60px;
        box-sizing: border-box;
        padding: 12px 30px;
        font-size: 24px;
        color: #f48f18;
        background-color: #fff0dd;
      }

      // 价格,推荐理由
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

      // 各种促销优惠
      .discount_select {
        width: 100%;
        background-color: #f48f18;
        .test {
          width: 100%;
          height: 1000px;
        }
      }

      .select {
        width: 100%;
        .select_page {
          width: 100%;
          .selected {
            height: 105px;
          }
        }
      }
    }
  }

  .bottom {
    box-sizing: border-box;
    height: 106px;
    width: 100%;
    display: flex;
    background-color: white;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid #c7c7c7;
    span {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      font-size: 28px;
    }
    .icon-kefu {
      width: 154px;
      font-size: 48px;
      color: #999;
    }

    .server {
      width: 154px;
      color: #333;
    }
    .bottom_center {
      width: 296px;
      border-left: 1px solid #c7c7c7;
      color: #333;
    }
    .add {
      flex: 1;
      background-color: #dd1a21;
      color: white;
      border: 1px solid #dd1a21;
    }
  }
}
</style>