import { createRouter, createWebHistory } from 'vue-router'
import DesignSystem from './views/DesignSystem.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./views/Home.vue')
  },
  {
    path: '/design-system',
    name: 'DesignSystem',
    component: DesignSystem
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 