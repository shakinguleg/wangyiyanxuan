import Vue from 'vue'
import Vuex from 'vuex'

// 首页仓库导入
import home from '../views/home/store/home';
import homeNav from '../views/home/store/homeNav';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    home,
    homeNav
  }
})
