// router/index.js
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/introduction',
    name: 'IntroductionView',
    component: () => import('@/views/IntroductionView.vue'),
  },
  {
    path: '/favorites',
    name: 'FavoritesView',
    component: () => import('@/views/FavoritesView.vue'),
  },
  {
    path: '/login',
    name: 'LoginView',
    component: () => import('@/views/LoginView.vue'),
  },
  {
    path: '/register',
    name: 'RegisterView',
    component: () => import('@/views/RegisterView.vue'),
  },
  {
    path: '/dashboard',
    name: 'DashboardView',
    component: () => import('@/views/DashboardView.vue'),
  },
  {
    path: '/settings',
    name: 'SettingsView',
    component: () => import('@/views/SettingsView.vue'),
  },
  {
    path: '/profile',
    name: 'ProfileView',
    component: () => import('@/views/ProfileView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
