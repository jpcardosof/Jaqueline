import { createRouter, createWebHashHistory } from 'vue-router'
import ChatView from '../views/ChatView.vue'
import TherapiesView from '../views/TherapiesView.vue'

const routes = [
  { path: '/', redirect: '/chat' },
  { path: '/chat', name: 'chat', component: ChatView },
  { path: '/terapias', name: 'terapias', component: TherapiesView },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})
