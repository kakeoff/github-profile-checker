import HomeView from './views/HomeView.vue'
import NotFound from './views/NotFound.vue'

export const routes = [
  { path: '/', component: HomeView, meta: { title: 'Home' }},
  { path: '/:pathMatch(.*)*', component: NotFound, meta: { title: 'Page not found' }},
]
