import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/students/HomeStudentsView.vue')
    },
    {
      path: '/teacher',
      name: 'teacher',
      component: () => import('../views/teachers/HomeTeachersView.vue')
    },
    {
      path: '/student/disciplines',
      name: 'student-disciplines',
      component: () => import('../views/students/DisciplinesFromStudent.vue')
    },
    {
      path: '/teacher/disciplines',
      name: 'teacher-disciplines',
      component: () => import('../views/teachers/DisciplinesFromteacher.vue')
    }
  ]
})

export default router
