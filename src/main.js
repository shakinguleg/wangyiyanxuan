import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'

import scroll from './components/modules/scroll.vue';
Vue.component("scroll", scroll)

Vue.use(VueLazyload)

// or with options
// 懒加载插件配置
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: './error.png',
  loading: './assets/loading.gif',
  attempt: 1
})


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
