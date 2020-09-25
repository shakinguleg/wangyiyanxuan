<template>
  <div class="pop_wrap">
    <!-- 点击处 -->
    <div @click="isShow = !isShow"><slot name="item"></slot></div>
    <!-- 弹出框 -->
    <transition>
      <div v-if="isShow" class="pop">
        <!-- 蒙板 -->
        <div class="mask" @click="isShow = !isShow"></div>
        <!-- 弹出内容 -->
        <div class="wrap">
          <div class="title">
            <slot name="title"></slot>
          </div>
          <div class="content">
            <slot name="content"></slot>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "邮费",
    },
  },

  data() {
    return {
      isShow: false,
    };
  },
};
</script>

<style lang='scss' scoped>
.pop {
  width: 100%;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 5;
  display: flex;
  flex-direction: column;

  .mask {
    flex: 1;
  }
  .wrap {
    position: relative;
    width: 750px;
    height: 750px;
    bottom: 0;
    background-color: white;
    display: flex;
    flex-direction: column;
    animation: pop 300ms 1;
    .title {
      width: 750px;
      height: 120px;
      padding: 32px;
      font-size: 32px;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
    }
    .content {
      width: 750px;
      flex: 1;
      padding: 52px 30px;
      box-sizing: border-box;
      overflow: auto;
    }
  }
}

@keyframes pop {
  0% {
    bottom: -750px;
  }
  100% {
    bottom: 0;
  }
}
@keyframes revPop {
  0% {
    bottom: 0px;
  }
  100% {
    bottom: -750px;
  }
}
</style>