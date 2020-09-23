import Vue from 'vue'
import Vuex from 'vuex'

// 首页仓库导入
import home from '../views/home/store/home';
import homeNav from '../views/home/store/homeNav';

// 详情页数据导入
import goodsDetail from '../views/goods_detail/store/goods_detail';


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
    homeNav,
    goodsDetail
  }
})
