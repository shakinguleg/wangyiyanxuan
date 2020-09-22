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
    scrollLeft: {
      type: Number,
      default: 30,
    },
  },

  mounted() {
    this.scroll = new IScroll(this.$refs.scroll, {
      bounce: true,
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
  watch: {
    scrollLeft: {
      handler() {
        this.scroll.scrollTo(-this.scrollLeft, 0);
      },
    },
  },
};
</script>

<style>
.scroll_wrap {
  overflow: hidden;
  touch-action: none;
}

.scroll_view {
  width: max-content;
}
</style>