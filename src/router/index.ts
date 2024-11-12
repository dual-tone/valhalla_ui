import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home.vue'),
      children: [
        {
          path: 'settings',
          component: () => import('../views/settings.vue'),
        },
        {
          path: 'trace_route',
          component: () => import('../views/trace_route.vue'),
        },
        {
          path: 'turn_by_turn',
          component: () => import('../views/turn_by_turn.vue'),
        }
      ]
    },
  ],
})

export default router
