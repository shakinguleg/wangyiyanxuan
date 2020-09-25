<template>
  <div class="homeList_wrap page">
    <!-- 轮播图 -->
    <swiper class="swiper_width" v-model="bannerUrl" :width="width" :height="height"></swiper>

    <!-- 平台优势 -->
    <div class="policy">
      <li v-for="(item,index) in policy" :key="index">
        <span :style="{'background-image':`url(${item.icon})`}"></span>
        <span>{{item.desc}}</span>
      </li>
    </div>

    <!-- 主打 -->
    <div class="kingKong">
      <li class="block" v-for="(item,index) in kingKong.kingKongList" :key="index">
        <div :style="{'background-image':`url(${item.picUrl})`}"></div>
        <span>{{item.text}}</span>
      </li>
    </div>

    <!-- 优惠 -->
    <div class="promotion" :style="{'background-color':`#${bigPromotion.backgroundColor}`}">
      <!-------------------------- 点击之后还要去不同的页面 ------------------------->
      <ul v-for="(item,index) in bigPromotion.floorList" :key="index">
        <li
          v-for="(cell,i) in item.cells "
          :key="i"
          :style="{'background-image':`url(${cell.picUrl})`}"
        ></li>
      </ul>
    </div>

    <div class="pageContent">
      <!-- 新人专享 -->
      <div></div>
      <!-- 类目热销榜 -->
      <div class="hot">
        <div class="title">
          <span>类目热销榜</span>
        </div>

        <div class="content">
          <li v-for="(item,index) in categoryHot.categoryList" :key="index">
            <title>{{item.categoryName}}</title>
            <span :style="{'background-image':`url(${item.picUrl})`}"></span>
          </li>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      // 暂时拿不到首页轮播图数据
      bannerList: [
        {
          picUrl:
            "https://yanxuan.nosdn.127.net/d8c8dee5e4faed42aa4d8b08db6a6926.jpg?type=webp&imageView&quality=75&thumbnail=750x0",
        },
        {
          picUrl:
            "https://yanxuan.nosdn.127.net/431d859982dfe732edd3f92d5b308a7a.png?type=webp&imageView&quality=75&thumbnail=750x0",
        },
        {
          picUrl:
            "https://yanxuan.nosdn.127.net/1059736611334f6ea531057a918dfaff.jpg?type=webp&imageView&quality=75&thumbnail=750x0",
        },
      ],
      width: "100%",
      height: "3.94667rem",
      bannerUrl: [],
    };
  },
  computed: {
    ...mapState({
      policy: (store) => store.home.policy,
      kingKong: (store) => store.home.kingKong,
      bigPromotion: (store) => store.home.bigPromotion,
      categoryHot: (store) => store.home.categoryHot,
    }),
  },
  mounted() {},
  watch: {
    bannerList: {
      handler() {
        // 拿到轮播图url地址
        this.bannerUrl = this.bannerList.map((item) => item.picUrl);
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.homeList_wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.swiper_width {
  width: 100%;
}

// 平台优势
.policy {
  background-color: white;
  display: flex;
  justify-content: space-around;
  width: 690px;
  padding:0 30px;
  li {
    width: 33%;
    height: 72px;
    display: flex;
    align-items: center;
    span {
      &:nth-of-type(1) {
        width: 32px;
        height: 32px;
        background-size: cover;
      }
      &:nth-of-type(2) {
        margin-left: 8px;
        font-size: 24px;
      }
    }
  }
}

// 主打
.kingKong {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 32px;
  background-color: white;
  .block {
    width: 20%;
    height: 156px;
    box-sizing: border-box;
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    div {
      width: 110px;
      height: 110px;
      background-size: cover;
    }
  }
}

// 优惠
.promotion {
  height: 750px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  ul {
    width: 100%;
    display: flex;
    justify-content: center;
    &:nth-of-type(1) {
      li {
        width: 100%;
        height: 321px;
        background-size: cover;
        background-repeat: no-repeat;
      }
    }
    &:nth-of-type(2) {
      li {
        height: 160px;
        width: 710px;
        background-size: cover;
        background-repeat: no-repeat;
      }
    }
    &:nth-of-type(3) {
      display: flex;
      justify-content: space-around;
      width: 710px;
      li {
        margin-top: 10px;
        height: 231px;
        width: 220px;
        background-size: 220px;
        background-repeat: no-repeat;
      }
    }
  }
}

// 类目热销榜
.hot {
  box-sizing: border-box;
  width: 100%;
  padding: 0 30px;
  margin-top: 20px;
  background-color: white;
  .title {
    width: 690px;
    font-size: 32px;
    height: 100px;
    line-height: 100px;
  }
  .content {
    width: 690px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-bottom: 20px;
    li {
      width: 165px;
      height: 180px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      background-color: #f5f5f5;
      margin-bottom: 10px;
      title {
        display: inline;
        font-size: 24px;
      }
      span {
        width: 120px;
        height: 120px;
        background-size: cover;
      }

      &:nth-of-type(1) {
        width: 340px;
        height: 200px;
        flex-direction: row;
        align-items: center;
        background-color: #f9f3e4;
        title {
          box-sizing: border-box;
          flex: 1;
          padding-left: 24px;
          font-size: 28px;
          position: relative;
          &::before {
            content: "";
            width: 48px;
            height: 4px;
            background-color: #333;
            position: absolute;
            top: 120%;
            left: 24px;
          }
        }
        span {
          width: 200px;
          height: 100%;
        }
      }
      &:nth-of-type(2) {
        width: 340px;
        height: 200px;
        flex-direction: row;
        align-items: center;
        background-color: #ebeff6;

        title {
          box-sizing: border-box;
          flex: 1;
          padding-left: 24px;
          font-size: 28px;
          position: relative;
          &::before {
            content: "";
            width: 48px;
            height: 4px;
            background-color: #333;
            position: absolute;
            top: 120%;
            left: 24px;
          }
        }
        span {
          width: 200px;
          height: 100%;
        }
      }
    }
  }
}

.item_1_color {
  color: #f9f3e4;
}
.item_2_color {
  color: #ebeff6;
}
.item_color {
  color: #f5f5f5;
}
</style>