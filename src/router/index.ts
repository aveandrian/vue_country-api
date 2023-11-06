import { createWebHistory, createRouter } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import CountryPage from '@/views/CountryPage.vue'

const routes = [
  {
    path: '/',
    children: [
      {
        path: '',
        component: () => HomePage
      },
      {
        path: '/:countryName',
        component: () => CountryPage
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
