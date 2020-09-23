import Vue from 'vue'
import VueRouter from 'vue-router'

// 首页路由
import home from '../views/home/Home.vue';
import goodList from '../views/home/children/goodList.vue';
import homeList from '../views/home/children/homeList.vue';
import goodsDetail from '../views/goods_detail/goodsDetail.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: 'root',
    component: home
  },
  {
    path: "/home",
    name: 'home',
    component: home,
    children: [
      {
        path: "homeList",
        name: 'homeList',
        component: homeList
      },
      {
        path: "goodList/:id",
        name: "goodsList",
        component: goodList
      }
    ]
  },
  {
    path: "/goods_detail/:id",
    name: "goods_detail",
    component: goodsDetail
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
