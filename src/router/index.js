import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import TaskPage from '@/pages/TaskPage.vue'
import LoginForm from '@/components/LoginForm.vue'
import RegisterForm from '@/components/RegisterForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/tasks',
      component: MainLayout,
      meta: { requiresAuth: true },
      children: [
        { path: '', name: 'tasks', component: TaskPage },
        // { path: 'profile', name: 'profile', component: ProfilePage },
      ],
    },
    { path: '/login', name: 'login', component: LoginForm },
    { path: '/register', name: 'register', component: RegisterForm },
  ],
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    next('/login') // редиректим на логин
  } else {
    next()
  }
})

export default router
