import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '@/views/Home.vue'
import TaskBoard from '@/Layouts/Home/TaskBoard.vue'
import Report from '@/Layouts/Home/Report.vue'
import Main from '@/Layouts/Home/Main.vue'
import HojaCalculo from '@/Layouts/Home/HojaCalculo.vue'
import PagesExterna from '@/Layouts/Home/PagesExterna.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/main',
          name: 'Main',
          component: Main,
        },
        {
          path: '/proyectos',
          name: 'Proyectos',
          component: TaskBoard,
        },
        {
          path: '/reportes',
          name: 'Reportes',
          component: Report,
        },
        {
          path: '/calculo',
          name: 'Calculo',
          component: HojaCalculo,
        },
        {
          path: '/pages-externa/:name',
          name: 'Pages externa',
          component: PagesExterna,
          props: true,
        },
      ],
    },
  ],
})

export default router
