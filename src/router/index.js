import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/loginpage.vue'


const routes = [
  {
    path: '/',
    name: 'login',
    component: HomeView
  },
  {
    path: '/mainpage',
    name: 'mainpage',
    component: () => import('../views/mainpage.vue')
  },
  {
    path: '/manitto',
    name: 'manitto',
    component: () => import(/* webpackChunkName: "about" */ '../views/manitto.vue')
  },
  {
    path: '/kakao',
    name: 'kakao',
    component: () => import(/* webpackChunkName: "about" */ '../views/bak_kakao_mung.vue')
  },
  {
    path: '/popup',
    name: 'popup',
    component: () => import(/* webpackChunkName: "about" */ '../views/bak_kakaopopup.vue')
  },
  {
    path: '/kakaoinfo',
    name: 'kakaoinfo',
    component: () => import(/* webpackChunkName: "about" */ '../views/kakaoinfo.vue')
  },
  {
    path: '/food',
    name: 'food',
    component: () => import(/* webpackChunkName: "about" */ '../views/FoodView.vue')
  },
  {
    path: '/CheckGame',
    name: 'CheckGame',
    component: () => import(/* webpackChunkName: "about" */ '../views/CheckGame.vue')
  },
  {
    path: '/roll1',
    name: 'roll1',
    component: () => import(/* webpackChunkName: "about" */ '../views/rolling_key.vue')
  },
  {
    path: '/roll2',
    name: 'roll2',
    component: () => import(/* webpackChunkName: "about" */ '../views/rolling_register.vue')
  },

  // {
  //   path: '/youtube',
  //   name: 'youtube',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/youtube.vue')
  // },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
