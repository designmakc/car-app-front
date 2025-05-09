import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/pages/HomeView.vue'
import DesignSystemView from '@/pages/DesignSystemView.vue'
import CatalogView from '@/pages/CatalogView.vue'
import CarDetails from '@/pages/CarDetails.vue'
import AddCar from '@/pages/AddCar.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: CatalogView
    },
    {
      path: '/design-system',
      name: 'design-system',
      component: DesignSystemView
    },
    {
      path: '/car/:id',
      name: 'car-details',
      component: CarDetails
    },
    {
      path: '/add-car',
      name: 'add-car',
      component: AddCar
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

export default router 