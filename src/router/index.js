import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store/index';
import {IS_USER_IDENTIFIED_GETTER} from "@/store/storeconstants";
const routes = [
  {
    path: '/',
    name: 'home',
    meta: { auth:true },
    component: () => import('@/views/Home')
  },
  {
    path: '/login',
    name: 'login',
    meta: { auth:false },
    component: () => import('@/views/Login')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to,from,next) => {
  if('auth' in to.meta && to.meta.auth && !store.getters[`auth/${IS_USER_IDENTIFIED_GETTER}`]){
    next('/login');
  }else if ('auth' in to.meta && !to.meta.auth && store.getters[`auth/${IS_USER_IDENTIFIED_GETTER}`]){
    next('');
  }else {
    next();
  }
});

export default router
