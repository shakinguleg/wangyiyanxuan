<template>
  <div>
    <!-- 每类商品 -->
    <div
      class="goods"
      v-for="item in goodsArr"
      :key="item.itemSkuSpecValueList[0].skuId"
    >
      <div class="info">
        <div
          class="img"
          :style="{
            'background-image': `url(${item.itemSkuSpecValueList[0].skuSpecValue.picUrl})`,
          }"
        ></div>
        <!-- 信息 -->
        <div class="right">
          <div class="title">
            <span>{{ item.promBanner.promoTitle }}</span
            >{{ item.skuTitle }}
          </div>
          <div class="selected_type">
            <span>{{ item.itemSkuSpecValueList[0].skuSpecValue.value }}</span>

            <span class="iconfont icon-jiantou-down"></span>
          </div>
          <div class="wrap">
            <div class="price">
              <span>￥{{ item.retailPrice * item.num }}</span>
              <span v-if="item.retailPrice != item.counterPrice"
                >￥{{ item.counterPrice * item.num }}</span
              >
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="tishi"></div> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goodsArr: {
      type: Object,
      default: [],
    },
  },
};
</script>

<style lang='scss' scoped>
.goods {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  background-color: white;
  width: 100%;
  padding: 20px 0;

  .info {
    display: flex;
    .img {
      width: 172px;
      height: 172px;
      background-size: cover;
      flex-shrink: 0;
      background-color: #eee;
    }
    .right {
      width: 442px;
      height: 172px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-left: 20px;
      .title {
        width: 100%;
        font-size: 28px;
        text-align-last: left;
        word-break: break-all;
        span {
          &:nth-of-type(1) {
            margin-right: 10px;
            height: min-content;
            color: #f48f18;
            word-break: keep-all;
          }
        }
      }
      .selected_type {
        font-size: 24px;
        color: #7f7f7f;
        padding: 0 10px;
        margin-top: 10px;
        border: 1px solid #efefef;
        background-color: #fafafa;
        span {
          &:nth-of-type(1) {
            max-width: 326px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          &:nth-of-type(2) {
            margin-left: 10px;
            font-size: 18px;
          }
        }
      }
      .wrap {
        margin-top: 10px;
        height: 54px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        .price {
          span {
            &:nth-of-type(1) {
              font-size: 28px;
              color: #333;
            }
            &:nth-of-type(2) {
              margin-left: 10px;
              font-size: 24px;
              color: #999;
              text-decoration: line-through;
            }
          }
        }
        .num {
        }
      }
    }
  }
  .tishi {
    height: 72px;
    width: 100%;
  }
}
</style>