<template>
  <div class="search">
    <span class="iconfont icon-sousuo"></span>
    <span>
      搜索商品, 共
      <span>37662</span>款好物
    </span>
  </div>
</template>

<script>
export default {
  name: "search",
};
</script>

<style scoped lang="scss">
.search {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  height: 56px;
  background-color: #eee;
  color: #999;
  border-radius: 10px;
  .iconfont{
      font-size: 28px;
      margin-right: 10px;
  }
}
</style>