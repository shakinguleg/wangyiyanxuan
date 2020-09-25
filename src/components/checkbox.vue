<template>
  <div
    class="checkbox"
    :style="{ width: value, height: value }"
    @click="isShow = !isShow"
  >
    <span
      class="iconfont icon-da"
      :style="{ 'font-size': value }"
      v-show="isShow"
    ></span>
  </div>
</template>

<script>
export default {
  name: "myCheckbox",
  data() {
    return {
      isShow: false,
    };
  },
  props: {
    value: { type: String, default: "0.4rem" },
  },
};
</script>

<style lang="scss" scoped>
.checkbox {
  box-sizing: border-box;
  color: #dd1a21;
  border: 1px solid #666;
  border-radius: 50%;
  position: relative;
  span {
    &::before {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>