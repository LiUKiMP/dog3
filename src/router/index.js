import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'NewHome',
    component: () => import('../views/NewHomePage.vue')
  },
  {
    path: '/study-progress',
    name: 'StudyProgress',
    component: () => import('../views/StudyProgress.vue')
  },
  {
    path: '/work-detail',
    name: 'WorkDetail',
    component: () => import('../views/WorkDetail.vue')
  },
  {
    path: '/work-summary',
    name: 'WorkSummary',
    component: () => import('../views/WorkSummary.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;