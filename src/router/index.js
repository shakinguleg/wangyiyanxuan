import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home/Home.vue';
import GoodList from '../views/goodList/GoodList.vue';

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
    component: home
  },
  {
    path: "/goodList",
    name: "goodsList",
    component: GoodList
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
