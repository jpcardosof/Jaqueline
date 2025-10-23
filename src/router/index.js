import { createRouter, createWebHashHistory } from 'vue-router'
import ChatView from '../views/ChatView.vue'
import TherapiesView from '../views/TherapiesView.vue'
import TherapyDiaryView from '../views/TherapyDiaryView.vue'

const routes = [
  { path: '/', redirect: '/chat' },
  { path: '/chat', name: 'chat', component: ChatView },
  { path: '/terapias', name: 'terapias', component: TherapiesView },
  { path: '/diario', name: 'diario', component: TherapyDiaryView },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})
