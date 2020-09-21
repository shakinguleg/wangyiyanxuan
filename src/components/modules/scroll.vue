<template>
  <div class="scroll_wrap" ref="scroll">
    <div class="scroll_view">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    scrollX: {
      type: Boolean,
      default: false,
    },
    scrollY: {
      type: Boolean,
      default: true,
    },
  },

  mounted() {
    this.scroll = new IScroll(this.$refs.scroll, {
      bounce: false,
      click: true,
      tap: true,
      scrollX: this.scrollX,
      scrollY: this.scrollY,
      probeType: 1,
    });
    this.scroll.on("beforeScrollStart", () => {
      this.scroll.refresh();
    });
  },
};
</script>

<style>
.scroll_wrap {
  overflow: hidden;
}
</style>