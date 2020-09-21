<template>
  <scroll class="homeNav">
    <ul>
      <li v-for="item in homeNavData" :key="item.id">{{item.name}}</li>
    </ul>
  </scroll>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "homeNav",
  mounted() {
    this.$store.dispatch("homeNav/getData");
  },
  computed: {
    ...mapState({
      homeNavData: (state) => [{ name: "推荐", id: 11 }, ...state.homeNav.data],
    }),
  },
};
</script>

<style lang="scss">
.homeNav {
  ul {
    display: flex;
    flex-wrap: nowrap;
    width: max-content;
    li {
      width: 144px;
      margin-left: 20px;
    }
  }
}
</style>