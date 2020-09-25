<template>
  <div class="cart">
    <div class="header">
      <span>购物车</span>
      <span>领券</span>
      <span>编辑</span>
    </div>

    <!-- 选中商品列表 -->
    <div class="goods_wrap">
      <!-- 优惠 -->
      <div class="advan" v-show="totalRetail < 99">
        <div class="block" v-for="(item, index) in advan" :key="index">
          <span class="dot"></span>
          <span class="text">{{ item }}</span>
        </div>
      </div>
      <div class="getAdv" v-show="totalRetail >= 99">已满足免邮条件</div>

      <!-- 每类商品 -->
      <div
        class="goods"
        v-for="item in goodsArr"
        :key="item.itemSkuSpecValueList[0].skuId"
      >
        <div class="info">
          <div class="check" @click="isSelected">
            <myCheckbox v-model="size" ref="ck"></myCheckbox>
          </div>
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
              <div class="num">
                <span @click="redNum(item.itemSkuSpecValueList[0].skuId)"
                  >-</span
                >
                <span>{{ item.num }}</span>
                <span @click="proNum(item.itemSkuSpecValueList[0].skuId)"
                  >+</span
                >
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="tishi"></div> -->
      </div>
    </div>

    <!-- 下单 -->
    <div class="buy_wrap">
      <div>
        <div @click="selectTotal">
          <myCheckbox v-model="size" ref="all"></myCheckbox>
        </div>
        <span class="total_num"
          >已选(<span>{{ totalNum }}</span
          >)</span
        >
      </div>
      <div>
        <span class="total_price">合计:￥{{ totalRetail }}</span>
        <span
          class="total_count"
          v-show="totalRetail != -totalCounte && totalCounte != 0"
          >已优惠:￥{{ -totalCounte }}</span
        >
      </div>
      <div class="buy" :class="{ light: totalNum }">下单</div>
    </div>
  </div>
</template>

<script>
import components from "../../components";

export default {
  components: {
    [components.checkbox.name]: components.checkbox,
  },
  data() {
    return {
      goodsArr: [], //购物车商品
      size: "0.4rem", //选中框大小
      isTotal: false, //是否全选
      orderList: {}, // 结算订单
      totalRetail: 0, //实际价格
      totalCounte: 0, //折扣价格
      totalNum: 0, //选择总数
      advan: ["30天无忧退货", "48小时快速退款", "满99元免邮费"],
    };
  },
  methods: {
    // 数量加一
    redNum(id) {
      this.modifyGoodsInfo(id, "red");
      this.isSelected();
    },
    // 数量减一
    proNum(id) {
      this.modifyGoodsInfo(id, "add");
      this.isSelected();
    },

    // 修改商品数量
    modifyGoodsInfo(id, str) {
      // 检测购物车中是否已经有该商品
      var goods = window.localStorage.getItem("goodsInfo");
      goods = JSON.parse(goods);
      if (goods[id]) {
        if (str != "add" && goods[id].num > 1) {
          goods[id].num -= 1;
        } else if (str == "add") {
          goods[id].num += 1;
        }
      }
      window.localStorage.setItem("goodsInfo", JSON.stringify(goods));
      this.goodsArr = Object.values(goods);
    },

    // 更新商品状态,添加订单
    isSelected() {
      // 判断全选
      var arr = this.$refs.ck.map((item) => {
        return item.isShow;
      });
      const selectedGoods = arr.filter((item) => {
        return item == true;
      });

      if (selectedGoods.length == this.goodsArr.length) {
        this.isTotal = true;
      } else {
        this.isTotal = false;
      }

      this.orderList = {};
      arr.filter((item, index) => {
        if (item == true) {
          const orderObj = JSON.parse(localStorage.getItem("goodsInfo"));
          const keys = Object.keys(orderObj)[index];
          const values = orderObj[keys];
          this.orderList[keys] = values;
        }
      });
    },

    // 全选
    selectTotal() {
      this.isTotal = !this.isTotal;
      this.$refs.ck.map((item) => (item.isShow = this.isTotal));
      this.isSelected();
    },
  },

  watch: {
    orderList: {
      handler() {
        // 监测结算订单状态, 统计总价
        const retailArr = Object.values(this.orderList).map(
          (item) => item.retailPrice * item.num
        );

        this.totalRetail = retailArr.reduce(
          (previous, current) => previous + current,
          0
        );
        const counteArr = Object.values(this.orderList).map(
          (item) => item.counterPrice * item.num
        );

        const counte = retailArr.map((item, index) => item - counteArr[index]);

        this.totalCounte = counte.reduce(
          (previous, current) => previous + current,
          0
        );

        this.totalNum = Object.values(this.orderList)
          .map((item) => item.num)
          .reduce((previous, current) => previous + current, 0);
      },
      deep: true,
    },

    isTotal: {
      handler(newVal) {
        this.$refs.all.isShow = newVal;
      },
    },
  },
  mounted() {
    const goodsList = window.localStorage.getItem("goodsInfo");
    this.goodsArr = Object.values(JSON.parse(goodsList));
  },
};
</script>

