import Vue from 'vue'
import Vuex from 'vuex'

// 首页仓库
import home from '../views/home/store/home';
import homeNav from '../views/home/store/homeNav';

// 详情页数据
import goodsDetail from '../views/goods_detail/store/goods_detail';

// 购物车数据
import cart from '../views/cart/store/cart';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentIndex: 0
  },
  mutations: {
    setCurrentIndex(state, payload) {
      state.currentIndex = payload
    }
  },
  actions: {
  },
  modules: {
    home,
    homeNav,
    goodsDetail,
    cart
  }
})
