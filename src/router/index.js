import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/views/Home.vue"
import Login from "@/views/login.vue"
import Registration from "@/views/registration.vue"
import registrationKindergarten from "@/views/registration_kindergarten.vue"
import work_register from "@/views/work_register.vue"

const routes = [
  {
    path: '/',
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
      },

      {
        path: '/login',
        name: 'login',
        component: Login,
      },
      {
        path: '/registration',
        name: 'registration',
        component: Registration,
      },
      {
        path: '/registrationKindergarten',
        name: 'registrationKindergarten',
        component: registrationKindergarten,
      },
      {
        path: '/work_register',
        name: 'work_register',
        component: work_register,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
