import { createRouter, createWebHashHistory } from 'vue-router'
import { useApp } from './stores/app'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/login', component: () => import('./views/Login.vue') },
    { path: '/interesse', component: () => import('./views/Interesse.vue') },
    { path: '/', component: () => import('./views/Grupos.vue') },
    { path: '/grupo/:id', component: () => import('./views/Grupo.vue'), children: [
      { path: '', component: () => import('./views/Painel.vue') },
      { path: 'despesa', component: () => import('./views/Despesa.vue') },
      { path: 'historico', component: () => import('./views/Historico.vue') },
      { path: 'fixas', component: () => import('./views/Fixas.vue') },
    ] },
  ],
})
router.beforeEach((to) => {
  const app = useApp()
  const publicas = ['/login', '/interesse']
  if (!app.usuario && !publicas.includes(to.path)) return '/login'
})
export default router
