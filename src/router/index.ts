import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '@/views/LandingView.vue'
import WelcomeView from '@/views/WelcomeView.vue'
import ServicesView from '@/views/ServicesView.vue'
import PortfolioView from '@/views/PortfolioView.vue'
import ProjectView from '@/views/ProjectView.vue'
import AboutView from '@/views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView,
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: WelcomeView,
    },
    {
      path: '/services',
      name: 'services',
      component: ServicesView,
    },
    {
      path: '/portfolio',
      name: 'portfolio',
      component: PortfolioView,
    },
    {
      path: '/project/:slug',
      name: 'project',
      component: ProjectView,
      props: true,
    },
    {
      path: '/studio',
      name: 'studio',
      component: AboutView,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

export default router
