// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import RegisterPage from '../components/RegisterPage.vue'; // Your registration component

const routes = [

  {
    path: '/register',
    name: 'Registration',
    component: RegisterPage,
  },
  // Add any other routes you need
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
