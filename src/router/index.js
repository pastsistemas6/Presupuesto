import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '@/views/Home.vue'
import TaskBoard from '@/Layouts/Home/TaskBoard.vue'
import Report from '@/Layouts/Home/Report.vue'
import Main from '@/Layouts/Home/Main.vue'
import HojaCalculo from '@/Layouts/Home/HojaCalculo.vue'
import PagesExterna from '@/Layouts/Home/PagesExterna.vue'
import Movements from '@/Layouts/Home/Movements.vue'
import BudgetMovements from '@/Layouts/Home/BudgetMovements.vue'

const router = createRouter({
  // Historia de navegación basada en el API History del navegador
  history: createWebHistory(import.meta.env.BASE_URL),

  // Definición de todas las rutas de la aplicación
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
          path: '/movements/:projectName',
          name: 'Movements',
          component: Movements,
          props: true,
        },
        {
          path: '/movimientos/:projectName/:month?',
          name: 'BudgetMovements',
          component: BudgetMovements,
          props: true,
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
