import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/pages/HomeView.vue'
import DesignSystemView from '@/pages/DesignSystemView.vue'
import CatalogView from '@/pages/CatalogView.vue'
import CarDetails from '@/pages/CarDetails.vue'
import AddCar from '@/pages/AddCarNew.vue'
import AuthView from '@/pages/AuthView.vue'
import ProfileView from '@/pages/ProfileView.vue'
import MyCarsView from '@/pages/MyCarsView.vue'
import NotificationsView from '@/pages/NotificationsView.vue'
import PaymentHistoryView from '@/pages/PaymentHistoryView.vue'

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
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile/my-cars',
      name: 'my-cars',
      component: MyCarsView,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile/notifications',
      name: 'notifications',
      component: NotificationsView,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile/payment-history',
      name: 'payment-history',
      component: PaymentHistoryView,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile/favorites',
      name: 'favorites',
      component: () => import('@/pages/FavoritesView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/profile/settings',
      name: 'settings',
      component: () => import('@/pages/SettingsView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/profile/user-profile',
      redirect: '/profile/settings'
    },
    {
      path: '/profile/support',
      name: 'support',
      component: () => import('@/pages/SupportView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/profile/top-up',
      name: 'top-up',
      component: () => import('@/pages/TopUpView.vue'),
      meta: { requiresAuth: true }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

// Защита маршрутов
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated')
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/auth')
  } else if (to.name === 'auth' && isAuthenticated) {
    next('/profile')
  } else {
    next()
  }
})

export default router 