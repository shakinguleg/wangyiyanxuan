import Vue from 'vue'
import Vuex from 'vuex'
import home from '../views/home/store/home';
import homeNav from './homeNav';


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
