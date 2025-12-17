import { createRouter, createWebHistory } from 'vue-router'
import ComponentGallery from '@/views/ComponentGallery.vue'
import TestStore from './paginas/TestStore.vue'

const routes = [
  { path: '/', component: ComponentGallery },
  { path: '/test-store', component: TestStore }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
