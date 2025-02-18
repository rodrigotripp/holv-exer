import Main from '@/views/Main.vue'
import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Main,
    },
    {
      path: '/id/:id',
      name: 'byId',
      component: () => import('@/views/SingleItem.vue'),
      props: true,
    },
  ],
})

export default router