<style lang="scss" scoped>
.cart {
  width: 100%;
  height: calc(100% - 97px);
  background-color: #eee;
  position: relative;
  top: 0;
  bottom: 88px;

  .header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    padding: 0 30px;
    top: 0;
    left: 0;
    display: flex;
    height: 88px;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    span {
      font-size: 30px;
      &:nth-of-type(1) {
        width: 540px;
        font-size: 40px;
      }
      &:nth-of-type(2) {
        color: #dd1a21;
      }
      &:nth-of-type(3) {
        color: #333;
      }
    }
  }

  // 选中商品列表
  .goods_wrap {
    position: absolute;
    top: 88px;
    bottom: 118px;
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow: scroll;
    // 优惠
    .advan {
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 70px;
      flex-shrink: 0;
      
      .block {
        display: flex;
        align-items: center;
        .dot {
          width: 10px;
          height: 10px;
          margin-right: 5px;
          border-radius: 50%;
          background-color: #ccc;
        }
        .text {
          font-size: 24px;
        }
      }
    }

    // 获得优惠
    .getAdv {
      height: 80px;
      padding: 0 30px;
      color: #f48f18;
      font-size: 30px;
      flex-shrink: 0;
      background-color: #fff8d8;
      line-height: 80px;
      margin-bottom: 20px;
    }

    .goods {
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;
      background-color: white;
      width: 100%;
      padding: 34px 0;

      .info {
        display: flex;
        .check {
          height: 172px;
          width: 86px;
          display: flex;
          justify-content: center;
          align-items: center;
          span {
            box-sizing: border-box;
            font-size: 30px;
            color: #dd1a21;
            border: 1px solid #666;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            position: relative;
            &::before {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
          }
        }
        .img {
          width: 172px;
          height: 172px;
          background-size: cover;
          flex-shrink: 0;
          background-color: #eee;
        }
        .right {
          width: 442px;
          height: 220px;
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
              height: 54px;
              display: flex;
              span {
                display: flex;
                box-sizing: border-box;
                justify-content: center;
                align-items: center;
                width: 58px;
                height: 100%;
                border: 1px solid #999;
                font-size: 26px;
              }
            }
          }
        }
      }
      .tishi {
        height: 72px;
        width: 100%;
      }
    }
  }

  .buy_wrap {
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    height: 118px;
    width: 100%;
    padding-left: 30px;
    box-sizing: border-box;
    background-color: white;
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 28px;

      &:nth-of-type(1) {
        .total_num {
          margin-left: 10px;
          color: #7f7f7f;
        }
      }
      &:nth-of-type(2) {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;
        padding-right: 10px;
        color: #dd1a21;
        font-size: 28px;
        .total_count {
          text-decoration: line-through;
          font-size: 22px;
          color: #7f7f7f;
        }
      }
      &:nth-of-type(3) {
        width: 226px;
        background-color: #ccc;
        color: white;
      }
    }
    .light {
      background-color: #dd1a21 !important;
    }
  }
}
</style>