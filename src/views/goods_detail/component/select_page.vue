<template>
  <div class="select_page">
    <!-- 选项 -->
    <div class="item_show" @click="switchShow">
      <slot></slot>
    </div>

    <!-- 选择商品款式界面-->
    <div class="page" v-show="value">
      <!-- 所选择商品信息和照片 -->
      <div class="goodsInfo">
        <div class="goods_img" :style="{'background-image':`url(${picUrl})`}"></div>
        <div class="right">
          <span v-if="promotionDesc" class="newerCounter">{{promotionDesc}}</span>
          <div class="price">
            <span
              class="counterPrice"
              :class="{'sailPrice':retailPrice==counterPrice}"
            >价格:&nbsp;￥{{retailPrice}}</span>
            <span class="retailPrice" v-if="retailPrice!=counterPrice">￥{{counterPrice}}</span>
          </div>
          <span
            class="selected_type"
            v-if="selectedId.length>0"
          >已选择:&nbsp; &nbsp;{{selectedValue.toString()}}</span>
          <span class="selected_type" v-else>已选择:&nbsp; &nbsp;请选择规格数量</span>
        </div>
      </div>

      <!-- 款式选择 -->
      <div class="sku_wrap" v-for="item in skuSpecList" :key="item.id">
        <div class="select_name">{{item.name}}</div>
        <div class="select_item_wrap">
          <div
            class="select_item"
            v-for="type in item.skuSpecValueList"
            :key="type.id"
            :class="{light:selectedId.findIndex(item=>item==type.id)!=-1}"
            @click="selectedGoods(type.skuSpecId, type.id, type.value, type.picUrl)"
          >{{type.value}}</div>
        </div>
      </div>

      <!-- 商品数量 -->
      <div class="num">
        <span class="num_name">数量</span>
        <div class="num_op">
          <span @click="redNum">-</span>
          <input v-model.number="num" type="number" step="1" />
          <span @click="proNum">+</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "selectPage",
  props: {
    value: false,
  },
  data() {
    return {
      selected: {},
      selectedId: [], //选择的组合id
      selectedValue: "",
      num: 1,
      picUrl: "",
      retailPrice: "", //优惠价
      counterPrice: "", //原价
      promotionDesc: "", //新人专享描述
      id: "", //商品查询的id
    };
  },
  computed: {
    ...mapState({
      skuSpecList: (store) => store.goodsDetail.goodsDetail.skuSpecList,
      skuMap: (store) => store.goodsDetail.goodsDetail.skuMap,
    }),
  },
  methods: {
    // 当前选中项
    selectedGoods(skuId, id, value, picUrl) {
      this.selected[skuId] = {
        id,
        value,
      };

      this.selectedId = Object.values(this.selected).map((item) => item.id);
      this.selectedValue = Object.values(this.selected).map(
        (item) => item.value
      );

      if (picUrl) this.picUrl = picUrl;
      Object.keys(this.skuMap).map((item) => {
        var a = item.split(";");
        if (a.sort().toString() == this.selectedId.sort().toString()) {
          this.mapGoodsInfo(item, "noInit");
        }
      });
    },
    // 改变选购页显示与否
    switchShow() {
      this.$emit("input", !this.value);
    },

    // 数量加一
    redNum() {
      if (this.num <= 1) {
        return;
      }
      this.num--;
    },
    // 数量减一
    proNum() {
      this.num++;
    },
    //根据颜色和大小组等合获得当前商品数据(价格图片之类)
    mapGoodsInfo(item, str) {
      let selected_info = this.skuMap[item];
      // 获取图片ID
      if (selected_info.pic) this.picUrl = selected_info.pic;
      if (selected_info.retailPrice)
        this.retailPrice = selected_info.retailPrice;
      if (selected_info.counterPrice)
        this.counterPrice = selected_info.counterPrice;
      if (selected_info.promotionDesc)
        this.promotionDesc = selected_info.promotionDesc;
      if (str == "init") return;
      if (selected_info.id) this.id = selected_info.id;
    },
  },
  watch: {
    skuSpecList: {
      // 初始化选购页数据
      handler() {
        var arr = this.skuSpecList.map((item) => {
          return item.skuSpecValueList[0].id;
        });
        arr = arr.join(";");
        this.mapGoodsInfo(arr, "init");
      },
    },
    id: {
      // 向仓库提交选择的物品id
      handler(newVal) {
        this.$store.commit("goodsDetail/setGoodsId", newVal);
        
      },
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.select_page {
  width: 100%;
  .item_show {
    width: 100%;
    background-color: lightcyan;
  }

  // 商品选择界面
  .page {
    box-sizing: border-box;
    padding: 33px 30px;
    position: fixed;
    width: 100%;
    top: 88px;
    left: 0;
    bottom: 106px;
    background-color: white;
    z-index: 3;
    // 照片, 价格信息
    .goodsInfo {
      width: 100%;
      display: flex;
      .goods_img {
        width: 196px;
        height: 198px;
        flex-shrink: 0;
        background-size: cover;
        background-color: #f4f4f4;
      }
      .right {
        flex: 1;
        width: 0;
        margin-left: 20px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;

        // 新人专享价
        .newerCounter {
          background-color: #f48f18;
          color: white;
          width: 120px;
          height: 32px;
          line-height: 32px;
          padding: 0 10px;
          margin-bottom: 8px;
        }
        .price {
          height: 42px;
          line-height: 42px;
          margin-bottom: 4px;
          .counterPrice {
            color: #dd1a21;
            font-size: 28px;
          }
          .retailPrice {
            margin-left: 10px;
            text-decoration: line-through;
            font-size: 24px;
            color: #999;
          }
        }
        .selected_type {
          position: relative;
          font-size: 28px;
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }

    // 款式选择
    .sku_wrap {
      width: 100%;
      .select_name {
        width: 100%;
        font-size: 28px;
        height: 39px;
        line-height: 39px;
        padding-bottom: 12px;
      }
      .select_item_wrap {
        margin-bottom: 20px;
        .select_item {
          display: inline-block;
          height: 72px;
          line-height: 72px;
          font-size: 28px;
          padding: 0 24px;
          margin: 0 30px 20px 0;
          border: 1px solid #333;
        }
        .light {
          color: #dd1a21;
          border: 1px solid #dd1a21;
        }
      }
    }

    // 数量选择
    .num {
      display: flex;
      flex-direction: column;

      .num_name {
        width: 100%;
        font-size: 28px;
        height: 39px;
        line-height: 39px;
        padding-bottom: 12px;
      }
      .num_op {
        display: flex;

        span {
          width: 90px;
          height: 66px;
          border: 1px solid #999;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 24px;
        }
        input {
          width: 139px;
          height: 66px;
          border: 1px solid #999;
          display: flex;
          text-align: center;
          font-size: 24px;
        }
      }
    }
  }
}
</style>