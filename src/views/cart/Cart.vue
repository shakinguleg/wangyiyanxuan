<template>
  <div>111</div>
</template>

<script>
export default {
  mounted() {
    var a = window.localStorage.getItem("goodsInfo");
    console.log('a: ', JSON.parse(a));
  },
};
</script>

<style>
</style>