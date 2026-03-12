import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue')
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('../views/News.vue')
    },
    {
      path: '/news/:id',
      name: 'news-detail',
      component: () => import('../views/NewsDetail.vue')
    },
    {
      path: '/activity',
      name: 'activity',
      component: () => import('../views/Activity.vue')
    },
    {
      path: '/activity/:id',
      name: 'activity-detail',
      component: () => import('../views/ActivityDetail.vue')
    },
    {
      path: '/recruit',
      name: 'recruit',
      component: () => import('../views/Recruit.vue')
    }
  ],
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router
