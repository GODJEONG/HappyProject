import { createRouter, createWebHistory } from 'vue-router'
import food from '../views/FoodView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: food
  },

 



]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
