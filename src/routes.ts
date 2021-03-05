import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('./layouts/index.vue'), // use default layout
    children: [
      { path: '/', component: () => import('./pages/index.vue') },
      {
        path: '/:path(.*)*',
        component: () => import('./pages/404.vue'),
      },
    ],
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
