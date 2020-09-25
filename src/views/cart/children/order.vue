<template>
  <div class="order">
    <shopHeader></shopHeader>
    <div class="order_page">
      <div
        class="spacer"
        :style="{ 'background-image': 'url(/assets/spacer.jpg)' }"
      ></div>

      <!-- 地址选择 -->
      <div class="person_info">
        <div class="left">
          <span class="name">周卓群</span>
          <span class="default">默认</span>
        </div>
        <div class="info">
          <span class="phone">182****4696</span>
          <span class="location">广东省深圳市宝安区西部硅谷</span>
        </div>
        <span class="iconfont icon-jiantou-down"></span>
      </div>

      <!-- 商品价格 -->
      <div class="price">
        <div>
          <span>商品合计</span><span>￥{{ totalRetail - totalCounte }}</span>
        </div>
        <div><span>邮费</span><span>￥0</span></div>
        <div>
          <span>活动优惠</span><span>-￥{{ -totalCounte }}</span>
        </div>
        <div><span>优惠券</span><span>-￥0.0</span></div>
        <div><span>新人红包</span><span>￥0</span></div>
        <div>
          <input type="checkbox" />
          <span class="context">我要开发票</span>
          <span class="iconfont icon-jiantou-down"></span>
        </div>
      </div>

      <!-- 包裹数 -->
      <div class="package">
        <goodsItem :goodsArr="orderList"></goodsItem>
      </div>
    </div>
    <div class="bottom">
      <span>应付:￥{{ totalRetail }}</span>
      <span>提交订单</span>
    </div>
  </div>
</template>

<script>
import shopHeader from "../../../components/shop_header";
import goodsItem from "./goods_item";
import { mapState } from "vuex";

export default {
  components: {
    shopHeader,
    goodsItem,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      orderList: (store) => store.cart.orderList,
      totalCounte: (store) => store.cart.totalCounte,
      totalRetail: (store) => store.cart.totalRetail,
    }),
  },
};
</script>

<style lang='scss' scoped>
.order {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 4;
  background-color: white;

  .order_page {
    background-color: #eee;
    position: absolute;
    top: 88px;
    width: 100%;
    bottom: 95px;
    overflow: auto;
    .spacer {
      width: 100%;
      height: 10px;
      margin-top: 20px;
      background-repeat: repeat-x;
      background-size: contain;
    }
    .person_info {
      box-sizing: border-box;
      width: 100%;
      height: 150px;
      padding: 40px 30px;
      background-color: white;
      display: flex;
      margin-bottom: 20px;
      .left {
        width: 120px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        span {
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-start;
          &:nth-of-type(1) {
            font-size: 28px;
            margin-bottom: 5px;
          }
          &:nth-of-type(2) {
            font-size: 20px;
            color: #dd1a21;
            border: 2px solid #dd1a21;
          }
        }
      }
      .info {
        width: 530px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        .phone {
          font-size: 28px;
        }
        .location {
          font-size: 24px;
        }
      }
      .icon-jiantou-down {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        font-size: 28px;
        transform: rotate(-90deg);
      }
    }

    .price {
      box-sizing: border-box;
      width: 100%;
      display: flex;
      padding: 0 30px;
      flex-direction: column;
      background-color: white;
      margin-bottom: 20px;
      div {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #d9d9d9;
        &:nth-of-type(6) {
          border-bottom: none;
          input {
            width: 36px;
            height: 36px;
          }
          .context {
            flex: 1;
            margin-left: 20px;
          }
          .icon-jiantou-down {
            width: 50px;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 28px;
            transform: rotate(-90deg);
          }
        }

        span {
          font-size: 28px;
          height: 104px;
          line-height: 104px;
        }
      }
    }
  }
  .bottom {
    width: 100%;
    height: 95px;
    position: absolute;
    bottom: 0;
    display: flex;

    span {
      display: flex;
      align-items: center;
      &:nth-of-type(1) {
        flex: 1;
        height: 100%;
        padding-left: 30px;
        font-size: 32px;
        color: #dd1a21;
      }
      &:nth-of-type(2) {
        justify-content: center;
        font-size: 28px;
        width: 226px;
        height: 100%;
        background-color: #dd1a21;
        color: white;
      }
    }
  }
}
</style>