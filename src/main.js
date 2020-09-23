import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'

import erro from './assets/erro.jpg';
import loading from './assets/loading.gif';

import scroll from './components/modules/scroll.vue';
import swiper from "./views/home/component/swiper.vue";
Vue.component("scroll", scroll)
Vue.component("swiper", swiper)

Vue.use(VueLazyload)

// or with options
// 懒加载插件配置
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: erro,
  loading: loading,
  attempt: 1
})


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
