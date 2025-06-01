import { createRouter, createWebHistory } from 'vue-router'
import TasksForm from '@/components/TasksForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TasksForm,
    },
  ],
})

export default router
